import { Router } from 'express';
import {
  getBalance,
  getTransactions,
  createEscrow,
} from '../controllers/wallet.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const router = Router();

// تطبيق authMiddleware على جميع routes المحفظة
router.use(authMiddleware);

// GET /api/wallet/balance - الحصول على رصيد المحفظة
router.get('/balance', getBalance);

// GET /api/wallet/transactions - الحصول على المعاملات المالية
router.get('/transactions', getTransactions);

// POST /api/wallet/escrow - إنشاء حساب ضمان جديد
router.post('/escrow', createEscrow);

export default router;
