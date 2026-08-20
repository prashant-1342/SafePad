"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface VaultKeyContextType {
  vaultKey: string | null;
  setVaultKey: (key: string | null) => void;
  clearVaultKey: () => void;
}

const VaultKeyContext = createContext<VaultKeyContextType | undefined>(undefined);

// Storing the vault encryption key in React memory state protects against XSS attacks.
// sessionStorage/localStorage are accessible to any script on the page (one-line XSS exfiltration),
// whereas in-memory React state is not persisted anywhere and is unreachable via Storage API calls.
export function VaultKeyProvider({ children }: { children: ReactNode }) {
  const [vaultKey, setVaultKey] = useState<string | null>(null);

  const clearVaultKey = () => {
    setVaultKey(null);
  };

  return (
    <VaultKeyContext.Provider value={{ vaultKey, setVaultKey, clearVaultKey }}>
      {children}
    </VaultKeyContext.Provider>
  );
}

export function useVaultKey(): VaultKeyContextType {
  const context = useContext(VaultKeyContext);
  if (!context) {
    throw new Error("useVaultKey must be used within a VaultKeyProvider");
  }
  return context;
}
