import api from './api';
import { API_ENDPOINTS } from '../constants/api.constants';

export const authService = {
  // تسجيل الدخول
  async login(email, password, twoFactorCode = null) {
    const payload = { email, password };
    if (twoFactorCode) {
      payload.twoFactorCode = twoFactorCode;
    }

    const response = await api.post(API_ENDPOINTS.AUTH.LOGIN, payload);

    // التحقق من طلب المصادقة الثنائية 2FA
    if (response?.requires_2fa) {
      return response;
    }

    // حفظ التوكن وبيانات المستخدم عند نجاح تسجيل الدخول
    const token = response?.data?.token;
    const user = response?.data?.user;

    if (token) {
      localStorage.setItem('access_token', token);
    }
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    }

    return response;
  },

  // إنشاء حساب جديد
  async register({ full_name, email, phone, password, role = 'client' }) {
    let backendRole = 'client';
    if (role === 'team_leader' || role === 1 || role === 'قائد فريق') {
      backendRole = 'team_leader';
    } else if (
      role === 'specialist' ||
      role === 2 ||
      role === 'مستقل محترف' ||
      role === 'مستقل' ||
      role === 'freelancer'
    ) {
      backendRole = 'specialist';
    } else {
      backendRole = 'client';
    }

    const payload = {
      full_name,
      email: email.trim().toLowerCase(),
      phone: phone || null,
      password,
      role: backendRole,
    };

    const response = await api.post(API_ENDPOINTS.AUTH.REGISTER, payload);

    const token = response?.data?.token;
    const user = response?.data?.user;

    if (token) {
      localStorage.setItem('access_token', token);
    }
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    }

    return response;
  },

  // تفعيل البريد الإلكتروني برمز أو توكن
  async verifyEmail(token) {
    return api.post(API_ENDPOINTS.AUTH.VERIFY_EMAIL, { token });
  },

  // إعادة إرسال رابط تفعيل البريد
  async resendVerification(email) {
    return api.post(API_ENDPOINTS.AUTH.RESEND_VERIFICATION, { email });
  },

  // طلب استعادة كلمة المرور
  async forgotPassword(email) {
    return api.post(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, { email });
  },

  // إعادة تعيين كلمة المرور
  async resetPassword(token, newPassword) {
    return api.post(API_ENDPOINTS.AUTH.RESET_PASSWORD, { token, newPassword });
  },

  // تسجيل الخروج
  async logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
  },

  // جلب المستخدم الحالي من السيرفر للتأكد من صلاحية الجلسة
  async getMe() {
    const response = await api.get(API_ENDPOINTS.AUTH.ME);
    if (response?.data?.user) {
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response;
  },

  // هل المستخدم مسجل دخول حالياً؟
  isAuthenticated() {
    return Boolean(localStorage.getItem('access_token'));
  },

  // جلب بيانات المستخدم المخزنة محلياً
  getCurrentUser() {
    const user = localStorage.getItem('user');
    try {
      return user ? JSON.parse(user) : null;
    } catch {
      return null;
    }
  },
};

export default authService;
