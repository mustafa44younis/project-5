import React, { useState, useRef } from 'react';
import TopHeader from '../components/TopHeader';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorOutlineIcon from '@mui/icons-material/Error';
import QrCode2Icon from '@mui/icons-material/QrCode2';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DownloadIcon from '@mui/icons-material/Download';
import CloseIcon from '@mui/icons-material/Close';
import DevicesOtherOutlinedIcon from '@mui/icons-material/DevicesOtherOutlined';
import PhoneIphoneOutlinedIcon from '@mui/icons-material/PhoneIphoneOutlined';
import LaptopWindowsOutlinedIcon from '@mui/icons-material/LaptopWindowsOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import UploadFileOutlinedIcon from '@mui/icons-material/UploadFileOutlined';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import './Profile.css';

export default function Profile({ userName = "عبد الله العتيبي", userRole = "حساب عميل موثق", onNewProject, onNavigate }) {
  // حالة تبديل التابات داخل الملف الشخصي
  const [activeTab, setActiveTab] = useState('basic'); // 'basic', 'security', 'preferences'

  // بيانات نموذج التعديل
  const [formData, setFormData] = useState({
    firstName: 'عبد الله',
    lastName: 'العتيبي',
    email: 'abdullah@example.com',
    phone: '+966 5X XXX XXXX',
    companyName: 'مؤسسة ريادة الأعمال الرقمية',
    bio: 'رائد أعمال مهتم بتطوير المنصات الرقمية وحلول التجارة الإلكترونية.'
  });

  // بيانات الأمان وكلمة المرور
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [tfaEnabled, setTfaEnabled] = useState(true);
  const [showModal, setShowModal] = useState(null); // 'avatar', '2fa', 'identity-verify', 'devices'
  const [tfaStep, setTfaStep] = useState(1); // 1: QR, 2: Verify Code, 3: Backup Codes
  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
  const [otpError, setOtpError] = useState(false);
  const [hasError, setHasError] = useState(false);
  const otpRefs = useRef([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (passwords.newPassword && passwords.newPassword !== passwords.confirmPassword) {
      setHasError(true);
      return;
    }
    setHasError(false);
    alert('تم حفظ التغييرات بنجاح!');
  };

  return (
    <div className="profile-page-wrapper" dir="rtl">
      <TopHeader userName={userName} userRole={userRole} onNewProject={onNewProject} />

      <div className="profile-container">
        
        {/* الترويسة العليا للملف الشخصي */}
        <div className="profile-hero-card">
          <div className="hero-user-info">
            <div className="hero-avatar-wrapper" onClick={() => setShowModal('avatar')} title="تغيير الصورة الشخصية">
              <span className="avatar-initials">ع ع</span>
              <div className="avatar-camera-overlay">
                <CameraAltOutlinedIcon sx={{ fontSize: 16, color: '#fff' }} />
              </div>
            </div>
            <div>
              <div className="name-badge-row">
                <h2>{userName}</h2>
                <span className="verified-badge">
                  <CheckCircleIcon sx={{ fontSize: 14, color: '#14A800' }} /> حساب عميل موثق
                </span>
              </div>
              <p>إدارة معلوماتك الشخصية، توثيق حسابك، والحفاظ على أمانه من مكان واحد.</p>
            </div>
          </div>
          
          <div className="hero-score-box">
            <span className="score-number">44</span>
            <small>مؤشر أمان الحساب</small>
          </div>
        </div>

        {/* شريط التنقل الفرعي داخل الملف الشخصي */}
        <div className="profile-sub-nav">
          <button 
            type="button" 
            className={activeTab === 'basic' ? 'active' : ''} 
            onClick={() => setActiveTab('basic')}
          >
            <PersonOutlineOutlinedIcon sx={{ fontSize: 18 }} /> البيانات الأساسية
          </button>
          <button 
            type="button" 
            className={activeTab === 'security' ? 'active' : ''} 
            onClick={() => setActiveTab('security')}
          >
            <VerifiedUserOutlinedIcon sx={{ fontSize: 18 }} /> التوثيق والأمان
          </button>
          <button 
            type="button" 
            className={activeTab === 'preferences' ? 'active' : ''} 
            onClick={() => setActiveTab('preferences')}
          >
            <LockOutlinedIcon sx={{ fontSize: 18 }} /> تفضيلات الحساب
          </button>
        </div>

        {/* نموذج البيانات الأساسية والأمان */}
        <form onSubmit={handleSave}>
          
          {/* قسم البيانات الأساسية */}
          {(activeTab === 'basic' || activeTab === 'preferences') && (
            <div className="profile-section-card">
              <div className="section-card-header">
                <div className="section-title-icon"><PersonOutlineOutlinedIcon sx={{ color: '#14A800', fontSize: 20 }} /></div>
                <div>
                  <h3>البيانات الأساسية</h3>
                  <p>حدث معلوماتك الشخصية وبيانات التواصل الخاصة بحسابك.</p>
                </div>
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label>الاسم الأول</label>
                  <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                  <label>اسم العائلة</label>
                  <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} />
                </div>
              </div>

              <div className="form-grid-2" style={{ marginTop: '16px' }}>
                <div className="form-group">
                  <label>البريد الإلكتروني</label>
                  <input type="email" name="email" value={formData.email} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                  <label>رقم الجوال</label>
                  <input type="text" name="phone" value={formData.phone} onChange={handleInputChange} />
                </div>
              </div>

              <div className="form-group" style={{ marginTop: '16px' }}>
                <label>اسم الشركة / النشاط التجاري</label>
                <input type="text" name="companyName" value={formData.companyName} onChange={handleInputChange} />
              </div>

              <div className="form-group" style={{ marginTop: '16px' }}>
                <label>نبذة تعريفية / مجال العمل</label>
                <textarea rows={3} name="bio" value={formData.bio} onChange={handleInputChange} placeholder="اكتب نبذة قصيرة عن نشاطك ومعدل عملك لمساعدة فريق العمل في استيعاب مشروعك." />
              </div>
            </div>
          )}

          {/* قسم الأمان وكلمة المرور والمصادقة */}
          {(activeTab === 'security' || activeTab === 'preferences') && (
            <div className="profile-section-card">
              <div className="section-card-header">
                <div className="section-title-icon"><LockOutlinedIcon sx={{ color: '#14A800', fontSize: 20 }} /></div>
                <div>
                  <h3>الأمان وكلمة المرور</h3>
                  <p>لحماية حسابك، استخدم كلمة مرور قوية لا تستخدمها في حسابات أخرى.</p>
                </div>
              </div>

              <div className="form-grid-3">
                <div className="form-group">
                  <label>كلمة المرور الحالية</label>
                  <input type="password" name="currentPassword" placeholder="••••••••" value={passwords.currentPassword} onChange={handlePasswordChange} />
                </div>
                <div className="form-group">
                  <label>كلمة المرور الجديدة</label>
                  <input type="password" name="newPassword" placeholder="8 أحرف على الأقل" value={passwords.newPassword} onChange={handlePasswordChange} />
                </div>
                <div className={`form-group ${hasError ? 'error' : ''}`}>
                  <label>تأكيد كلمة المرور الجديدة</label>
                  <input type="password" name="confirmPassword" placeholder="أعد إدخال كلمة المرور" value={passwords.confirmPassword} onChange={handlePasswordChange} />
                </div>
              </div>
              {hasError && <div className="input-error-msg">كلمة المرور غير متطابقة، يرجى إعادة التأكد.</div>}
              <p className="password-tip"><CheckCircleIcon sx={{ fontSize: 14, color: '#14A800' }} /> استخدم 8 أحرف على الأقل، تتضمن أرقاماً ورموزاً وقيماً مميزة.</p>

              <div className="tfa-banner-box">
                <div className="tfa-info">
                  <strong>المصادقة الثنائية (2FA)</strong>
                  <small>مطبقة - طبقة حماية إضافية عند تسجيل الدخول إلى حسابك.</small>
                </div>
                <label className="switch">
                  <input type="checkbox" checked={tfaEnabled} onChange={() => { setTfaEnabled(!tfaEnabled); setShowModal('2fa'); }} />
                  <span className="slider round"></span>
                </label>
              </div>

              {/* قسم توثيق الهوية والنشاط التجاري والأجهزة */}
              <div className="identity-verification-area" style={{ marginTop: '24px' }}>
                <h4 style={{ fontSize: '15px', fontWeight: '800', marginBottom: '12px' }}>توثيق الهوية والنشاط التجاري</h4>
                <div className="id-cards-grid">
                  <div className="id-card-item">
                    <span className="status-dot green"></span>
                    <strong>توثيق الهوية الوطنية / الإقامة</strong>
                    <p>تم التحقق من الهوية عبر النفاذ الوطني الموحد.</p>
                    <button
                      type="button"
                      onClick={() => setShowModal('identity-verify')}
                      style={{ background: 'none', border: 'none', color: '#14A800', fontSize: '11px', fontWeight: '700', cursor: 'pointer', padding: '2px 0', textDecoration: 'underline' }}
                    >
                      تحديث التوثيق
                    </button>
                  </div>
                  <div className="id-card-item">
                    <span className="status-dot green"></span>
                    <strong>السجل التجاري / وثيقة العمل الحر</strong>
                    <p>رقم السجل: CR-1010XXXXXX - مسجل رسمي.</p>
                  </div>
                  <div className="id-card-item">
                    <span className="status-dot green"></span>
                    <strong>توثيق البريد الإلكتروني ورقم الجوال</strong>
                    <p>البريد ورقم الجوال مؤكدان بنجاح.</p>
                  </div>
                </div>

                {/* قسم الأجهزة المتصلة */}
                <div className="devices-section-area" style={{ marginTop: '24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <h4 style={{ fontSize: '15px', fontWeight: '800', margin: 0 }}>الأجهزة المتصلة وجلسات تسجيل الدخول</h4>
                    <button
                      type="button"
                      onClick={() => setShowModal('devices')}
                      style={{ background: 'none', border: 'none', color: '#14A800', fontSize: '12px', fontWeight: '700', cursor: 'pointer' }}
                    >
                      إدارة الجلسات
                    </button>
                  </div>
                  <div className="id-cards-grid">
                    <div className="id-card-item" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <PhoneIphoneOutlinedIcon sx={{ fontSize: 20, color: '#14A800' }} />
                      <div>
                        <strong>iPhone 14 Pro — iOS 17.4</strong>
                        <p>الرياض، السعودية • الجلسة الحالية • منذ 5 دقائق</p>
                      </div>
                      <span className="status-dot green" style={{ marginRight: 'auto' }}></span>
                    </div>
                    <div className="id-card-item" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <LaptopWindowsOutlinedIcon sx={{ fontSize: 20, color: '#667085' }} />
                      <div>
                        <strong>Windows 11 — Chrome 124</strong>
                        <p>جدة، السعودية • آخر نشاط: 17 أكتوبر 2026</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* شريط الحفظ السفلي */}
          <div className="settings-footer-bar">
            <small><LockOutlinedIcon sx={{ fontSize: 13 }} /> بياناتك محفوظة بأمان ولا يتم مشاركتها دون إذنك.</small>
            <div className="footer-actions">
              <button type="button" className="btn-cancel" onClick={() => window.location.reload()}>إلغاء</button>
              <button type="submit" className="btn-save">حفظ التغييرات</button>
            </div>
          </div>

        </form>

      </div>

      {/* مودال تحديث الصورة الشخصية */}
      {showModal === 'avatar' && (
        <div className="modal-overlay">
          <div className="modal-card">
            <div className="modal-header">
              <h3>تحديث الصورة الشخصية</h3>
              <button type="button" className="close-btn" onClick={() => setShowModal(null)}><CloseIcon sx={{ fontSize: 18 }} /></button>
            </div>
            <p className="modal-desc">صورتك الشخصية تساعد قادة الفريق على التعرف عليك وتعزز الثقة في التواصل.</p>
            
            <div className="avatar-upload-dropzone">
              <div className="preview-avatar-circle">ع</div>
              <p>اسحب الصورة هنا أو تصفح من جهازك (PNG, JPG) بحد أقصى 5MB</p>
              <button type="button" className="btn-browse">اختيار صورة أخرى</button>
            </div>

            <div className="modal-footer-actions">
              <button type="button" className="btn-cancel" onClick={() => setShowModal(null)}>إلغاء</button>
              <button type="button" className="btn-save" onClick={() => setShowModal(null)}>حفظ وتعيين الصورة</button>
            </div>
          </div>
        </div>
      )}

      {/* مودال المصادقة الثنائية 2FA */}
      {showModal === '2fa' && (
        <div className="modal-overlay">
          <div className="modal-card tfa-modal">
            <div className="modal-header">
              <h3>تفعيل المصادقة الثنائية (2FA)</h3>
              <button type="button" className="close-btn" onClick={() => setShowModal(null)}><CloseIcon sx={{ fontSize: 18 }} /></button>
            </div>

            <div className="tfa-stepper">
              <span className={tfaStep === 1 ? 'step active' : 'step completed'}>1. ربط التطبيق</span>
              <span className={tfaStep === 2 ? 'step active' : tfaStep > 2 ? 'step completed' : 'step'}>2. التحقق من الرمز</span>
              <span className={tfaStep === 3 ? 'step active' : 'step'}>3. رموز الاسترداد</span>
            </div>

            {tfaStep === 1 && (
              <div className="tfa-step-content">
                <p>امسح رمز الاستجابة السريعة (QR Code) باستخدام تطبيق المصادقة (Google Authenticator أو 1Password).</p>
                <div className="qr-code-box">
                  <QrCode2Icon sx={{ fontSize: 120, color: '#333' }} />
                </div>
                <div className="secret-key-row">
                  <span>JBSW Y3DP EHPK 3PXP</span>
                  <button type="button" className="copy-btn"><ContentCopyIcon sx={{ fontSize: 14 }} /> نسخ الرمز</button>
                </div>
                <div className="modal-footer-actions">
                  <button type="button" className="btn-cancel" onClick={() => setShowModal(null)}>إلغاء</button>
                  <button type="button" className="btn-save" onClick={() => setTfaStep(2)}>التالي، التحقق من الرمز</button>
                </div>
              </div>
            )}

            {tfaStep === 2 && (
              <div className="tfa-step-content">
                <p>أدخل رمز التحقق المكون من 6 أرقام الظاهر في هاتفك.</p>
                <div className="otp-inputs-row" dir="ltr">
                  {verificationCode.map((digit, i) => (
                    <input
                      key={i}
                      ref={(el) => (otpRefs.current[i] = el)}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      style={otpError && !digit ? { borderColor: '#F04438', backgroundColor: '#FFF5F5' } : {}}
                      onChange={(e) => {
                        const val = e.target.value.replace(/[^0-9]/g, '');
                        const newCode = [...verificationCode];
                        newCode[i] = val ? val.slice(-1) : '';
                        setVerificationCode(newCode);
                        if (otpError) setOtpError(false);

                        // الانتقال للخانة التالية تلقائياً عند كتابة رقم
                        if (val && i < 5 && otpRefs.current[i + 1]) {
                          otpRefs.current[i + 1].focus();
                        }
                      }}
                      onKeyDown={(e) => {
                        // الرجوع للخانة السابقة عند الحذف
                        if (e.key === 'Backspace') {
                          if (!verificationCode[i] && i > 0 && otpRefs.current[i - 1]) {
                            otpRefs.current[i - 1].focus();
                          }
                        }
                      }}
                      onPaste={(e) => {
                        // دعم اللصق المباشر لرمز الـ 6 أرقام
                        e.preventDefault();
                        const pasted = e.clipboardData.getData('text').replace(/[^0-9]/g, '').slice(0, 6);
                        if (pasted) {
                          const newCode = [...verificationCode];
                          pasted.split('').forEach((ch, idx) => { newCode[idx] = ch; });
                          setVerificationCode(newCode);
                          if (otpError) setOtpError(false);
                          const nextIdx = Math.min(pasted.length, 5);
                          if (otpRefs.current[nextIdx]) otpRefs.current[nextIdx].focus();
                        }
                      }}
                    />
                  ))}
                </div>
                {otpError && (
                  <p style={{ color: '#F04438', fontSize: '11.5px', fontWeight: '700', textAlign: 'center', margin: '-15px 0 20px 0' }}>
                    ⚠ يرجى إدخال كامل رمز التحقق (6 أرقام) للمتابعة
                  </p>
                )}
                <div className="modal-footer-actions">
                  <button type="button" className="btn-cancel" onClick={() => { setTfaStep(1); setOtpError(false); }}>السابق</button>
                  <button 
                    type="button" 
                    className="btn-save" 
                    onClick={() => {
                      const isComplete = verificationCode.every(d => d.trim() !== '');
                      if (!isComplete) {
                        setOtpError(true);
                        // Focus the first empty field
                        const firstEmptyIdx = verificationCode.findIndex(d => d.trim() === '');
                        if (firstEmptyIdx !== -1 && otpRefs.current[firstEmptyIdx]) {
                          otpRefs.current[firstEmptyIdx].focus();
                        }
                        return;
                      }
                      setOtpError(false);
                      setTfaStep(3);
                    }}
                  >
                    التحقق والمتابعة
                  </button>
                </div>
              </div>
            )}

            {tfaStep === 3 && (
              <div className="tfa-step-content">
                <p>احفظ هذه الرموز في مكان آمن. يمكنك استخدامها للدخول إلى حسابك إذا فقدت الوصول إلى تطبيق المصادقة.</p>
                <div className="backup-codes-grid">
                  <span>AX7K-92MP</span>
                  <span>BN4R-68TW</span>
                  <span>CF90-31HL</span>
                  <span>DK2V-75QS</span>
                </div>
                <div className="modal-footer-actions">
                  <button type="button" className="btn-cancel" onClick={() => setTfaStep(2)}>السابق</button>
                  <button type="button" className="btn-save" onClick={() => setShowModal(null)}>حفظ الرموز وإكمال الإعداد</button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

      {/* مودال تأكيد التوثيق والانتحاء الرسمي */}
      {showModal === 'identity-verify' && (
        <div className="modal-overlay">
          <div 
            className="modal-card" 
            style={{ 
              width: '450px', 
              maxWidth: '92vw', 
              height: '520px', 
              maxHeight: '85vh', 
              display: 'flex', 
              flexDirection: 'column', 
              padding: 0,
              overflow: 'hidden' 
            }}
          >
            <div className="modal-header" style={{ padding: '16px 20px', borderBottom: '1px solid #F1F5F9', margin: 0, flexShrink: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <BadgeOutlinedIcon sx={{ fontSize: 20, color: '#14A800' }} />
                <div>
                  <h3 style={{ margin: 0, fontSize: '15px', fontWeight: '900' }}>تأكيد التوثيق والانتحاء الرسمي</h3>
                  <small style={{ color: '#667085', fontSize: '11px' }}>ارفع وثيقتك الرسمية لتحديث بيانات التوثيق</small>
                </div>
              </div>
              <button type="button" className="close-btn" onClick={() => setShowModal(null)}><CloseIcon sx={{ fontSize: 18 }} /></button>
            </div>

            <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '14px', overflowY: 'auto', flex: 1 }}>
              {/* نوع الوثيقة */}
              <div className="form-group">
                <label>نوع الوثيقة</label>
                <select style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '12px', fontFamily: 'inherit', outline: 'none' }}>
                  <option>الهوية الوطنية</option>
                  <option>الإقامة</option>
                  <option>جواز السفر</option>
                </select>
              </div>

              {/* رقم الوثيقة */}
              <div className="form-group">
                <label>رقم الوثيقة</label>
                <input type="text" placeholder="أدخل رقم الوثيقة الرسمية" style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '12px', fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' }} />
              </div>

              {/* تاريخ الانتهاء */}
              <div className="form-group">
                <label>تاريخ انتهاء الوثيقة</label>
                <input type="date" style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '12px', fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' }} />
              </div>

              {/* رفع الوثيقة */}
              <div className="form-group">
                <label>رفع صورة الوثيقة</label>
                <div style={{ border: '2px dashed #CBD5E1', borderRadius: '10px', padding: '14px', textAlign: 'center', cursor: 'pointer', background: '#FAFAFA' }}
                  onClick={() => document.getElementById('id-file-input').click()}>
                  <UploadFileOutlinedIcon sx={{ fontSize: 24, color: '#94A3B8' }} />
                  <p style={{ fontSize: '11px', color: '#667085', margin: '4px 0 0 0' }}>اسحب الملف هنا أو <span style={{ color: '#14A800', textDecoration: 'underline' }}>تصفح من جهازك</span></p>
                  <small style={{ fontSize: '10px', color: '#94A3B8' }}>PDF, JPG, PNG بحد أقصى 5MB</small>
                  <input id="id-file-input" type="file" style={{ display: 'none' }} accept=".pdf,.jpg,.jpeg,.png" />
                </div>
              </div>

              {/* رقم الجوال للتحقق */}
              <div className="form-group">
                <label>رقم الجوال للتحقق</label>
                <input type="tel" placeholder="+966 5X XXX XXXX" defaultValue="+966 55 923 4920" style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '12px', fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' }} />
              </div>
            </div>

            <div className="modal-footer-actions" style={{ padding: '12px 20px', borderTop: '1px solid #F1F5F9', margin: 0, background: '#fff', flexShrink: 0 }}>
              <button type="button" className="btn-cancel" onClick={() => setShowModal(null)}>إلغاء</button>
              <button type="button" className="btn-save" onClick={() => { alert('تم إرسال طلب التوثيق بنجاح!'); setShowModal(null); }}>
                إرسال طلب التوثيق والتحقق
              </button>
            </div>
          </div>
        </div>
      )}

      {/* مودال الأجهزة المتصلة وجلسات تسجيل الدخول */}
      {showModal === 'devices' && (
        <div className="modal-overlay">
          <div className="modal-card" style={{ width: '480px', maxWidth: '95%' }}>
            <div className="modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <DevicesOtherOutlinedIcon sx={{ fontSize: 20, color: '#14A800' }} />
                <div>
                  <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '900' }}>الأجهزة المتصلة وجلسات تسجيل الدخول</h3>
                  <small style={{ color: '#667085', fontSize: '11px' }}>إدارة الجلسات النشطة وإلغاء الوصول من أجهزة أخرى</small>
                </div>
              </div>
              <button type="button" className="close-btn" onClick={() => setShowModal(null)}><CloseIcon sx={{ fontSize: 18 }} /></button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '16px 0' }}>
              {/* الجهاز الحالي */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: '10px', padding: '12px 14px' }}>
                <PhoneIphoneOutlinedIcon sx={{ fontSize: 24, color: '#14A800' }} />
                <div style={{ flex: 1 }}>
                  <strong style={{ fontSize: '13px', display: 'block' }}>iPhone 14 Pro — iOS 17.4</strong>
                  <small style={{ fontSize: '11px', color: '#15803D' }}>الرياض، السعودية • الجلسة الحالية • منذ 5 دقائق</small>
                </div>
                <span style={{ fontSize: '10px', background: '#14A800', color: '#fff', padding: '3px 8px', borderRadius: '6px', fontWeight: '700', whiteSpace: 'nowrap' }}>الجلسة الحالية</span>
              </div>

              {/* جهاز ويندوز */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: '#fff', border: '1px solid #E2E8F0', borderRadius: '10px', padding: '12px 14px' }}>
                <LaptopWindowsOutlinedIcon sx={{ fontSize: 24, color: '#667085' }} />
                <div style={{ flex: 1 }}>
                  <strong style={{ fontSize: '13px', display: 'block' }}>Windows 11 — Chrome 124</strong>
                  <small style={{ fontSize: '11px', color: '#667085' }}>جدة، السعودية • آخر نشاط: 17 أكتوبر 2026</small>
                </div>
                <button
                  type="button"
                  style={{ background: 'none', border: '1px solid #FCA5A5', color: '#D92D20', fontSize: '11px', fontWeight: '700', padding: '4px 10px', borderRadius: '6px', cursor: 'pointer' }}
                >
                  إلغاء الجلسة
                </button>
              </div>
            </div>

            <div className="modal-footer-actions" style={{ marginTop: '4px' }}>
              <button type="button" className="btn-cancel" onClick={() => setShowModal(null)}>إغلاق</button>
              <button
                type="button"
                style={{ background: '#D92D20', color: '#fff', border: 'none', borderRadius: '8px', padding: '9px 18px', fontSize: '12px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
                onClick={() => { alert('تم حذف جميع الجلسات الأخرى بنجاح!'); setShowModal(null); }}
              >
                <DeleteOutlinedIcon sx={{ fontSize: 16 }} /> حذف جميع الجلسات الأخرى
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
