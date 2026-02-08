import { Check, RefreshCw, Copy } from "lucide-react";
import { GenTab, ViewMode } from "../../app/dashboard/types";
import { getPasswordStyle } from "./utils";

interface GeneratorContentProps {
  isModal?: boolean;
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
  useGeneratedResult?: () => void;
}

export const GeneratorContent = ({
  isModal = false,
  genTab,
  setGenTab,
  genLength,
  setGenLength,
  genUseUpper,
  setGenUseUpper,
  genUseNumbers,
  setGenUseNumbers,
  genUseSymbols,
  setGenUseSymbols,
  ppWordCount,
  setPpWordCount,
  ppSeparator,
  setPpSeparator,
  ppCapitalize,
  setPpCapitalize,
  unIncludeNumber,
  setUnIncludeNumber,
  generatedResult,
  runGenerator,
  copyToClipboard,
  useGeneratedResult
}: GeneratorContentProps) => {
  return (
    <div
      className={`w-full ${
        isModal
          ? "flex flex-col gap-10"
          : "h-full flex flex-col lg:flex-row gap-12"
      }`}
    >
      <div
        className={`${
          isModal
            ? "w-full"
            : "w-full lg:w-[40%] flex flex-col gap-8"
        }`}
      >
        <div
          className={`${
            isModal
              ? "flex border-b border-zinc-800"
              : "bg-zinc-900/40 flex p-1 rounded-2xl border border-zinc-800"
          }`}
        >
          {(["password", "passphrase", "username"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setGenTab(tab)}
              className={`flex-1 py-2.5 text-sm font-medium rounded-xl capitalize transition-all ${
                genTab === tab
                  ? "bg-zinc-800 text-emerald-400 shadow"
                  : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div
          className={`space-y-8 ${
            isModal
              ? ""
              : "bg-zinc-900/30 p-8 rounded-3xl border border-zinc-800"
          }`}
        >
          {genTab === "password" && (
            <div className="space-y-8">
              <div>
                <div className="flex justify-between text-xs text-zinc-400 mb-2">
                  <span>Length</span>
                  <span className="font-mono text-emerald-400">{genLength}</span>
                </div>
                <input
                  type="range"
                  min={8}
                  max={64}
                  value={genLength}
                  onChange={(e) => setGenLength(parseInt(e.target.value))}
                  className="w-full accent-emerald-500"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: "ABC", value: genUseUpper, set: setGenUseUpper, text: "Uppercase" },
                  { label: "123", value: genUseNumbers, set: setGenUseNumbers, text: "Numbers" },
                  { label: "#$%", value: genUseSymbols, set: setGenUseSymbols, text: "Symbols" },
                ].map((opt) => (
                  <button
                    key={opt.text}
                    onClick={() => opt.set(!opt.value)}
                    className={`rounded-2xl p-4 border transition-all ${
                      opt.value
                        ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-400"
                        : "bg-zinc-950 border-zinc-800 text-zinc-500 hover:bg-zinc-900"
                    }`}
                  >
                    <div className="text-lg font-bold">{opt.label}</div>
                    <div className="text-[10px] uppercase tracking-wider opacity-70">
                      {opt.text}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {genTab === "passphrase" && (
            <div className="space-y-8">
              <div>
                <div className="flex justify-between text-xs text-zinc-400 mb-2">
                  <span>Words</span>
                  <span className="font-mono text-emerald-400">{ppWordCount}</span>
                </div>
                <input
                  type="range"
                  min={3}
                  max={8}
                  value={ppWordCount}
                  onChange={(e) => setPpWordCount(parseInt(e.target.value))}
                  className="w-full accent-emerald-500"
                />
              </div>

              <div className="flex gap-2">
                {["-", "_", ".", " "].map((sep) => (
                  <button
                    key={sep}
                    onClick={() => setPpSeparator(sep)}
                    className={`flex-1 py-2 rounded-xl text-sm font-medium transition ${
                      ppSeparator === sep
                        ? "bg-zinc-800 text-white"
                        : "text-zinc-500 hover:bg-zinc-900"
                    }`}
                  >
                    {sep === " " ? "Space" : sep}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setPpCapitalize(!ppCapitalize)}
                className={`flex items-center justify-between p-4 rounded-2xl border transition ${
                  ppCapitalize
                    ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-400"
                    : "bg-zinc-950 border-zinc-800 text-zinc-500"
                }`}
              >
                Capitalize words
                {ppCapitalize && <Check className="w-4 h-4" />}
              </button>
            </div>
          )}

          {genTab === "username" && (
            <button
              onClick={() => setUnIncludeNumber(!unIncludeNumber)}
              className={`flex items-center justify-between p-5 rounded-2xl border transition ${
                unIncludeNumber
                  ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-400"
                  : "bg-zinc-950 border-zinc-800 text-zinc-500"
              }`}
            >
              Include number suffix
              {unIncludeNumber && <Check className="w-4 h-4" />}
            </button>
          )}
        </div>
      </div>

      <div className={`${isModal ? "w-full" : "w-full lg:w-[60%]"} flex flex-col`}>
        <div className="flex-1 bg-zinc-950 rounded-3xl border border-zinc-800 flex flex-col items-center justify-center p-10 text-center">
          <div
            className={`
              ${getPasswordStyle(generatedResult.length)}
              font-mono
              font-bold
              text-transparent
              bg-gradient-to-r
              from-white
              to-zinc-400
              bg-clip-text
              text-center
              w-full
              overflow-hidden
              break-all
              leading-tight
              transition-all
              duration-200
            `}
          >
            {generatedResult}
          </div>

          <div className="flex gap-4 mt-10">
            <button
              onClick={runGenerator}
              className="px-4 py-2 rounded-xl text-sm text-zinc-400 hover:text-white hover:bg-zinc-800 transition"
            >
              Regenerate
            </button>
            <button
              onClick={() => copyToClipboard(generatedResult)}
              className="px-4 py-2 rounded-xl text-sm text-zinc-400 hover:text-white hover:bg-zinc-800 transition"
            >
              Copy
            </button>
          </div>
        </div>

        {isModal && useGeneratedResult && (
          <button
            onClick={useGeneratedResult}
            className="mt-6 bg-emerald-600 hover:bg-emerald-500 text-white py-3 rounded-xl text-sm font-medium transition"
          >
            Use {genTab === "username" ? "Username" : "Password"}
          </button>
        )}
      </div>
    </div>
  );
};
