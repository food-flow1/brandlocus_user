/**
 * API Client
 * Centralized HTTP client with interceptors, error handling, and authentication
 */

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import toast from "react-hot-toast";
import { tokenStorage, clearAuth } from "./auth";
import { ApiResponse, ApiError } from "./types";
import { ROUTES } from "@/constants/routes";

// Get base URL from environment variables
const getBaseURL = (): string => {
  const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!baseURL) {
    throw new Error("NEXT_PUBLIC_API_BASE_URL is not defined in environment variables");
  }
  return baseURL;
};

// Track if we're already handling a 401 to prevent multiple redirects/toasts
let isHandling401 = false;

/**
 * Extract error message from API response
 */
const extractErrorMessage = (data: any): string => {
  if (!data) return "An error occurred";

  // Check for message field
  if (data.message && typeof data.message === "string") {
    return data.message;
  }

  // Check for error field (could be string or array)
  if (data.error) {
    if (typeof data.error === "string") return data.error;
    if (Array.isArray(data.error)) return data.error[0] || "An error occurred";
  }

  // Check for errors object (validation errors)
  if (data.errors && typeof data.errors === "object") {
    const firstErrorKey = Object.keys(data.errors)[0];
    if (firstErrorKey && Array.isArray(data.errors[firstErrorKey])) {
      return data.errors[firstErrorKey][0];
    }
  }

  return "An error occurred";
};

/**
 * Create axios instance with default configuration
 */
const createApiClient = (): AxiosInstance => {
  const client = axios.create({
    baseURL: getBaseURL(),
    timeout: 30000, // 30 seconds
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  // Request Interceptor - Add auth token to requests
  client.interceptors.request.use(
    (config) => {
      const token = tokenStorage.getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Response Interceptor - Handle errors globally
  client.interceptors.response.use(
    (response: AxiosResponse<ApiResponse>) => {
      return response;
    },
    (error: AxiosError<ApiResponse | ApiError>) => {
      // Handle network errors
      if (!error.response) {
        const networkError: ApiError = {
          message: "Network error. Please check your internet connection.",
          status: 0,
        };
        toast.error(networkError.message);
        return Promise.reject(networkError);
      }

      const { status, data } = error.response;
      const errorMessage = extractErrorMessage(data);

      // Handle 401 Unauthorized - Clear auth, show toast, and redirect to login
      if (status === 401) {
        if (!isHandling401) {
          isHandling401 = true;
          clearAuth();

          // Show toast notification
          toast.error("Session expired. Please login again.");

          // Redirect to login if we're in the browser
          if (typeof window !== "undefined") {
            // Use setTimeout to allow toast to show before redirect
            setTimeout(() => {
              window.location.href = ROUTES.LOGIN;
              isHandling401 = false;
            }, 500);
          } else {
            isHandling401 = false;
          }
        }

        const authError: ApiError = {
          message: "Session expired. Please login again.",
          status: 401,
        };
        return Promise.reject(authError);
      }

      // Handle 403 Forbidden
      if (status === 403) {
        const forbiddenError: ApiError = {
          message: errorMessage || "You don't have permission to access this resource.",
          status: 403,
        };
        toast.error(forbiddenError.message);
        return Promise.reject(forbiddenError);
      }

      // Handle 404 Not Found
      if (status === 404) {
        const notFoundError: ApiError = {
          message: errorMessage || "The requested resource was not found.",
          status: 404,
        };
        toast.error(notFoundError.message);
        return Promise.reject(notFoundError);
      }

      // Handle 400 Bad Request
      if (status === 400) {
        const badRequestError: ApiError = {
          message: errorMessage || "Invalid request. Please check your input.",
          status: 400,
          errors: (data as any)?.errors,
        };
        toast.error(badRequestError.message);
        return Promise.reject(badRequestError);
      }

      // Handle 409 Conflict
      if (status === 409) {
        const conflictError: ApiError = {
          message: errorMessage || "A conflict occurred. The resource may already exist.",
          status: 409,
        };
        toast.error(conflictError.message);
        return Promise.reject(conflictError);
      }

      // Handle validation errors (422)
      if (status === 422) {
        const validationError: ApiError = {
          message: errorMessage || "Validation error. Please check your input.",
          status: 422,
          errors: (data as any)?.errors,
        };
        toast.error(validationError.message);
        return Promise.reject(validationError);
      }

      // Handle 429 Too Many Requests
      if (status === 429) {
        const rateLimitError: ApiError = {
          message: errorMessage || "Too many requests. Please try again later.",
          status: 429,
        };
        toast.error(rateLimitError.message);
        return Promise.reject(rateLimitError);
      }

      // Handle 500+ Server Errors
      if (status >= 500) {
        const serverError: ApiError = {
          message: "Server error. Please try again later.",
          status,
        };
        toast.error(serverError.message);
        return Promise.reject(serverError);
      }

      // Handle other errors
      const apiError: ApiError = {
        message: errorMessage,
        status,
        errors: (data as any)?.errors,
      };
      toast.error(apiError.message);

      return Promise.reject(apiError);
    }
  );

  return client;
};

// Export the configured client
export const apiClient = createApiClient();

/**
 * API Request Helper Functions
 */
export const api = {
  /**
   * GET request
   */
  get: async <T = any>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    const response = await apiClient.get<ApiResponse<T>>(url, config);
    return response.data.data as T;
  },

  /**
   * POST request
   */
  post: async <T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    const response = await apiClient.post<ApiResponse<T>>(url, data, config);
    return response.data.data as T;
  },

  /**
   * PUT request
   */
  put: async <T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    const response = await apiClient.put<ApiResponse<T>>(url, data, config);
    return response.data.data as T;
  },

  /**
   * PATCH request
   */
  patch: async <T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    const response = await apiClient.patch<ApiResponse<T>>(url, data, config);
    return response.data.data as T;
  },

  /**
   * DELETE request
   */
  delete: async <T = any>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    const response = await apiClient.delete<ApiResponse<T>>(url, config);
    return response.data.data as T;
  },
};

export default apiClient;

