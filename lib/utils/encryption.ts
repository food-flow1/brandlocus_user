/**
 * Encryption/Decryption Utilities
 * Simple encryption for localStorage data
 */

// Get encryption key from environment or use default (in production, use a strong secret)
const getEncryptionKey = (): string => {
  return process.env.NEXT_PUBLIC_ENCRYPTION_SECRET || 'brandlocus-default-secret-key-change-in-production-2024';
};

/**
 * Simple XOR-based encryption (synchronous)
 * Note: This is basic obfuscation. For production, consider using Web Crypto API with proper key management
 */
const simpleEncrypt = (text: string, key: string): string => {
  let result = '';
  for (let i = 0; i < text.length; i++) {
    result += String.fromCharCode(text.charCodeAt(i) ^ key.charCodeAt(i % key.length));
  }
  return btoa(result); // Base64 encode
};

/**
 * Simple XOR-based decryption (synchronous)
 */
const simpleDecrypt = (encryptedText: string, key: string): string => {
  try {
    const decoded = atob(encryptedText); // Base64 decode
    let result = '';
    for (let i = 0; i < decoded.length; i++) {
      result += String.fromCharCode(decoded.charCodeAt(i) ^ key.charCodeAt(i % key.length));
    }
    return result;
  } catch (error) {
    // If decryption fails, return original (for backward compatibility)
    return encryptedText;
  }
};

/**
 * Encrypt data (synchronous)
 */
export const encrypt = (text: string): string => {
  if (typeof window === 'undefined') return text;
  try {
    const key = getEncryptionKey();
    return simpleEncrypt(text, key);
  } catch (error) {
    console.error('Encryption error:', error);
    return text; // Return original text if encryption fails
  }
};

/**
 * Decrypt data (synchronous)
 */
export const decrypt = (encryptedText: string): string => {
  if (typeof window === 'undefined') return encryptedText;
  try {
    const key = getEncryptionKey();
    return simpleDecrypt(encryptedText, key);
  } catch (error) {
    console.error('Decryption error:', error);
    // Try to return as-is in case it's not encrypted (for backward compatibility)
    return encryptedText;
  }
};
