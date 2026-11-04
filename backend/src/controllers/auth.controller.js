import jwt from 'jsonwebtoken';
import { users } from '../data/users.mock.js';

/**
 * تسجيل الدخول
 * يستقبل البريد الإلكتروني وكلمة المرور ويرجع JWT token
 */
export const login = (req, res) => {
  const { email, password } = req.body;

  // التحقق من وجود البيانات المطلوبة
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      error: 'بيانات ناقصة',
      message: 'يرجى إدخال البريد الإلكتروني وكلمة المرور',
    });
  }

  // البحث عن المستخدم في البيانات الوهمية
  const user = users.find(
    (u) => u.email === email && u.password === password
  );

  // إذا لم يتم العثور على المستخدم
  if (!user) {
    return res.status(401).json({
      success: false,
      error: 'بيانات خاطئة',
      message: 'البريد الإلكتروني أو كلمة المرور غير صحيحة',
    });
  }

  // إنشاء JWT token
  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET || 'default_secret',
    { expiresIn: '7d' }
  );

  res.json({
    success: true,
    data: {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
      },
    },
    message: 'تم تسجيل الدخول بنجاح',
  });
};

/**
 * إنشاء حساب جديد
 * يستقبل الاسم والبريد الإلكتروني وكلمة المرور
 */
export const register = (req, res) => {
  const { name, email, password, role = 'client' } = req.body;

  // التحقق من وجود البيانات المطلوبة
  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      error: 'بيانات ناقصة',
      message: 'يرجى إدخال الاسم والبريد الإلكتروني وكلمة المرور',
    });
  }

  // التحقق من عدم وجود الإيميل مسبقاً
  const existingUser = users.find((u) => u.email === email);
  if (existingUser) {
    return res.status(409).json({
      success: false,
      error: 'بريد مكرر',
      message: 'هذا البريد الإلكتروني مسجل مسبقاً',
    });
  }

  // إنشاء مستخدم جديد
  const newUser = {
    id: `u${Date.now()}`,
    name,
    email,
    password,
    role,
    avatar: null,
  };

  // إضافة المستخدم إلى القائمة (في الذاكرة فقط)
  users.push(newUser);

  // إنشاء JWT token
  const token = jwt.sign(
    { id: newUser.id, email: newUser.email, role: newUser.role },
    process.env.JWT_SECRET || 'default_secret',
    { expiresIn: '7d' }
  );

  res.status(201).json({
    success: true,
    data: {
      token,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        avatar: newUser.avatar,
      },
    },
    message: 'تم إنشاء الحساب بنجاح',
  });
};

/**
 * الحصول على بيانات المستخدم الحالي
 * يرجع بيانات المستخدم من req.user (بعد التحقق من الـ token)
 */
export const getMe = (req, res) => {
  // البحث عن المستخدم الكامل بالـ ID
  const user = users.find((u) => u.id === req.user.id);

  if (!user) {
    return res.status(404).json({
      success: false,
      error: 'مستخدم غير موجود',
      message: 'لم يتم العثور على المستخدم',
    });
  }

  res.json({
    success: true,
    data: {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
      },
    },
    message: 'تم جلب بيانات المستخدم بنجاح',
  });
};

/**
 * تسجيل الخروج
 * في هذا التطبيق يتم تسجيل الخروج من جانب العميل بحذف الـ token
 */
export const logout = (req, res) => {
  res.json({
    success: true,
    data: null,
    message: 'تم تسجيل الخروج بنجاح',
  });
};
