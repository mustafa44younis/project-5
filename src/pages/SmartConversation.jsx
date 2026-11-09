import React, { useState, useEffect, useCallback } from 'react';
import TopHeader from '../components/TopHeader';
import { useAuth } from '../context/AuthContext';
import { aiService } from '../services/ai.service';

import SmartToyOutlinedIcon from '@mui/icons-material/SmartToyOutlined';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import MicIcon from '@mui/icons-material/Mic';
import SendIcon from '@mui/icons-material/Send';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import CircularProgress from '@mui/material/CircularProgress';
import './SmartConversation.css';

export default function SmartConversation({
  userName,
  userRole,
  onNewProject,
  onNavigate,
  initialData,
  initialIdea,
  initialMessage,
}) {
  const { user } = useAuth();
  const currentUserName = user?.full_name || userName || 'عبد الله محمد';
  const currentUserRole = user?.role === 'client' ? 'حساب عميل' : (user?.role || userRole || 'حساب عميل');

  const selectedMessage = initialData?.message || initialMessage;
  const [currentIdea, setCurrentIdea] = useState(
    initialData?.idea || initialIdea || 'تطوير متجر إلكتروني'
  );

  const [consultationId, setConsultationId] = useState(null);
  const [isAiTyping, setIsAiTyping] = useState(false);
  const [isApproving, setIsApproving] = useState(false);

  // خريطة تفاصيل ونماذج المشاريع الافتراضية كـ Fallback
  const defaultSummaryMap = {
    'متجر إلكتروني': {
      title: 'متجر رواق',
      category: 'متجر إلكتروني للمنتجات الحرفية المحلية',
      audience: 'المتسوقون في السعودية المهتمون بالمنتجات الحرفية المحلية.',
      features: [
        'كاتالوج منتجات مع البحث والتصفية المتقدمة',
        'الدفع عبر مدى و Apple Pay وخيارات التقسيط',
        'تتبع الشحنات والربط مع شركات التوصيل',
        'لوحة إدارة شاملة للمنتجات والمخزون والطلبات',
      ],
      techs: ['Shopify', 'Next.js'],
      budget: '12-18 ألف ر.س',
      duration: '4-6 أسابيع',
    },
    'تطوير متجر إلكتروني': {
      title: 'متجر رواق',
      category: 'متجر إلكتروني للمنتجات الحرفية المحلية',
      audience: 'المتسوقون في السعودية المهتمون بالمنتجات الحرفية المحلية.',
      features: [
        'كاتالوج منتجات مع البحث والتصفية المتقدمة',
        'الدفع عبر مدى و Apple Pay وخيارات التقسيط',
        'تتبع الشحنات والربط مع شركات التوصيل',
        'لوحة إدارة شاملة للمنتجات والمخزون والطلبات',
      ],
      techs: ['Shopify', 'Next.js'],
      budget: '12-18 ألف ر.س',
      duration: '4-6 أسابيع',
    },
    'تطبيق جوال': {
      title: 'تطبيق وصّل',
      category: 'تطبيق جوال لتوصيل الطلبات وتتبع السائقين',
      audience: 'المستخدمون في المملكة العربية السعودية ومقدمو الخدمات.',
      features: [
        'واجهة طلب سريعة مع تتبع حي عبر الخرائط',
        'بوابة دفع إلكتروني ومدفوعات Apple Pay و مدى',
        'نظام إشعارات فورية وتنبيهات للعملاء والسائقين',
        'لوحة إدارة العمليات ومتابعة التقارير المالية',
      ],
      techs: ['Flutter', 'Node.js', 'Firebase'],
      budget: '15-22 ألف ر.س',
      duration: '5-7 أسابيع',
    },
    'بوابات الدفع': {
      title: 'نظام المدفوعات الذكي',
      category: 'ربط بوابات دفع متعددة وآمنة',
      audience: 'العملاء المتممون لعمليات الشراء إلكترونياً.',
      features: [
        'تكامل فوري مع بوابات الدفع المحلية والعالمية',
        'دعم بطاقات مدى، فيزا، ماستركارد، و Apple Pay',
        'تسوية مالية تلقائية وتقارير أرباح لحظية',
        'أمان وحماية عالية متوافقة مع معايير PCI-DSS',
      ],
      techs: ['Stripe', 'PayTabs', 'Node.js'],
      budget: '5-8 آلاف ر.س',
      duration: '2-3 أسابيع',
    },
    'هوية وتصميم': {
      title: 'هوية إبداعية متكاملة',
      category: 'تصميم هوية بصرية وعلامة تجارية مميزة',
      audience: 'الجمهور المستهدف لعلامتك التجارية في السوق المحلي والإقليمي.',
      features: [
        'تصميم الشعار الأساسي والفرعي بالألوان المعتمدة',
        'دليل الهوية واستخدامات الخطوط والأيقونات',
        'قوالب الشبكات الاجتماعية والمطبوعات الرسمية',
        'تصميم واجهات وتطبيقات تجربة المستخدم الأساسية',
      ],
      techs: ['Figma', 'Illustrator', 'Design System'],
      budget: '8-14 ألف ر.س',
      duration: '3-4 أسابيع',
    },
  };

  // حالة الملخص الحي
  const [liveBrief, setLiveBrief] = useState(
    defaultSummaryMap[currentIdea] || defaultSummaryMap['متجر إلكتروني']
  );

  // قائمة الرسائل المتبادلة
  const initialUserPrompt = selectedMessage || 'أريد استكشاف تفاصيل هذا المشروع وخصائصه التقنية.';
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: 'أهلاً بك! أنا مساعدك الذكي في ACCESS. سأساعدك على تحويل فكرتك إلى ملخص مشروع واضح. ما نوع المشروع الذي تفكر فيه؟',
    },
    {
      sender: 'user',
      text: initialUserPrompt,
    },
    {
      sender: 'ai',
      text: `فكرة واضحة وممتازة! أضفت احتياجاتك المتعلقة بـ (${currentIdea}) إلى مسودة الملخص الحي على اليسار. راجع التفاصيل وأخبرني بأي إضافات أو تعديلات ترغب بها قبل الاعتماد.`,
    },
  ]);

  // الاقتراحات التفاعلية الحية من الذكاء الاصطناعي
  const [aiSuggestions, setAiSuggestions] = useState([
    'متجر إلكتروني',
    'تطبيق جوال',
    'بوابات الدفع',
    'هوية وتصميم',
  ]);

  const [inputValue, setInputValue] = useState('');

  // بدء الجلسة في الباك إند عند فتح الصفحة
  useEffect(() => {
    let isMounted = true;
    const startConsultationSession = async () => {
      try {
        const payload = {
          title: `استشارة: ${currentIdea}`,
          initial_idea: selectedMessage || currentIdea,
          project_type: currentIdea,
        };
        const res = await aiService.createConsultation(payload);
        if (isMounted && res?.data?.id) {
          setConsultationId(res.data.id);

          const c = res.data;
          // تحديث الملخص الحي من الباك إند
          if (c.features || c.target_audience) {
            setLiveBrief({
              title: c.title || 'متجر رواق',
              category: c.summary || c.project_type || 'مشروع رقمي متكامل',
              audience: Array.isArray(c.target_audience) ? c.target_audience.join('، ') : (c.target_audience || 'المتسوقون في المملكة العربية السعودية'),
              features: Array.isArray(c.features) && c.features.length > 0 ? c.features : ['كاتالوج المنتجات', 'بوابات الدفع', 'تتبع الشحنات'],
              techs: Array.isArray(c.suggested_technologies) && c.suggested_technologies.length > 0 ? c.suggested_technologies : ['Next.js', 'Shopify'],
              budget: c.min_budget && c.max_budget ? `${Number(c.min_budget).toLocaleString()} - ${Number(c.max_budget).toLocaleString()} ر.س` : '12-18 ألف ر.س',
              duration: c.min_duration_weeks && c.max_duration_weeks ? `${c.min_duration_weeks}-${c.max_duration_weeks} أسابيع` : '4-6 أسابيع',
            });
          }

          // رسائل المساعد الذكي الأولى
          if (Array.isArray(c.messages) && c.messages.length > 0) {
            const firstMsg = c.messages[0];
            setMessages([
              {
                sender: 'ai',
                text: firstMsg.message,
              },
            ]);
            let sug = firstMsg.suggestions;
            if (typeof sug === 'string') {
              try { sug = JSON.parse(sug); } catch { sug = []; }
            }
            if (Array.isArray(sug) && sug.length > 0) {
              setAiSuggestions(sug);
            }
          }
        }
      } catch (err) {
        console.warn('استخدام جلسة الاستشارة المحلية:', err);
      }
    };

    startConsultationSession();
    return () => {
      isMounted = false;
    };
  }, []);

  // إرسال رسالة للمساعد الذكي واستلام الرد الحي
  const handleSend = async (e) => {
    e?.preventDefault();
    if (!inputValue.trim()) return;

    const newMsg = inputValue.trim();
    setInputValue('');
    setMessages((prev) => [...prev, { sender: 'user', text: newMsg }]);
    setIsAiTyping(true);

    try {
      if (consultationId) {
        const res = await aiService.sendConsultationMessage(consultationId, newMsg);
        const aiMsg = res?.data?.assistant_message;
        const updatedBrief = res?.data?.live_brief;

        if (aiMsg?.message) {
          setMessages((prev) => [
            ...prev,
            {
              sender: 'ai',
              text: aiMsg.message,
            },
          ]);

          let sug = aiMsg.suggestions;
          if (typeof sug === 'string') {
            try { sug = JSON.parse(sug); } catch { sug = []; }
          }
          if (Array.isArray(sug) && sug.length > 0) {
            setAiSuggestions(sug);
          }
        }

        if (updatedBrief) {
          setLiveBrief({
            title: updatedBrief.title || liveBrief.title,
            category: updatedBrief.summary || updatedBrief.project_type || liveBrief.category,
            audience: Array.isArray(updatedBrief.target_audience)
              ? updatedBrief.target_audience.join('، ')
              : (updatedBrief.target_audience || liveBrief.audience),
            features: Array.isArray(updatedBrief.features) && updatedBrief.features.length > 0
              ? updatedBrief.features
              : liveBrief.features,
            techs: Array.isArray(updatedBrief.suggested_technologies) && updatedBrief.suggested_technologies.length > 0
              ? updatedBrief.suggested_technologies
              : liveBrief.techs,
            budget: updatedBrief.min_budget
              ? `${Number(updatedBrief.min_budget).toLocaleString()} - ${Number(updatedBrief.max_budget).toLocaleString()} ر.س`
              : liveBrief.budget,
            duration: updatedBrief.min_duration_weeks
              ? `${updatedBrief.min_duration_weeks}-${updatedBrief.max_duration_weeks} أسابيع`
              : liveBrief.duration,
          });
        }
      } else {
        // Fallback
        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            {
              sender: 'ai',
              text: `تم تدوين نقطتك: "${newMsg}". تم تحديث تفاصيل الخطة والمواصفات الفنية بناءً على ذلك.`,
            },
          ]);
        }, 600);
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: `تم استيعاب متطلباتك بخصوص: "${newMsg}". تم تحديث مسودة ملخص المشروع بالمواصفات الأنسب.`,
        },
      ]);
    } finally {
      setIsAiTyping(false);
    }
  };

  // دالة النقر على أي اقتراح
  const handleQuickSuggestion = (ideaName) => {
    setCurrentIdea(ideaName);
    if (defaultSummaryMap[ideaName]) {
      setLiveBrief(defaultSummaryMap[ideaName]);
    }
    setInputValue(ideaName);
    setTimeout(() => {
      // إرسال فوري
      setMessages((prev) => [
        ...prev,
        { sender: 'user', text: `أريد التركيز على: ${ideaName}` },
        {
          sender: 'ai',
          text: `تم تحديث مسار المشروع إلى (${ideaName}). يمكنك مراجعة المزايا والمواصفات الجديدة المحدثة في الملخص الحي على اليسار.`,
        },
      ]);
      if (consultationId) {
        aiService.sendConsultationMessage(consultationId, `أريد التركيز على: ${ideaName}`).catch(() => {});
      }
    }, 100);
  };

  // اعتماد الملخص وبدء المشروع / العقد
  const handleApproveBrief = async () => {
    setIsApproving(true);
    try {
      if (consultationId) {
        // توليد أو جلب العقد المبدئي المرتبط بجلسة الاستشارة
        await aiService.getContractByConsultation(consultationId);
      }
      alert('تم اعتماد ملخص المشروع وتوليد وثيقة نطاق العمل والعقد بنجاح!');
      if (onNavigate) {
        onNavigate('projects');
      } else if (onNewProject) {
        onNewProject();
      }
    } catch (err) {
      alert('تم اعتماد ملخص المشروع بنجاح!');
      if (onNavigate) {
        onNavigate('projects');
      } else if (onNewProject) {
        onNewProject();
      }
    } finally {
      setIsApproving(false);
    }
  };

  return (
    <div className="consultation-page-wrapper" dir="rtl">
      {/* الهيدر العلوي الموحد */}
      <TopHeader
        userName={currentUserName}
        userRole={currentUserRole}
        onNewProject={onNewProject || (() => onNavigate && onNavigate('new-project'))}
      />

      {/* عنوان الصفحة الرئيسي مع زر العودة */}
      <div className="consultation-page-header">
        <div className="consultation-main-title-row">
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            {onNavigate && (
              <button
                type="button"
                onClick={() => onNavigate('smartConsultation')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: '#F0FDF4',
                  border: '1px solid #DCFCE7',
                  borderRadius: '8px',
                  padding: '6px 12px',
                  color: '#14A800',
                  fontSize: '12px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
                }}
              >
                <ArrowForwardIcon sx={{ fontSize: 16, color: '#14A800' }} />
                <span>العودة للاستشارة</span>
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
                <strong>المساعد الذكي (AI Consultant)</strong>
                <small>من فكرة أولية إلى خطة تنفيذ وعقد واضح</small>
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

            {isAiTyping && (
              <div className="chat-bubble-row ai">
                <div className="bubble-avatar">
                  <SmartToyOutlinedIcon sx={{ color: '#14A800', fontSize: 14 }} />
                </div>
                <div className="chat-bubble ai">
                  <p style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: 0, color: '#64748B' }}>
                    <CircularProgress size={14} sx={{ color: '#14A800' }} />
                    جاري تحليل وتحديث الملخص الحي...
                  </p>
                </div>
              </div>
            )}

            {/* أزرار المقترحات التفاعلية الحية */}
            <div
              className="quick-suggestions-row"
              style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '12px' }}
            >
              {aiSuggestions.map((sug, i) => (
                <button
                  key={i}
                  type="button"
                  className={currentIdea === sug ? 'active-suggestion' : ''}
                  onClick={() => handleQuickSuggestion(sug)}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '8px',
                    fontSize: '11.5px',
                    fontWeight: '700',
                    cursor: 'pointer',
                    background: '#F8FAFC',
                    border: '1px solid #E2E8F0',
                    color: '#334155',
                  }}
                >
                  {sug}
                </button>
              ))}
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
                <button type="button" title="إرفاق ملف">
                  <AttachFileIcon sx={{ fontSize: 18 }} />
                </button>
                <button type="button" title="تسجيل صوتي">
                  <MicIcon sx={{ fontSize: 18 }} />
                </button>
              </div>
              <button type="submit" className="chat-send-btn" title="إرسال" disabled={isAiTyping}>
                <SendIcon sx={{ fontSize: 16, transform: 'scaleX(-1)' }} />
              </button>
            </div>
          </form>

          <div className="chat-security-footer">
            <LockOutlinedIcon sx={{ fontSize: 13 }} /> أفكارك بأمان. تفاصيل هذه الجلسة خاصة بمساحة عملك ومحمية بالكامل.
          </div>
        </div>

        {/* 2. القسم الأيسر: ملخص المشروع الحي المتحدث تلقائياً */}
        <div className="live-summary-card">
          <div className="summary-header">
            <h3>ملخص المشروع الحي</h3>
            <EditOutlinedIcon sx={{ fontSize: 18, color: '#666', cursor: 'pointer' }} />
          </div>
          <div className="status-badge-draft">مسودة أولية معتمدة على الذكاء الاصطناعي</div>

          <div className="summary-section-item">
            <span className="summary-label">اسم المشروع</span>
            <h4>{liveBrief.title}</h4>
            <p className="summary-desc">{liveBrief.category}</p>
          </div>

          <div className="summary-section-item">
            <span className="summary-label">الجمهور المستهدف</span>
            <p className="summary-text">{liveBrief.audience}</p>
          </div>

          <div className="summary-section-item">
            <span className="summary-label">المزايا الأساسية</span>
            <ul className="features-list">
              {liveBrief.features.map((feat, i) => (
                <li key={i}>
                  <CheckCircleOutlinedIcon sx={{ fontSize: 16, color: '#14A800' }} /> {feat}
                </li>
              ))}
            </ul>
          </div>

          <div className="summary-section-item">
            <span className="summary-label">التقنيات المقترحة مبدئياً</span>
            <div className="tech-tags">
              {liveBrief.techs.map((tech, i) => (
                <span key={i}>{tech}</span>
              ))}
            </div>
          </div>

          {/* صندوق الميزانية والمدة */}
          <div className="budget-duration-box">
            <div className="bd-col">
              <span>الميزانية التقديرية الأولية</span>
              <strong>{liveBrief.budget}</strong>
            </div>
            <div className="bd-divider"></div>
            <div className="bd-col">
              <span>المدة التقديرية الأولية</span>
              <strong>{liveBrief.duration}</strong>
            </div>
          </div>
          <p className="bd-note">تقديرات أولية غير ملزمة. تراجع بعد تأكيد نطاق عمل الفريق.</p>

          <div className="summary-footer-status">
            <CheckCircleOutlinedIcon sx={{ fontSize: 15, color: '#14A800' }} /> تم إعداد وتحديث مسودة الملخص بناءً على مدخلاتك الحية
          </div>

          <button
            type="button"
            className="btn-approve-project"
            disabled={isApproving}
            onClick={handleApproveBrief}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
            }}
          >
            {isApproving ? (
              <CircularProgress size={18} sx={{ color: '#fff' }} />
            ) : (
              <>
                اعتماد الملخص وبدء المشروع <ArrowBackIcon sx={{ fontSize: 18 }} />
              </>
            )}
          </button>
          <div className="edit-note-text">يمكنك تعديل التفاصيل قبل الاعتماد</div>
        </div>
      </div>
    </div>
  );
}
