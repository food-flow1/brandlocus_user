/**
 * Chat Service
 * Handles all chat-related API calls
 */

import { api } from "../apiClient";
import { ChatConversation, StartChatPayload, StartChatResponse, ChatsResponse, MessagesResponse, ChatMessage } from "../types";

export const chatService = {
  /**
   * Get all chat conversations with pagination
   */
  getChats: async (page: number = 0, size: number = 10): Promise<ChatsResponse> => {
    const response = await api.get<ChatsResponse | ChatConversation[]>(`/chats/?page=${page}&size=${size}`);
    // Return the full paginated response
    if (!response) {
      return {
        content: [],
        page: 0,
        size: 10,
        totalElements: 0,
        totalPages: 0,
        last: true,
      };
    }
    if (response && typeof response === 'object' && 'content' in response) {
      return response;
    }
    // Fallback: if response is directly an array (backward compatibility)
    if (Array.isArray(response)) {
      return {
        content: response,
        page: 0,
        size: response.length,
        totalElements: response.length,
        totalPages: 1,
        last: true,
      };
    }
    console.warn('Unexpected API response format:', response);
    return {
      content: [],
      page: 0,
      size: 10,
      totalElements: 0,
      totalPages: 0,
      last: true,
    };
  },

  /**
   * Start a new chat conversation
   */
  startChat: async (payload: StartChatPayload): Promise<StartChatResponse> => {
    // api.post extracts response.data.data
    const response = await api.post<any>("/chats/start", payload);

    console.log('🔍 Start Chat API Response:', JSON.stringify(response, null, 2));

    // Handle response with messages array (current API format)
    // Response structure: { messages: [...], milestone: false }
    if (response?.messages && Array.isArray(response.messages) && response.messages.length > 0) {
      const firstMessage = response.messages[0];
      console.log('✅ First message:', JSON.stringify(firstMessage, null, 2));
      console.log('✅ Session ID from message:', firstMessage.sessionId);

      const result = {
        id: String(firstMessage.sessionId),
        sessionId: firstMessage.sessionId,
        messages: response.messages,
        data: response.messages,
      };

      console.log('✅ Returning result:', JSON.stringify(result, null, 2));
      return result;
    }

    // Handle paginated response with content array (alternative format)
    if (response?.content && Array.isArray(response.content) && response.content.length > 0) {
      const newConversation = response.content[0];
      console.log('✅ New conversation:', JSON.stringify(newConversation, null, 2));
      console.log('✅ Session ID:', newConversation.id);

      return {
        id: String(newConversation.id),
        sessionId: newConversation.id,
        title: newConversation.title,
        createdAt: newConversation.createdAt,
        messages: [],
        data: response.content,
      };
    }

    // Fallback: Handle response where data is an array of messages (old format)
    if (Array.isArray(response) && response.length > 0) {
      const firstMessage = response[0];
      console.log('✅ First message (legacy format):', firstMessage);
      console.log('✅ Session ID from first message:', firstMessage.sessionId);
      return {
        sessionId: firstMessage.sessionId,
        id: String(firstMessage.sessionId),
        messages: response,
        data: response,
      };
    }

    // Fallback: if response has id directly
    if (response?.id) {
      console.log('✅ Using response.id:', response.id);
      return {
        ...response,
        id: String(response.id),
        sessionId: response.id,
      };
    }

    // If response has sessionId directly
    if (response?.sessionId) {
      console.log('✅ Using response.sessionId:', response.sessionId);
      return {
        ...response,
        id: String(response.sessionId),
      };
    }

    console.warn('⚠️ No sessionId found in response, returning raw response:', response);
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
   * Send a message to an existing conversation
   * This is different from startChat - it's for continuing conversations
   */
  sendMessage: async (payload: StartChatPayload): Promise<StartChatResponse> => {
    console.log('📨 Sending message to existing conversation:', payload.sessionId);

    // Use the same /chats/start endpoint but with sessionId
    // The API uses this endpoint for both starting and continuing conversations
    const response = await api.post<any>("/chats/start", payload);

    console.log('🔍 Send Message API Response:', JSON.stringify(response, null, 2));

    // Handle response with messages array (current API format)
    if (response?.messages && Array.isArray(response.messages) && response.messages.length > 0) {
      const firstMessage = response.messages[0];
      console.log('✅ Message sent, session ID:', firstMessage.sessionId);

      const result = {
        id: String(firstMessage.sessionId),
        sessionId: firstMessage.sessionId,
        messages: response.messages,
        data: response.messages,
        milestone: response.milestone,
      };

      return result;
    }

    // Fallback handling (same as startChat)
    if (Array.isArray(response) && response.length > 0) {
      const firstMessage = response[0];
      return {
        sessionId: firstMessage.sessionId,
        id: String(firstMessage.sessionId),
        messages: response,
        data: response,
      };
    }

    console.warn('⚠️ Unexpected response format:', response);
    return response;
  },

  /**
   * Edit a message
   */
  editMessage: async (messageId: string | number, content: string): Promise<void> => {
    const response = await api.patch(`/chats/review/${messageId}`, { content });
    return response;
  },
};

