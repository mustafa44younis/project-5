import { Router } from 'express';
import { consult, getHistory } from '../controllers/ai.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const router = Router();

// تطبيق authMiddleware على جميع routes الذكاء الاصطناعي
router.use(authMiddleware);

// POST /api/ai/consult - الاستشارة مع الذكاء الاصطناعي
router.post('/consult', consult);

// GET /api/ai/history - الحصول على تاريخ المحادثات
router.get('/history', getHistory);

export default router;
