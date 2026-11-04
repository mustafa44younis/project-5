import api from './api';
import { API_ENDPOINTS } from '../constants/api.constants';

export const messagesService = {
  // جلب قائمة الرسائل
  async getMessages() {
    return api.get(API_ENDPOINTS.MESSAGES);
  },

  // إرسال رسالة جديدة
  async sendMessage(content, receiverId) {
    return api.post(API_ENDPOINTS.SEND_MESSAGE, { content, receiverId });
  },

  // تعليم رسالة كمقروءة
  async markAsRead(messageId) {
    return api.patch(API_ENDPOINTS.MARK_READ(messageId));
  },
};
