import cors from 'cors';

/**
 * إعدادات CORS للسماح بالطلبات من الـ Frontend
 */
const corsOptions = {
  // السماح بالطلبات من عناوين المصدر المحددة
  origin: [
    'http://localhost:5173',
    'http://localhost:5174',
    process.env.FRONTEND_URL,
  ].filter(Boolean),

  // الـ Methods المسموح بها
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],

  // السماح بإرسال الـ Headers المخصصة
  allowedHeaders: ['Content-Type', 'Authorization'],

  // السماح بإرسال الـ Cookies
  credentials: true,
};

// تصدير الـ CORS middleware
export const corsMiddleware = cors(corsOptions);
