import { projects } from '../data/projects.mock.js';

/**
 * الحصول على قائمة جميع المشاريع
 */
export const getProjects = (req, res) => {
  // يمكن تصفية المشاريع حسب المستخدم الحالي
  const userProjects = projects.filter(
    (p) => p.clientId === req.user.id || p.expertId === req.user.id
  );

  res.json({
    success: true,
    data: {
      projects: userProjects,
      total: userProjects.length,
    },
    message: 'تم جلب المشاريع بنجاح',
  });
};

/**
 * الحصول على مشروع محدد بالـ ID
 */
export const getProject = (req, res) => {
  const { id } = req.params;

  const project = projects.find((p) => p.id === id);

  if (!project) {
    return res.status(404).json({
      success: false,
      error: 'مشروع غير موجود',
      message: `لم يتم العثور على مشروع بالمعرف: ${id}`,
    });
  }

  res.json({
    success: true,
    data: { project },
    message: 'تم جلب المشروع بنجاح',
  });
};

/**
 * إنشاء مشروع جديد
 */
export const createProject = (req, res) => {
  const { title, description, budget, deadline, deliverables } = req.body;

  // التحقق من البيانات المطلوبة
  if (!title || !description || !budget) {
    return res.status(400).json({
      success: false,
      error: 'بيانات ناقصة',
      message: 'يرجى إدخال عنوان ووصف وميزانية المشروع',
    });
  }

  // إنشاء مشروع جديد
  const newProject = {
    id: `p${Date.now()}`,
    title,
    description,
    budget: Number(budget),
    deadline: deadline || null,
    status: 'pending',
    clientId: req.user.id,
    expertId: null,
    deliverables: deliverables || [],
    milestones: [],
  };

  // إضافة المشروع إلى القائمة (في الذاكرة فقط)
  projects.push(newProject);

  res.status(201).json({
    success: true,
    data: { project: newProject },
    message: 'تم إنشاء المشروع بنجاح',
  });
};

/**
 * تعديل مشروع موجود
 */
export const updateProject = (req, res) => {
  const { id } = req.params;

  const projectIndex = projects.findIndex((p) => p.id === id);

  if (projectIndex === -1) {
    return res.status(404).json({
      success: false,
      error: 'مشروع غير موجود',
      message: `لم يتم العثور على مشروع بالمعرف: ${id}`,
    });
  }

  // تحديث بيانات المشروع
  const updatedProject = {
    ...projects[projectIndex],
    ...req.body,
    id, // الحفاظ على الـ ID الأصلي
  };

  projects[projectIndex] = updatedProject;

  res.json({
    success: true,
    data: { project: updatedProject },
    message: 'تم تحديث المشروع بنجاح',
  });
};
