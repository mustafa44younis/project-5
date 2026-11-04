// استيراد المكتبات الأساسية
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// استيراد الـ Routes
import authRoutes from './src/routes/auth.routes.js';
import projectsRoutes from './src/routes/projects.routes.js';
import messagesRoutes from './src/routes/messages.routes.js';
import walletRoutes from './src/routes/wallet.routes.js';
import aiRoutes from './src/routes/ai.routes.js';

// استيراد الـ Middleware
import { corsMiddleware } from './src/middleware/cors.middleware.js';
import { errorHandler } from './src/middleware/errorHandler.js';

// تحميل متغيرات البيئة
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// ===== Middleware الأساسية =====
app.use(corsMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ===== Routes =====
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectsRoutes);
app.use('/api/messages', messagesRoutes);
app.use('/api/wallet', walletRoutes);
app.use('/api/ai', aiRoutes);

// ===== نقطة فحص الصحة =====
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    data: {
      status: 'ok',
      timestamp: new Date().toISOString(),
    },
    message: 'الخادم يعمل بشكل طبيعي',
  });
});

// ===== معالج الأخطاء (يجب أن يكون في النهاية) =====
app.use(errorHandler);

// ===== تشغيل الخادم =====
app.listen(PORT, () => {
  console.log(`✅ الخادم يعمل على المنفذ: ${PORT}`);
  console.log(`🔗 الرابط: http://localhost:${PORT}`);
  console.log(`🏥 فحص الصحة: http://localhost:${PORT}/api/health`);
});

export default app;
