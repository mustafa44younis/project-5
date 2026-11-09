import api from './api';
import { API_ENDPOINTS } from '../constants/api.constants';

export const notificationsService = {
  // جلب قائمة الإشعارات وعدد غير المقروء
  async getNotifications(page = 1, limit = 20, unreadOnly = false) {
    const url = `${API_ENDPOINTS.NOTIFICATIONS.LIST(page, limit)}${unreadOnly ? '&unreadOnly=true' : ''}`;
    return api.get(url);
  },

  // تعليم جميع الإشعارات كمقروءة
  async markAllAsRead() {
    return api.put(API_ENDPOINTS.NOTIFICATIONS.READ_ALL);
  },

  // تعليم إشعار محدد كمقروء
  async markOneAsRead(id) {
    return api.put(API_ENDPOINTS.NOTIFICATIONS.READ_ONE(id));
  },
};

export default notificationsService;
