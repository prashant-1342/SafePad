import { Search, MoreVertical } from "lucide-react";
import { Item, ViewMode } from "../../app/dashboard/types";
import { getIcon, getTypeColor } from "./utils";

interface VaultContentProps {
  items: Item[];
  viewMode: ViewMode;
  loading: boolean;
  search: string;
  onItemClick: (item: Item) => void;
}

export const VaultContent = ({ items, viewMode, loading, search, onItemClick }: VaultContentProps) => {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-zinc-500">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500 mb-4"></div>
        <p>Loading your secure vault...</p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center">
        <div className="w-20 h-20 bg-zinc-900 rounded-full flex items-center justify-center mb-6 ring-1 ring-zinc-800">
          <Search className="w-10 h-10 text-zinc-600" />
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">No items found</h3>
        <p className="text-zinc-500 max-w-sm">
          {search ? "Try adjusting your search terms" : "Your vault is empty. Create your first secure item now."}
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map((item, idx) => (
            <div 
              key={idx}
              onClick={() => onItemClick(item)}
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
              {items.map((item, idx) => (
                <tr 
                  key={idx} 
                  onClick={() => onItemClick(item)}
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
  );
};
