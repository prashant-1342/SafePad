import { X, Wand2 } from "lucide-react";
import { GenTab } from "../../../app/dashboard/types";
import { GeneratorContent } from "../GeneratorContent";

interface GeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
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
  useGeneratedResult: () => void;
}

export const GeneratorModal = (props: GeneratorModalProps) => {
  if (!props.isOpen) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-zinc-950/80 backdrop-blur-sm animate-in fade-in duration-200 p-4">
      <div className="w-full max-w-3xl rounded-2xl border border-zinc-800 bg-zinc-900 shadow-2xl animate-in zoom-in-95 duration-200">
        
        <div className="flex items-center justify-between px-6 lg:px-8 py-4 lg:py-5 border-b border-zinc-800">
          <h3 className="flex items-center gap-2 text-lg font-semibold text-white">
            <Wand2 className="h-5 w-5 text-emerald-400" />
            Password Generator
          </h3>
          <button
            onClick={props.onClose}
            className="p-2 text-zinc-500 hover:text-white hover:bg-zinc-800 rounded-lg transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="px-6 lg:px-10 py-6 lg:py-10">
          <GeneratorContent {...props} isModal={true} />
        </div>
      </div>
    </div>
  );
};
