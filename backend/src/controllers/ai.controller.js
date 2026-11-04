// بيانات وهمية لتاريخ المحادثات مع الذكاء الاصطناعي
const aiHistory = [
  {
    id: 'ai1',
    userId: 'u1',
    userMessage: 'كيف أحدد ميزانية مشروع تطوير تطبيق جوال؟',
    aiResponse: 'لتحديد ميزانية مشروع تطوير تطبيق جوال، يجب مراعاة عدة عوامل...',
    projectType: 'mobile-app',
    timestamp: '2026-01-10T10:00:00Z',
  },
];

// ردود ذكية وهمية حسب نوع المشروع
const aiResponses = {
  'web-development': [
    'لتطوير موقع ويب ناجح، أنصحك بالتركيز على تجربة المستخدم أولاً. تأكد من وجود تصميم متجاوب يعمل على جميع الأجهزة.',
    'عند اختيار التقنيات لمشروعك، فكر في React أو Vue.js للواجهة الأمامية مع Node.js أو Python للخلفية.',
    'الأمان في مواقع الويب أمر بالغ الأهمية. تأكد من تطبيق HTTPS، وحماية قاعدة البيانات، والتحقق من المدخلات.',
  ],
  'mobile-app': [
    'لتطوير تطبيق جوال، يجب أولاً تحديد الجمهور المستهدف وما إذا كنت تحتاج iOS أو Android أو كليهما.',
    'React Native أو Flutter يمكنهما تقليل التكلفة بشكل كبير من خلال مشاركة الكود بين المنصتين.',
    'تجربة المستخدم في التطبيقات الجوالة مختلفة عن الويب. اهتم بأوقات التحميل والاستجابة.',
  ],
  'design': [
    'الهوية البصرية الجيدة تحتاج إلى دراسة المنافسين وفهم قيم العلامة التجارية بعمق.',
    'اختر لوحة ألوان لا تتجاوز 3 ألوان رئيسية للحفاظ على التماسك البصري.',
    'الخط المستخدم يحمل رسالة. اختر خطاً يعكس شخصية علامتك التجارية.',
  ],
  'default': [
    'بناءً على ما وصفته، أنصحك بتقسيم المشروع إلى مراحل واضحة مع تحديد معايير القبول لكل مرحلة.',
    'التواصل الواضح مع المطور أساسي لنجاح أي مشروع. وثّق متطلباتك بشكل دقيق.',
    'لا تنسَ تخصيص 15-20% من الميزانية كاحتياطي للتغييرات والتعديلات غير المتوقعة.',
  ],
};

/**
 * الاستشارة مع الذكاء الاصطناعي
 * يستقبل رسالة ونوع المشروع ويرجع استجابة وهمية ذكية
 */
export const consult = (req, res) => {
  const { message, projectType = 'default' } = req.body;

  // التحقق من وجود الرسالة
  if (!message) {
    return res.status(400).json({
      success: false,
      error: 'رسالة مفقودة',
      message: 'يرجى إدخال سؤالك أو استفسارك',
    });
  }

  // اختيار الردود المناسبة حسب نوع المشروع
  const responses = aiResponses[projectType] || aiResponses['default'];

  // اختيار رد عشوائي من القائمة
  const randomResponse = responses[Math.floor(Math.random() * responses.length)];

  // إضافة معلومات إضافية حسب الرسالة
  const aiResponse = `${randomResponse}\n\nبخصوص سؤالك تحديداً: "${message.substring(0, 50)}..."، أنصحك بالتواصل مع خبراء متخصصين في المنصة للحصول على استشارة أكثر تفصيلاً.`;

  // حفظ المحادثة في التاريخ
  const historyEntry = {
    id: `ai${Date.now()}`,
    userId: req.user.id,
    userMessage: message,
    aiResponse,
    projectType,
    timestamp: new Date().toISOString(),
  };

  aiHistory.push(historyEntry);

  res.json({
    success: true,
    data: {
      response: aiResponse,
      conversationId: historyEntry.id,
      projectType,
    },
    message: 'تم الحصول على استجابة الذكاء الاصطناعي',
  });
};

/**
 * الحصول على تاريخ المحادثات مع الذكاء الاصطناعي
 */
export const getHistory = (req, res) => {
  // جلب تاريخ المحادثات للمستخدم الحالي
  const userHistory = aiHistory
    .filter((h) => h.userId === req.user.id)
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

  res.json({
    success: true,
    data: {
      history: userHistory,
      total: userHistory.length,
    },
    message: 'تم جلب تاريخ المحادثات بنجاح',
  });
};
