import { Wand2 } from "lucide-react";
import { GeneratorContent } from "./GeneratorContent";
import { GenTab } from "../../app/dashboard/types";

interface GeneratorViewProps {
  genTab: GenTab;
  setGenTab: (tab: GenTab) => void;
  genLength: number;
  setGenLength: (len: number) => void;
  genUseUpper: boolean;
  setGenUseUpper: (val: boolean) => void;
  genUseNumbers: boolean;
  setGenUseNumbers: (val: boolean) => void;
  genUseSymbols: boolean;
  setGenUseSymbols: (val: boolean) => void;
  ppWordCount: number;
  setPpWordCount: (val: number) => void;
  ppSeparator: string;
  setPpSeparator: (val: string) => void;
  ppCapitalize: boolean;
  setPpCapitalize: (val: boolean) => void;
  unIncludeNumber: boolean;
  setUnIncludeNumber: (val: boolean) => void;
  generatedResult: string;
  runGenerator: () => void;
  copyToClipboard: (text: string) => void;
}

export const GeneratorView = (props: GeneratorViewProps) => {
  return (
    <div className="flex-1 flex flex-col h-full bg-black">
      <header className="h-20 px-8 flex items-center justify-between border-b border-zinc-900 bg-black/80 backdrop-blur-sm z-20">
        <h2 className="text-xl font-semibold text-white tracking-tight flex items-center gap-3">
          <Wand2 className="w-5 h-5 text-emerald-500" />
          Generator Suite
        </h2>
      </header>
      <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
        <GeneratorContent {...props} isModal={false} />
      </div>
    </div>
  );
};
