// بيانات وهمية للمحفظة والمعاملات المالية
const transactions = [
  {
    id: 't1',
    type: 'deposit',
    amount: 10000,
    currency: 'SAR',
    description: 'إيداع رصيد',
    timestamp: '2026-01-01T10:00:00Z',
    status: 'completed',
  },
  {
    id: 't2',
    type: 'escrow',
    amount: -5000,
    currency: 'SAR',
    description: 'ضمان مشروع تطوير المنصة - المرحلة الأولى',
    timestamp: '2026-01-05T12:00:00Z',
    status: 'completed',
    projectId: 'p1',
  },
  {
    id: 't3',
    type: 'deposit',
    amount: 8000,
    currency: 'SAR',
    description: 'إيداع رصيد',
    timestamp: '2026-01-08T09:00:00Z',
    status: 'completed',
  },
  {
    id: 't4',
    type: 'payment',
    amount: -3000,
    currency: 'SAR',
    description: 'دفع مقابل تصميم الهوية البصرية',
    timestamp: '2026-01-12T14:30:00Z',
    status: 'completed',
    projectId: 'p2',
  },
];

// بيانات وهمية لحسابات الضمان (Escrow)
const escrows = [
  {
    id: 'e1',
    projectId: 'p1',
    amount: 5000,
    currency: 'SAR',
    status: 'active',
    releaseDate: null,
    createdAt: '2026-01-05T12:00:00Z',
  },
];

/**
 * الحصول على رصيد المحفظة
 */
export const getBalance = (req, res) => {
  res.json({
    success: true,
    data: {
      balance: 15000,
      currency: 'SAR',
      pendingBalance: 5000, // الرصيد المحجوز في الضمان
      availableBalance: 10000, // الرصيد المتاح للسحب
    },
    message: 'تم جلب رصيد المحفظة بنجاح',
  });
};

/**
 * الحصول على قائمة المعاملات المالية
 */
export const getTransactions = (req, res) => {
  // ترتيب المعاملات من الأحدث إلى الأقدم
  const sortedTransactions = [...transactions].sort(
    (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
  );

  res.json({
    success: true,
    data: {
      transactions: sortedTransactions,
      total: sortedTransactions.length,
    },
    message: 'تم جلب المعاملات المالية بنجاح',
  });
};

/**
 * إنشاء حساب ضمان (Escrow) جديد
 */
export const createEscrow = (req, res) => {
  const { projectId, amount, currency = 'SAR' } = req.body;

  // التحقق من البيانات المطلوبة
  if (!projectId || !amount) {
    return res.status(400).json({
      success: false,
      error: 'بيانات ناقصة',
      message: 'يرجى إدخال معرف المشروع والمبلغ',
    });
  }

  // التحقق من كفاية الرصيد (قيمة وهمية)
  if (Number(amount) > 15000) {
    return res.status(400).json({
      success: false,
      error: 'رصيد غير كافٍ',
      message: 'الرصيد المتاح غير كافٍ لإنشاء حساب الضمان',
    });
  }

  // إنشاء حساب ضمان جديد
  const newEscrow = {
    id: `e${Date.now()}`,
    projectId,
    amount: Number(amount),
    currency,
    status: 'active',
    releaseDate: null,
    createdAt: new Date().toISOString(),
    createdBy: req.user.id,
  };

  escrows.push(newEscrow);

  res.status(201).json({
    success: true,
    data: { escrow: newEscrow },
    message: 'تم إنشاء حساب الضمان بنجاح',
  });
};
