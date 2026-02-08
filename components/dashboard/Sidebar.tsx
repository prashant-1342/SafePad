import { Shield, LayoutGrid, Key, CreditCard, User, StickyNote, Wand2, LogOut } from "lucide-react";

interface SidebarProps {
  activeView: "vault" | "generator";
  filter: string;
  userEmail: string;
  onViewChange: (view: "vault" | "generator", filterName?: string) => void;
  onLogout: () => void;
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar = ({ activeView, filter, userEmail, onViewChange, onLogout, isOpen, onClose }: SidebarProps) => {
  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-zinc-950/80 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      <aside className={`
        fixed inset-y-0 left-0 w-72 bg-zinc-950 border-r border-zinc-900 p-6 flex flex-col z-50 transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:static lg:block
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}>
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-emerald-900/10 to-transparent pointer-events-none" />
      
      <div className="flex items-center gap-3 mb-10 z-10 transition-all hover:scale-105 cursor-pointer" onClick={() => onViewChange("vault", "All items")}>
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
                  onClick={() => onViewChange("vault", "All items")}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-all duration-200 group ${
                      activeView === "vault" && filter === "All items" ? "bg-zinc-900 text-white shadow-sm ring-1 ring-zinc-800" : "text-zinc-400 hover:bg-zinc-900/50 hover:text-zinc-200"
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
                          onClick={() => onViewChange("vault", category.name)}
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
                  onClick={() => onViewChange("generator")}
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
          onClick={onLogout} 
          className="w-full flex items-center gap-2 px-3 py-2 text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </aside>
    </>
  );
};
