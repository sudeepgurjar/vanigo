import api from './api';

export const authService = {
  register: async (name, email, password) => {
    console.log('🔵 REGISTER ATTEMPT');
    console.log('Name:', name);
    console.log('Email:', email);
    
    try {
      const response = await api.post('/auth/register', { 
        name, 
        email: email.trim().toLowerCase(),
        password 
      });
      
      console.log('✅ REGISTER SUCCESS:', response.data);
      
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data));
        console.log('✅ Token saved to localStorage');
      }
      
      return response.data;
      
    } catch (error) {
      console.error('❌ REGISTER FAILED:', error.response?.data || error.message);
      throw error;
    }
  },

  login: async (email, password) => {
    console.log('🔵 LOGIN ATTEMPT');
    console.log('Raw Email:', email);
    console.log('Raw Password:', password);
    
    const cleanEmail = email.trim().toLowerCase();
    
    console.log('Clean Email:', cleanEmail);
    console.log('Email Length:', cleanEmail.length);
    console.log('Password Length:', password.length);
    console.log('API Base URL:', api.defaults.baseURL);
    
    try {
      console.log('📤 Sending request to /auth/login...');
      
      const response = await api.post('/auth/login', { 
        email: cleanEmail,
        password: password 
      });
      
      console.log('✅ LOGIN SUCCESS!');
      console.log('Response Data:', response.data);
      
      if (response.data && response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data));
        console.log('✅ Token saved to localStorage');
        console.log('Saved token:', localStorage.getItem('token'));
      } else {
        console.warn('⚠️ No token in response!');
      }
      
      return response.data;
      
    } catch (error) {
      console.error('❌ LOGIN FAILED!');
      console.error('Status Code:', error.response?.status);
      console.error('Error Message:', error.response?.data?.message);
      console.error('Full Error:', error.response?.data);
      console.error('Request Config:', error.config);
      throw error;
    }
  },

  logout: () => {
    console.log('🔵 LOGOUT');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    console.log('✅ Logged out');
  },

  forgotPassword: async (email) => {
    const response = await api.post('/auth/forgot-password', { email });
    return response.data;
  },

  resetPassword: async (token, password) => {
    const response = await api.post('/auth/reset-password', { token, password });
    return response.data;
  },

  getCurrentUser: () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  }
};