/**
 * Generic API Mutation Hook
 * Utility hook for creating custom mutation hooks easily
 */

import { useMutation, UseMutationOptions, useQueryClient } from "@tanstack/react-query";
import { api } from "../apiClient";

interface UseApiMutationOptions<TData, TVariables> 
  extends Omit<UseMutationOptions<TData, Error, TVariables>, "mutationFn"> {
  endpoint: string;
  method?: "POST" | "PUT" | "PATCH" | "DELETE";
  invalidateQueries?: string[][];
}

/**
 * Generic hook for POST/PUT/PATCH/DELETE requests
 * 
 * @example
 * const createPost = useApiMutation({
 *   endpoint: "/blog/posts",
 *   method: "POST",
 *   invalidateQueries: [["blog", "posts"]],
 * });
 */
export function useApiMutation<TData = any, TVariables = any>({
  endpoint,
  method = "POST",
  invalidateQueries,
  ...options
}: UseApiMutationOptions<TData, TVariables>) {
  const queryClient = useQueryClient();

  return useMutation<TData, Error, TVariables>({
    mutationFn: async (variables: TVariables) => {
      switch (method) {
        case "POST":
          return await api.post<TData>(endpoint, variables);
        case "PUT":
          return await api.put<TData>(endpoint, variables);
        case "PATCH":
          return await api.patch<TData>(endpoint, variables);
        case "DELETE":
          return await api.delete<TData>(endpoint);
        default:
          throw new Error(`Unsupported method: ${method}`);
      }
    },
    onSuccess: (data, variables, context) => {
      // Invalidate specified queries
      if (invalidateQueries) {
        invalidateQueries.forEach((queryKey) => {
          queryClient.invalidateQueries({ queryKey });
        });
      }
      // Call custom onSuccess if provided
      if (options.onSuccess) {
        options.onSuccess(data, variables, context);
      }
    },
    ...options,
  });
}

