// Chatbot service for n8n integration
export interface ChatbotRequest {
  message: string;
  userId?: string;
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

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export const chatbotService = {
  async sendMessage(request: ChatbotRequest): Promise<ChatbotResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/chatbot/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return result.data;
    } catch (error) {
      console.error('Chatbot service error:', error);
      // Re-throw to trigger local fallback
      throw error;
    }
  }
};
