"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { encrypt, decrypt } from "@/app/lib/crypto-client";
import { generatePassword, generatePassphrase, generateUsername } from "@/app/lib/generator";

import { Sidebar } from "@/components/dashboard/Sidebar";
import { VaultHeader } from "@/components/dashboard/VaultHeader";
import { VaultContent } from "@/components/dashboard/VaultContent";
import { GeneratorView } from "@/components/dashboard/GeneratorView";
import { AddItemModal } from "@/components/dashboard/Modals/AddItemModal";
import { ItemDetailsModal } from "@/components/dashboard/Modals/ItemDetailsModal";
import { GeneratorModal } from "@/components/dashboard/Modals/GeneratorModal";

import { Item, ViewMode, ActiveView, GenTab } from "./types";

export default function Dashboard() {
  const router = useRouter();
  
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState("");
  const [masterPassword, setMasterPassword] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All items"); 
  const [activeView, setActiveView] = useState<ActiveView>("vault"); 
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  
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
  const [genTab, setGenTab] = useState<GenTab>("password");
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

  const useGeneratedResult = () => {
    if (genContext === "modal-new") {
        setNewItem({ ...newItem, password: generatedResult });
    } else if (genContext === "modal-edit" && editFormData) {
        setEditFormData({ ...editFormData, password: generatedResult });
    } else {
        copyToClipboard(generatedResult);
        alert("Copied to clipboard!");
    }
    setIsGeneratorOpen(false);
  };

  const openGeneratorModal = (context: "modal-new" | "modal-edit") => {
      setGenContext(context);
      setGenTab("password"); 
      setIsGeneratorOpen(true);
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

  const handleViewChange = (view: ActiveView, filterName: string = "All items") => {
      setActiveView(view);
      setFilter(filterName);
      if (view === "generator") setGenContext("standalone");
  };

  const generatorProps = {
    genTab, setGenTab, genLength, setGenLength, genUseUpper, setGenUseUpper,
    genUseNumbers, setGenUseNumbers, genUseSymbols, setGenUseSymbols, 
    ppWordCount, setPpWordCount, ppSeparator, setPpSeparator, ppCapitalize, setPpCapitalize,
    unIncludeNumber, setUnIncludeNumber, generatedResult, runGenerator, copyToClipboard
  };

  return (
    <div className="flex h-screen bg-black text-zinc-100 selection:bg-emerald-500/30">
      <Sidebar 
        activeView={activeView}
        filter={filter}
        userEmail={userEmail}
        onViewChange={handleViewChange}
        onLogout={handleLogout}
      />

      <main className="flex-1 overflow-hidden flex flex-col relative bg-black">
        {activeView === "vault" ? (
            <>
                <VaultHeader 
                    filter={filter}
                    itemCount={filteredItems.length}
                    search={search}
                    onSearchChange={setSearch}
                    viewMode={viewMode}
                    onViewModeChange={setViewMode}
                    onAddItemClick={() => setIsModalOpen(true)}
                />
                <VaultContent 
                    items={filteredItems}
                    viewMode={viewMode}
                    loading={loading}
                    search={search}
                    onItemClick={handleItemClick}
                />
            </>
        ) : (
            <GeneratorView {...generatorProps} />
        )}
      </main>

      <AddItemModal 
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          newItem={newItem}
          setNewItem={setNewItem}
          saving={saving}
          onAdd={handleAddItem}
          onOpenGenerator={openGeneratorModal}
      />

      <ItemDetailsModal 
          selectedItem={selectedItem}
          onClose={() => setSelectedItem(null)}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          editFormData={editFormData}
          setEditFormData={setEditFormData}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          saving={saving}
          onUpdate={handleUpdateItem}
          onOpenGenerator={openGeneratorModal}
          copyToClipboard={copyToClipboard}
      />

      <GeneratorModal 
          {...generatorProps}
          isOpen={isGeneratorOpen && genContext !== "standalone"}
          onClose={() => setIsGeneratorOpen(false)}
          useGeneratedResult={useGeneratedResult}
      />
    </div>
  );
}
