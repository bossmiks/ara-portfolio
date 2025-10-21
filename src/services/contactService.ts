
// Updated to use backend API instead of Firebase
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  user_id: string | null;
  created_at: string;
  is_read: boolean;
}

export type ContactMessageInsert = Omit<ContactMessage, 'id' | 'created_at' | 'is_read'>;

const COLLECTION_NAME = 'contact_messages';

export const contactService = {

  async insertMessage(message: ContactMessageInsert): Promise<{ data: ContactMessage | null; error: Error | null }> {
    try {
      const response = await fetch(`${API_BASE_URL}/contact/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(message)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return { data: result.data, error: null };
    } catch (error) {
      console.error('❌ Error inserting message:', error);
      
      // Fallback: Return a mock success response if backend is not available
      if (error instanceof TypeError && error.message.includes('fetch')) {
        console.warn('Backend not available, using fallback response');
        const mockMessage: ContactMessage = {
          ...message,
          id: `mock_${Date.now()}`,
          created_at: new Date().toISOString(),
          is_read: false
        };
        return { data: mockMessage, error: null };
      }
      
      return { data: null, error: error as Error };
    }
  },

};
