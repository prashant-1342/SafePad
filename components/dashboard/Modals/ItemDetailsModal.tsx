import { X, Pencil, Key, Wand2, Eye, EyeOff, Copy, Save } from "lucide-react";
import { Item } from "@/app/dashboard/types";
import { getIcon, renderFormFields } from "../utils";

interface ItemDetailsModalProps {
  selectedItem: Item | null;
  onClose: () => void;
  isEditing: boolean;
  setIsEditing: (val: boolean) => void;
  editFormData: Item | null;
  setEditFormData: (item: Item) => void;
  showPassword: boolean;
  setShowPassword: (val: boolean) => void;
  saving: boolean;
  onUpdate: (e: React.FormEvent) => void;
  onOpenGenerator: (context: "modal-edit") => void;
  copyToClipboard: (text: string) => void;
}

export const ItemDetailsModal = ({
  selectedItem,
  onClose,
  isEditing,
  setIsEditing,
  editFormData,
  setEditFormData,
  showPassword,
  setShowPassword,
  saving,
  onUpdate,
  onOpenGenerator,
  copyToClipboard
}: ItemDetailsModalProps) => {
  if (!selectedItem) return null;

  return (
    <div className="fixed inset-0 bg-zinc-950/80 backdrop-blur-sm flex items-center justify-center z-50 animate-in fade-in duration-200">
       <div className="bg-zinc-900 w-[32rem] rounded-2xl border border-zinc-800 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
            <div className="bg-zinc-900 border-b border-zinc-800 p-6 flex justify-between items-center shrink-0">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center shadow-inner">
                        {getIcon(selectedItem.type, "w-5 h-5 text-zinc-200")}
                    </div>
                    <div>
                         {isEditing && editFormData ? (
                            <input 
                                className="bg-transparent border-b border-emerald-500 text-lg font-semibold text-white focus:outline-none w-full"
                                value={editFormData.name}
                                onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
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
                    <button onClick={onClose} className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors">
                        <X className="w-5 h-5"/>
                    </button>
                </div>
            </div>

            <div className="p-6 space-y-5 overflow-y-auto custom-scrollbar">
                 {isEditing && editFormData ? (
                    <form id="edit-form" onSubmit={onUpdate} className="space-y-5">
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
                                        onClick={() => onOpenGenerator("modal-edit")}
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
                                value={editFormData.notes || ""}
                                onChange={(e) => setEditFormData({ ...editFormData, notes: e.target.value })}
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
  );
};
