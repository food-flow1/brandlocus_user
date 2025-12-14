/**
 * Chat Hooks
 * React Query hooks for chat operations
 */

import { useQuery, useMutation, useQueryClient, useInfiniteQuery } from "@tanstack/react-query";
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
 * Hook to get all chat conversations with infinite scroll pagination
 */
export const useChats = () => {
  const isAuthenticated = tokenStorage.isAuthenticated();

  return useInfiniteQuery({
    queryKey: chatKeys.list(),
    queryFn: async ({ pageParam = 0 }) => {
      try {
        const data = await chatService.getChats(pageParam, 10);
        return data;
      } catch (error) {
        console.error('Error fetching chats:', error);
        // Return empty response on error
        return {
          content: [],
          page: 0,
          size: 10,
          totalElements: 0,
          totalPages: 0,
          last: true,
        };
      }
    },
    getNextPageParam: (lastPage) => {
      // Return next page number if there are more pages
      if (!lastPage.last && lastPage.page < lastPage.totalPages - 1) {
        return lastPage.page + 1;
      }
      return undefined; // No more pages
    },
    initialPageParam: 0,
    enabled: isAuthenticated,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: false,
    networkMode: 'online',
    refetchInterval: false,
  });
};

/**
 * Hook to start a new chat conversation (no sessionId)
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
 * Hook to send a message to an existing conversation (with sessionId)
 */
export const useSendMessage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: StartChatPayload) => chatService.sendMessage(payload),
    onSuccess: (data, variables) => {
      // Only invalidate the specific conversation, not the entire list
      if (variables.sessionId) {
        console.log('✅ Message sent, invalidating conversation:', variables.sessionId);
        queryClient.invalidateQueries({ queryKey: chatKeys.detail(String(variables.sessionId)) });
      }
      // Also invalidate the list to update "last message" preview
      queryClient.invalidateQueries({ queryKey: chatKeys.list() });
    },
    onError: (error) => {
      console.error("Error sending message:", error);
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

