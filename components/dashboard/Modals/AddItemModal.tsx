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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
      <div className="w-full max-w-xl rounded-2xl bg-zinc-900 border border-zinc-800 flex flex-col max-h-[90vh]">

        <div className="flex items-center justify-between px-6 py-5 border-b border-zinc-800">
          <div>
            <h2 className="text-lg font-semibold text-white">
              Add item
            </h2>
            <p className="text-sm text-zinc-500 mt-1">
              Stored securely in your vault
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form
          onSubmit={onAdd}
          className="flex-1 overflow-y-auto px-6 py-6 space-y-6"
        >
          <div className="space-y-1.5">
            <label className="text-xs text-zinc-400">
              Type
            </label>
            <div className="relative">
              <select
                value={newItem.type}
                onChange={(e) =>
                  setNewItem({ ...newItem, type: e.target.value })
                }
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-emerald-500 appearance-none"
              >
                <option value="Login">Login</option>
                <option value="Card">Card</option>
                <option value="Identity">Identity</option>
                <option value="Notes">Notes</option>
                <option value="SSH Keys">SSH Keys</option>
              </select>
              <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 rotate-90 pointer-events-none" />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs text-zinc-400">
              Name
            </label>
            <input
              type="text"
              placeholder="Google, GitHub, My Visa Card"
              value={newItem.name}
              onChange={(e) =>
                setNewItem({ ...newItem, name: e.target.value })
              }
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>

          {renderFormFields(newItem, setNewItem, true)}

          {(newItem.type === "Login" || newItem.type === "SSH Keys") && (
            <div className="space-y-1.5">
              <label className="text-xs text-zinc-400">
                Password / Key
              </label>
              <div className="relative">
                <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <input
                  type="password"
                  value={newItem.password}
                  onChange={(e) =>
                    setNewItem({ ...newItem, password: e.target.value })
                  }
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg pl-10 pr-10 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
                <button
                  type="button"
                  onClick={() => onOpenGenerator("modal-new")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-800 transition"
                >
                  <Wand2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-xs text-zinc-400">
              Notes
            </label>
            <textarea
              value={newItem.notes}
              onChange={(e) =>
                setNewItem({ ...newItem, notes: e.target.value })
              }
              placeholder="Extra details or reminders"
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-emerald-500 min-h-[100px]"
            />
          </div>
        </form>

        <div className="flex gap-3 px-6 py-4 border-t border-zinc-800">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2.5 rounded-lg text-sm text-zinc-400 hover:text-white hover:bg-zinc-800 transition"
          >
            Cancel
          </button>
          <button
            onClick={onAdd}
            disabled={saving}
            className="flex-1 py-2.5 rounded-lg text-sm text-white bg-emerald-600 hover:bg-emerald-500 transition disabled:opacity-50"
          >
            {saving ? "Saving…" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};
