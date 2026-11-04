import { Router } from 'express';
import {
  getMessages,
  sendMessage,
  markAsRead,
} from '../controllers/messages.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const router = Router();

// تطبيق authMiddleware على جميع routes الرسائل
router.use(authMiddleware);

// GET /api/messages - جلب قائمة الرسائل
router.get('/', getMessages);

// POST /api/messages - إرسال رسالة جديدة
router.post('/', sendMessage);

// PATCH /api/messages/:id/read - تمييز رسالة كمقروءة
router.patch('/:id/read', markAsRead);

export default router;
