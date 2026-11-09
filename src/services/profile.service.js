import api from './api';
import { API_ENDPOINTS } from '../constants/api.constants';

export const profileService = {
  // جلب الملف الشخصي والإحصائيات وتفاصيل الأمان
  async getProfile() {
    return api.get(API_ENDPOINTS.PROFILE.GET);
  },

  // تحديث البيانات الشخصية
  async updateProfile(data) {
    return api.put(API_ENDPOINTS.PROFILE.UPDATE, data);
  },

  // حذف الصورة الشخصية
  async deleteAvatar() {
    return api.delete(API_ENDPOINTS.PROFILE.DELETE_AVATAR);
  },

  // تغيير كلمة المرور
  async changePassword(currentPassword, newPassword) {
    return api.put(API_ENDPOINTS.PROFILE.CHANGE_PASSWORD, {
      currentPassword,
      newPassword,
    });
  },

  // تحديث التفضيلات
  async updatePreferences(preferences) {
    return api.put(API_ENDPOINTS.PROFILE.PREFERENCES, preferences);
  },

  // إعداد المصادقة الثنائية 2FA
  async generate2FA() {
    return api.post(API_ENDPOINTS.PROFILE.TWO_FACTOR_GENERATE);
  },

  // تأكيد وتفعيل المصادقة الثنائية 2FA
  async verify2FA(code) {
    return api.post(API_ENDPOINTS.PROFILE.TWO_FACTOR_VERIFY, { code });
  },

  // إلغاء تفعيل المصادقة الثنائية
  async disable2FA(password) {
    return api.post(API_ENDPOINTS.PROFILE.TWO_FACTOR_DISABLE, { password });
  },

  // جلب الجلسات النشطة
  async getSessions() {
    return api.get(API_ENDPOINTS.PROFILE.SESSIONS);
  },

  // إنهاء جلسة معينة
  async revokeSession(id) {
    return api.delete(API_ENDPOINTS.PROFILE.DELETE_SESSION(id));
  },

  // إنهاء كافة الجلسات الأخرى
  async revokeOtherSessions() {
    return api.post(API_ENDPOINTS.PROFILE.REVOKE_OTHER_SESSIONS);
  },

  // جلب تفاصيل التوثيق KYC
  async getVerification() {
    return api.get(API_ENDPOINTS.PROFILE.VERIFICATION);
  },

  // طلب تحديث التوثيق
  async requestVerification(data) {
    return api.post(API_ENDPOINTS.PROFILE.REQUEST_VERIFICATION, data);
  },
};

export default profileService;
