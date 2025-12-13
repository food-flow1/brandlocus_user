/**
 * Authentication Service
 * Handles all authentication-related API calls
 */

import { api, apiClient } from "../apiClient";
import {
  LoginPayload,
  LoginResponse,
  LoginResponseData,
  RegisterPayload,
  ForgetPasswordPayload,
  ResetPasswordPayload,
  ChangePasswordPayload,
  AIGuidanceRegisterPayload,
  UpdateProfilePayload,
  User,
  ApiResponse,
} from "../types";
import { tokenStorage, userStorage, refreshTokenStorage } from "../auth";

export const authService = {
  /**
   * Login user
   */
  login: async (payload: LoginPayload): Promise<LoginResponse> => {
    const responseData = await api.post<LoginResponseData>("/auth/login", payload);
    
    // Extract token and user data from response
    const token = responseData.jwtToken;
    const refreshToken = responseData.refreshToken;
    const user: User = {
      id: responseData.userId,
      userId: responseData.userId,
      email: responseData.email,
      isActive: responseData.isActive,
      role: responseData.role,
    };
    
    // Store token, refresh token, and user data
    if (token) {
      tokenStorage.setToken(token);
    }
    if (refreshToken) {
      refreshTokenStorage.setRefreshToken(refreshToken);
    }
    if (user) {
      userStorage.setUser(user);
    }
    
    // Return in expected format
    return {
      token,
      user,
    };
  },

  /**
   * Register new user
   */
  register: async (payload: RegisterPayload): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>("/auth/register", payload);
    
    // Store token and user data if returned
    if (response.token) {
      tokenStorage.setToken(response.token);
    }
    if (response.user) {
      userStorage.setUser(response.user);
    }
    
    return response;
  },

  /**
   * Logout user
   */
  logout: async (refreshToken?: string | null): Promise<void> => {
    try {
      if (refreshToken) {
        await api.post(`/auth/logout?refreshToken=${refreshToken}`);
      } else {
        await api.post("/auth/logout");
      }
    } catch (error) {
      // Even if API call fails, clear local storage
      console.error("Logout API error:", error);
    } finally {
      tokenStorage.removeToken();
      userStorage.removeUser();
    }
  },

  /**
   * Get current user
   */
  getCurrentUser: async (): Promise<User> => {
    return await api.get<User>("/auth/me");
  },

  /**
   * Get user profile
   */
  getProfile: async (): Promise<User> => {
    return await api.get<User>("/profile/");
  },

  /**
   * Update user profile (uses proxy to avoid CORS)
   */
  updateProfile: async (payload: UpdateProfilePayload): Promise<User> => {
    const token = tokenStorage.getToken();
    const response = await fetch("/api/proxy/profile/update", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      throw { message: data.message || "Failed to update profile", status: response.status };
    }

    return data.data as User;
  },

  /**
   * Upload profile image
   */
  uploadProfileImage: async (file: File): Promise<{ imageUrl: string }> => {
    const formData = new FormData();
    formData.append('file', file);
    
    // Use apiClient directly for FormData to avoid JSON serialization
    const response = await apiClient.post<ApiResponse<{ imageUrl: string }>>("/auth/upload", formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    // Extract data from response structure: response.data.data
    if (response.data?.data) {
      return response.data.data;
    }
    // Fallback if response structure is different
    return response.data as unknown as { imageUrl: string };
  },

  /**
   * Forgot password
   */
  forgotPassword: async (payload: ForgetPasswordPayload): Promise<{ message: string }> => {
    return await api.post("/token/get", payload);
  },

  /**
   * Verify token
   */
  verifyToken: async (payload: { email: string; token: string; purpose: string }): Promise<{ message: string }> => {
    return await api.post("/token/verify", payload);
  },

  /**
   * Reset password
   */
  resetPassword: async (payload: ResetPasswordPayload): Promise<{ message: string }> => {
    return await api.post("/auth/password-reset", payload);
  },

  /**
   * Confirm Reset password (New Flow)
   */
  confirmResetPassword: async (payload: { email: string; newPassword: string; confirmNewPassword: string }): Promise<{ message: string }> => {
    return await api.post("/password/reset", payload);
  },

  /**
   * Change password
   */
  changePassword: async (payload: ChangePasswordPayload): Promise<{ message: string }> => {
    // Map to the expected API format for /password/change endpoint
    const apiPayload: { oldPassword: string; password: string; newPassword: string } = {
      oldPassword: payload.oldPassword || payload.currentPassword || '',
      password: payload.password || payload.newPassword || '',
      newPassword: payload.newPassword || payload.password || '',
    };
    return await api.post("/password/change", apiPayload);
  },

  /**
   * Refresh token
   */
  refreshToken: async (): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>("/auth/refresh");
    
    if (response.token) {
      tokenStorage.setToken(response.token);
    }
    
    return response;
  },

  /**
   * Register for AI-Powered Business Guidance
   */
  registerAIGuidance: async (payload: AIGuidanceRegisterPayload): Promise<LoginResponse> => {
    const responseData = await api.post<LoginResponseData>("/auth/register", payload);

    // Extract token and user data from response (same structure as login)
    const token = responseData.jwtToken;
    const refreshToken = responseData.refreshToken;
    const user: User = {
      id: responseData.userId,
      userId: responseData.userId,
      email: responseData.email,
      isActive: responseData.isActive,
      role: responseData.role,
    };

    // Store token, refresh token, and user data
    if (token) {
      tokenStorage.setToken(token);
    }
    if (refreshToken) {
      refreshTokenStorage.setRefreshToken(refreshToken);
    }
    if (user) {
      userStorage.setUser(user);
    }

    // Return in expected format
    return {
      token,
      user,
    };
  },
};

