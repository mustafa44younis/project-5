// التحقق من صحة الإيميل
export const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

// التحقق من كلمة المرور (6 أحرف على الأقل)
export const isValidPassword = (password) => {
  return password && password.length >= 6;
};

// التحقق من رقم الهاتف السعودي
export const isValidSaudiPhone = (phone) => {
  return /^(05|5)(5|0|3|6|4|9|1|8|7)([0-9]{7})$/.test(phone);
};
