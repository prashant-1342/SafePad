import CryptoJS from 'crypto-js';

export const encrypt = (text: string, secret: string): string => {
  if (!text || !secret) return text || "";
  try {
    return CryptoJS.AES.encrypt(text, secret).toString();
  } catch (error) {
    console.error("Encryption failed:", error);
    return text;
  }
};

export const decrypt = (ciphertext: string, secret: string): string => {
  if (!ciphertext || !secret) return ciphertext || "";
  try {
    const bytes = CryptoJS.AES.decrypt(ciphertext, secret);
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
  
    if (!originalText && ciphertext.length > 0) return ciphertext; 
    return originalText;
  } catch (error) {
    console.error("Decryption failed:", error);
    return ciphertext;
  }
};
