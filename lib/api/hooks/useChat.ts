/**
 * Chat Hooks
 * React Query hooks for chat operations
 */

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { chatService } from "../services/chatService";
import { ChatConversation, StartChatPayload, StartChatResponse } from "../types";
import { tokenStorage } from "../auth";

// Query Keys
export const chatKeys = {
  all: ["chats"] as const,
  lists: () => [...chatKeys.all, "list"] as const,
  list: () => [...chatKeys.lists()] as const,
  details: () => [...chatKeys.all, "detail"] as const,
  detail: (id: string) => [...chatKeys.details(), id] as const,
};

/**
 * Hook to get all chat conversations
 */
export const useChats = () => {
  const isAuthenticated = tokenStorage.isAuthenticated();
  
  return useQuery({
    queryKey: chatKeys.list(),
    queryFn: async () => {
      try {
        const data = await chatService.getChats();
        // Ensure we always return an array
        if (!data) return [];
        if (!Array.isArray(data)) {
          console.warn('API returned non-array data:', data);
          return [];
        }
        return data;
      } catch (error) {
        // Log error but don't throw to prevent retries
        console.error('Error fetching chats:', error);
        // Return empty array on error to prevent UI breaking
        return [];
      }
    },
    enabled: isAuthenticated, // Only fetch if authenticated
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    gcTime: 10 * 60 * 1000, // Keep in cache for 10 minutes
    refetchOnWindowFocus: false, // Don't refetch on window focus
    refetchOnMount: false, // Don't refetch on mount if data exists
    refetchOnReconnect: false, // Don't refetch on reconnect
    retry: false, // Don't retry on error to prevent multiple calls
    // Prevent multiple simultaneous requests
    networkMode: 'online',
    // Only refetch if data is stale
    refetchInterval: false,
    // Use cached data if available, even if stale
    placeholderData: (previousData) => previousData,
  });
};

/**
 * Hook to start a new chat conversation
 */
export const useStartChat = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: StartChatPayload) => chatService.startChat(payload),
    onSuccess: (data, variables) => {
      // Invalidate and refetch chats list after starting a new chat
      queryClient.invalidateQueries({ queryKey: chatKeys.list() });
      // If continuing a conversation, also invalidate that specific conversation
      if (variables.sessionId) {
        queryClient.invalidateQueries({ queryKey: chatKeys.detail(String(variables.sessionId)) });
      }
    },
    onError: (error) => {
      console.error("Error starting chat:", error);
    },
  });
};

/**
 * Hook to get messages for a conversation by session ID
 */
export const useChatById = (sessionId: string | number | undefined, page: number = 0, size: number = 10) => {
  return useQuery({
    queryKey: [...chatKeys.detail(String(sessionId)), page, size],
    queryFn: () => chatService.getChatById(sessionId!, page, size),
    enabled: !!sessionId && (typeof sessionId === 'string' || typeof sessionId === 'number'),
    staleTime: 30 * 1000, // Consider data fresh for 30 seconds
    refetchOnWindowFocus: false,
    refetchOnMount: true, // Refetch on mount to get latest messages
    retry: false,
  });
};

/**
 * Hook to edit a message
 */
export const useEditMessage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ messageId, content }: { messageId: string | number; content: string }) =>
      chatService.editMessage(messageId, content),
    onSuccess: (_, variables) => {
      // Invalidate the conversation to refetch updated messages
      // We need to find which conversation this message belongs to
      // For now, invalidate all detail queries
      queryClient.invalidateQueries({ queryKey: chatKeys.details() });
    },
    onError: (error) => {
      console.error("Error editing message:", error);
    },
  });
};

