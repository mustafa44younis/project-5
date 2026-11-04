import { Router } from 'express';
import { login, register, getMe, logout } from '../controllers/auth.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const router = Router();

// POST /api/auth/login - تسجيل الدخول
router.post('/login', login);

// POST /api/auth/register - إنشاء حساب جديد
router.post('/register', register);

// GET /api/auth/me - الحصول على بيانات المستخدم الحالي (محمية)
router.get('/me', authMiddleware, getMe);

// POST /api/auth/logout - تسجيل الخروج
router.post('/logout', logout);

export default router;
