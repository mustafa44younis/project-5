import api from './api';
import { API_ENDPOINTS } from '../constants/api.constants';

export const authService = {
  // تسجيل الدخول
  async login(email, password) {
    const response = await api.post(API_ENDPOINTS.LOGIN, { email, password });
    if (response.success && response.token) {
      localStorage.setItem('access_token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
    }
    return response;
  },

  // التسجيل
  async register(name, email, password) {
    const response = await api.post(API_ENDPOINTS.REGISTER, { name, email, password });
    if (response.success && response.token) {
      localStorage.setItem('access_token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
    }
    return response;
  },

  // تسجيل الخروج
  async logout() {
    try {
      await api.post(API_ENDPOINTS.LOGOUT);
    } finally {
      localStorage.removeItem('access_token');
      localStorage.removeItem('user');
    }
  },

  // جلب المستخدم الحالي من الـ API
  async getMe() {
    return api.get(API_ENDPOINTS.ME);
  },

  // هل المستخدم مسجل دخول؟
  isAuthenticated() {
    return !!localStorage.getItem('access_token');
  },

  // جلب بيانات المستخدم من localStorage
  getCurrentUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },
};
