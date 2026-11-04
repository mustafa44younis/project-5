// بيانات وهمية للمشاريع
export const projects = [
  {
    id: 'p1',
    title: 'تطوير منصة تجارة إلكترونية',
    status: 'active',
    budget: 25000,
    deadline: '2026-03-01',
    description: 'بناء منصة متكاملة للتجارة الإلكترونية تشمل إدارة المنتجات والطلبات والمدفوعات.',
    clientId: 'u1',
    expertId: 'u2',
    deliverables: [
      'واجهة المستخدم الأمامية',
      'لوحة تحكم الإدارة',
      'بوابة الدفع الإلكتروني',
      'تطبيق الجوال',
    ],
    milestones: [
      { id: 'm1', title: 'تصميم الواجهات', dueDate: '2026-01-15', status: 'completed', payment: 5000 },
      { id: 'm2', title: 'تطوير الـ Backend', dueDate: '2026-02-01', status: 'active', payment: 10000 },
      { id: 'm3', title: 'التسليم النهائي', dueDate: '2026-03-01', status: 'pending', payment: 10000 },
    ],
  },
  {
    id: 'p2',
    title: 'تصميم هوية بصرية لشركة ناشئة',
    status: 'completed',
    budget: 8000,
    deadline: '2025-12-15',
    description: 'تصميم شعار وهوية بصرية كاملة لشركة ناشئة في مجال التقنية.',
    clientId: 'u1',
    expertId: 'u2',
    deliverables: [
      'شعار الشركة بصيغ متعددة',
      'دليل الهوية البصرية',
      'قوالب الوثائق الرسمية',
    ],
    milestones: [
      { id: 'm4', title: 'مقترحات الشعار', dueDate: '2025-12-01', status: 'completed', payment: 3000 },
      { id: 'm5', title: 'تسليم الهوية البصرية', dueDate: '2025-12-15', status: 'completed', payment: 5000 },
    ],
  },
  {
    id: 'p3',
    title: 'تطوير تطبيق جوال للصحة واللياقة',
    status: 'pending',
    budget: 40000,
    deadline: '2026-06-01',
    description: 'تطوير تطبيق جوال متكامل لتتبع الصحة واللياقة البدنية مع خاصية التدريب الشخصي.',
    clientId: 'u1',
    expertId: null,
    deliverables: [
      'تطبيق iOS',
      'تطبيق Android',
      'لوحة تحكم الويب',
      'API الخلفي',
    ],
    milestones: [
      { id: 'm6', title: 'التصميم والمتطلبات', dueDate: '2026-02-01', status: 'pending', payment: 8000 },
      { id: 'm7', title: 'تطوير الميزات الأساسية', dueDate: '2026-04-01', status: 'pending', payment: 20000 },
      { id: 'm8', title: 'الاختبار والإطلاق', dueDate: '2026-06-01', status: 'pending', payment: 12000 },
    ],
  },
];
