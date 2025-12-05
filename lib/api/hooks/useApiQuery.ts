/**
 * Generic API Query Hook
 * Utility hook for creating custom query hooks easily
 */

import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { api } from "../apiClient";

interface UseApiQueryOptions<T> extends Omit<UseQueryOptions<T>, "queryFn"> {
  endpoint: string;
  enabled?: boolean;
}

/**
 * Generic hook for GET requests
 * 
 * @example
 * const { data, isLoading } = useApiQuery({
 *   endpoint: "/blog/posts",
 *   queryKey: ["blog", "posts"],
 * });
 */
export function useApiQuery<T = any>({
  endpoint,
  queryKey,
  enabled = true,
  ...options
}: UseApiQueryOptions<T>) {
  return useQuery<T>({
    queryKey,
    queryFn: async () => {
      return await api.get<T>(endpoint);
    },
    enabled,
    ...options,
  });
}

