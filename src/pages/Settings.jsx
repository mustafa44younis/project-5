import React, { useState } from 'react';
import TopHeader from '../components/TopHeader';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import './Settings.css';

export default function Settings({ userName = "عبد الله العتيبي", userRole = "حساب عميل", onNewProject, onNavigate }) {
  // حالة الإشعارات
  const [notifications, setNotifications] = useState({
    projectUpdatesApp: true,
    projectUpdatesEmail: true,
    newMessagesApp: true,
    newMessagesEmail: true,
    financialApp: true,
    financialEmail: true,
    remindersApp: true,
    remindersEmail: true,
  });

  // حالة اللغة والمنطقة الزمنية
  const [language, setLanguage] = useState('العربية');
  const [timezone, setTimezone] = useState('الرياض (GMT+03:00)');

  // حالة الخصوصية
  const [privacy, setPrivacy] = useState({
    showStatus: true,
    shareAnalytics: false,
  });

  // حالة الفوترة والبطاقات
  const [cards, setCards] = useState([
    {
      id: 1,
      type: 'Mastercard',
      last4: '4821',
      expiry: '12/28',
      holder: 'Abdullah Al-Otaibi',
      isDefault: true
    }
  ]);

  const [billingInfo, setBillingInfo] = useState({
    businessName: 'مؤسسة ريادة الأعمال الرقمية',
    vatNumber: '310294819200003',
    billingAddress: 'طريق الملك فهد، الرياض 12331',
    billingEmail: 'billing@example.com'
  });

  // حالة المودالات والتنبيهات
  const [activeModal, setActiveModal] = useState(null); // 'deactivate', 'language-confirm', 'add-card'
  const [pendingLanguage, setPendingLanguage] = useState('');
  const [deactivateReason, setDeactivateReason] = useState('أخذ استراحة مؤقتة');
  const [deactivatePassword, setDeactivatePassword] = useState('');
  const [showSaveToast, setShowSaveToast] = useState(false);

  // نموذج إضافة بطاقة جديدة
  const [newCard, setNewCard] = useState({
    number: '',
    holder: '',
    expiry: '',
    cvv: ''
  });

  const handleToggleNotification = (key) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = (e) => {
    e?.preventDefault();
    setShowSaveToast(true);
    setTimeout(() => {
      setShowSaveToast(false);
    }, 4000);
  };

  const handleLanguageSelect = (newLang) => {
    if (newLang !== language) {
      setPendingLanguage(newLang);
      setActiveModal('language-confirm');
    }
  };

  const confirmLanguageChange = () => {
    setLanguage(pendingLanguage);
    setActiveModal(null);
    setShowSaveToast(true);
    setTimeout(() => setShowSaveToast(false), 4000);
  };

  const handleAddCard = (e) => {
    e.preventDefault();
    if (!newCard.number.trim()) return;
    const last4 = newCard.number.slice(-4) || '1234';
    setCards(prev => [
      ...prev,
      {
        id: Date.now(),
        type: 'Visa',
        last4: last4,
        expiry: newCard.expiry || '06/29',
        holder: newCard.holder || userName,
        isDefault: false
      }
    ]);
    setNewCard({ number: '', holder: '', expiry: '', cvv: '' });
    setActiveModal(null);
    setShowSaveToast(true);
    setTimeout(() => setShowSaveToast(false), 4000);
  };

  return (
    <div className="settings-page-wrapper" dir="rtl">
      {/* الهيدر العلوي الموحد */}
      <TopHeader userName={userName} userRole={userRole} onNewProject={onNewProject} />

      {/* تنبيه نجاح الحفظ العلوي المطابق للصورة الرابعة */}
      {showSaveToast && (
        <div className="settings-toast-banner">
          <div className="toast-content">
            <CheckCircleIcon sx={{ fontSize: 20, color: '#16A34A' }} />
            <span>تم حفظ الإعدادات والتفضيلات بنجاح ✓</span>
          </div>
          <button type="button" className="toast-close" onClick={() => setShowSaveToast(false)}>
            <CloseIcon sx={{ fontSize: 16 }} />
          </button>
        </div>
      )}

      {/* تخطيط الصفحة: المحتوى على اليمين والقائمة الجانبية على اليسار */}
      <div className="settings-container">
        
        {/* المحتوى الرئيسي (اليمين) */}
        <div className="settings-main-content">
          
          <div className="settings-top-title">
            <h1>إعدادات الحساب</h1>
            <p>اختر ما يصلك من إشعارات، وسائل الدفع والفوترة، وأضبط تفضيلات تجربتك في ACCESS.</p>
          </div>

          {/* 1. قسم إعدادات الإشعارات */}
          <section id="notifications" className="settings-section-card">
            <div className="section-card-header">
              <div className="section-title-icon"><NotificationsOutlinedIcon sx={{ color: '#14A800', fontSize: 20 }} /></div>
              <div>
                <h3>إعدادات الإشعارات</h3>
                <p>حدد التنبيهات المهمة لك، والقناة التي تفضل استقبالها عبرها.</p>
              </div>
            </div>

            <div className="notifications-table-header">
              <span>نوع الإشعار</span>
              <div className="headers-cols">
                <span>داخل التطبيق</span>
                <span>البريد الإلكتروني</span>
              </div>
            </div>

            <div className="notification-row">
              <div className="notif-info">
                <strong>تحديثات المشروعات والمراحل</strong>
                <small>كل جديد عن تقدم العمل وتسليم المراحل</small>
              </div>
              <div className="notif-toggles">
                <label className="switch">
                  <input 
                    type="checkbox" 
                    checked={notifications.projectUpdatesApp} 
                    onChange={() => handleToggleNotification('projectUpdatesApp')} 
                  />
                  <span className="slider round"></span>
                </label>
                <label className="switch">
                  <input 
                    type="checkbox" 
                    checked={notifications.projectUpdatesEmail} 
                    onChange={() => handleToggleNotification('projectUpdatesEmail')} 
                  />
                  <span className="slider round"></span>
                </label>
              </div>
            </div>

            <div className="notification-row">
              <div className="notif-info">
                <strong>الرسائل الجديدة</strong>
                <small>عندما يراسلك أحد أعضاء فريق مشروعك</small>
              </div>
              <div className="notif-toggles">
                <label className="switch">
                  <input 
                    type="checkbox" 
                    checked={notifications.newMessagesApp} 
                    onChange={() => handleToggleNotification('newMessagesApp')} 
                  />
                  <span className="slider round"></span>
                </label>
                <label className="switch">
                  <input 
                    type="checkbox" 
                    checked={notifications.newMessagesEmail} 
                    onChange={() => handleToggleNotification('newMessagesEmail')} 
                  />
                  <span className="slider round"></span>
                </label>
              </div>
            </div>

            <div className="notification-row">
              <div className="notif-info">
                <strong>النشاط المالي والمدفوعات</strong>
                <small>الإيداعات، سحب الدفعات، وتحديثات الرصيد والضمان</small>
              </div>
              <div className="notif-toggles">
                <label className="switch">
                  <input 
                    type="checkbox" 
                    checked={notifications.financialApp} 
                    onChange={() => handleToggleNotification('financialApp')} 
                  />
                  <span className="slider round"></span>
                </label>
                <label className="switch">
                  <input 
                    type="checkbox" 
                    checked={notifications.financialEmail} 
                    onChange={() => handleToggleNotification('financialEmail')} 
                  />
                  <span className="slider round"></span>
                </label>
              </div>
            </div>

            <div className="notification-row">
              <div className="notif-info">
                <strong>تذكيرات المراجعة والمواعيد</strong>
                <small>تنبيه قبل الاستحقاق وعند انتظار اعتمادك</small>
              </div>
              <div className="notif-toggles">
                <label className="switch">
                  <input 
                    type="checkbox" 
                    checked={notifications.remindersApp} 
                    onChange={() => handleToggleNotification('remindersApp')} 
                  />
                  <span className="slider round"></span>
                </label>
                <label className="switch">
                  <input 
                    type="checkbox" 
                    checked={notifications.remindersEmail} 
                    onChange={() => handleToggleNotification('remindersEmail')} 
                  />
                  <span className="slider round"></span>
                </label>
              </div>
            </div>

            <div className="security-notice-box">
              <VerifiedUserOutlinedIcon sx={{ fontSize: 18, color: '#14A800' }} />
              <span>تنبيهات الأمان الأساسية تصلك دائماً لحماية حسابك، ولا يمكن إيقافها.</span>
            </div>
          </section>

          {/* 2. قسم اللغة والمنطقة الزمنية */}
          <section id="language" className="settings-section-card">
            <div className="section-card-header">
              <div className="section-title-icon"><LanguageOutlinedIcon sx={{ color: '#14A800', fontSize: 20 }} /></div>
              <div>
                <h3>اللغة والمنطقة الزمنية</h3>
                <p>خصص لغة عرض واجهات المنصة والتوقيت المعتمد لتسليم المشاريع.</p>
              </div>
            </div>

            <div className="language-grid">
              <div className="form-group">
                <label>لغة الواجهة</label>
                <select 
                  value={language} 
                  onChange={(e) => handleLanguageSelect(e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px', background: '#fff', fontFamily: 'inherit' }}
                >
                  <option value="العربية">العربية (Arabic)</option>
                  <option value="English">English (الإنجليزية)</option>
                </select>
              </div>
              <div className="form-group">
                <label>المنطقة الزمنية</label>
                <input 
                  type="text" 
                  value={timezone} 
                  onChange={(e) => setTimezone(e.target.value)} 
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px', background: '#fff', fontFamily: 'inherit' }}
                />
              </div>
            </div>
            <p className="section-note">تُعرض مواعيد تسليم المشروعات والمعاملات حسب منطقتك الزمنية.</p>
          </section>

          {/* 3. قسم وسائل الدفع والفوترة (المطابق للصورة الثانية) */}
          <section id="billing" className="settings-section-card">
            <div className="section-card-header">
              <div className="section-title-icon"><CreditCardOutlinedIcon sx={{ color: '#14A800', fontSize: 20 }} /></div>
              <div>
                <h3>وسائل الدفع والفوترة</h3>
                <p>أدر بطاقاتك الائتمانية، وسائل الدفع المعتمدة، وبيانات الفواتير الضريبية.</p>
              </div>
            </div>

            {/* البطاقات المحفوظة */}
            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '800', marginBottom: '12px', color: '#181818' }}>
                البطاقات ووسائل الدفع المحفوظة
              </label>

              <div className="saved-cards-grid">
                {/* بطاقة إضافة بطاقة جديدة */}
                <div className="card-add-box" onClick={() => setActiveModal('add-card')}>
                  <div className="plus-circle-icon">
                    <AddRoundedIcon sx={{ fontSize: 22, color: '#14A800' }} />
                  </div>
                  <strong>إضافة بطاقة دفع جديدة</strong>
                  <small>مدى، فيزا، أو ماستركارد</small>
                </div>

                {/* البطاقات المسجلة */}
                {cards.map((c) => (
                  <div key={c.id} className="saved-card-item">
                    <div className="card-top-row">
                      <span className="card-brand-tag">{c.type}</span>
                      {c.isDefault && <span className="default-card-badge">البطاقة الافتراضية</span>}
                    </div>
                    <div className="card-number-dots">•••• {c.last4}</div>
                    <div className="card-bottom-row">
                      <span>{c.holder}</span>
                      <span>ينتهي {c.expiry}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* معلومات الفاتورة الضريبية */}
            <div className="tax-invoice-form-box">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                <ReceiptLongOutlinedIcon sx={{ fontSize: 18, color: '#14A800' }} />
                <h4 style={{ margin: 0, fontSize: '14px', fontWeight: '900', color: '#181818' }}>معلومات الفاتورة الضريبية</h4>
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label>الاسم التجاري أو الشخصي في الفاتورة</label>
                  <input 
                    type="text" 
                    value={billingInfo.businessName} 
                    onChange={(e) => setBillingInfo({ ...billingInfo, businessName: e.target.value })} 
                  />
                </div>
                <div className="form-group">
                  <label>الرقم الضريبي (VAT ID) — اختياري</label>
                  <input 
                    type="text" 
                    value={billingInfo.vatNumber} 
                    onChange={(e) => setBillingInfo({ ...billingInfo, vatNumber: e.target.value })} 
                  />
                </div>
              </div>

              <div className="form-grid-2" style={{ marginTop: '14px' }}>
                <div className="form-group">
                  <label>عنوان الفاتورة والرمز البريدي</label>
                  <input 
                    type="text" 
                    value={billingInfo.billingAddress} 
                    onChange={(e) => setBillingInfo({ ...billingInfo, billingAddress: e.target.value })} 
                  />
                </div>
                <div className="form-group">
                  <label>البريد الإلكتروني لاستلام الفواتير</label>
                  <input 
                    type="email" 
                    value={billingInfo.billingEmail} 
                    onChange={(e) => setBillingInfo({ ...billingInfo, billingEmail: e.target.value })} 
                  />
                </div>
              </div>

              <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'flex-start' }}>
                <button 
                  type="button" 
                  className="btn-save-billing" 
                  onClick={handleSave}
                >
                  حفظ بيانات الفوترة
                </button>
              </div>
            </div>
          </section>

          {/* 4. قسم الخصوصية وتفضيلات الحساب */}
          <section id="privacy" className="settings-section-card">
            <div className="section-card-header">
              <div className="section-title-icon"><LockOutlinedIcon sx={{ color: '#14A800', fontSize: 20 }} /></div>
              <div>
                <h3>الخصوصية وتفضيلات الحساب</h3>
                <p>تحكم في خصوصية حسابك ومشاركة بيانات الاستخدام.</p>
              </div>
            </div>

            <div className="notification-row">
              <div className="notif-info">
                <strong>إظهار حالة الاتصال</strong>
                <small>السماح لأعضاء فريق مشروعك بمعرفة أنك متصل الآن</small>
              </div>
              <div className="notif-toggles">
                <label className="switch">
                  <input 
                    type="checkbox" 
                    checked={privacy.showStatus} 
                    onChange={() => setPrivacy(p => ({ ...p, showStatus: !p.showStatus }))} 
                  />
                  <span className="slider round"></span>
                </label>
              </div>
            </div>

            <div className="notification-row">
              <div className="notif-info">
                <strong>مشاركة بيانات الاستخدام لتحسين التجربة</strong>
                <small>بيانات استخدام عامة لا تشمل محتوى ملفاتك أو تفاصيل العقود</small>
              </div>
              <div className="notif-toggles">
                <label className="switch">
                  <input 
                    type="checkbox" 
                    checked={privacy.shareAnalytics} 
                    onChange={() => setPrivacy(p => ({ ...p, shareAnalytics: !p.shareAnalytics }))} 
                  />
                  <span className="slider round"></span>
                </label>
              </div>
            </div>
          </section>

          {/* 5. قسم تعطيل الحساب (المنطقة الحساسة) */}
          <section id="deactivate" className="settings-section-card danger-zone-card">
            <div className="section-card-header">
              <div className="section-title-icon danger-icon-bg">
                <WarningAmberRoundedIcon sx={{ color: '#D92D20', fontSize: 22 }} />
              </div>
              <div>
                <h3 style={{ color: '#D92D20' }}>تعطيل الحساب مؤقتاً</h3>
                <p>يمكنك تعطيل حسابك مؤقتاً عند الحاجة مع إمكانية استعادته لاحقاً.</p>
              </div>
            </div>

            <div style={{ background: '#FEF2F2', border: '1px solid #FEE2E2', borderRadius: '10px', padding: '14px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
              <div>
                <strong style={{ fontSize: '13px', color: '#991B1B', display: 'block' }}>إيقاف الحساب وتعليق العمليات</strong>
                <small style={{ fontSize: '11.5px', color: '#7F1D1D' }}>سيتم إيقاف كافة التنبيهات ولن يتمكن فريق العمل من مراسلتك حتى تعيد تفعيل الحساب.</small>
              </div>
              <button 
                type="button" 
                className="btn-deactivate-trigger"
                onClick={() => setActiveModal('deactivate')}
              >
                تعطيل الحساب...
              </button>
            </div>
          </section>

          {/* شريط الحفظ السفلي الموحد */}
          <div className="settings-footer-bar">
            <small>راجع بياناتك قبل حفظ التغييرات.</small>
            <div className="footer-actions">
              <button type="button" className="btn-cancel" onClick={() => window.location.reload()}>إلغاء</button>
              <button type="button" className="btn-save" onClick={handleSave}>حفظ التغييرات</button>
            </div>
          </div>

        </div>

        {/* القائمة الجانبية (اليسار) */}
        <div className="settings-sidebar">
          <div className="sidebar-group-title">تصنيف مساحة العمل</div>
          
          <a href="#notifications" className="sidebar-item active">
            <NotificationsOutlinedIcon sx={{ fontSize: 18 }} />
            <span>إعدادات الإشعارات</span>
          </a>
          
          <a href="#language" className="sidebar-item">
            <LanguageOutlinedIcon sx={{ fontSize: 18 }} />
            <span>اللغة والمنطقة الزمنية</span>
          </a>

          <a href="#billing" className="sidebar-item">
            <CreditCardOutlinedIcon sx={{ fontSize: 18 }} />
            <span>وسائل الدفع والفوترة</span>
          </a>
          
          <a href="#privacy" className="sidebar-item">
            <LockOutlinedIcon sx={{ fontSize: 18 }} />
            <span>الخصوصية وتفضيلات الحساب</span>
          </a>

          <a href="#deactivate" className="sidebar-item danger-link">
            <WarningAmberRoundedIcon sx={{ fontSize: 18 }} />
            <span>تعطيل الحساب</span>
          </a>

          <div className="sidebar-separator"></div>

          <div className="sidebar-user-box">
            <div className="user-box-icon"><PersonOutlineOutlinedIcon sx={{ fontSize: 20, color: '#14A800' }} /></div>
            <div>
              <strong>معلوماتك الشخصية</strong>
              <small>لتعديل اسمك أو كلمة المرور، اذهب إلى الملف الشخصي</small>
              <span 
                onClick={() => onNavigate && onNavigate('profile')} 
                className="profile-link-text"
                style={{ cursor: 'pointer' }}
              >
                الملف الشخصي ←
              </span>
            </div>
          </div>

          <button type="button" className="sidebar-custom-btn" onClick={() => onNavigate && onNavigate('profile')}>
            تفاصيل خاصة بحسابك
          </button>
        </div>

      </div>

      {/* مودال تأكيد تعطيل الحساب المطابق للصورة الأولى */}
      {activeModal === 'deactivate' && (
        <div className="settings-modal-overlay">
          <div className="settings-modal-card">
            <div className="modal-danger-icon-circle">
              <WarningAmberRoundedIcon sx={{ fontSize: 28, color: '#DC2626' }} />
            </div>

            <h3 style={{ fontSize: '18px', fontWeight: '900', color: '#181818', margin: '0 0 6px 0', textAlign: 'center' }}>
              هل أنت متأكد من رغبتك في تعطيل الحساب؟
            </h3>
            
            <p style={{ fontSize: '12px', color: '#667085', lineHeight: 1.6, textAlign: 'center', margin: '0 0 16px 0' }}>
              عند تعطيل الحساب، سيتم إيقاف كافة المشاريع الجارية ولن تتمكن من الوصول إلى الملفات أو المحادثات حتى إعادة التفعيل.
            </p>

            <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
              <div className="form-group">
                <label style={{ fontSize: '12px', fontWeight: '800', color: '#334155' }}>سبب التعطيل (اختياري)</label>
                <select 
                  value={deactivateReason} 
                  onChange={(e) => setDeactivateReason(e.target.value)}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '12px', background: '#fff', fontFamily: 'inherit' }}
                >
                  <option>أخذ استراحة مؤقتة</option>
                  <option>إنجاز جميع مشاريعي الحالية</option>
                  <option>أواجه صعوبة في استخدام المنصة</option>
                  <option>سبب آخر</option>
                </select>
              </div>

              <div className="form-group">
                <label style={{ fontSize: '12px', fontWeight: '800', color: '#334155' }}>أدخل كلمة المرور لتأكيد التعطيل</label>
                <input 
                  type="password" 
                  placeholder="••••••••" 
                  value={deactivatePassword} 
                  onChange={(e) => setDeactivatePassword(e.target.value)}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '12px', background: '#fff', boxSizing: 'border-box' }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button 
                type="button" 
                onClick={() => setActiveModal(null)}
                style={{ flex: 1, background: '#fff', border: '1px solid #CBD5E1', borderRadius: '8px', padding: '10px', fontSize: '12.5px', fontWeight: '700', color: '#334155', cursor: 'pointer', fontFamily: 'inherit' }}
              >
                إلغاء
              </button>
              <button 
                type="button" 
                onClick={() => {
                  alert('تم تعطيل الحساب بنجاح.');
                  setActiveModal(null);
                }}
                style={{ flex: 1.5, background: '#DC2626', border: 'none', borderRadius: '8px', padding: '10px', fontSize: '12.5px', fontWeight: '800', color: '#fff', cursor: 'pointer', fontFamily: 'inherit', boxShadow: '0 4px 12px rgba(220, 38, 38, 0.25)' }}
              >
                تأكيد تعطيل الحساب فوراً
              </button>
            </div>
          </div>
        </div>
      )}

      {/* مودال تأكيد تغيير لغة العرض المطابق للصورة الثالثة */}
      {activeModal === 'language-confirm' && (
        <div className="settings-modal-overlay">
          <div className="settings-modal-card" style={{ width: '420px', textAlign: 'center' }}>
            <div className="modal-green-icon-circle">
              <LanguageOutlinedIcon sx={{ fontSize: 28, color: '#16A34A' }} />
            </div>

            <h3 style={{ fontSize: '17px', fontWeight: '900', color: '#181818', margin: '0 0 6px 0' }}>
              تغيير لغة العرض إلى {pendingLanguage}
            </h3>
            
            <p style={{ fontSize: '12px', color: '#667085', lineHeight: 1.6, margin: '0 0 20px 0' }}>
              سيتم إعادة تحميل وتطبيق اللغة الجديدة على كامل واجهات المنصة وحسابك.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <button 
                type="button" 
                onClick={confirmLanguageChange}
                style={{ width: '100%', background: '#14A800', border: 'none', borderRadius: '8px', padding: '11px', fontSize: '13px', fontWeight: '800', color: '#fff', cursor: 'pointer', fontFamily: 'inherit' }}
              >
                نعم، تغيير لغة المنصة الآن
              </button>
              <button 
                type="button" 
                onClick={() => setActiveModal(null)}
                style={{ width: '100%', background: '#fff', border: '1px solid #CBD5E1', borderRadius: '8px', padding: '10px', fontSize: '12px', fontWeight: '700', color: '#334155', cursor: 'pointer', fontFamily: 'inherit' }}
              >
                البقاء على اللغة الحالية
              </button>
            </div>
          </div>
        </div>
      )}

      {/* مودال إضافة بطاقة دفع جديدة */}
      {activeModal === 'add-card' && (
        <div className="settings-modal-overlay">
          <div className="settings-modal-card" style={{ width: '450px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', borderBottom: '1px solid #F1F5F9', paddingBottom: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CreditCardOutlinedIcon sx={{ color: '#14A800', fontSize: 22 }} />
                <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '900' }}>إضافة بطاقة دفع جديدة</h3>
              </div>
              <button type="button" onClick={() => setActiveModal(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748B' }}>
                <CloseIcon sx={{ fontSize: 18 }} />
              </button>
            </div>

            <form onSubmit={handleAddCard} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div className="form-group">
                <label style={{ fontSize: '12px', fontWeight: '700' }}>رقم البطاقة</label>
                <input 
                  type="text" 
                  placeholder="0000 0000 0000 0000" 
                  value={newCard.number} 
                  onChange={(e) => setNewCard({ ...newCard, number: e.target.value })} 
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '12px', boxSizing: 'border-box' }}
                  required
                />
              </div>

              <div className="form-group">
                <label style={{ fontSize: '12px', fontWeight: '700' }}>اسم حامل البطاقة</label>
                <input 
                  type="text" 
                  placeholder="كما هو مكتوب على البطاقة" 
                  value={newCard.holder} 
                  onChange={(e) => setNewCard({ ...newCard, holder: e.target.value })} 
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '12px', boxSizing: 'border-box' }}
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div className="form-group">
                  <label style={{ fontSize: '12px', fontWeight: '700' }}>تاريخ الانتهاء</label>
                  <input 
                    type="text" 
                    placeholder="MM/YY" 
                    value={newCard.expiry} 
                    onChange={(e) => setNewCard({ ...newCard, expiry: e.target.value })} 
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '12px', boxSizing: 'border-box' }}
                    required
                  />
                </div>
                <div className="form-group">
                  <label style={{ fontSize: '12px', fontWeight: '700' }}>رمز الأمان (CVV)</label>
                  <input 
                    type="password" 
                    maxLength={4} 
                    placeholder="123" 
                    value={newCard.cvv} 
                    onChange={(e) => setNewCard({ ...newCard, cvv: e.target.value })} 
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '12px', boxSizing: 'border-box' }}
                    required
                  />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
                <button 
                  type="button" 
                  onClick={() => setActiveModal(null)} 
                  style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid #CBD5E1', background: '#fff', fontSize: '12px', fontWeight: '700', cursor: 'pointer' }}
                >
                  إلغاء
                </button>
                <button 
                  type="submit" 
                  style={{ flex: 1.5, padding: '10px', borderRadius: '8px', border: 'none', background: '#14A800', color: '#fff', fontSize: '12px', fontWeight: '800', cursor: 'pointer' }}
                >
                  حفظ البطاقة
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
