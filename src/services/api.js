// إعداد Axios الرئيسي — HTTP client مع interceptors
import axios from 'axios';
import { API_BASE_URL } from '../constants/api.constants';

// إنشاء instance من axios مع الإعدادات الافتراضية
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 ثواني
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

// Response interceptor — يتعامل مع الأخطاء بشكل موحد
api.interceptors.response.use(
  // استجابة ناجحة — يُرجع البيانات مباشرة
  (response) => response.data,
  // استجابة خاطئة
  (error) => {
    if (error.response?.status === 401) {
      // انتهت الجلسة أو token غير صالح
      localStorage.removeItem('access_token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error.response?.data || error);
  }
);

export default api;
