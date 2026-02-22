import { argon2id } from 'hash-wasm';

export async function deriveKey(password: string, salt: string): Promise<string> {
  try {
    const result = await argon2id({
      password: password,
      salt: salt,
      parallelism: 1,
      iterations: 3,
      memorySize: 65536, 
      hashLength: 32,
      outputType: 'hex',
    }); 
    return result;
  } catch (error) {
    console.error('Key derivation failed:', error);
    throw new Error('Could not secure your vault. Please try again.');
  }
}

export async function deriveAuthHash(password: string, email: string): Promise<string> {

  return deriveKey(password, `${email.toLowerCase()}_safepad_auth_v1`);
}

export async function deriveEncryptionKey(password: string, email: string): Promise<string> {
  return deriveKey(password, `${email.toLowerCase()}_safepad_enc_v1`);
}
