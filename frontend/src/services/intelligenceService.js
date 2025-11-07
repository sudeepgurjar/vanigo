import api from './api';

export const intelligenceService = {
  queryConversations: async (query) => {
    const response = await api.post('/intelligence/query', { query });
    return response.data;
  }
};