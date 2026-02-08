  import { adjectives, nouns, passphraseWords } from "@/app/lib/words";

  export const generatePassword = (genUseUpper: boolean, genUseNumbers: boolean, genUseSymbols: boolean, genLength: number) => {
      const lower = "abcdefghijklmnopqrstuvwxyz";
      const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      const numbers = "0123456789";
      const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";
      
      let chars = lower;
      if (genUseUpper) chars += upper;
      if (genUseNumbers) chars += numbers;
      if (genUseSymbols) chars += symbols;

      let pass = "";
      for (let i = 0; i < genLength; i++) {
        pass += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return pass;
    };

    export const generatePassphrase = (ppWordCount: number, ppCapitalize: boolean, ppSeparator: string) => {
        let words = [];
        for(let i=0; i<ppWordCount; i++) {
            let word = passphraseWords[Math.floor(Math.random() * passphraseWords.length)];
            if (ppCapitalize) word = word.charAt(0).toUpperCase() + word.slice(1);
            words.push(word);
        }
        return words.join(ppSeparator);
    };

  export const generateUsername = (unIncludeNumber: boolean) => {
        const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
        const noun = nouns[Math.floor(Math.random() * nouns.length)];
        let num = "";
        if (unIncludeNumber) {
            num = Math.floor(Math.random() * 1000).toString();
        }
      return `${adj}${noun}${num}`;
    };