"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  Key, CreditCard, User, StickyNote, Shield, Star, 
  Search, Plus, LogOut, LayoutGrid, List, MoreVertical,
  ChevronRight, Copy, ExternalLink, Eye, EyeOff, Wand2,
  RefreshCw, Check, X, Pencil, Save, Zap
} from "lucide-react";
import { LoginForm, CardForm, IdentityForm } from "@/components/forms/ItemForms";
import { encrypt, decrypt } from "@/app/lib/crypto-client";
import { adjectives, nouns, passphraseWords } from "@/app/lib/words";
import {generatePassword, generatePassphrase, generateUsername} from "@/app/lib/generator";

interface Item {
  id: number;
  name: string;
  username?: string;
  password?: string;
  url?: string;
  type: string;
  notes?: string;
  item_metadata?: any;
}

export default function Dashboard() {
  const router = useRouter();
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState("");
  const [masterPassword, setMasterPassword] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All items"); 
  const [activeView, setActiveView] = useState<"vault" | "generator">("vault"); 
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [isGeneratorOpen, setIsGeneratorOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const [isEditing, setIsEditing] = useState(false);
  const [editFormData, setEditFormData] = useState<Item | null>(null);
  
  const [newItem, setNewItem] = useState<Item>({
    id: 0, 
    name: "",
    username: "",
    password: "",
    url: "",
    type: "Login",
    notes: "",
    item_metadata: {}
  });
  const [saving, setSaving] = useState(false);

  const [genContext, setGenContext] = useState<"modal-new" | "modal-edit" | "standalone">("standalone"); 
  const [genTab, setGenTab] = useState<"password" | "passphrase" | "username">("password");
  
 
  const [genLength, setGenLength] = useState(16);
  const [genUseUpper, setGenUseUpper] = useState(true);
  const [genUseNumbers, setGenUseNumbers] = useState(true);
  const [genUseSymbols, setGenUseSymbols] = useState(true);
  
  const [ppWordCount, setPpWordCount] = useState(4);
  const [ppSeparator, setPpSeparator] = useState("-");
  const [ppCapitalize, setPpCapitalize] = useState(false);
  
 
  const [unIncludeNumber, setUnIncludeNumber] = useState(true);
  const [generatedResult, setGeneratedResult] = useState("");


  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    const mp = sessionStorage.getItem("masterPassword");
    
    if (!email || !mp) {
      router.push("/auth/login");
      return;
    }
    setUserEmail(email);
    setMasterPassword(mp);
    fetchItems(email, mp);
    runGenerator(); 
  }, [router]);

 
  useEffect(() => {
    runGenerator();
  }, [genTab, genLength, genUseUpper, genUseNumbers, genUseSymbols, ppWordCount, ppSeparator, ppCapitalize, unIncludeNumber]);


  const runGenerator = () => {
    if (genTab === "password") {
       setGeneratedResult(generatePassword(genUseUpper, genUseNumbers, genUseSymbols, genLength));
    } else if (genTab === "passphrase") {
      setGeneratedResult(generatePassphrase(ppWordCount, ppCapitalize, ppSeparator));
    } else {
      setGeneratedResult(generateUsername(unIncludeNumber));
    }
  };
 
  const useGeneratedResult = () => {
    if (genContext === "modal-new") {
        setNewItem({ ...newItem, password: generatedResult });
        setIsGeneratorOpen(false);
    } else if (genContext === "modal-edit" && editFormData) {
        setEditFormData({ ...editFormData, password: generatedResult });
        setIsGeneratorOpen(false);
    } else {
        copyToClipboard(generatedResult);
        alert("Copied to clipboard!");
    }
  };

  const openGeneratorModal = (context: "modal-new" | "modal-edit") => {
      setGenContext(context);
      setGenTab("password"); 
      setIsGeneratorOpen(true);
  };

 
  const goToGeneratorView = () => {
      setActiveView("generator");
      setGenContext("standalone");
      setFilter("Generator"); 
  };
  
  const goToVaultView = (filterName: string = "All items") => {
      setActiveView("vault");
      setFilter(filterName);
  };


  const fetchItems = async (email: string, mp: string) => {
    try {
      const res = await fetch(`/api/items?email=${email}`);
      if (res.ok) {
        const encryptedData = await res.json();
        
        const decryptedItems = encryptedData.map((item: any) => {
            let metadata = {};
            try {
                const decryptedMeta = decrypt(item.item_metadata, mp);
               
                metadata = JSON.parse(decryptedMeta || "{}");
            } catch (e) {
                console.warn("Failed to parse metadata for item", item.id);
                metadata = {}; 
            }

            return {
                ...item,
                username: decrypt(item.username, mp),
                password: decrypt(item.password, mp),
                url: decrypt(item.url, mp),
                notes: decrypt(item.notes, mp),
                item_metadata: metadata,
            };
        });

        setItems(decryptedItems);
      }
    } catch (error) {
      console.error("Error fetching items", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    sessionStorage.removeItem("masterPassword");
    router.push("/auth/login");
  };

  const handleAddItem = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      const encryptedItem = {
          ...newItem,
          username: encrypt(newItem.username || "", masterPassword),
          password: encrypt(newItem.password || "", masterPassword),
          url: encrypt(newItem.url || "", masterPassword),
          notes: encrypt(newItem.notes || "", masterPassword),
          item_metadata: encrypt(JSON.stringify(newItem.item_metadata || {}), masterPassword)
      };

      const res = await fetch("/api/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...encryptedItem, user_email: userEmail }),
      });

      if (res.ok) {
        setIsModalOpen(false);
        setNewItem({ id: 0, name: "", username: "", password: "", url: "", type: "Login", notes: "", item_metadata: {} });
        fetchItems(userEmail, masterPassword);
      } else {
        const errorData = await res.json();
        alert(`Failed to add item: ${errorData.message || errorData.error}`);
      }
    } catch (error) {
      console.error(error);
      alert("Error adding item");
    } finally {
      setSaving(false);
    }
  };

  const handleUpdateItem = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!editFormData) return;
      
      setSaving(true);
      try {
        const encryptedItem = {
            ...editFormData,
            username: encrypt(editFormData.username || "", masterPassword),
            password: encrypt(editFormData.password || "", masterPassword),
            url: encrypt(editFormData.url || "", masterPassword),
            notes: encrypt(editFormData.notes || "", masterPassword),
            item_metadata: encrypt(JSON.stringify(editFormData.item_metadata || {}), masterPassword)
        };

        const res = await fetch("/api/items", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...encryptedItem, user_email: userEmail }),
        });

        if (res.ok) {
            setIsEditing(false);
            setSelectedItem(editFormData); 
            fetchItems(userEmail, masterPassword); 
        } else {
            const errorData = await res.json();
            alert(`Failed to update item: ${errorData.message || errorData.error}`);
        }
      } catch (error) {
          console.error(error);
          alert("Error updating item");
      } finally {
          setSaving(false);
      }
  };

  const handleItemClick = (item: Item) => {
      const sanitizedItem = { ...item, item_metadata: item.item_metadata || {} };
      setSelectedItem(sanitizedItem);
      setEditFormData(sanitizedItem); 
      setIsEditing(false); 
      setShowPassword(false);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const filteredItems = items.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
    const matchesFilter =
      filter === "All items" ||
      (filter === "Favorites" && false) || 
      (filter === "Login" && item.type === "Login") ||
      (filter === "Card" && item.type === "Card") ||
      (filter === "Identity" && item.type === "Identity") ||
      (filter === "Notes" && item.type === "Notes") ||
      (filter === "SSH Keys" && item.type === "SSH Keys");

    return matchesSearch && matchesFilter;
  });

  const renderFormFields = (itemData: Item, setItemData: any, isEditMode: boolean) => {
      switch (itemData.type) {
          case "Login":
              return <LoginForm data={itemData} setData={setItemData} isEditing={isEditMode} />;
          case "Card":
              return <CardForm data={itemData} setData={setItemData} isEditing={isEditMode} />;
          case "Identity":
              return <IdentityForm data={itemData} setData={setItemData} isEditing={isEditMode} />;
          default:
              return null;
      }
  };

  const GeneratorContent = ({ isModal = false }: { isModal?: boolean }) => (
      <div className={`w-full ${isModal ? "space-y-6" : "h-full flex flex-col md:flex-row gap-8"}`}>
 
         <div className={`${isModal ? "w-full" : "w-full md:w-1/2 lg:w-2/5 flex flex-col gap-6"}`}>
            {!isModal && (
                 <div className="bg-zinc-900/50 p-1 rounded-xl border border-zinc-800 flex shrink-0">
                    {(["password", "passphrase", "username"] as const).map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setGenTab(tab)}
                            className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all capitalize ${
                                genTab === tab ? "bg-zinc-800 text-emerald-400 shadow-sm" : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/50"
                            }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            )}

             {isModal && (
                <div className="flex border-b border-zinc-800 mb-6">
                    {(["password", "passphrase", "username"] as const).map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setGenTab(tab)}
                            className={`flex-1 py-3 text-sm font-medium transition-colors capitalize ${
                                genTab === tab ? "bg-zinc-900 text-emerald-400 border-b-2 border-emerald-500" : "bg-zinc-950 text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/50"
                            }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            )}

            <div className={`space-y-6 ${!isModal ? "bg-zinc-900/30 p-6 rounded-2xl border border-zinc-800/50 flex-1" : ""}`}>
                 {genTab === "password" && (
                         <div className="space-y-6">
                             <div>
                                <div className="flex justify-between text-sm text-zinc-400 mb-2">
                                    <span>Length</span>
                                    <span className="font-mono text-emerald-500">{genLength}</span>
                                </div>
                                <input 
                                    type="range" min="8" max="64" 
                                    value={genLength} 
                                    onChange={(e) => setGenLength(parseInt(e.target.value))}
                                    className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                                />
                            </div>
                            <div className="grid grid-cols-3 gap-3">
                                <label className={`flex flex-col items-center justify-center p-4 rounded-xl cursor-pointer border transition-all ${genUseUpper ? "bg-emerald-500/10 border-emerald-500/50 text-emerald-400" : "bg-zinc-950 border-zinc-800 text-zinc-500 hover:bg-zinc-900"}`}>
                                    <span className="text-sm font-bold mb-1">ABC</span>
                                    <span className="text-[10px] uppercase tracking-wider opacity-70">Uppercase</span>
                                    <input type="checkbox" checked={genUseUpper} onChange={(e) => setGenUseUpper(e.target.checked)} className="hidden" />
                                </label>
                                <label className={`flex flex-col items-center justify-center p-4 rounded-xl cursor-pointer border transition-all ${genUseNumbers ? "bg-emerald-500/10 border-emerald-500/50 text-emerald-400" : "bg-zinc-950 border-zinc-800 text-zinc-500 hover:bg-zinc-900"}`}>
                                    <span className="text-sm font-bold mb-1">123</span>
                                    <span className="text-[10px] uppercase tracking-wider opacity-70">Numbers</span>
                                    <input type="checkbox" checked={genUseNumbers} onChange={(e) => setGenUseNumbers(e.target.checked)} className="hidden" />
                                </label>
                                <label className={`flex flex-col items-center justify-center p-4 rounded-xl cursor-pointer border transition-all ${genUseSymbols ? "bg-emerald-500/10 border-emerald-500/50 text-emerald-400" : "bg-zinc-950 border-zinc-800 text-zinc-500 hover:bg-zinc-900"}`}>
                                    <span className="text-sm font-bold mb-1">#$&</span>
                                    <span className="text-[10px] uppercase tracking-wider opacity-70">Symbols</span>
                                    <input type="checkbox" checked={genUseSymbols} onChange={(e) => setGenUseSymbols(e.target.checked)} className="hidden" />
                                </label>
                            </div>
                         </div>
                    )}

                    {genTab === "passphrase" && (
                        <div className="space-y-6">
                            <div>
                                <div className="flex justify-between text-sm text-zinc-400 mb-2">
                                    <span>Word Count</span>
                                    <span className="font-mono text-emerald-500">{ppWordCount}</span>
                                </div>
                                <input 
                                    type="range" min="3" max="8" 
                                    value={ppWordCount} 
                                    onChange={(e) => setPpWordCount(parseInt(e.target.value))}
                                    className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                                />
                            </div>
                            <div className="grid grid-cols-1 gap-4">
                                <div>
                                    <label className="block text-xs font-medium text-zinc-400 mb-2 uppercase tracking-wider">Separator</label>
                                    <div className="flex bg-zinc-950 rounded-xl p-1 border border-zinc-800">
                                        {[ "-", "_", ".", " "].map(sep => (
                                            <button key={sep} onClick={() => setPpSeparator(sep)} className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${ppSeparator === sep ? "bg-zinc-800 text-white shadow-sm" : "text-zinc-500 hover:text-zinc-300"}`}>
                                                {sep === " " ? "Space" : sep}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <label className={`flex items-center justify-between p-4 rounded-xl cursor-pointer border transition-all ${ppCapitalize ? "bg-emerald-500/10 border-emerald-500/50 text-emerald-400" : "bg-zinc-950 border-zinc-800 text-zinc-500 hover:bg-zinc-900"}`}>
                                    <span className="text-sm font-medium">Capitalize Words</span>
                                    <input type="checkbox" checked={ppCapitalize} onChange={(e) => setPpCapitalize(e.target.checked)} className="hidden" />
                                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${ppCapitalize ? "bg-emerald-500 border-emerald-500" : "border-zinc-600"}`}>
                                        {ppCapitalize && <Check className="w-3 h-3 text-white" />}
                                    </div>
                                </label>
                            </div>
                        </div>
                    )}

                    {genTab === "username" && (
                         <div className="space-y-4">
                            <label className={`flex items-center justify-between p-4 rounded-xl cursor-pointer border transition-all ${unIncludeNumber ? "bg-emerald-500/10 border-emerald-500/50 text-emerald-400" : "bg-zinc-950 border-zinc-800 text-zinc-500 hover:bg-zinc-900"}`}>
                                <span className="text-sm font-medium">Include Number suffix</span>
                                <input type="checkbox" checked={unIncludeNumber} onChange={(e) => setUnIncludeNumber(e.target.checked)} className="hidden" />
                                <div className={`w-5 h-5 rounded flex items-center justify-center border ${unIncludeNumber ? "bg-emerald-500 border-emerald-500" : "border-zinc-600"}`}>
                                    {unIncludeNumber && <Check className="w-3.5 h-3.5 text-white" />}
                                </div>
                            </label>
                         </div>
                    )}
            </div>
         </div>

         {/* Result Section */}
         <div className={`${isModal ? "w-full" : "w-full md:w-1/2 lg:w-3/5 flex flex-col justify-center"}`}>
             <div className="bg-zinc-950 p-8 rounded-3xl border border-zinc-800 relative group flex flex-col items-center justify-center min-h-[200px] md:min-h-[300px] shadow-2xl">
                <div className="text-3xl md:text-4xl lg:text-5xl font-mono text-center text-white break-all tracking-wider font-bold bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent animate-in zoom-in-50 duration-300 key={generatedResult}">
                    {generatedResult}
                </div>
                
                <div className="flex gap-4 mt-8">
                     <button 
                        onClick={runGenerator}
                        className="flex items-center gap-2 px-4 py-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors border border-transparent hover:border-zinc-700"
                    >
                        <RefreshCw className="w-5 h-5" />
                        <span className="text-sm font-medium">Regenerate</span>
                    </button>
                    <button 
                        onClick={() => { copyToClipboard(generatedResult); alert("Copied!"); }}
                        className="flex items-center gap-2 px-4 py-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors border border-transparent hover:border-zinc-700"
                    >
                        <Copy className="w-5 h-5" />
                         <span className="text-sm font-medium">Copy</span>
                    </button>
                </div>
            </div>

              {isModal && (
                <button
                    onClick={useGeneratedResult}
                    className="w-full mt-6 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-3 rounded-xl text-sm font-medium shadow-lg shadow-emerald-900/20 transition-all flex items-center justify-center gap-2"
                >
                    <Check className="w-4 h-4"/> Use {genTab === "username" ? "Username" : "Password"}
                </button>
              )}
         </div>
      </div>
  );


  return (
    <div className="flex h-screen bg-black text-zinc-100 selection:bg-emerald-500/30">
      <aside className="w-72 bg-zinc-950 border-r border-zinc-900 p-6 flex flex-col relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-emerald-900/10 to-transparent pointer-events-none" />
        
        <div className="flex items-center gap-3 mb-10 z-10 transition-all hover:scale-105 cursor-pointer" onClick={() => goToVaultView()}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-900/20">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            SafePad
          </h1>
        </div>

        <nav className="space-y-6 flex-1 z-10">
            <div>
                <div className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3 px-2">Vaults</div>
                <div 
                    onClick={() => goToVaultView("All items")}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-all duration-200 group ${
                        activeView === "vault" && filter !== "Generator" ? "bg-zinc-900 text-white shadow-sm ring-1 ring-zinc-800" : "text-zinc-400 hover:bg-zinc-900/50 hover:text-zinc-200"
                    }`}
                >
                    <LayoutGrid className="w-4 h-4" />
                    <span className="text-sm font-medium">All Vaults</span>
                </div>
            </div>

            <div>
                <div className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3 px-2">Categories</div>
                <div className="space-y-1">
                    {[
                        { name: "Login", icon: Key },
                        { name: "Card", icon: CreditCard },
                        { name: "Identity", icon: User },
                        { name: "Notes", icon: StickyNote },
                        { name: "SSH Keys", icon: Shield },
                    ].map((category) => (
                        <div
                            key={category.name}
                            onClick={() => goToVaultView(category.name)}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-all duration-200 ${
                                activeView === "vault" && filter === category.name 
                                    ? "bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/20" 
                                    : "text-zinc-400 hover:bg-zinc-900/50 hover:text-zinc-200"
                            }`}
                        >
                            <category.icon className="w-4 h-4" />
                            <span className="text-sm font-medium">{category.name}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div>
                 <div className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3 px-2">Tools</div>
                 <div 
                    onClick={goToGeneratorView}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-all duration-200 group ${
                        activeView === "generator" ? "bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/20" : "text-zinc-400 hover:bg-zinc-900/50 hover:text-zinc-200"
                    }`}
                >
                    <Wand2 className="w-4 h-4" />
                    <span className="text-sm font-medium">Generator</span>
                </div>
            </div>
        </nav>
        
        <div className="pt-6 border-t border-zinc-900 z-10">
          <div className="flex items-center gap-3 px-2 mb-4">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-zinc-700 to-zinc-600 flex items-center justify-center text-xs font-bold text-white shadow-sm">
                {userEmail.charAt(0).toUpperCase()}
            </div>
             <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-white truncate">My Account</div>
                <div className="text-xs text-zinc-500 truncate">{userEmail}</div>
            </div>
          </div>
          <button 
            onClick={handleLogout} 
            className="w-full flex items-center gap-2 px-3 py-2 text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-hidden flex flex-col relative bg-black">
        {activeView === "vault" ? (
            <>
                <header className="h-20 px-8 flex items-center justify-between border-b border-zinc-900 bg-black/80 backdrop-blur-sm z-20">
                    <div className="flex items-center gap-4">
                        <h2 className="text-xl font-semibold text-white tracking-tight">{filter}</h2>
                        <span className="px-2.5 py-0.5 rounded-full bg-zinc-900 border border-zinc-800 text-xs text-zinc-400 font-medium">
                            {filteredItems.length} items
                        </span>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="relative group">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within:text-emerald-500 transition-colors" />
                            <input
                                type="text"
                                placeholder="Search..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-64 pl-10 pr-4 py-2 bg-zinc-900/50 border border-zinc-800 rounded-xl text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500/30 transition-all"
                            />
                        </div>
                        
                        <div className="flex bg-zinc-900/50 rounded-lg p-1 border border-zinc-800">
                            <button 
                                onClick={() => setViewMode("grid")}
                                className={`p-2 rounded-md transition-all ${viewMode === "grid" ? "bg-zinc-800 text-white shadow-sm" : "text-zinc-500 hover:text-zinc-300"}`}
                            >
                                <LayoutGrid className="w-4 h-4" />
                            </button>
                            <button 
                                onClick={() => setViewMode("list")}
                                className={`p-2 rounded-md transition-all ${viewMode === "list" ? "bg-zinc-800 text-white shadow-sm" : "text-zinc-500 hover:text-zinc-300"}`}
                            >
                                <List className="w-4 h-4" />
                            </button>
                        </div>

                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2 rounded-xl text-sm font-medium shadow-lg shadow-emerald-900/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                        >
                            <Plus className="w-4 h-4" />
                            New Item
                        </button>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center h-64 text-zinc-500">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500 mb-4"></div>
                            <p>Loading your secure vault...</p>
                        </div>
                    ) : filteredItems.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-center">
                            <div className="w-20 h-20 bg-zinc-900 rounded-full flex items-center justify-center mb-6 ring-1 ring-zinc-800">
                                <Search className="w-10 h-10 text-zinc-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-2">No items found</h3>
                            <p className="text-zinc-500 max-w-sm">
                                {search ? "Try adjusting your search terms" : "Your vault is empty. Create your first secure item now."}
                            </p>
                        </div>
                    ) : viewMode === "grid" ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {filteredItems.map((item, idx) => (
                                <div 
                                    key={idx}
                                    onClick={() => handleItemClick(item)}
                                    className="group bg-zinc-900/30 backdrop-blur-sm border border-zinc-800/50 rounded-2xl p-5 hover:bg-zinc-900 hover:border-emerald-500/30 hover:shadow-xl hover:shadow-emerald-900/5 transition-all duration-300 cursor-pointer relative overflow-hidden flex flex-col h-full ring-1 ring-transparent hover:ring-emerald-500/20"
                                >
                                    <div className="flex items-start gap-4 mb-4">
                                        <div className="w-12 h-12 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center shadow-inner shrink-0 text-zinc-200">
                                            {getIcon(item.type)}
                                        </div>
                                        <div className="flex-1 min-w-0 pt-1">
                                            <h3 className="font-semibold text-white truncate pr-6">{item.name}</h3>
                                            <p className="text-xs text-emerald-500 font-medium">{item.type}</p>
                                        </div>
                                    </div>
                                    
                                    <div className="space-y-3 flex-1">
                                        {item.type === "Login" && item.username && (
                                            <div className="bg-zinc-950/50 rounded-lg p-3 group/field hover:bg-zinc-950 transition-colors border border-zinc-800/50">
                                                <p className="text-[10px] uppercase tracking-wider text-zinc-500 font-semibold mb-1">Username</p>
                                                <p className="text-sm text-zinc-300 truncate font-mono">{item.username}</p>
                                            </div>
                                        )}
                                        {item.type === "Card" && (
                                            <div className="bg-zinc-950/50 rounded-lg p-3 group/field hover:bg-zinc-950 transition-colors border border-zinc-800/50">
                                                <p className="text-[10px] uppercase tracking-wider text-zinc-500 font-semibold mb-1">Number</p>
                                                <p className="text-sm text-zinc-300 truncate font-mono">•••• {item.item_metadata?.cardNumber?.slice(-4) || "0000"}</p>
                                            </div>
                                        )}
                                        {item.type === "Identity" && (
                                            <div className="bg-zinc-950/50 rounded-lg p-3 group/field hover:bg-zinc-950 transition-colors border border-zinc-800/50">
                                                <p className="text-[10px] uppercase tracking-wider text-zinc-500 font-semibold mb-1">Name</p>
                                                <p className="text-sm text-zinc-300 truncate font-mono">{item.item_metadata?.firstName} {item.item_metadata?.lastName}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="bg-zinc-900/30 border border-zinc-800 rounded-2xl overflow-hidden">
                            <table className="w-full text-sm">
                                <thead className="bg-zinc-900/50 border-b border-zinc-800">
                                    <tr>
                                        <th className="text-left py-4 px-6 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Name</th>
                                        <th className="text-left py-4 px-6 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Detail</th>
                                        <th className="text-left py-4 px-6 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Type</th>
                                        <th className="text-right py-4 px-6 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-zinc-800">
                                    {filteredItems.map((item, idx) => (
                                        <tr 
                                            key={idx} 
                                            onClick={() => handleItemClick(item)}
                                            className="group hover:bg-zinc-800/50 transition-colors cursor-pointer"
                                        >
                                            <td className="py-4 px-6">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center text-zinc-400">
                                                        {getIcon(item.type, "w-4 h-4")}
                                                    </div>
                                                    <span className="font-medium text-white">{item.name}</span>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6 text-zinc-400 font-mono text-xs">
                                                {item.type === "Login" ? item.username : 
                                                item.type === "Card" ? `•••• ${item.item_metadata?.cardNumber?.slice(-4) || ""}` :
                                                item.type === "Identity" ? `${item.item_metadata?.firstName || ""} ${item.item_metadata?.lastName || ""}` : "—"}
                                            </td>
                                            <td className="py-4 px-6">
                                                <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium border ${getTypeColor(item.type)}`}>
                                                    {item.type}
                                                </span>
                                            </td>
                                            <td className="py-4 px-6 text-right">
                                                <MoreVertical className="w-4 h-4 ml-auto text-zinc-600 group-hover:text-white" />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </>
        ) : (
          
            <div className="flex-1 flex flex-col h-full bg-black">
                 <header className="h-20 px-8 flex items-center justify-between border-b border-zinc-900 bg-black/80 backdrop-blur-sm z-20">
                    <h2 className="text-xl font-semibold text-white tracking-tight flex items-center gap-3">
                        <Wand2 className="w-5 h-5 text-emerald-500" />
                        Generator Suite
                    </h2>
                </header>
                <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                     <GeneratorContent isModal={false} />
                </div>
            </div>
        )}
      </main>

      {isModalOpen && !isGeneratorOpen && (
        <div className="fixed inset-0 bg-zinc-950/80 backdrop-blur-sm flex items-center justify-center z-50 animate-in fade-in duration-200">
          <div className="bg-zinc-900 w-[28rem] rounded-2xl border border-zinc-800 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
            <div className="bg-zinc-900 border-b border-zinc-800 p-6 flex justify-between items-center shrink-0">
                <div>
                    <h3 className="text-lg font-semibold text-white">Add New Item</h3>
                    <p className="text-sm text-zinc-500 mt-1">Store your secure information safely.</p>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="text-zinc-500 hover:text-white transition-colors">
                    <X className="w-5 h-5"/>
                </button>
            </div>
            
            <form onSubmit={handleAddItem} className="p-6 space-y-5 overflow-y-auto custom-scrollbar">
              <div className="col-span-2">
                    <label className="block text-xs font-medium text-zinc-400 mb-1.5 ml-1">Type</label>
                    <div className="relative">
                        <select
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 appearance-none"
                        value={newItem.type}
                        onChange={(e) => setNewItem({ ...newItem, type: e.target.value })}
                        >
                        <option value="Login">Login</option>
                        <option value="Card">Card</option>
                        <option value="Identity">Identity</option>
                        <option value="Notes">Notes</option>
                        <option value="SSH Keys">SSH Keys</option>
                        </select>
                        <ChevronRight className="w-4 h-4 text-zinc-500 absolute right-4 top-1/2 -translate-y-1/2 rotate-90 pointer-events-none" />
                    </div>
                </div>

              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1.5 ml-1">Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. My Visa Card or Google"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
                  value={newItem.name}
                  onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                />
              </div>
            
              {renderFormFields(newItem, setNewItem, true)}

              {(newItem.type === "Login" || newItem.type === "SSH Keys") && (
                 <div>
                    <label className="block text-xs font-medium text-zinc-400 mb-1.5 ml-1">Password / Key</label>
                    <div className="relative group/input">
                        <Key className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within/input:text-emerald-500 transition-colors" />
                        <input
                        type="password"
                        placeholder="••••••••••••"
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-10 pr-10 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
                        value={newItem.password}
                        onChange={(e) => setNewItem({ ...newItem, password: e.target.value })}
                        />
                         <button
                            type="button"
                            onClick={() => openGeneratorModal("modal-new")}
                            className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
                            title="Generate Password"
                        >
                            <Wand2 className="w-4 h-4" />
                        </button>
                    </div>
                  </div>
              )}
        
               <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1.5 ml-1">Notes</label>
                <textarea
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all min-h-[80px]"
                  placeholder="Additional notes..."
                  value={newItem.notes}
                  onChange={(e) => setNewItem({ ...newItem, notes: e.target.value })}
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-2.5 text-sm font-medium text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2.5 rounded-xl text-sm font-medium shadow-lg shadow-emerald-900/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {saving ? "Saving..." : "Save Item"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
    
      {isGeneratorOpen && (
        <div className="fixed inset-0 bg-zinc-950/80 backdrop-blur-sm flex items-center justify-center z-[70] animate-in fade-in duration-200">
             <div className="bg-zinc-900 w-[500px] rounded-2xl border border-zinc-800 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                <div className="bg-zinc-900 border-b border-zinc-800 p-4 flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                        <Wand2 className="w-5 h-5 text-emerald-400"/> Generator
                    </h3>
                    <button onClick={() => setIsGeneratorOpen(false)} className="text-zinc-500 hover:text-white">
                        <X className="w-5 h-5"/>
                    </button>
                </div>
                
                <div className="p-6">
                    <GeneratorContent />
                </div>
             </div>
        </div>
      )}

      {selectedItem && !isGeneratorOpen && (
        <div className="fixed inset-0 bg-zinc-950/80 backdrop-blur-sm flex items-center justify-center z-50 animate-in fade-in duration-200">
           <div className="bg-zinc-900 w-[32rem] rounded-2xl border border-zinc-800 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
                <div className="bg-zinc-900 border-b border-zinc-800 p-6 flex justify-between items-center shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center shadow-inner">
                            {getIcon(selectedItem.type, "w-5 h-5 text-zinc-200")}
                        </div>
                        <div>
                             {isEditing ? (
                                <input 
                                    className="bg-transparent border-b border-emerald-500 text-lg font-semibold text-white focus:outline-none w-full"
                                    value={editFormData?.name}
                                    onChange={(e) => setEditFormData({ ...editFormData!, name: e.target.value })}
                                />
                             ) : (
                                <>
                                    <h3 className="text-lg font-semibold text-white">{selectedItem.name}</h3>
                                    <p className="text-xs text-emerald-500 font-medium">{selectedItem.type}</p>
                                </>
                             )}
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        {!isEditing && (
                            <button 
                                onClick={() => setIsEditing(true)}
                                className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
                            >
                                <Pencil className="w-4 h-4"/>
                            </button>
                        )}
                        <button onClick={() => setSelectedItem(null)} className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors">
                            <X className="w-5 h-5"/>
                        </button>
                    </div>
                </div>

                <div className="p-6 space-y-5 overflow-y-auto custom-scrollbar">
                     {isEditing && editFormData ? (
                        <form id="edit-form" onSubmit={handleUpdateItem} className="space-y-5">
                            {renderFormFields(editFormData, setEditFormData, true)}
                            
                            {(editFormData.type === "Login" || editFormData.type === "SSH Keys") && (
                                <div className="space-y-1">
                                    <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Password / Key</label>
                                    <div className="relative group/input">
                                        <Key className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                                        <input 
                                            type="text" 
                                            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-10 pr-10 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                                            value={editFormData.password || ""}
                                            onChange={(e) => setEditFormData({ ...editFormData, password: e.target.value })}
                                            placeholder="Password"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => openGeneratorModal("modal-edit")}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
                                            title="Generate Password"
                                        >
                                            <Wand2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            )}

                             <div className="space-y-1">
                                <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Notes</label>
                                <textarea
                                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all min-h-[100px]"
                                    placeholder="Secure notes..."
                                    value={editFormData?.notes || ""}
                                    onChange={(e) => setEditFormData({ ...editFormData!, notes: e.target.value })}
                                />
                            </div>
                        </form>
                     ) : (
                        <div className="space-y-4">
                             {renderFormFields(selectedItem, () => {}, false)}
                             
                             {selectedItem.password && (selectedItem.type === "Login" || selectedItem.type === "SSH Keys") && (
                                <div className="space-y-1">
                                    <label className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Password</label>
                                    <div className="flex items-center justify-between p-3 bg-zinc-950 rounded-xl border border-zinc-800 group">
                                        <span className="text-sm font-mono text-zinc-200">
                                            {showPassword ? selectedItem.password : "••••••••••••••••"}
                                        </span>
                                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button onClick={() => setShowPassword(!showPassword)} className="text-zinc-500 hover:text-white">
                                                {showPassword ? <EyeOff className="w-4 h-4"/> : <Eye className="w-4 h-4"/>}
                                            </button>
                                            <button onClick={() => copyToClipboard(selectedItem.password!)} className="text-zinc-500 hover:text-white">
                                                <Copy className="w-4 h-4"/>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                             )}

                             {selectedItem.notes && (
                                <div className="space-y-1">
                                    <label className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Notes</label>
                                    <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800 text-sm text-zinc-300 whitespace-pre-wrap">
                                        {selectedItem.notes}
                                    </div>
                                </div>
                            )}
                        </div>
                     )}
                </div>

                {isEditing && (
                    <div className="p-6 border-t border-zinc-800 flex gap-3 bg-zinc-900 shrink-0">
                         <button
                            onClick={() => setIsEditing(false)}
                            className="flex-1 px-4 py-2.5 text-sm font-medium text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-xl transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            form="edit-form"
                            type="submit"
                            disabled={saving}
                            className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2.5 rounded-xl text-sm font-medium shadow-lg shadow-emerald-900/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {saving ? "Saving..." : <><Save className="w-4 h-4"/> Save Changes</>}
                        </button>
                    </div>
                )}
           </div>
        </div>
      )}
    </div>
  );
}

function getIcon(type: string, className = "w-6 h-6 text-white") {
  switch (type) {
    case "Login": return <Key className={className} />;
    case "Card": return <CreditCard className={className} />;
    case "Identity": return <User className={className} />;
    case "Notes": return <StickyNote className={className} />;
    case "SSH Keys": return <Shield className={className} />;
    default: return <Star className={className} />;
  }
}

function getTypeColor(type: string) {
    switch(type) {
        case "Login": return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
        case "Card": return "bg-purple-500/10 text-purple-400 border-purple-500/20";
        case "Identity": return "bg-blue-500/10 text-blue-400 border-blue-500/20";
        case "Notes": return "bg-amber-500/10 text-amber-400 border-amber-500/20";
        default: return "bg-zinc-500/10 text-zinc-400 border-zinc-500/20";
    }
}
