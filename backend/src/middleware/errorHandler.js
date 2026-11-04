/**
 * معالج الأخطاء المركزي
 * يلتقط جميع الأخطاء ويرجع استجابة JSON منظمة
 */
export const errorHandler = (err, req, res, next) => {
  // طباعة الخطأ في السجل (للتطوير)
  console.error('❌ خطأ في الخادم:', err);

  // تحديد رمز الحالة
  const statusCode = err.statusCode || err.status || 500;

  // بناء رسالة الخطأ
  const errorMessage = err.message || 'حدث خطأ داخلي في الخادم';
  const errorType = err.name || 'ServerError';

  // إرسال الاستجابة المنظمة
  res.status(statusCode).json({
    success: false,
    error: errorType,
    message: errorMessage,
    // إضافة تفاصيل الخطأ في بيئة التطوير فقط
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};
