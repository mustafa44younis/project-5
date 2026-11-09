// إعداد Axios الرئيسي — HTTP client مع interceptors
import axios from 'axios';
import { API_BASE_URL } from '../constants/api.constants';

// إنشاء instance من axios
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 20000, // 20 ثانية لتناسب استيقاظ الخوادم السحابية (Cold Starts)
});

// Request interceptor — يضيف JWT token لكل طلب تلقائياً
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor — يتعامل مع الرد والأخطاء بشكل موحد
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    // 401: غير مصرح / انتهاء الجلسة
    if (error.response?.status === 401) {
      const hadToken = Boolean(localStorage.getItem('access_token'));
      localStorage.removeItem('access_token');
      localStorage.removeItem('user');
      if (hadToken) {
        window.dispatchEvent(new CustomEvent('auth:unauthorized'));
      }
    }

    const errorData = error.response?.data || {
      success: false,
      message: error.message || 'تعذر الاتصال بالخادم، يرجى المحاولة لاحقاً',
    };

    return Promise.reject(errorData);
  }
);

export default api;
