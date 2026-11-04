import api from './api';
import { API_ENDPOINTS } from '../constants/api.constants';

export const aiService = {
  // إرسال استشارة للذكاء الاصطناعي
  async consult(message, projectType) {
    return api.post(API_ENDPOINTS.AI_CONSULT, { message, projectType });
  },

  // جلب سجل المحادثات مع الذكاء الاصطناعي
  async getHistory() {
    return api.get(API_ENDPOINTS.AI_HISTORY);
  },
};
