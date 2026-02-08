export interface Item {
  id: number;
  name: string;
  username?: string;
  password?: string;
  url?: string;
  type: string;
  notes?: string;
  item_metadata?: any;
}

export type ViewMode = "grid" | "list";
export type ActiveView = "vault" | "generator";
export type GenContext = "modal-new" | "modal-edit" | "standalone";
export type GenTab = "password" | "passphrase" | "username";

export interface GeneratorState {
  tab: GenTab;
  length: number;
  useUpper: boolean;
  useNumbers: boolean;
  useSymbols: boolean;
  wordCount: number;
  separator: string;
  capitalize: boolean;
  includeNumber: boolean;
  result: string;
}
