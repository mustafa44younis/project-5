import React, { useState } from 'react';
import TopHeader from '../components/TopHeader';
import SmartToyOutlinedIcon from '@mui/icons-material/SmartToyOutlined';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import MicIcon from '@mui/icons-material/Mic';
import SendIcon from '@mui/icons-material/Send';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import './SmartConversation.css';

export default function SmartConversation({ 
  userName = "عبد الله محمد", 
  userRole = "حساب عميل", 
  onNewProject,
  onNavigate,
  initialData,
  initialIdea,
  initialMessage
}) {
  // حالة تخزين الفكرة أو الخدمة النشطة حالياً لتحديث الملخص بناءً عليها
  const [currentIdea, setCurrentIdea] = useState(
    initialData?.idea || initialIdea || 'تطوير متجر إلكتروني'
  );
  
  const selectedMessage = initialData?.message || initialMessage;

  // خريطة تفاصيل ونماذج المشاريع بناءً على الاقتراح المختار أو الأزرار
  const projectDetailsMap = {
    'متجر إلكتروني': {
      title: 'متجر رواق',
      category: 'متجر إلكتروني للمنتجات الحرفية المحلية',
      audience: 'المتسوقون في السعودية المهتمون بالمنتجات الحرفية المحلية.',
      features: [
        'كاتالوج منتجات مع البحث والتصفية المتقدمة',
        'الدفع عبر مدى و Apple Pay وخيارات التقسيط',
        'تتبع الشحنات والربط مع شركات التوصيل',
        'لوحة إدارة شاملة للمنتجات والمخزون والطلبات'
      ],
      techs: ['Shopify', 'Next.js'],
      budget: '12-18 ألف ر.س',
      duration: '4-6 أسابيع'
    },
    'تطوير متجر إلكتروني': {
      title: 'متجر رواق',
      category: 'متجر إلكتروني للمنتجات الحرفية المحلية',
      audience: 'المتسوقون في السعودية المهتمون بالمنتجات الحرفية المحلية.',
      features: [
        'كاتالوج منتجات مع البحث والتصفية المتقدمة',
        'الدفع عبر مدى و Apple Pay وخيارات التقسيط',
        'تتبع الشحنات والربط مع شركات التوصيل',
        'لوحة إدارة شاملة للمنتجات والمخزون والطلبات'
      ],
      techs: ['Shopify', 'Next.js'],
      budget: '12-18 ألف ر.س',
      duration: '4-6 أسابيع'
    },
    'تطبيق جوال': {
      title: 'تطبيق وصّل',
      category: 'تطبيق جوال لتوصيل الطلبات وتتبع السائقين',
      audience: 'المستخدمون في المملكة العربية السعودية ومقدمو الخدمات.',
      features: [
        'واجهة طلب سريعة مع تتبع حي عبر الخرائط',
        'بوابة دفع إلكتروني ومدفوعات Apple Pay و مدى',
        'نظام إشعارات فورية وتنبيهات للعملاء والسائقين',
        'لوحة إدارة العمليات ومتابعة التقارير المالية'
      ],
      techs: ['Flutter', 'Node.js', 'Firebase'],
      budget: '15-22 ألف ر.س',
      duration: '5-7 أسابيع'
    },
    'إنشاء تطبيق جوال': {
      title: 'تطبيق وصّل',
      category: 'تطبيق جوال لتوصيل الطلبات وتتبع السائقين',
      audience: 'المستخدمون في المملكة العربية السعودية ومقدمو الخدمات.',
      features: [
        'واجهة طلب سريعة مع تتبع حي عبر الخرائط',
        'بوابة دفع إلكتروني ومدفوعات Apple Pay و مدى',
        'نظام إشعارات فورية وتنبيهات للعملاء والسائقين',
        'لوحة إدارة العمليات ومتابعة التقارير المالية'
      ],
      techs: ['Flutter', 'Node.js', 'Firebase'],
      budget: '15-22 ألف ر.س',
      duration: '5-7 أسابيع'
    },
    'بوابات الدفع': {
      title: 'نظام المدفوعات الذكي',
      category: 'ربط بوابات دفع متعددة وآمنة',
      audience: 'العملاء المتممون لعمليات الشراء إلكترونياً.',
      features: [
        'تكامل فوري مع بوابات الدفع المحلية والعالمية',
        'دعم بطاقات مدى، فيزا، ماستركارد، و Apple Pay',
        'تسوية مالية تلقائية وتقارير أرباح لحظية',
        'أمان وحماية عالية متوافقة مع معايير PCI-DSS'
      ],
      techs: ['Stripe', 'PayTabs', 'Node.js'],
      budget: '5-8 آلاف ر.س',
      duration: '2-3 أسابيع'
    },
    'هوية وتصميم': {
      title: 'هوية إبداعية متكاملة',
      category: 'تصميم هوية بصرية وعلامة تجارية مميزة',
      audience: 'الجمهور المستهدف لعلامتك التجارية في السوق المحلي والإقليمي.',
      features: [
        'تصميم الشعار الأساسي والفرعي بالألوان المعتمدة',
        'دليل الهوية واستخدامات الخطوط والأيقونات',
        'قوالب الشبكات الاجتماعية والمطبوعات الرسمية',
        'تصميم واجهات وتطبيقات تجربة المستخدم الأساسية'
      ],
      techs: ['Figma', 'Illustrator', 'Design System'],
      budget: '8-14 ألف ر.س',
      duration: '3-4 أسابيع'
    }
  };

  const summary = projectDetailsMap[currentIdea] || projectDetailsMap['متجر إلكتروني'];

  const initialUserPrompt = selectedMessage || 'أريد استكشاف تفاصيل هذا المشروع وخصائصه التقنية.';

  const [messages, setMessages] = useState([
    { 
      sender: 'ai', 
      text: 'أهلاً بك! أنا مساعدك الذكي في ACCESS. سأساعدك على تحويل فكرتك إلى ملخص مشروع واضح. ما نوع المشروع الذي تفكر فيه؟' 
    },
    { 
      sender: 'user', 
      text: initialUserPrompt 
    },
    { 
      sender: 'ai', 
      text: `فكرة واضحة وممتازة! أضفت احتياجاتك المتعلقة بـ (${currentIdea}) إلى مسودة الملخص الحي على اليسار. راجع التفاصيل وأخبرني بأي إضافات أو تعديلات ترغب بها قبل الاعتماد.` 
    }
  ]);

  const [inputValue, setInputValue] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newMsg = inputValue;
    setMessages(prev => [...prev, { sender: 'user', text: newMsg }]);
    setInputValue('');

    setTimeout(() => {
      setMessages(prev => [
        ...prev, 
        { 
          sender: 'ai', 
          text: `تم تدوين ملاحظتك: "${newMsg}". تم تحديث تفاصيل الخطة والمواصفات الفنية بناءً على ذلك.` 
        }
      ]);
    }, 700);
  };

  // دالة تغيير الفكرة/المشروع عند النقر على أي زر مقترح
  const handleQuickSuggestion = (ideaName) => {
    setCurrentIdea(ideaName);
    setMessages(prev => [
      ...prev,
      { sender: 'user', text: `أريد التحويل إلى: ${ideaName}` },
      { sender: 'ai', text: `تم تحديث مسار المشروع إلى (${ideaName}). يمكنك مراجعة المزايا والمواصفات الجديدة المحدثة في الملخص الحي على اليسار.` }
    ]);
  };

  return (
    <div className="consultation-page-wrapper" dir="rtl">
      {/* الهيدر العلوي الموحد */}
      <TopHeader 
        userName={userName} 
        userRole={userRole} 
        onNewProject={onNewProject || (() => onNavigate && onNavigate('new-project'))} 
      />

      {/* عنوان الصفحة الرئيسي مع زر العودة */}
      <div className="consultation-page-header">
        <div className="consultation-main-title-row">
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            {onNavigate && (
              <button 
                type="button"
                className="back-consultation-btn"
                onClick={() => onNavigate('smartConsultation')}
                title="العودة لاختيار فكرة أخرى"
                style={{
                  background: '#ffffff',
                  border: '1px solid #EAEAEA',
                  borderRadius: '8px',
                  padding: '7px 14px',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '13px',
                  fontWeight: 700,
                  color: '#333',
                  fontFamily: 'inherit',
                  transition: 'all 0.2s',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
                }}
              >
                <ArrowForwardIcon sx={{ fontSize: 16, color: '#14A800' }} />
                <span>العودة للاقتراحات</span>
              </button>
            )}
            <h1>الاستشارة الذكية</h1>
          </div>

          <span className="stage-badge">
            <span className="dot-green"></span> مرحلة اكتشاف المشروع
          </span>
        </div>
        <p>شاركنا فكرتك، ولنرسم معاً ملامح مشروعك القادم بدقة وسرعة.</p>
      </div>

      {/* المحتوى الرئيسي: عمودان (المحادثة على اليمين والملخص على الشمال) */}
      <div className="consultation-grid-container">
        
        {/* 1. القسم الأيمن: صندوق المحادثة التفاعلي */}
        <div className="chat-interface-card">
          <div className="chat-top-bar">
            <div className="chat-bot-info">
              <div className="bot-avatar-icon">
                <SmartToyOutlinedIcon sx={{ color: '#14A800', fontSize: 20 }} />
              </div>
              <div>
                <strong>المساعد الذكي</strong>
                <small>من فكرة أولية إلى خطة واضحة</small>
              </div>
            </div>
            <span className="chat-dots">•••</span>
          </div>

          <div className="chat-session-divider">
            <span>جلسة استكشاف نشطة • {currentIdea}</span>
          </div>

          {/* رسائل المحادثة */}
          <div className="chat-messages-area">
            {messages.map((msg, idx) => (
              <div key={idx} className={`chat-bubble-row ${msg.sender}`}>
                {msg.sender === 'ai' && (
                  <div className="bubble-avatar">
                    <SmartToyOutlinedIcon sx={{ color: '#14A800', fontSize: 14 }} />
                  </div>
                )}
                <div className={`chat-bubble ${msg.sender}`}>
                  {msg.sender === 'ai' && <strong className="bubble-sender-name">المساعد الذكي</strong>}
                  {msg.sender === 'user' && <strong className="bubble-sender-name">أنت</strong>}
                  <p>{msg.text}</p>
                </div>
              </div>
            ))}

            {/* أزرار المقترحات السفلية (تمت إضافة زر "متجر إلكتروني" وزر "تطبيق جوال" وغيرها لتحديث الملخص فوراً) */}
            <div className="quick-suggestions-row" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '12px' }}>
              <button 
                type="button" 
                className={currentIdea === 'متجر إلكتروني' ? 'active-suggestion' : ''} 
                onClick={() => handleQuickSuggestion('متجر إلكتروني')}
              >
                متجر إلكتروني
              </button>
              <button 
                type="button" 
                className={currentIdea === 'تطبيق جوال' ? 'active-suggestion' : ''} 
                onClick={() => handleQuickSuggestion('تطبيق جوال')}
              >
                تطبيق جوال
              </button>
              <button 
                type="button" 
                className={currentIdea === 'بوابات الدفع' ? 'active-suggestion' : ''} 
                onClick={() => handleQuickSuggestion('بوابات الدفع')}
              >
                بوابات الدفع
              </button>
              <button 
                type="button" 
                className={currentIdea === 'هوية وتصميم' ? 'active-suggestion' : ''} 
                onClick={() => handleQuickSuggestion('هوية وتصميم')}
              >
                هوية وتصميم
              </button>
            </div>
          </div>

          {/* صندوق كتابة الرسالة */}
          <form className="chat-input-box" onSubmit={handleSend}>
            <textarea 
              rows={2} 
              placeholder="اكتب تفاصيل فكرتك أو أضف أي متطلبات إضافية..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend(e);
                }
              }}
            />
            <div className="chat-input-actions">
              <div className="chat-left-tools">
                <button type="button" title="إرفاق ملف"><AttachFileIcon sx={{ fontSize: 18 }} /></button>
                <button type="button" title="تسجيل صوتي"><MicIcon sx={{ fontSize: 18 }} /></button>
              </div>
              <button type="submit" className="chat-send-btn" title="إرسال">
                <SendIcon sx={{ fontSize: 16, transform: 'scaleX(-1)' }} />
              </button>
            </div>
          </form>

          <div className="chat-security-footer">
            <LockOutlinedIcon sx={{ fontSize: 13 }} /> أفكارك بأمان. تفاصيل هذه الجلسة خاصة بمساحة عملك.
          </div>
        </div>

        {/* 2. القسم الأيسر: ملخص المشروع الحي (يتحدث تلقائياً حسب الزر المختار) */}
        <div className="live-summary-card">
          <div className="summary-header">
            <h3>ملخص المشروع الحي</h3>
            <EditOutlinedIcon sx={{ fontSize: 18, color: '#666', cursor: 'pointer' }} />
          </div>
          <div className="status-badge-draft">مسودة أولية</div>

          <div className="summary-section-item">
            <span className="summary-label">اسم المشروع</span>
            <h4>{summary.title}</h4>
            <p className="summary-desc">{summary.category}</p>
          </div>

          <div className="summary-section-item">
            <span className="summary-label">الجمهور المستهدف</span>
            <p className="summary-text">{summary.audience}</p>
          </div>

          <div className="summary-section-item">
            <span className="summary-label">المزايا الأساسية</span>
            <ul className="features-list">
              {summary.features.map((feat, i) => (
                <li key={i}>
                  <CheckCircleOutlinedIcon sx={{ fontSize: 16, color: '#14A800' }} /> {feat}
                </li>
              ))}
            </ul>
          </div>

          <div className="summary-section-item">
            <span className="summary-label">التقنيات المقترحة مبدئياً</span>
            <div className="tech-tags">
              {summary.techs.map((tech, i) => (
                <span key={i}>{tech}</span>
              ))}
            </div>
          </div>

          {/* صندوق الميزانية والمدة */}
          <div className="budget-duration-box">
            <div className="bd-col">
              <span>الميزانية التقديرية الأولية</span>
              <strong>{summary.budget}</strong>
            </div>
            <div className="bd-divider"></div>
            <div className="bd-col">
              <span>المدة التقديرية الأولية</span>
              <strong>{summary.duration}</strong>
            </div>
          </div>
          <p className="bd-note">تقديرات أولية غير ملزمة. تراجع بعد تأكيد نطاق عمل الفريق.</p>

          <div className="summary-footer-status">
            <CheckCircleOutlinedIcon sx={{ fontSize: 15, color: '#14A800' }} /> تم إعداد مسودة الملخص بناءً على مدخلاتك
          </div>

          <button 
            type="button"
            className="btn-approve-project"
            onClick={() => {
              if (onNewProject) {
                onNewProject();
              } else if (onNavigate) {
                onNavigate('projects');
              }
            }}
          >
            اعتماد الملخص وبدء المشروع <ArrowBackIcon sx={{ fontSize: 18 }} />
          </button>
          <div className="edit-note-text">يمكنك تعديل التفاصيل قبل الاعتماد</div>
        </div>

      </div>
    </div>
  );
}
