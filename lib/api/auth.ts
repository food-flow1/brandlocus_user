/**
 * Authentication Utilities
 * Handles token storage and retrieval securely with encryption
 */

import { encrypt, decrypt } from '../utils/encryption';

const TOKEN_KEY = "brandlocus_auth_token";
const REFRESH_TOKEN_KEY = "brandlocus_refresh_token";
const USER_KEY = "brandlocus_user";

/**
 * Token Management
 */
export const tokenStorage = {
  /**
   * Get the stored authentication token
   */
  getToken: (): string | null => {
    if (typeof window === "undefined") return null;
    try {
      const encrypted = localStorage.getItem(TOKEN_KEY);
      if (!encrypted) return null;
      return decrypt(encrypted);
    } catch (error) {
      console.error("Error getting token:", error);
      return null;
    }
  },

  /**
   * Store the authentication token
   */
  setToken: (token: string): void => {
    if (typeof window === "undefined") return;
    try {
      const encrypted = encrypt(token);
      localStorage.setItem(TOKEN_KEY, encrypted);
    } catch (error) {
      console.error("Error setting token:", error);
    }
  },

  /**
   * Remove the authentication token
   */
  removeToken: (): void => {
    if (typeof window === "undefined") return;
    try {
      localStorage.removeItem(TOKEN_KEY);
    } catch (error) {
      console.error("Error removing token:", error);
    }
  },

  /**
   * Check if user is authenticated
   */
  isAuthenticated: (): boolean => {
    return !!tokenStorage.getToken();
  },
};

/**
 * Refresh Token Management
 */
export const refreshTokenStorage = {
  /**
   * Get the stored refresh token
   */
  getRefreshToken: (): string | null => {
    if (typeof window === "undefined") return null;
    try {
      const encrypted = localStorage.getItem(REFRESH_TOKEN_KEY);
      if (!encrypted) return null;
      return decrypt(encrypted);
    } catch (error) {
      console.error("Error getting refresh token:", error);
      return null;
    }
  },

  /**
   * Store the refresh token
   */
  setRefreshToken: (token: string): void => {
    if (typeof window === "undefined") return;
    try {
      const encrypted = encrypt(token);
      localStorage.setItem(REFRESH_TOKEN_KEY, encrypted);
    } catch (error) {
      console.error("Error setting refresh token:", error);
    }
  },

  /**
   * Remove the refresh token
   */
  removeRefreshToken: (): void => {
    if (typeof window === "undefined") return;
    try {
      localStorage.removeItem(REFRESH_TOKEN_KEY);
    } catch (error) {
      console.error("Error removing refresh token:", error);
    }
  },
};

/**
 * User Data Management
 */
export const userStorage = {
  /**
   * Get stored user data
   */
  getUser: (): any | null => {
    if (typeof window === "undefined") return null;
    try {
      const encrypted = localStorage.getItem(USER_KEY);
      if (!encrypted) return null;
      const decrypted = decrypt(encrypted);
      return JSON.parse(decrypted);
    } catch (error) {
      console.error("Error getting user:", error);
      return null;
    }
  },

  /**
   * Store user data
   */
  setUser: (user: any): void => {
    if (typeof window === "undefined") return;
    try {
      const userStr = JSON.stringify(user);
      const encrypted = encrypt(userStr);
      localStorage.setItem(USER_KEY, encrypted);
    } catch (error) {
      console.error("Error setting user:", error);
    }
  },

  /**
   * Remove user data
   */
  removeUser: (): void => {
    if (typeof window === "undefined") return;
    try {
      localStorage.removeItem(USER_KEY);
    } catch (error) {
      console.error("Error removing user:", error);
    }
  },
};

/**
 * Clear all authentication data
 */
export const clearAuth = (): void => {
  tokenStorage.removeToken();
  refreshTokenStorage.removeRefreshToken();
  userStorage.removeUser();
};

