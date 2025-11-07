import api from './api';

export const conversationService = {
  createConversation: async (title) => {
    const response = await api.post('/conversations', { title });
    return response.data;
  },

  getAllConversations: async () => {
    const response = await api.get('/conversations');
    return response.data;
  },

  getConversationById: async (id) => {
    const response = await api.get(`/conversations/${id}`);
    return response.data;
  },

  endConversation: async (id, summary) => {
    const response = await api.post(`/conversations/${id}/end`, { summary });
    return response.data;
  },

  sendMessage: async (conversationId, content) => {
    const response = await api.post(`/conversations/${conversationId}/messages`, { content });
    return response.data;
  }
};