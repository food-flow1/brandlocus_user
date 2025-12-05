/**
 * Authentication Hooks
 * React Query hooks for authentication operations
 */

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authService } from "../services/authService";
import {
  LoginPayload,
  RegisterPayload,
  ForgetPasswordPayload,
  ResetPasswordPayload,
  ChangePasswordPayload,
  AIGuidanceRegisterPayload,
  UpdateProfilePayload,
  LoginResponse,
  User,
} from "../types";
import { tokenStorage, userStorage, refreshTokenStorage } from "../auth";

// Query Keys
export const authKeys = {
  all: ["auth"] as const,
  me: () => [...authKeys.all, "me"] as const,
};

/**
 * Hook for user login
 */
export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: LoginPayload) => authService.login(payload),
    onSuccess: (data) => {
      // Invalidate and refetch user data
      queryClient.invalidateQueries({ queryKey: authKeys.me() });
      // Set user data in cache
      if (data.user) {
        queryClient.setQueryData(authKeys.me(), data.user);
      }
    },
    onError: (error) => {
      console.error("Login error:", error);
    },
  });
};

/**
 * Hook for user registration
 */
export const useRegister = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: RegisterPayload) => authService.register(payload),
    onSuccess: (data) => {
      // Invalidate and refetch user data
      queryClient.invalidateQueries({ queryKey: authKeys.me() });
      // Set user data in cache
      if (data.user) {
        queryClient.setQueryData(authKeys.me(), data.user);
      }
    },
    onError: (error) => {
      console.error("Registration error:", error);
    },
  });
};

/**
 * Hook for user logout
 */
export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (refreshToken?: string | null) => authService.logout(refreshToken),
    onSuccess: () => {
      // Clear all auth-related queries
      queryClient.removeQueries({ queryKey: authKeys.all });
      // Clear cache
      queryClient.clear();
      // Clear refresh token
      refreshTokenStorage.removeRefreshToken();
    },
    onError: (error) => {
      console.error("Logout error:", error);
      // Even if API call fails, clear local data
      queryClient.removeQueries({ queryKey: authKeys.all });
      queryClient.clear();
      refreshTokenStorage.removeRefreshToken();
    },
  });
};

/**
 * Hook to get current user
 */
export const useCurrentUser = () => {
  return useQuery({
    queryKey: authKeys.me(),
    queryFn: () => authService.getCurrentUser(),
    enabled: tokenStorage.isAuthenticated(), // Only fetch if authenticated
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    retry: 1,
  });
};

/**
 * Hook to get user profile
 */
export const useProfile = () => {
  return useQuery({
    queryKey: [...authKeys.all, "profile"],
    queryFn: () => authService.getProfile(),
    enabled: tokenStorage.isAuthenticated(), // Only fetch if authenticated
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    retry: 1,
  });
};

/**
 * Hook to update user profile
 */
export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateProfilePayload) => authService.updateProfile(payload),
    onSuccess: (data) => {
      // Invalidate and refetch profile data
      queryClient.invalidateQueries({ queryKey: [...authKeys.all, "profile"] });
      // Update cache with new data
      queryClient.setQueryData([...authKeys.all, "profile"], data);
    },
    onError: (error) => {
      console.error("Update profile error:", error);
    },
  });
};

/**
 * Hook for forgot password
 */
export const useForgotPassword = () => {
  return useMutation({
    mutationFn: (payload: ForgetPasswordPayload) =>
      authService.forgotPassword(payload),
    onError: (error) => {
      console.error("Forgot password error:", error);
    },
  });
};

/**
 * Hook for reset password
 */
export const useResetPassword = () => {
  return useMutation({
    mutationFn: (payload: ResetPasswordPayload) =>
      authService.resetPassword(payload),
    onError: (error) => {
      console.error("Reset password error:", error);
    },
  });
};

/**
 * Hook for change password
 */
export const useChangePassword = () => {
  return useMutation({
    mutationFn: (payload: ChangePasswordPayload) =>
      authService.changePassword(payload),
    onError: (error) => {
      console.error("Change password error:", error);
    },
  });
};

/**
 * Hook for refresh token
 */
export const useRefreshToken = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => authService.refreshToken(),
    onSuccess: (data) => {
      // Update user data if returned
      if (data.user) {
        queryClient.setQueryData(authKeys.me(), data.user);
      }
    },
    onError: (error) => {
      console.error("Refresh token error:", error);
    },
  });
};

/**
 * Hook for AI-Powered Business Guidance registration
 */
export const useRegisterAIGuidance = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: AIGuidanceRegisterPayload) => 
      authService.registerAIGuidance(payload),
    onSuccess: (data) => {
      // Invalidate and refetch user data
      queryClient.invalidateQueries({ queryKey: authKeys.me() });
      // Set user data in cache
      if (data.user) {
        queryClient.setQueryData(authKeys.me(), data.user);
      }
    },
    onError: (error) => {
      console.error("AI Guidance registration error:", error);
    },
  });
};

/**
 * Hook to upload profile image
 */
export const useUploadProfileImage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (file: File) => authService.uploadProfileImage(file),
    onSuccess: (data) => {
      // Invalidate and refetch profile data
      queryClient.invalidateQueries({ queryKey: [...authKeys.all, "profile"] });
      // Update cache with new profile image URL
      queryClient.setQueryData([...authKeys.all, "profile"], (old: any) => {
        if (old) {
          return { ...old, profileImageUrl: data.profileImageUrl };
        }
        return old;
      });
    },
    onError: (error) => {
      console.error("Upload profile image error:", error);
    },
  });
};

