// Contact Form Types
export interface ContactMessage {
  id?: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  user_id?: string | null;
  created_at?: string;
  is_read?: boolean;
}

export interface ContactResponse {
  success: boolean;
  message: string;
  data?: ContactMessage;
}

// Chatbot Types
export interface ChatbotRequest {
  message: string;
  sessionId: string;
  context?: {
    name?: string;
    interests: string[];
    visitedPages: string[];
    askedAbout: string[];
    conversationHistory: string[];
  };
}

export interface ChatbotResponse {
  text: string;
  actions?: Array<{
    label: string;
    action: string;
    data?: string;
    icon?: string;
  }>;
  context?: any;
  sessionId: string;
}

// Authentication Types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  token?: string;
  user?: {
    id: string;
    email: string;
    role: string;
  };
}

export interface AuthUser {
  id: string;
  email: string;
  role: string;
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

// Email Types
export interface EmailData {
  to: string;
  subject: string;
  html: string;
  text?: string;
}
