import api from './api';
import { API_ENDPOINTS } from '../constants/api.constants';

export const messagesService = {
  // جلب المحادثات النشطة للمستخدم
  async getConversations() {
    return api.get(API_ENDPOINTS.MESSAGES.CONVERSATIONS);
  },

  // جلب تفاصيل محادثة
  async getConversation(id) {
    return api.get(API_ENDPOINTS.MESSAGES.CONVERSATION(id));
  },

  // جلب سياق المشروع المرتبط بالمحادثة
  async getConversationContext(id) {
    return api.get(API_ENDPOINTS.MESSAGES.CONTEXT(id));
  },

  // جلب رسائل محادثة مع الترقيم
  async getMessages(conversationId, page = 1, limit = 50) {
    return api.get(API_ENDPOINTS.MESSAGES.MESSAGES(conversationId, page, limit));
  },

  // إرسال رسالة في محادثة (نص، مرفقات، صوت)
  async sendMessage(conversationId, data) {
    const payload =
      typeof data === 'string'
        ? { messageText: data }
        : {
            messageText: data.messageText || data.content || data.text,
            ...data,
          };
    return api.post(API_ENDPOINTS.MESSAGES.SEND(conversationId), payload);
  },

  // تعليم المحادثة كمقروءة
  async markAsRead(conversationId) {
    return api.post(API_ENDPOINTS.MESSAGES.MARK_READ(conversationId));
  },

  // البحث في رسائل المحادثة
  async searchMessages(conversationId, query) {
    return api.get(API_ENDPOINTS.MESSAGES.SEARCH(conversationId, query));
  },

  // جلب الملفات والمستودع المشترك للمشروع
  async getSharedFiles(projectId, category = 'all') {
    return api.get(API_ENDPOINTS.MESSAGES.SHARED_FILES(projectId, category));
  },

  // طلب تدخل الإدارة لفض نزاع بالمحادثة
  async requestIntervention(conversationId, reason = '') {
    return api.post(API_ENDPOINTS.MESSAGES.INTERVENTION(conversationId), { reason });
  },
};

export default messagesService;
