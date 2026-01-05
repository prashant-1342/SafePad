import { 
  User, Key, CreditCard, Calendar, Mail, Phone, MapPin, Globe, CreditCard as CardIcon
} from "lucide-react";

export const LoginForm = ({ data, setData, isEditing }: any) => (
  <>
    <div>
      <label className="block text-xs font-medium text-zinc-400 mb-1.5 ml-1">Username / Email</label>
      <div className="relative group/input">
        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 transition-colors" />
        <input
          type="text"
          placeholder="email@example.com"
          className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all disabled:opacity-50"
          value={data.username || ""}
          onChange={(e) => setData({ ...data, username: e.target.value })}
          disabled={!isEditing}
        />
      </div>
    </div>
    
    
    <div>
      <label className="block text-xs font-medium text-zinc-400 mb-1.5 ml-1">Website URL</label>
      <div className="relative group/input">
          <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 transition-colors" />
          <input
            type="url"
            placeholder="https://example.com"
            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all disabled:opacity-50"
            value={data.url || ""}
            onChange={(e) => setData({ ...data, url: e.target.value })}
            disabled={!isEditing}
          />
       </div>
    </div>
  </>
);

export const CardForm = ({ data, setData, isEditing }: any) => {
    const meta = data.item_metadata || {};
    const updateMeta = (key: string, value: string) => {
        setData({ ...data, item_metadata: { ...meta, [key]: value } });
    };

    return (
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-zinc-400 mb-1.5 ml-1">Cardholder Name</label>
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 disabled:opacity-50"
              placeholder="Name on card"
              value={meta.cardholderName || ""}
              onChange={(e) => updateMeta("cardholderName", e.target.value)}
              disabled={!isEditing}
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-zinc-400 mb-1.5 ml-1">Card Number</label>
          <div className="relative">
            <CardIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 disabled:opacity-50"
              placeholder="0000 0000 0000 0000"
              value={meta.cardNumber || ""}
              onChange={(e) => updateMeta("cardNumber", e.target.value)}
              disabled={!isEditing}
            />
          </div>
        </div>

        <div className="flex gap-4">
            <div className="flex-1">
                <label className="block text-xs font-medium text-zinc-400 mb-1.5 ml-1">Expiry Date</label>
                <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                    <input
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 disabled:opacity-50"
                    placeholder="MM/YY"
                    value={meta.expiry || ""}
                    onChange={(e) => updateMeta("expiry", e.target.value)}
                    disabled={!isEditing}
                    />
                </div>
            </div>
            <div className="w-1/3">
                <label className="block text-xs font-medium text-zinc-400 mb-1.5 ml-1">CVV</label>
                <input
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 disabled:opacity-50 text-center"
                    placeholder="123"
                    value={meta.cvv || ""}
                    onChange={(e) => updateMeta("cvv", e.target.value)}
                    disabled={!isEditing}
                />
            </div>
        </div>
      </div>
    );
};

export const IdentityForm = ({ data, setData, isEditing }: any) => {
    const meta = data.item_metadata || {};
    const updateMeta = (key: string, value: string) => {
        setData({ ...data, item_metadata: { ...meta, [key]: value } });
    };

    return (
        <div className="space-y-4">
             <div className="flex gap-4">
                <div className="w-1/4">
                    <label className="block text-xs font-medium text-zinc-400 mb-1.5 ml-1">Title</label>
                    <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500" />
                        <select
                            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-8 pr-2 py-2.5 text-sm text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 appearance-none disabled:opacity-50"
                            value={meta.title || "Mr."}
                            onChange={(e) => updateMeta("title", e.target.value)}
                            disabled={!isEditing}
                        >
                            <option>Mr.</option>
                            <option>Mrs.</option>
                            <option>Ms.</option>
                            <option>Dr.</option>
                        </select>
                    </div>
                </div>
                <div className="flex-1">
                    <label className="block text-xs font-medium text-zinc-400 mb-1.5 ml-1">First Name</label>
                    <input
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 disabled:opacity-50"
                        placeholder="First Name"
                        value={meta.firstName || ""}
                        onChange={(e) => updateMeta("firstName", e.target.value)}
                        disabled={!isEditing}
                    />
                </div>
                 <div className="flex-1">
                    <label className="block text-xs font-medium text-zinc-400 mb-1.5 ml-1">Last Name</label>
                    <input
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 disabled:opacity-50"
                        placeholder="Last Name"
                        value={meta.lastName || ""}
                        onChange={(e) => updateMeta("lastName", e.target.value)}
                        disabled={!isEditing}
                    />
                </div>
            </div>

            <div className="flex gap-4">
                 <div className="flex-1">
                    <label className="block text-xs font-medium text-zinc-400 mb-1.5 ml-1">Email</label>
                    <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                        <input
                            type="email"
                            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 disabled:opacity-50"
                            placeholder="email@address.com"
                            value={meta.email || ""}
                            onChange={(e) => updateMeta("email", e.target.value)}
                            disabled={!isEditing}
                        />
                    </div>
                </div>
                <div className="flex-1">
                    <label className="block text-xs font-medium text-zinc-400 mb-1.5 ml-1">Phone</label>
                    <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                        <input
                            type="tel"
                            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 disabled:opacity-50"
                            placeholder="+1 (555) 000-0000"
                            value={meta.phone || ""}
                            onChange={(e) => updateMeta("phone", e.target.value)}
                            disabled={!isEditing}
                        />
                    </div>
                </div>
            </div>

            <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1.5 ml-1">Address</label>
                <div className="relative">
                    <MapPin className="absolute left-4 top-3 w-4 h-4 text-zinc-500" />
                    <textarea
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 disabled:opacity-50 min-h-[80px]"
                        placeholder="Full Address..."
                        value={meta.address || ""}
                        onChange={(e) => updateMeta("address", e.target.value)}
                        disabled={!isEditing}
                    />
                </div>
            </div>
            
             <div className="flex gap-4">
                 <div className="flex-1">
                    <label className="block text-xs font-medium text-zinc-400 mb-1.5 ml-1">Country</label>
                     <input
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 disabled:opacity-50"
                        placeholder="Country"
                        value={meta.country || ""}
                        onChange={(e) => updateMeta("country", e.target.value)}
                        disabled={!isEditing}
                    />
                </div>
                <div className="w-1/3">
                    <label className="block text-xs font-medium text-zinc-400 mb-1.5 ml-1">Zip Code</label>
                     <input
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 disabled:opacity-50"
                        placeholder="Zip"
                        value={meta.zip || ""}
                        onChange={(e) => updateMeta("zip", e.target.value)}
                        disabled={!isEditing}
                    />
                </div>
             </div>
        </div>
    );
};
