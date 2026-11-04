import { Router } from 'express';
import {
  getProjects,
  getProject,
  createProject,
  updateProject,
} from '../controllers/projects.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const router = Router();

// تطبيق authMiddleware على جميع routes المشاريع
router.use(authMiddleware);

// GET /api/projects - جلب قائمة المشاريع
router.get('/', getProjects);

// GET /api/projects/:id - جلب مشروع محدد
router.get('/:id', getProject);

// POST /api/projects - إنشاء مشروع جديد
router.post('/', createProject);

// PUT /api/projects/:id - تعديل مشروع
router.put('/:id', updateProject);

// PATCH /api/projects/:id - تعديل جزئي للمشروع
router.patch('/:id', updateProject);

export default router;
