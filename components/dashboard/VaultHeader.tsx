import { Search, LayoutGrid, List, Plus, Menu } from "lucide-react";
import { ViewMode } from "../../app/dashboard/types";

interface VaultHeaderProps {
  filter: string;
  itemCount: number;
  search: string;
  onSearchChange: (value: string) => void;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  onAddItemClick: () => void;
  onMenuClick: () => void;
}

export const VaultHeader = ({
  filter,
  itemCount,
  search,
  onSearchChange,
  viewMode,
  onViewModeChange,
  onAddItemClick,
  onMenuClick
}: VaultHeaderProps) => {
  return (
    <header className="h-16 lg:h-20 px-4 lg:px-8 flex items-center justify-between border-b border-zinc-900 bg-black/80 backdrop-blur-sm z-20 sticky top-0">
      <div className="flex items-center gap-3 lg:gap-4">
        <button 
          onClick={onMenuClick}
          className="p-2 -ml-2 text-zinc-400 hover:text-white lg:hidden"
        >
          <Menu className="w-6 h-6" />
        </button>
        <h2 className="text-lg lg:text-xl font-semibold text-white tracking-tight truncate max-w-[120px] lg:max-w-none">{filter}</h2>
        <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full bg-zinc-900 border border-zinc-800 text-[10px] lg:text-xs text-zinc-400 font-medium whitespace-nowrap">
          {itemCount} items
        </span>
      </div>

      <div className="flex items-center gap-2 lg:gap-4 flex-1 justify-end lg:flex-none">
        <div className="relative group flex-1 max-w-[200px] lg:max-w-[256px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within:text-emerald-500 transition-colors" />
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-9 lg:pl-10 pr-4 py-2 bg-zinc-900/50 border border-zinc-800 rounded-xl text-xs lg:text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500/30 transition-all"
          />
        </div>
        
        <div className="hidden sm:flex bg-zinc-900/50 rounded-lg p-1 border border-zinc-800">
          <button 
            onClick={() => onViewModeChange("grid")}
            className={`p-1.5 lg:p-2 rounded-md transition-all ${viewMode === "grid" ? "bg-zinc-800 text-white shadow-sm" : "text-zinc-500 hover:text-zinc-300"}`}
          >
            <LayoutGrid className="w-3.5 h-3.5 lg:w-4 h-4" />
          </button>
          <button 
            onClick={() => onViewModeChange("list")}
            className={`p-1.5 lg:p-2 rounded-md transition-all ${viewMode === "list" ? "bg-zinc-800 text-white shadow-sm" : "text-zinc-500 hover:text-zinc-300"}`}
          >
            <List className="w-3.5 h-3.5 lg:w-4 h-4" />
          </button>
        </div>

        <button
          onClick={onAddItemClick}
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white p-2 lg:px-5 lg:py-2 rounded-xl text-sm font-medium shadow-lg shadow-emerald-900/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <Plus className="w-5 h-5 lg:w-4 lg:h-4" />
          <span className="hidden lg:inline">New Item</span>
        </button>
      </div>
    </header>
  );
};
