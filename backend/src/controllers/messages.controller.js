import { messages } from '../data/messages.mock.js';

/**
 * الحصول على قائمة الرسائل للمستخدم الحالي
 */
export const getMessages = (req, res) => {
  // جلب الرسائل المرتبطة بالمستخدم الحالي
  const userMessages = messages.filter(
    (m) => m.senderId === req.user.id || m.receiverId === req.user.id
  );

  // ترتيب الرسائل من الأحدث إلى الأقدم
  const sortedMessages = userMessages.sort(
    (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
  );

  res.json({
    success: true,
    data: {
      messages: sortedMessages,
      total: sortedMessages.length,
      unread: sortedMessages.filter(
        (m) => !m.read && m.receiverId === req.user.id
      ).length,
    },
    message: 'تم جلب الرسائل بنجاح',
  });
};

/**
 * إرسال رسالة جديدة
 */
export const sendMessage = (req, res) => {
  const { receiverId, content, projectId } = req.body;

  // التحقق من البيانات المطلوبة
  if (!receiverId || !content) {
    return res.status(400).json({
      success: false,
      error: 'بيانات ناقصة',
      message: 'يرجى إدخال المستلم ومحتوى الرسالة',
    });
  }

  // إنشاء رسالة جديدة
  const newMessage = {
    id: `msg${Date.now()}`,
    senderId: req.user.id,
    receiverId,
    content,
    projectId: projectId || null,
    timestamp: new Date().toISOString(),
    read: false,
  };

  // إضافة الرسالة إلى القائمة (في الذاكرة فقط)
  messages.push(newMessage);

  res.status(201).json({
    success: true,
    data: { message: newMessage },
    message: 'تم إرسال الرسالة بنجاح',
  });
};

/**
 * تمييز رسالة كمقروءة
 */
export const markAsRead = (req, res) => {
  const { id } = req.params;

  const messageIndex = messages.findIndex((m) => m.id === id);

  if (messageIndex === -1) {
    return res.status(404).json({
      success: false,
      error: 'رسالة غير موجودة',
      message: `لم يتم العثور على رسالة بالمعرف: ${id}`,
    });
  }

  // تمييز الرسالة كمقروءة
  messages[messageIndex].read = true;

  res.json({
    success: true,
    data: { message: messages[messageIndex] },
    message: 'تم تمييز الرسالة كمقروءة',
  });
};
