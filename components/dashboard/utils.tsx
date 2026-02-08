import { Key, CreditCard, User, StickyNote, Shield, Star } from "lucide-react";

import { LoginForm, CardForm, IdentityForm } from "@/components/forms/ItemForms";

export function getIcon(type: string, className = "w-6 h-6 text-white") {
  switch (type) {
    case "Login": return <Key className={className} />;
    case "Card": return <CreditCard className={className} />;
    case "Identity": return <User className={className} />;
    case "Notes": return <StickyNote className={className} />;
    case "SSH Keys": return <Shield className={className} />;
    default: return <Star className={className} />;
  }
}

export function getTypeColor(type: string) {
    switch(type) {
        case "Login": return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
        case "Card": return "bg-purple-500/10 text-purple-400 border-purple-500/20";
        case "Identity": return "bg-blue-500/10 text-blue-400 border-blue-500/20";
        case "Notes": return "bg-amber-500/10 text-amber-400 border-amber-500/20";
        default: return "bg-zinc-500/10 text-zinc-400 border-zinc-500/20";
    }
}

export const getPasswordStyle = (len: number) => {
  if (len <= 16) return "text-4xl tracking-widest";
  if (len <= 24) return "text-3xl tracking-wider";
  if (len <= 32) return "text-2xl tracking-wide";
  if (len <= 48) return "text-xl tracking-normal";
  return "text-lg tracking-tight";
};

export const renderFormFields = (itemData: any, setItemData: any, isEditMode: boolean) => {
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
