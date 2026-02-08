import { X, ChevronRight, Key, Wand2 } from "lucide-react";
import { Item } from "@/app/dashboard/types";
import { renderFormFields } from "../utils";

interface AddItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  newItem: Item;
  setNewItem: (item: Item) => void;
  saving: boolean;
  onAdd: (e: React.FormEvent) => void;
  onOpenGenerator: (context: "modal-new") => void;
}

export const AddItemModal = ({
  isOpen,
  onClose,
  newItem,
  setNewItem,
  saving,
  onAdd,
  onOpenGenerator
}: AddItemModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-zinc-950/80 backdrop-blur-sm flex items-center justify-center z-50 animate-in fade-in duration-200">
      <div className="bg-zinc-900 w-[28rem] rounded-2xl border border-zinc-800 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
        <div className="bg-zinc-900 border-b border-zinc-800 p-6 flex justify-between items-center shrink-0">
            <div>
                <h3 className="text-lg font-semibold text-white">Add New Item</h3>
                <p className="text-sm text-zinc-500 mt-1">Store your secure information safely.</p>
            </div>
            <button onClick={onClose} className="text-zinc-500 hover:text-white transition-colors">
                <X className="w-5 h-5"/>
            </button>
        </div>
        
        <form onSubmit={onAdd} className="p-6 space-y-5 overflow-y-auto custom-scrollbar">
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
                    placeholder=""
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-10 pr-10 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
                    value={newItem.password}
                    onChange={(e) => setNewItem({ ...newItem, password: e.target.value })}
                    />
                     <button
                        type="button"
                        onClick={() => onOpenGenerator("modal-new")}
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
              onClick={onClose}
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
  );
};
