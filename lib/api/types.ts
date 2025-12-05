/**
 * API Response Types
 */

export interface ApiResponse<T = any> {
  success?: boolean;
  status?: boolean;
  message?: string;
  data?: T;
  error?: string | string[];
  requestTime?: string;
  requestType?: string;
  referenceId?: string;
}

export interface ApiError {
  message: string;
  status?: number;
  errors?: Record<string, string[]>;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    current_page: number;
    per_page: number;
    total: number;
    last_page: number;
  };
}

/**
 * Authentication Types
 */
export interface LoginResponseData {
  userId: number;
  email: string;
  isActive: boolean;
  role: string;
  jwtToken: string;
  refreshToken?: string;
}

export interface LoginResponse {
  token: string;
  user?: User;
  expires_in?: number;
}

export interface User {
  id: string | number;
  userId?: number;
  email: string;
  isActive?: boolean;
  role?: string;
  first_name?: string;
  last_name?: string;
  firstName?: string;
  lastName?: string;
  username?: string;
  phoneNo?: string;
  gender?: string;
  country?: string;
  state?: string;
  industryName?: string;
  businessName?: string;
  profileImageUrl?: string | null;
  [key: string]: any;
}

export interface UpdateProfilePayload {
  firstName?: string;
  lastName?: string;
  email?: string;
  gender?: string;
  country?: string;
  state?: string;
  industryName?: string;
  businessName?: string;
  profileImageUrl?: string | null;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  username?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  password?: string;
  otp?: string;
  phoneNo?: string;
  gender?: string;
  referral?: string;
}

export interface ForgetPasswordPayload {
  email: string;
}

export interface ResetPasswordPayload {
  email: string;
  otp: string;
  password: string;
  confirmPassword?: string;
}

export interface ChangePasswordPayload {
  currentPassword?: string;
  newPassword?: string;
  // For /password/change endpoint
  oldPassword?: string;
  password?: string;
}

/**
 * AI-Powered Business Guidance Registration
 */
export interface AIGuidanceRegisterPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  industryName: string;
  businessName: string;
  country: string;
  state: string;
  agreementToReceiveAIGeneratedResponse: boolean;
}

/**
 * Chat Types
 */
export interface ChatMessage {
  id?: string;
  messageId?: number;
  sessionId?: number;
  role?: 'user' | 'assistant';
  userType?: 'USER' | 'AI';
  chatType?: 'PROMPT' | 'PROMPT_RESPONSE';
  content: string;
  timestamp?: string | Date;
  createdAt?: string | Date;
  name?: string | null;
  industryName?: string | null;
  businessName?: string | null;
}

export interface ChatConversation {
  id: string | number;
  title: string;
  createdAt: string | Date;
  lastMessage?: string;
  messages?: ChatMessage[];
  updatedAt?: string | Date;
}

export interface ChatsResponse {
  content: ChatConversation[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
}

export interface MessagesResponse {
  content: ChatMessage[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
}

export interface StartChatPayload {
  content: string;
  title: string;
  sessionId?: string | number; // Optional: for continuing existing conversations
}

export interface StartChatResponse {
  id?: string; // May not be present in response
  sessionId?: string | number; // Extracted from first message
  title?: string;
  messages?: ChatMessage[];
  data?: ChatMessage[]; // API returns messages in data array
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

/**
 * Form Submission Types
 */
export type ServiceNeededType =
  | "BRAND_DEVELOPMENT"
  | "BUSINESS_DEVELOPMENT"
  | "CAPACITY_BUILDING"
  | "MARKETING_CONSULTING"
  | "TRADE_INVESTMENT";

export interface FormSubmitPayload {
  firstName: string;
  lastName: string;
  email: string;
  serviceNeeded: ServiceNeededType;
  companyName: string;
  message: string;
}

export interface ContactFormPayload {
  fullName: string;
  companyName: string;
  email: string;
  message: string;
}

export interface FormSubmitResponse {
  id?: string | number;
  message?: string;
  success?: boolean;
  status?: boolean;
}

