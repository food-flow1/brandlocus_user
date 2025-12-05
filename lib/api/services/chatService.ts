/**
 * Chat Service
 * Handles all chat-related API calls
 */

import { api } from "../apiClient";
import { ChatConversation, StartChatPayload, StartChatResponse, ChatsResponse, MessagesResponse, ChatMessage } from "../types";

export const chatService = {
  /**
   * Get all chat conversations
   */
  getChats: async (): Promise<ChatConversation[]> => {
    const response = await api.get<ChatsResponse>("/chats/");
    // Extract content array from response
    if (!response) return [];
    if (response && typeof response === 'object' && 'content' in response) {
      const content = response.content;
      if (Array.isArray(content)) {
        return content;
      }
    }
    // Fallback: if response is directly an array (backward compatibility)
    if (Array.isArray(response)) {
      return response;
    }
    console.warn('Unexpected API response format:', response);
    return [];
  },

  /**
   * Start a new chat conversation
   */
  startChat: async (payload: StartChatPayload): Promise<StartChatResponse> => {
    // api.post extracts response.data.data, so response is the array directly
    const response = await api.post<any>("/chats/start", payload);
    
    // Handle response where data is an array of messages (after api.post extraction)
    if (Array.isArray(response) && response.length > 0) {
      const firstMessage = response[0];
      return {
        sessionId: firstMessage.sessionId,
        id: String(firstMessage.sessionId), // Use sessionId as id for navigation
        messages: response,
        data: response,
      };
    }
    
    // Fallback: if response has id directly
    if (response?.id) {
      return response;
    }
    
    // If response has sessionId directly
    if (response?.sessionId) {
      return {
        ...response,
        id: String(response.sessionId),
      };
    }
    
    return response;
  },

  /**
   * Get a conversation by session ID
   * Returns messages for the conversation with pagination support
   */
  getChatById: async (sessionId: string | number, page: number = 0, size: number = 10): Promise<{ messages: ChatMessage[]; pagination: { page: number; size: number; totalElements: number; totalPages: number; last: boolean } }> => {
    // Get raw response to handle the actual API structure
    // The API returns: { status: true, message: "...", data: { content: [...], page: 0, ... } }
    // api.get extracts response.data.data, which is the data object
    const response = await api.get<MessagesResponse>(`/chats/?sessionId=${sessionId}&page=${page}&size=${size}`);
    // Extract messages from paginated response
    if (!response) return { messages: [], pagination: { page: 0, size: 10, totalElements: 0, totalPages: 0, last: true } };
    
    let messages: ChatMessage[] = [];
    let pagination = { page: 0, size: 10, totalElements: 0, totalPages: 0, last: true };
    
    // Response structure after api.get: { content: [...], page: 0, size: 10, ... }
    if (response && typeof response === 'object' && 'content' in response) {
      const content = response.content;
      if (Array.isArray(content)) {
        // Map API response to ChatMessage format
        messages = content.map((msg) => ({
          id: String(msg.messageId || msg.id || ''),
          messageId: msg.messageId,
          sessionId: msg.sessionId,
          role: msg.userType === 'USER' ? 'user' : 'assistant',
          userType: msg.userType,
          chatType: msg.chatType,
          content: msg.content,
          timestamp: msg.createdAt || msg.timestamp || new Date(),
          createdAt: msg.createdAt,
          name: msg.name,
          industryName: msg.industryName,
          businessName: msg.businessName,
        }));
      }
      
      // Extract pagination info
      if ('page' in response) pagination.page = response.page;
      if ('size' in response) pagination.size = response.size;
      if ('totalElements' in response) pagination.totalElements = response.totalElements;
      if ('totalPages' in response) pagination.totalPages = response.totalPages;
      if ('last' in response) pagination.last = response.last;
    } else if (Array.isArray(response)) {
      // Fallback: if response is directly an array
      messages = response;
    } else {
      console.warn('Unexpected API response format for getChatById:', response);
    }
    
    return { messages, pagination };
  },

  /**
   * Edit a message
   */
  editMessage: async (messageId: string | number, content: string): Promise<void> => {
    const response = await api.patch(`/chats/review/${messageId}`, { content });
    return response;
  },
};

