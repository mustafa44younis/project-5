import jwt from 'jsonwebtoken';

/**
 * Middleware للتحقق من صحة الـ JWT Token
 * يتحقق من Authorization header ويضيف بيانات المستخدم إلى req.user
 */
export const authMiddleware = (req, res, next) => {
  try {
    // استخراج الـ Authorization header
    const authHeader = req.headers['authorization'];

    // التحقق من وجود الـ token
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        error: 'غير مصرح',
        message: 'يجب تسجيل الدخول للوصول إلى هذا المورد',
      });
    }

    // استخراج الـ token من الـ header
    const token = authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        error: 'token مفقود',
        message: 'لم يتم توفير رمز المصادقة',
      });
    }

    // فك تشفير الـ JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'default_secret');

    // إضافة بيانات المستخدم إلى الطلب
    req.user = decoded;

    // الانتقال إلى الـ middleware التالي
    next();
  } catch (error) {
    // في حالة انتهاء صلاحية الـ token أو كونه غير صالح
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        error: 'انتهت صلاحية الجلسة',
        message: 'انتهت صلاحية رمز المصادقة، يرجى تسجيل الدخول مجدداً',
      });
    }

    return res.status(401).json({
      success: false,
      error: 'token غير صالح',
      message: 'رمز المصادقة غير صالح',
    });
  }
};
