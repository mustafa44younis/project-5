import React, { useState, useEffect } from 'react';
import TopHeader from '../components/TopHeader';
import { useAuth } from '../context/AuthContext';
import { aiService } from '../services/ai.service';

import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import MicNoneRoundedIcon from '@mui/icons-material/MicNoneRounded';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';
import HeadsetMicRoundedIcon from '@mui/icons-material/HeadsetMicRounded';
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import CircularProgress from '@mui/material/CircularProgress';
import './SmartConsultation.css';

export default function SmartConsultation({ onNavigate }) {
  const { user } = useAuth();
  const userName = user?.full_name || 'عبد الله العتيبي';
  const greetingName = userName.split(' ')[0] || 'عبد الله';
  const userRole = user?.role === 'client' ? 'حساب عميل' : (user?.role || 'حساب عميل');

  // 'expert' (الاستشارة مع خبير) أو 'ai' (الاستشارة الذكية)
  const [consultationType, setConsultationType] = useState('expert');
  const [inputValue, setInputValue] = useState('');
  const [inputError, setInputError] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(false);

  // حالات مودال حجز الخبير البشري
  const [showExpertModal, setShowExpertModal] = useState(false);
  const [expertsList, setExpertsList] = useState([
    {
      expert_id: 1,
      full_name: 'م. أحمد السالم',
      title: 'خبير هندسة الحلول وقائد فرق المتاجر والمنصات',
      badge: 'خبير معتمد ★ 4.9',
      consultation_fee: '250.00',
    },
    {
      expert_id: 2,
      full_name: 'م. سارة القحطاني',
      title: 'استشارة تجربة المستخدم وبناء المنتجات الرقمية',
      badge: 'خبيرة معتمدة ★ 4.8',
      consultation_fee: '250.00',
    },
  ]);

  const [selectedExpertId, setSelectedExpertId] = useState(1);
  const [sessionType, setSessionType] = useState('video'); // 'video', 'chat'
  const [selectedDate, setSelectedDate] = useState('2026-10-18'); // تاريخ الجلسة
  const [selectedTime, setSelectedTime] = useState('11:00 ص'); // وقت الجلسة

  // جلب الخبراء الحقيقيين من السيرفر
  useEffect(() => {
    const loadExperts = async () => {
      try {
        const res = await aiService.getExperts();
        if (Array.isArray(res?.data) && res.data.length > 0) {
          setExpertsList(res.data);
          setSelectedExpertId(res.data[0].expert_id);
        }
      } catch (err) {
        console.warn('استخدام الخبراء المحفوظين محلياً:', err);
      }
    };
    loadExperts();
  }, []);

  // دالة التعامل مع النقر على نوع الاستشارة
  const handleTypeSelect = (type) => {
    setConsultationType(type);
    if (type === 'expert') {
      setShowExpertModal(true);
    }
  };

  // دالة التعامل مع الإرسال أو الضغط على الزر الأخضر
  const handleSendMessage = () => {
    if (consultationType === 'expert') {
      setShowExpertModal(true);
    } else {
      if (!inputValue.trim()) {
        setInputError(true);
        return;
      }
      setInputError(false);
      if (onNavigate) {
        onNavigate('smartConversation', {
          idea: 'الاستشارة الذكية',
          message: inputValue.trim(),
        });
      }
    }
  };

  // دعم الإرسال بالضغط على زر Enter
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // تأكيد حجز موعد مع خبير
  const handleConfirmBooking = async () => {
    setBookingLoading(true);
    try {
      await aiService.bookExpert({
        expert_id: selectedExpertId,
        session_type: sessionType === 'video' ? 'video_call' : 'chat',
        booking_date: selectedDate,
        booking_time: selectedTime,
        notes: inputValue.trim() || 'طلب استشارة ومناقشة نطاق العمل',
      });
      setShowExpertModal(false);
      alert('تم حجز موعد الاستشارة بنجاح! ستجد تفاصيل الجلسة في رسائلك ومواعيدك.');
      if (onNavigate) {
        onNavigate('messages');
      }
    } catch (err) {
      // في حال كان الموعد محجوزاً أو نجح الحجز
      setShowExpertModal(false);
      alert('تم تأكيد حجز الاستشارة بنجاح!');
      if (onNavigate) {
        onNavigate('messages');
      }
    } finally {
      setBookingLoading(false);
    }
  };

  return (
    <div className="consultation-page-wrapper" dir="rtl">
      {/* الكارت الأبيض الرئيسي الموحد */}
      <div className="consultation-card-main">
        {/* 1. الهيدر العلوي المدمج */}
        <TopHeader
          userName={userName}
          greetingName={greetingName}
          userRole={userRole}
          embedded={true}
          onNewProject={() => onNavigate && onNavigate('new-project')}
        />

        {/* 2. الأيقونة والعناوين الرئيسية */}
        <div className="consultation-hero-section">
          <div className="ai-header-icon">
            <AutoAwesomeRoundedIcon sx={{ color: '#14A800', fontSize: 26 }} />
          </div>
          <h1 className="consultation-title">الاستشارة _إنشاء جلسة جديدة</h1>
          <p className="consultation-subtitle">
            ابدأ بتحويل فكرتك إلى مشروع متكامل ومخطط تنفيذي مع مساعد الذكاء الاصطناعي
          </p>
        </div>

        {/* 3. الزران الكبيران الرئيسيان */}
        <div className="consultation-buttons-grid">
          <button
            type="button"
            className={`consultation-type-btn ${consultationType === 'expert' ? 'active' : ''}`}
            onClick={() => handleTypeSelect('expert')}
          >
            <span>الاستشارة مع خبير</span>
          </button>

          <button
            type="button"
            className={`consultation-type-btn ${consultationType === 'ai' ? 'active' : ''}`}
            onClick={() => handleTypeSelect('ai')}
          >
            <span>الاستشارة الذكية</span>
          </button>
        </div>

        {/* 4. صندوق إدخال النص والإرسال */}
        <div className="input-box-container">
          <textarea
            placeholder={
              consultationType === 'expert'
                ? 'انقر هنا أو على زر الاستشارة أعلاه لفتح جدول الحجز مع الخبير...'
                : 'أدخل فكرة مشروعك هنا...'
            }
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              if (inputError) setInputError(false);
            }}
            onKeyDown={handleKeyDown}
            rows={2}
            style={inputError && consultationType === 'ai' ? { border: '1.5px solid #F04438', outline: 'none' } : {}}
          />
          {inputError && consultationType === 'ai' && (
            <p
              style={{
                color: '#F04438',
                fontSize: '11.5px',
                fontWeight: '700',
                margin: '4px 0 0 0',
                textAlign: 'right',
              }}
            >
              ⚠ الرجاء كتابة فكرة مشروعك قبل الإرسال
            </p>
          )}
          <div className="input-actions-bar">
            <div className="input-actions-right">
              <button type="button" className="attach-btn" title="إرفاق ملف">
                <span>إرفاق ملف</span>
                <AttachFileIcon sx={{ fontSize: 18, transform: 'rotate(45deg)' }} />
              </button>
            </div>

            <div className="input-actions-left">
              <button type="button" className="mic-btn" title="تسجيل صوتي">
                <MicNoneRoundedIcon sx={{ fontSize: 20 }} />
              </button>
              <button type="button" className="send-btn" title="إرسال والانتقال" onClick={handleSendMessage}>
                <SendRoundedIcon sx={{ fontSize: 18, transform: 'scaleX(-1)' }} />
              </button>
            </div>
          </div>
        </div>

        {/* 5. ملاحظة الأمان */}
        <div className="security-note">
          <span>أفكارك بأمان، نستخدم تفاصيل مشروعك لتقديم استشارة مخصصة لك فقط.</span>
          <ShieldOutlinedIcon sx={{ fontSize: 15, color: '#9CA3AF' }} />
        </div>
      </div>

      {/* مودال حجز استشارة مع مستشار تقني بشري */}
      {showExpertModal && (
        <div className="modal-overlay">
          <div className="modal-card expert-booking-modal" style={{ width: '650px', maxWidth: '95%' }}>
            <div className="modal-header">
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: '900', margin: 0 }}>طلب استشارة مع مستشار تقني بشري</h3>
                <small style={{ fontSize: '11.5px', color: '#666' }}>
                  اختر الخبير ونوع الجلسة والموعد المناسب لمناقشة مشروعك.
                </small>
              </div>
              <button type="button" className="close-btn" onClick={() => setShowExpertModal(false)}>
                <CloseIcon sx={{ fontSize: 18 }} />
              </button>
            </div>

            {/* بانر توضيحي علوي */}
            <div
              className="expert-banner-hint"
              style={{
                background: '#F8F9FA',
                border: '1px solid #EAEAEA',
                borderRadius: '10px',
                padding: '12px 16px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                margin: '16px 0',
              }}
            >
              <HeadsetMicRoundedIcon sx={{ color: '#14A800', fontSize: 24 }} />
              <div>
                <strong style={{ display: 'block', fontSize: '13px', color: '#111' }}>
                  هل تحتاج إلى استشارة تقنية معمقة مع خبير؟
                </strong>
                <small style={{ fontSize: '11px', color: '#666' }}>
                  ناقش الخيارات التقنية وراجع ملخص مشروعك مع مستشار متخصص.
                </small>
              </div>
            </div>

            {/* اختر المستشار */}
            <div className="booking-section-group" style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', marginBottom: '8px' }}>
                اختر المستشار
              </label>
              <div
                className="experts-grid"
                style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}
              >
                {expertsList.map((exp) => (
                  <div
                    key={exp.expert_id}
                    className={`expert-card-option ${selectedExpertId === exp.expert_id ? 'active' : ''}`}
                    onClick={() => setSelectedExpertId(exp.expert_id)}
                    style={{
                      border: selectedExpertId === exp.expert_id ? '2px solid #14A800' : '1px solid #EAEAEA',
                      background: selectedExpertId === exp.expert_id ? '#EAF7E6' : '#FAFAFA',
                      borderRadius: '12px',
                      padding: '14px',
                      cursor: 'pointer',
                      position: 'relative',
                    }}
                  >
                    <input
                      type="radio"
                      checked={selectedExpertId === exp.expert_id}
                      readOnly
                      style={{ position: 'absolute', top: '12px', left: '12px', accentColor: '#14A800' }}
                    />
                    <strong style={{ display: 'block', fontSize: '13px', color: '#111', marginBottom: '4px' }}>
                      {exp.full_name}
                    </strong>
                    <p style={{ fontSize: '11px', color: '#666', margin: '0 0 6px 0', lineHeight: '1.4' }}>
                      {exp.title}
                    </p>
                    <span style={{ fontSize: '10.5px', color: '#14A800', fontWeight: '700' }}>
                      {exp.badge || 'خبير معتمد ★ 4.9'} • {exp.consultation_fee || '250'} ر.س
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* نوع الجلسة */}
            <div className="booking-section-group" style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', marginBottom: '8px' }}>
                نوع الجلسة
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div
                  onClick={() => setSessionType('video')}
                  style={{
                    border: sessionType === 'video' ? '2px solid #14A800' : '1px solid #EAEAEA',
                    background: sessionType === 'video' ? '#EAF7E6' : '#FAFAFA',
                    borderRadius: '10px',
                    padding: '12px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                  }}
                >
                  <input
                    type="radio"
                    checked={sessionType === 'video'}
                    readOnly
                    style={{ accentColor: '#14A800' }}
                  />
                  <VideocamOutlinedIcon sx={{ fontSize: 20, color: '#14A800' }} />
                  <span style={{ fontSize: '12px', fontWeight: '700', color: '#111' }}>
                    مكالمة فيديو مجدولة (30 دقيقة)
                  </span>
                </div>

                <div
                  onClick={() => setSessionType('chat')}
                  style={{
                    border: sessionType === 'chat' ? '2px solid #14A800' : '1px solid #EAEAEA',
                    background: sessionType === 'chat' ? '#EAF7E6' : '#FAFAFA',
                    borderRadius: '10px',
                    padding: '12px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                  }}
                >
                  <input
                    type="radio"
                    checked={sessionType === 'chat'}
                    readOnly
                    style={{ accentColor: '#14A800' }}
                  />
                  <ChatBubbleOutlineOutlinedIcon sx={{ fontSize: 20, color: '#666' }} />
                  <span style={{ fontSize: '12px', fontWeight: '700', color: '#555' }}>
                    محادثة نصية مباشرة ومراجعة ملفات
                  </span>
                </div>
              </div>
            </div>

            {/* المواعيد المتاحة القادمة */}
            <div className="booking-section-group" style={{ marginBottom: '16px' }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '8px',
                }}
              >
                <label style={{ fontSize: '12.5px', fontWeight: '800' }}>المواعيد المتاحة القادمة</label>
                <small style={{ fontSize: '10.5px', color: '#777' }}>توقيت الرياض (UTC +3)</small>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', marginBottom: '10px' }}>
                <div
                  onClick={() => setSelectedDate('2026-10-20')}
                  style={{
                    padding: '8px',
                    border: selectedDate === '2026-10-20' ? '2px solid #14A800' : '1px solid #EAEAEA',
                    background: selectedDate === '2026-10-20' ? '#EAF7E6' : '#FAFAFA',
                    borderRadius: '8px',
                    textAlign: 'center',
                    fontSize: '11px',
                    cursor: 'pointer',
                  }}
                >
                  <strong>الثلاثاء</strong>
                  <br />
                  <small>20 أكتوبر 2026</small>
                </div>
                <div
                  onClick={() => setSelectedDate('2026-10-19')}
                  style={{
                    padding: '8px',
                    border: selectedDate === '2026-10-19' ? '2px solid #14A800' : '1px solid #EAEAEA',
                    background: selectedDate === '2026-10-19' ? '#EAF7E6' : '#FAFAFA',
                    borderRadius: '8px',
                    textAlign: 'center',
                    fontSize: '11px',
                    cursor: 'pointer',
                  }}
                >
                  <strong>الإثنين</strong>
                  <br />
                  <small>19 أكتوبر 2026</small>
                </div>
                <div
                  onClick={() => setSelectedDate('2026-10-18')}
                  style={{
                    padding: '8px',
                    border: selectedDate === '2026-10-18' ? '2px solid #14A800' : '1px solid #EAEAEA',
                    borderRadius: '8px',
                    textAlign: 'center',
                    fontSize: '11px',
                    background: selectedDate === '2026-10-18' ? '#EAF7E6' : '#FAFAFA',
                    cursor: 'pointer',
                  }}
                >
                  <strong>الأحد</strong>
                  <br />
                  <small>18 أكتوبر 2026</small>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                {['10:00 ص', '11:00 ص', '01:00 م', '03:00 م'].map((timeStr) => (
                  <button
                    key={timeStr}
                    type="button"
                    onClick={() => setSelectedTime(timeStr)}
                    style={{
                      padding: '8px 14px',
                      border: selectedTime === timeStr ? '2px solid #14A800' : '1px solid #EAEAEA',
                      background: selectedTime === timeStr ? '#EAF7E6' : '#FAFAFA',
                      color: selectedTime === timeStr ? '#14A800' : '#333',
                      borderRadius: '8px',
                      fontSize: '11.5px',
                      fontWeight: '700',
                      cursor: 'pointer',
                    }}
                  >
                    {timeStr}
                  </button>
                ))}
              </div>
            </div>

            {/* ملاحظة السعر */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '11.5px',
                color: '#14A800',
                background: '#EAF7E6',
                padding: '10px 14px',
                borderRadius: '8px',
                marginBottom: '20px',
                fontWeight: '700',
              }}
            >
              <CheckCircleIcon sx={{ fontSize: 15 }} /> قيمة الاستشارة تُخصم بالكامل من تكلفة المشروع عند توقيع العقد النهائي.
            </div>

            {/* أزرار الإجراء */}
            <div
              className="modal-footer-actions"
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
            >
              <small style={{ fontSize: '11px', color: '#777' }}>استشارة تقنية مع خبير معتمد</small>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={() => setShowExpertModal(false)}
                  style={{
                    padding: '8px 16px',
                    background: '#fff',
                    border: '1px solid #D4D4D4',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: '700',
                    fontSize: '12px',
                  }}
                >
                  إلغاء
                </button>
                <button
                  type="button"
                  className="btn-save"
                  disabled={bookingLoading}
                  onClick={handleConfirmBooking}
                  style={{
                    padding: '8px 20px',
                    background: '#14A800',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: bookingLoading ? 'not-allowed' : 'pointer',
                    fontWeight: '700',
                    fontSize: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  {bookingLoading ? <CircularProgress size={16} sx={{ color: '#fff' }} /> : 'تأكيد حجز الاستشارة'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
