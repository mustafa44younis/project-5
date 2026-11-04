import React, { useState, useEffect } from 'react';
import TopHeader from '../components/TopHeader';
import './ReviewDeliverables.css';
import basketVegetablesImg from '../images/basket-vegetables.jpg';

// MUI Icons
import SpaRoundedIcon from '@mui/icons-material/SpaRounded';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import SmartphoneRoundedIcon from '@mui/icons-material/SmartphoneRounded';
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import ZoomInRoundedIcon from '@mui/icons-material/ZoomInRounded';
import ZoomOutRoundedIcon from '@mui/icons-material/ZoomOutRounded';
import FullscreenRoundedIcon from '@mui/icons-material/FullscreenRounded';
import ChatBubbleOutlineRoundedIcon from '@mui/icons-material/ChatBubbleOutlineRounded';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';

export default function ReviewDeliverables({ onNavigate, projectData }) {
  // بيانات المشاريع الثلاثة المعتمدة
  const projectTemplates = {
    nawa: {
      id: 2,
      key: 'nawa',
      title: 'هوية نواة',
      fullTitle: 'هوية نواة - تصميم الهوية البصرية',
      deliverableTitle: 'دليل هوية نواة البصرية',
      category: 'تصميم وإبداع - بدأ في 01 أكتوبر 2026',
      code: 'AC-023',
      leader: 'سارة القحطاني',
      leaderRole: 'قائد الفريق • مصممة هوية',
      round: '↺ جولة التعديل 1 من 2 متبقية',
      file: {
        name: 'Nawa_Brand_Guidelines_v1.pdf',
        pages: 12,
        size: '8.4 MB',
        uploadedBy: 'سارة القحطاني',
        uploadDate: '16 أكتوبر'
      },
      preview: {
        brandTag: 'NAWA / BRAND GUIDELINES',
        subTag: 'دليل الهوية البصرية',
        headline: 'من فكرة صغيرة، ينمو أثر كبير.',
        description: 'هوية مستوحاة من البذرة: تعكس النمو والتوازن، وتمنح نواة حضوراً بسيطاً وواثقاً ومميزاً في كافة التطبيقات الرقمية والمطبوعة.',
        pageIndicator: '03 / 12',
        colorTitle: 'ألوان تنبض بالطبيعة والنمو',
        swatches: [
          { color: '#182211', label: 'أخضر الغابة الغامق' },
          { color: '#2F4F2F', label: 'أخضر زيتوني' },
          { color: '#14A800', label: 'أخضر النماء الأساسي', highlighted: true, pin: '2' },
          { color: '#E8F5E9', label: 'رمادي مسكي فاتح' }
        ],
        typographyTitle: 'أبجد... بداية كل حكاية وابتكار',
        typographySub: 'TAJAWAL / BOLD - REGULAR'
      },
      initialComments: [
        { page: 3, title: 'توازن الشعار والرمز', text: 'أقترح زيادة المسافة بين الرمز واسم نواة قليلاً، ليظهر الشعار بوضوح أكبر في التطبيقات المصغرة والشاشات.', author: 'عبدالله العتيبي • أنت', time: '10:52 ص' },
        { page: 3, title: 'درجة اللون الثانوي', text: 'هل يمكن تجربة درجة أدفأ من الأخضر الفاتح في لوحة الألوان لتلائم ورق الطباعة غير المصقول؟', author: 'عبدالله العتيبي • أنت', time: '10:56 ص' },
        { page: 5, title: 'تطبيقات الشعار الرقمية', text: 'تم اعتماد التدرج المخصص للشاشات الرقمية والتطبيقات، ممتاز جداً ومتناسق.', author: 'سارة القحطاني • مصممة الهوية', time: '11:20 ص' }
      ]
    },
    sallet: {
      id: 1,
      key: 'sallet',
      title: 'متجر سلة الخير',
      fullTitle: 'متجر سلة الخير - تطوير واجهات المتجر',
      deliverableTitle: 'نماذج وتصميم واجهات متجر سلة الخير',
      category: 'تصميم واجهات وتجربة المستخدم UI/UX',
      code: 'AC-019',
      leader: 'أحمد السالم',
      leaderRole: 'قائد المشروع • مصمم واجهات',
      round: '↺ جولة التعديل 2 من 2 متبقية',
      file: {
        name: 'Sallet_Khair_Store_UI_UX_v2.pdf',
        pages: 18,
        size: '14.2 MB',
        uploadedBy: 'أحمد السالم',
        uploadDate: '20 أكتوبر'
      },
      preview: {
        brandTag: 'SALLET AL-KHAIR / STORE PROTOTYPE',
        subTag: 'واجهات وتجربة المستخدم UI/UX',
        headline: 'محصول طازج وسلة ممتلئة، بأسهل تجربة شراء.',
        description: 'تصميم واجهات المتجر الإلكتروني المخصصة للمنتجات الزراعية والغذائية الطازجة، مع تبسيط مسار الشراء وسرعة إتمام الطلب.',
        pageIndicator: '04 / 18',
        colorTitle: 'ألوان المتجر: النضارة والحيوية الزراعية',
        swatches: [
          { color: '#14A800', label: 'أخضر الحصاد الأساسي', highlighted: true, pin: '2' },
          { color: '#F79009', label: 'برتقالي طازج' },
          { color: '#101828', label: 'كحلي النصوص العريض' },
          { color: '#F2F4F7', label: 'خلفيات المنتجات' }
        ],
        typographyTitle: 'خط عربي حديث وواضح للأسعار والتفاصيل',
        typographySub: 'INTER & TAJAWAL / UI OPTIMIZED'
      },
      initialComments: [
        { page: 4, title: 'زر الإضافة إلى السلة', text: 'أقترح تكبير زر "أضف للسلة" في بطاقة الخضار مع إظهار مؤشر فوري للعدد (عداد الكمية) دون مغادرة الصفحة.', author: 'عبدالله العتيبي • أنت', time: '09:30 ص' },
        { page: 7, title: 'شاشة إتمام الدفع والتوصيل', text: 'تجربة اختيار وقت التوصيل (صباحاً/مساءً) ممتازة جداً وواضحة للعملاء في منطقة الرياض.', author: 'عبدالله العتيبي • أنت', time: '09:45 ص' },
        { page: 12, title: 'وسام المنتجات العضوية', text: 'تمت إضافة وسام "عضوي 100%" بالأخضر الفاتح على المنتجات المعتمدة بناءً على رغبتكم.', author: 'أحمد السالم • مصمم واجهات', time: '10:15 ص' }
      ]
    },
    mawid: {
      id: 3,
      key: 'mawid',
      title: 'تطبيق موعد',
      fullTitle: 'تطبيق موعد - تصميم تجربة المستخدم',
      deliverableTitle: 'شاشات ونماذج تطبيق موعد لحجز المواعيد',
      category: 'تصميم واجهات وتجربة المستخدم UI/UX للجوال',
      code: 'AC-031',
      leader: 'خالد الحربي',
      leaderRole: 'قائد المشروع • مطور تطبيقات',
      round: '↺ جولة التعديل 1 من 2 متبقية',
      file: {
        name: 'Mawid_Mobile_App_Flow_v1.pdf',
        pages: 16,
        size: '11.8 MB',
        uploadedBy: 'خالد الحربي',
        uploadDate: '14 أكتوبر'
      },
      preview: {
        brandTag: 'MAWID APP / MOBILE INTERACTION',
        subTag: 'شاشات التطبيق التفاعلية',
        headline: 'احجز موعدك بدقة، دون انتظار أو تعقيد.',
        description: 'شاشات تدفق حجز المواعيد والعيادات والاستشارات الذكية، مع تقويم تفاعلي ذكي واختيار الأوقات الشاغرة وإرسال تأكيد الموعد.',
        pageIndicator: '05 / 16',
        colorTitle: 'ألوان التطبيق: الهوية الخضراء والاحترافية الرقمية',
        swatches: [
          { color: '#14A800', label: 'أخضر العلامة الرئيسي', highlighted: true, pin: '2' },
          { color: '#12B76A', label: 'أخضر التأكيد والنجاح' },
          { color: '#1D2939', label: 'رمادي داكن مريح' },
          { color: '#EAF7E6', label: 'أخضر فاتح للخلفيات' }
        ],
        typographyTitle: 'خط رقمي مقروء بوضوح على شاشات الهواتف',
        typographySub: 'IBM PLEX SANS ARABIC / MOBILE UI'
      },
      initialComments: [
        { page: 5, title: 'تقسيم فترات المواعيد', text: 'نرغب بجعل أوقات الصباح والمساء مقسمة في تبويبين منفصلين لسهولة الاختيار على المرضى والمراجعين.', author: 'عبدالله العتيبي • أنت', time: '02:15 م' },
        { page: 8, title: 'بطاقة تأكيد الحجز والتقويم', text: 'ممتازة فكرة إضافة زر "إضافة للتقويم (Google / Apple Calendar)" مباشرة بعد الضغط على تأكيد.', author: 'عبدالله العتيبي • أنت', time: '02:40 م' },
        { page: 14, title: 'نظام التنبيهات المسبقة', text: 'تم تجهيز إشعار التذكير التلقائي قبل ساعتين من موعد الزيارة مع رابط الخريطة.', author: 'خالد الحربي • مطور التطبيقات', time: '03:10 م' }
      ]
    }
  };

  // دالة تحديد مفتاح المشروع بناءً على البيانات المُمررة
  const getProjectKey = (data) => {
    if (!data) return 'nawa';
    const name = (data.title || data.name || '').toLowerCase();
    const id = data.id;
    if (name.includes('سلة') || name.includes('الخير') || id === 1) return 'sallet';
    if (name.includes('موعد') || id === 3) return 'mawid';
    return 'nawa';
  };

  const [activeProjectKey, setActiveProjectKey] = useState(() => getProjectKey(projectData));

  // تحديث المشروع النشط عند تغير `projectData` الممرر من الخارج
  useEffect(() => {
    if (projectData) {
      setActiveProjectKey(getProjectKey(projectData));
    }
  }, [projectData]);

  // إدارة الملاحظات لكل مشروع بشكل مستقل
  const [projectComments, setProjectComments] = useState({
    nawa: projectTemplates.nawa.initialComments,
    sallet: projectTemplates.sallet.initialComments,
    mawid: projectTemplates.mawid.initialComments
  });

  const [newComment, setNewComment] = useState('');
  const [targetPage, setTargetPage] = useState('3');
  const [activeCommentTab, setActiveCommentTab] = useState('active');

  const currentProject = projectTemplates[activeProjectKey] || projectTemplates.nawa;
  const currentComments = projectComments[activeProjectKey] || [];

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const newCommentObj = {
      page: targetPage,
      title: `ملاحظة جديدة على ص ${targetPage}`,
      text: newComment,
      author: 'عبدالله العتيبي • أنت',
      time: 'الآن'
    };

    setProjectComments(prev => ({
      ...prev,
      [activeProjectKey]: [newCommentObj, ...(prev[activeProjectKey] || [])]
    }));

    setNewComment('');
  };

  return (
    <div className="review-deliverables-page" dir="rtl">
      {/* 1. الهيدر العلوي الموحد */}
      <TopHeader 
        userName="عبدالله العتيبي" 
        userRole="حساب عميل" 
        onNewProject={() => onNavigate && onNavigate('ai')} 
      />

      {/* 2. رأس الصفحة ومسار التنقل الخاص بكل مشروع */}
      <div className="review-top-header-row">
        <div className="breadcrumb-and-title">
          <div className="breadcrumb">
            <span 
              onClick={() => onNavigate && onNavigate('projects')}
              style={{ cursor: 'pointer', color: '#14A800', fontWeight: '800' }}
            >
              مشاريعي
            </span> / {currentProject.title} / مراجعة المخرجات
          </div>
          <h1>{currentProject.deliverableTitle}</h1>
          <p>{currentProject.category} • راجع الملف، وأضف ملاحظاتك على المواضع التي تهمك.</p>
        </div>
        <div className="review-top-meta-left">
          <span className="project-code-badge">{currentProject.code}</span>
          <span className="badge-round-pending">{currentProject.round}</span>
        </div>
      </div>

      {/* 4. المحتوى المقسم لجزأين: عارض الـ PDF (يسار) ولوحة الملاحظات (يمين) */}
      <div className="review-split-container">
        
        {/* الجزء الأيسر: عارض الـ PDF المخصص للمشروع */}
        <div className="pdf-viewer-section">
          <div className="pdf-viewer-top-bar">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="pdf-file-type-icon">PDF</span>
              <span className="pdf-name">{currentProject.file.name}</span>
              <span className="pdf-meta">{currentProject.file.pages} صفحة • {currentProject.file.size} • رفعه {currentProject.file.uploadedBy}</span>
            </div>
            <div className="pdf-tools">
              <button title="تحميل الملف"><DownloadRoundedIcon sx={{ fontSize: 17, color: '#475467' }} /></button>
              <button title="خيارات إضافية"><MoreHorizRoundedIcon sx={{ fontSize: 17, color: '#475467' }} /></button>
            </div>
          </div>

          <div className="pdf-mockup-canvas">
            <div className="mockup-page-inner">
              <div className="mockup-header-row">
                <span className="brand-tag">{currentProject.preview.brandTag}</span>
                <span className="sub-tag">{currentProject.preview.subTag}</span>
              </div>

              <div className="mockup-body-content">
                <h2>01 — THE DELIVERABLE</h2>
                <h1>{currentProject.preview.headline}</h1>
                <p>{currentProject.preview.description}</p>
                
                {/* --- 1. معاينة مخرجات هوية نواة --- */}
                {activeProjectKey === 'nawa' && (
                  <div className="mockup-card-box" style={{ background: '#182211', borderRadius: '10px' }}>
                    <div className="logo-box-demo" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                      <SpaRoundedIcon sx={{ fontSize: 26, color: '#14A800' }} />
                      <span>نواة NAWA</span>
                      <span className="pin-num" style={{ right: '90px' }}>1</span>
                    </div>
                    <small>الشعار الأساسي / النسخة المعكوسة المستوحاة من البذرة</small>
                  </div>
                )}

                {/* --- 2. معاينة مخرجات متجر سلة الخير --- */}
                {activeProjectKey === 'sallet' && (
                  <div className="store-mockup-card">
                    <div className="store-card-header">
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <ShoppingCartRoundedIcon sx={{ fontSize: 18, color: '#14A800' }} />
                        <strong style={{ fontSize: '12px', color: '#181818' }}>واجهة المتجر وقائمة المنتجات</strong>
                      </div>
                      <span className="store-badge-organic">عضوي وطازج 100%</span>
                    </div>

                    <div className="store-card-body">
                      <div className="store-img-box">
                        <img src={basketVegetablesImg} alt="سلة خضار طازجة" />
                      </div>
                      <div className="store-item-info" style={{ flex: 1 }}>
                        <h4>سلة الخير الأسبوعية المشكلة</h4>
                        <p>تشكيلة من الخضار الورقية، الطماطم، الخيار والجزر من مزارع القصيم والخرج.</p>
                        <div className="store-price-row">
                          <span className="store-price">45.00 ر.س</span>
                          <button className="store-add-btn">
                            + أضف للسلة <span className="pin-num" style={{ top: '-10px', right: '-10px' }}>1</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="store-cart-bar">
                      <span>🛒 سلة المشتريات (3 عناصر)</span>
                      <strong>الإجمالي: 115 ر.س</strong>
                    </div>
                  </div>
                )}

                {/* --- 3. معاينة مخرجات تطبيق موعد --- */}
                {activeProjectKey === 'mawid' && (
                  <div className="mawid-mobile-card">
                    <div className="mawid-doc-header">
                      <div className="mawid-doc-avatar">د.ف</div>
                      <div className="mawid-doc-info">
                        <h4>د. فهد الأحمد</h4>
                        <small>استشاري طب وجراحة • مجمع العيادات التخصصية</small>
                      </div>
                    </div>

                    <div className="mawid-date-picker">
                      <span><CalendarMonthOutlinedIcon sx={{ fontSize: 15, verticalAlign: 'middle', ml: 0.5, color: '#14A800' }} /> موعد الزيارة: 18 أكتوبر 2026</span>
                      <span style={{ color: '#14A800', fontSize: '11px', cursor: 'pointer' }}>تغيير</span>
                    </div>

                    <span className="mawid-slots-label">الأوقات المتاحة للحجز اليوم:</span>
                    <div className="mawid-time-chips">
                      <div className="time-chip">10:00 ص</div>
                      <div className="time-chip active">
                        11:30 ص
                        <span className="pin-num" style={{ top: '-8px', right: '-8px', background: '#14A800' }}>1</span>
                      </div>
                      <div className="time-chip">04:00 م</div>
                      <div className="time-chip">05:30 م</div>
                    </div>

                    <button className="mawid-confirm-btn">
                      ✓ تأكيد حجز الموعد وإرسال الإشعار
                    </button>
                  </div>
                )}

                {/* قسم لوحة الألوان المخصصة للمشروع */}
                <div className="mockup-colors-section">
                  <span className="color-title">{currentProject.preview.colorTitle}</span>
                  <div className="color-swatches-row">
                    {currentProject.preview.swatches.map((s, idx) => (
                      <div 
                        key={idx} 
                        className={`swatch ${s.highlighted ? 'highlighted' : ''}`}
                        style={{ background: s.color }}
                        title={s.label}
                      ></div>
                    ))}
                  </div>
                  <h3>{currentProject.preview.typographyTitle}</h3>
                  <small>{currentProject.preview.typographySub}</small>
                </div>
              </div>

              <div className="page-number-indicator">{currentProject.preview.pageIndicator}</div>
            </div>
          </div>

          {/* شريط الأدوات السفلي للـ PDF */}
          <div className="pdf-footer-toolbar">
            <div className="left-tools">
              <button title="شاشة كاملة"><FullscreenRoundedIcon sx={{ fontSize: 18 }} /></button>
              <button title="تصغير"><ZoomOutRoundedIcon sx={{ fontSize: 18 }} /></button>
              <span>100%</span>
              <button title="تكبير"><ZoomInRoundedIcon sx={{ fontSize: 18 }} /></button>
            </div>
            <div className="center-pagination">
              <button>⟨</button>
              <span>{targetPage}</span>
              <span>/ {currentProject.file.pages}</span>
              <button>⟩</button>
            </div>
            <div className="right-action-tool">
              <button className="btn-add-note-inline">
                <ChatBubbleOutlineRoundedIcon sx={{ fontSize: 15, verticalAlign: 'middle', ml: 0.5 }} /> إضافة ملاحظة
              </button>
            </div>
          </div>
        </div>

        {/* الجزء الأيمن: لوحة الملاحظات والاعتماد الخاصة بالمشروع */}
        <div className="notes-sidebar-section">
          <div className="notes-header-tabs">
            <h3>الملاحظات والاعتماد — {currentProject.title}</h3>
            <div className="free-edits-pill">
              <span>💡 لديك جولتا تعديل مجانيتان وفق بنود العقد</span>
            </div>
          </div>

          <div className="notes-tabs-filter">
            <button 
              className={activeCommentTab === 'active' ? 'active' : ''}
              onClick={() => setActiveCommentTab('active')}
            >
              الملاحظات ({currentComments.length})
            </button>
            <button 
              className={activeCommentTab === 'resolved' ? 'active' : ''}
              onClick={() => setActiveCommentTab('resolved')}
            >
              تمت المعالجة (0)
            </button>
          </div>

          {/* قائمة الملاحظات */}
          <div className="comments-list-box">
            {currentComments.length === 0 ? (
              <p style={{ fontSize: '12px', color: '#667085', textAlign: 'center', padding: '20px 0' }}>
                لا توجد ملاحظات مسجلة بعد على هذا المشروع.
              </p>
            ) : (
              currentComments.map((c, idx) => (
                <div className="comment-item-card" key={idx}>
                  <div className="ci-top">
                    <span className="page-badge-num">صفحة {c.page}</span>
                    <span className="ci-time">{c.time}</span>
                  </div>
                  <h4>{c.title}</h4>
                  <p>{c.text}</p>
                  <small>{c.author}</small>
                </div>
              ))
            )}
          </div>

          {/* صندوق إضافة ملاحظة جديدة */}
          <form className="add-comment-box" onSubmit={handleAddComment}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <h4 style={{ margin: 0 }}>أضف ملاحظتك لمشروع «{currentProject.title}»</h4>
              <select 
                value={targetPage} 
                onChange={(e) => setTargetPage(e.target.value)}
                style={{ fontSize: '11px', padding: '3px 8px', borderRadius: '6px', border: '1px solid #D0D5DD' }}
              >
                {[...Array(currentProject.file.pages)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>صفحة {i + 1}</option>
                ))}
              </select>
            </div>

            <textarea 
              rows="3" 
              placeholder={`اكتب ملاحظتك على مخرجات ${currentProject.title}...`}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            ></textarea>

            <div className="comment-form-footer">
              <span className="select-pos">📎 تحديد موضع على الملف</span>
              <button type="submit" className="btn-send-comment">إرسال الملاحظات وطلب التعديل</button>
            </div>
          </form>

          {/* زر الاعتماد النهائي للمرحلة */}
          <div className="approval-section-card">
            <p>كل شيء في «{currentProject.deliverableTitle}» يبدو ممتازاً؟</p>
            <button 
              className="btn-approve-stage"
              onClick={() => onNavigate && onNavigate('final-delivery', currentProject)}
            >
              ✓ اعتماد مخرجات المرحلة
            </button>
            <small>بالاعتماد، ينتقل فريق {currentProject.leader} إلى مرحلة التسليم النهائي.</small>
          </div>

        </div>

      </div>
    </div>
  );
}
