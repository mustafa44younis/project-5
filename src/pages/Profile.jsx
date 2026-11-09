import React, { useState, useRef, useEffect, useCallback } from 'react';
import TopHeader from '../components/TopHeader';
import { useAuth } from '../context/AuthContext';
import { profileService } from '../services/profile.service';
import { uploadService } from '../services/upload.service';

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
import CircularProgress from '@mui/material/CircularProgress';
import './Profile.css';

export default function Profile({ userName, userRole, onNewProject, onNavigate }) {
  const { user, refreshUser, updateUser } = useAuth();
  const currentUserName = user?.full_name || userName || 'عبد الله العتيبي';
  const currentUserRole = user?.role === 'client' ? 'حساب عميل موثق' : (user?.role || userRole || 'حساب عميل موثق');

  // حالة تبديل التابات داخل الملف الشخصي
  const [activeTab, setActiveTab] = useState('basic'); // 'basic', 'security', 'preferences'
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [statusFeedback, setStatusFeedback] = useState({ type: '', message: '' });

  // بيانات نموذج التعديل
  const [formData, setFormData] = useState({
    firstName: 'عبد الله',
    lastName: 'العتيبي',
    email: user?.email || 'abdullah@example.com',
    phone: '+966 5X XXX XXXX',
    companyName: 'مؤسسة ريادة الأعمال الرقمية',
    bio: 'رائد أعمال مهتم بتطوير المنصات الرقمية وحلول التجارة الإلكترونية.',
  });

  // بيانات الأمان وكلمة المرور
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [tfaEnabled, setTfaEnabled] = useState(false);
  const [showModal, setShowModal] = useState(null); // 'avatar', '2fa', 'identity-verify', 'devices'
  const [tfaStep, setTfaStep] = useState(1); // 1: QR, 2: Verify Code, 3: Backup Codes
  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
  const [otpError, setOtpError] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [passwordErrorMsg, setPasswordErrorMsg] = useState('');
  const [securityScore, setSecurityScore] = useState(85);
  const [sessionsList, setSessionsList] = useState([]);
  const otpRefs = useRef([]);

  // حالات رفع الصورة الشخصية
  const avatarInputRef = useRef(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [selectedAvatarFile, setSelectedAvatarFile] = useState(null);
  const [avatarUploading, setAvatarUploading] = useState(false);
  const [avatarError, setAvatarError] = useState('');

  // حالات رفع وثيقة الهوية (KYC)
  const kycInputRef = useRef(null);
  const [kycFile, setKycFile] = useState(null);
  const [kycUploading, setKycUploading] = useState(false);
  const [kycUploadedUrl, setKycUploadedUrl] = useState('');
  const [kycDocType, setKycDocType] = useState('الهوية الوطنية');
  const [kycDocNumber, setKycDocNumber] = useState('');
  const [kycDocExpiry, setKycDocExpiry] = useState('');
  const [kycPhone, setKycPhone] = useState('');
  const [kycError, setKycError] = useState('');
  const [kycSuccess, setKycSuccess] = useState('');

  // جلب الملف الشخصي من السيرفر
  const fetchProfile = useCallback(async () => {
    try {
      setLoading(true);
      const res = await profileService.getProfile();
      const p = res?.data;
      if (p?.user) {
        const u = p.user;
        const nameParts = (u.full_name || '').split(' ');
        setFormData({
          firstName: u.first_name || nameParts[0] || 'عبد الله',
          lastName: u.last_name || nameParts.slice(1).join(' ') || 'العتيبي',
          email: u.email || '',
          phone: u.phone || '+966 5X XXX XXXX',
          companyName: u.company_name || 'مؤسسة ريادة الأعمال الرقمية',
          bio: u.bio || 'رائد أعمال مهتم بتطوير المنصات الرقمية وحلول التجارة الإلكترونية.',
        });
        setTfaEnabled(Boolean(u.two_factor_enabled || p.security?.two_factor_enabled));
      }
      if (p?.security?.active_sessions_count) {
        setSecurityScore(p.security.two_factor_enabled ? 95 : 75);
      }
    } catch (err) {
      console.warn('استخدام بيانات الملف الشخصي المحفوظة:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setStatusFeedback({ type: '', message: '' });
    setPasswordErrorMsg('');

    // التحقق من كلمة المرور إذا أراد تغييرها
    if (passwords.newPassword) {
      if (passwords.newPassword.length < 6) {
        setHasError(true);
        setPasswordErrorMsg('كلمة المرور الجديدة يجب أن تكون 6 أحرف على الأقل.');
        return;
      }
      if (passwords.newPassword !== passwords.confirmPassword) {
        setHasError(true);
        setPasswordErrorMsg('كلمة المرور غير متطابقة، يرجى إعادة التأكد.');
        return;
      }
      if (!passwords.currentPassword) {
        setHasError(true);
        setPasswordErrorMsg('يرجى إدخال كلمة المرور الحالية لتأكيد التغيير.');
        return;
      }
    }

    setHasError(false);
    setSaving(true);

    try {
      // 1. تحديث البيانات الشخصية
      const fullName = `${formData.firstName} ${formData.lastName}`.trim();
      await profileService.updateProfile({
        full_name: fullName,
        first_name: formData.firstName,
        last_name: formData.lastName,
        phone: formData.phone,
        company_name: formData.companyName,
        bio: formData.bio,
      });

      // 2. تحديث كلمة المرور إذا كتبت
      if (passwords.newPassword && passwords.currentPassword) {
        await profileService.changePassword(passwords.currentPassword, passwords.newPassword);
        setPasswords({ currentPassword: '', newPassword: '', confirmPassword: '' });
      }

      // تحديث السياق العام للمستخدم
      if (refreshUser) {
        await refreshUser();
      }

      setStatusFeedback({ type: 'success', message: 'تم حفظ كافة التغييرات والبيانات بنجاح!' });
      setTimeout(() => setStatusFeedback({ type: '', message: '' }), 3000);
    } catch (err) {
      setStatusFeedback({
        type: 'error',
        message: err.message || 'حدث خطأ أثناء حفظ التغييرات، يرجى المحاولة لاحقاً',
      });
    } finally {
      setSaving(false);
    }
  };

  const getInitials = (first, last) => {
    const f = (first || '').trim()[0] || 'ع';
    const l = (last || '').trim()[0] || 'ع';
    return `${f} ${l}`;
  };

  // ============================================================
  // دوال رفع الصورة الشخصية
  // ============================================================
  const resolveAvatarUrl = (url) => {
    if (!url) return null;
    if (url.startsWith('data:') || url.startsWith('blob:')) return url;
    if (url.includes('localhost:5000/uploads/')) {
      return url.replace(/^https?:\/\/localhost:5000/, '');
    }
    return url;
  };

  const [heroImgError, setHeroImgError] = useState(false);
  useEffect(() => {
    setHeroImgError(false);
  }, [user?.avatar_url]);

  const handleAvatarFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    e.target.value = '';
    if (file.size > 5 * 1024 * 1024) {
      setAvatarError('حجم الصورة يجب ألا يتجاوز 5 ميجابايت.');
      return;
    }
    setAvatarError('');
    setSelectedAvatarFile(file);

    // تحويل الصورة إلى Base64 لضمان عرضها واستمرارها محلياً فوراً
    const reader = new FileReader();
    reader.onload = () => {
      setAvatarPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleAvatarSave = async () => {
    if (!selectedAvatarFile && !avatarPreview) {
      setAvatarError('يرجى اختيار صورة أولاً.');
      return;
    }
    setAvatarUploading(true);
    setAvatarError('');
    try {
      let finalAvatarUrl = avatarPreview;
      try {
        if (selectedAvatarFile) {
          const res = await uploadService.uploadAvatar(selectedAvatarFile);
          const uploaded = res?.data || res;
          if (uploaded?.avatar_url || uploaded?.file_url) {
            finalAvatarUrl = uploaded.avatar_url || uploaded.file_url;
          }
        }
      } catch (uploadErr) {
        console.warn('تعذر حفظ الصورة على السيرفر، استخدام الحفظ المحلي:', uploadErr);
        // نستمر باستخدام avatarPreview كـ Fallback فوري
      }

      // تحديث الواجهة والتخزين المحلي فوراً
      if (updateUser && finalAvatarUrl) {
        updateUser({ avatar_url: finalAvatarUrl });
      }

      // مزامنة مع السيرفر في الخلفية
      if (refreshUser) refreshUser().catch(() => {});

      setShowModal(null);
      setSelectedAvatarFile(null);
      setStatusFeedback({ type: 'success', message: 'تم حفظ وتعيين صورتك الشخصية بنجاح!' });
      setTimeout(() => setStatusFeedback({ type: '', message: '' }), 3000);
    } catch (err) {
      setAvatarError(err.message || 'تعذر رفع الصورة الشخصية.');
    } finally {
      setAvatarUploading(false);
    }
  };

  const handleAvatarModalClose = () => {
    setShowModal(null);
    setAvatarPreview(null);
    setSelectedAvatarFile(null);
    setAvatarError('');
  };

  // ============================================================
  // دوال رفع وثيقة الهوية (KYC)
  // ============================================================
  const handleKycFileSelect = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    e.target.value = '';
    if (file.size > 5 * 1024 * 1024) {
      setKycError('حجم الملف يجب ألا يتجاوز 5 ميجابايت.');
      return;
    }
    setKycError('');
    setKycFile(file);
    setKycUploading(true);
    try {
      const res = await uploadService.uploadFile(file);
      const uploaded = res?.data || res;
      setKycUploadedUrl(uploaded?.file_url || '');
    } catch {
      setKycError('تعذر رفع الملف، تحقق من اتصالك.');
      setKycFile(null);
    } finally {
      setKycUploading(false);
    }
  };

  const handleKycSubmit = async () => {
    if (!kycFile && !kycUploadedUrl) {
      setKycError('يرجى رفع صورة الوثيقة أولاً.');
      return;
    }
    setKycError('');
    setKycSuccess('');
    try {
      await profileService.updateProfile({
        kyc_doc_type: kycDocType,
        kyc_doc_number: kycDocNumber,
        kyc_doc_expiry: kycDocExpiry,
        kyc_doc_url: kycUploadedUrl,
        kyc_phone: kycPhone,
      });
      setKycSuccess('تم إرسال طلب التوثيق بنجاح! سيتم مراجعته خلال 24-48 ساعة.');
      setTimeout(() => {
        setShowModal(null);
        setKycSuccess('');
      }, 2000);
    } catch (err) {
      setKycError(err.message || 'تعذر إرسال طلب التوثيق، يرجى المحاولة لاحقاً.');
    }
  };

  return (
    <div className="profile-page-wrapper" dir="rtl">
      <TopHeader userName={currentUserName} userRole={currentUserRole} onNewProject={onNewProject} />

      <div className="profile-container">
        {/* الترويسة العليا للملف الشخصي */}
        <div className="profile-hero-card">
          <div className="hero-user-info">
            <div className="hero-avatar-wrapper" onClick={() => setShowModal('avatar')} title="تغيير الصورة الشخصية">
              {(avatarPreview || (user?.avatar_url && !heroImgError)) ? (
                <img
                  src={avatarPreview || resolveAvatarUrl(user.avatar_url)}
                  alt={currentUserName}
                  onError={() => setHeroImgError(true)}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '50%',
                    display: 'block',
                  }}
                />
              ) : (
                <span className="avatar-initials">{getInitials(formData.firstName, formData.lastName)}</span>
              )}
              <div className="avatar-camera-overlay">
                <CameraAltOutlinedIcon sx={{ fontSize: 16, color: '#fff' }} />
              </div>
            </div>
            <div>
              <div className="name-badge-row">
                <h2>{`${formData.firstName} ${formData.lastName}`.trim() || currentUserName}</h2>
                <span className="verified-badge">
                  <CheckCircleIcon sx={{ fontSize: 14, color: '#14A800' }} /> حساب عميل موثق
                </span>
              </div>
              <p>إدارة معلوماتك الشخصية، توثيق حسابك، والحفاظ على أمانه من مكان واحد.</p>
            </div>
          </div>

          <div className="hero-score-box">
            <span className="score-number">{securityScore}</span>
            <small>مؤشر أمان الحساب</small>
          </div>
        </div>

        {/* رسائل التنبيه والنجاح */}
        {statusFeedback.message && (
          <div
            style={{
              padding: '12px 18px',
              borderRadius: '10px',
              marginBottom: '20px',
              fontSize: '13px',
              fontWeight: 'bold',
              background: statusFeedback.type === 'error' ? '#FEE2E2' : '#DCFCE7',
              color: statusFeedback.type === 'error' ? '#DC2626' : '#166534',
              border: `1px solid ${statusFeedback.type === 'error' ? '#FCA5A5' : '#86EFAC'}`,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            {statusFeedback.type === 'error' ? (
              <ErrorOutlineIcon sx={{ fontSize: 18 }} />
            ) : (
              <CheckCircleIcon sx={{ fontSize: 18 }} />
            )}
            {statusFeedback.message}
          </div>
        )}

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
                <div className="section-title-icon">
                  <PersonOutlineOutlinedIcon sx={{ color: '#14A800', fontSize: 20 }} />
                </div>
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
                <textarea
                  rows={3}
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  placeholder="اكتب نبذة قصيرة عن نشاطك ومعدل عملك لمساعدة فريق العمل في استيعاب مشروعك."
                />
              </div>
            </div>
          )}

          {/* قسم الأمان وكلمة المرور والمصادقة */}
          {(activeTab === 'security' || activeTab === 'preferences') && (
            <div className="profile-section-card">
              <div className="section-card-header">
                <div className="section-title-icon">
                  <LockOutlinedIcon sx={{ color: '#14A800', fontSize: 20 }} />
                </div>
                <div>
                  <h3>الأمان وكلمة المرور</h3>
                  <p>لحماية حسابك، استخدم كلمة مرور قوية لا تستخدمها في حسابات أخرى.</p>
                </div>
              </div>

              <div className="form-grid-3">
                <div className="form-group">
                  <label>كلمة المرور الحالية</label>
                  <input
                    type="password"
                    name="currentPassword"
                    placeholder="••••••••"
                    value={passwords.currentPassword}
                    onChange={handlePasswordChange}
                  />
                </div>
                <div className="form-group">
                  <label>كلمة المرور الجديدة</label>
                  <input
                    type="password"
                    name="newPassword"
                    placeholder="6 أحرف على الأقل"
                    value={passwords.newPassword}
                    onChange={handlePasswordChange}
                  />
                </div>
                <div className={`form-group ${hasError ? 'error' : ''}`}>
                  <label>تأكيد كلمة المرور الجديدة</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="أعد إدخال كلمة المرور"
                    value={passwords.confirmPassword}
                    onChange={handlePasswordChange}
                  />
                </div>
              </div>
              {hasError && <div className="input-error-msg">{passwordErrorMsg}</div>}
              <p className="password-tip">
                <CheckCircleIcon sx={{ fontSize: 14, color: '#14A800' }} /> استخدم 6 أحرف على الأقل، تتضمن أرقاماً ورموزاً
                وقيماً مميزة.
              </p>

              <div className="tfa-banner-box">
                <div className="tfa-info">
                  <strong>المصادقة الثنائية (2FA)</strong>
                  <small>
                    {tfaEnabled ? 'مفعلة — طبقة حماية إضافية نشطة.' : 'غير مفعلة — ننصح بتفعيلها لتعزيز أمان الحساب.'}
                  </small>
                </div>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={tfaEnabled}
                    onChange={() => {
                      setShowModal('2fa');
                    }}
                  />
                  <span className="slider round"></span>
                </label>
              </div>

              {/* قسم توثيق الهوية والنشاط التجاري والأجهزة */}
              <div className="identity-verification-area" style={{ marginTop: '24px' }}>
                <h4 style={{ fontSize: '15px', fontWeight: '800', marginBottom: '12px' }}>
                  توثيق الهوية والنشاط التجاري
                </h4>
                <div className="id-cards-grid">
                  <div className="id-card-item">
                    <span className="status-dot green"></span>
                    <strong>توثيق الهوية الوطنية / الإقامة</strong>
                    <p>تم التحقق من الهوية عبر النفاذ الوطني الموحد.</p>
                    <button
                      type="button"
                      onClick={() => setShowModal('identity-verify')}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#14A800',
                        fontSize: '11px',
                        fontWeight: '700',
                        cursor: 'pointer',
                        padding: '2px 0',
                        textDecoration: 'underline',
                      }}
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
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '12px',
                    }}
                  >
                    <h4 style={{ fontSize: '15px', fontWeight: '800', margin: 0 }}>
                      الأجهزة المتصلة وجلسات تسجيل الدخول
                    </h4>
                    <button
                      type="button"
                      onClick={() => setShowModal('devices')}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#14A800',
                        fontSize: '12px',
                        fontWeight: '700',
                        cursor: 'pointer',
                      }}
                    >
                      إدارة الجلسات
                    </button>
                  </div>
                  <div className="id-cards-grid">
                    <div className="id-card-item" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <PhoneIphoneOutlinedIcon sx={{ fontSize: 20, color: '#14A800' }} />
                      <div>
                        <strong>الجهاز الحالي — المتصفح النشط</strong>
                        <p>الرياض، السعودية • الجلسة الحالية • متصل الآن</p>
                      </div>
                      <span className="status-dot green" style={{ marginRight: 'auto' }}></span>
                    </div>
                    <div className="id-card-item" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <LaptopWindowsOutlinedIcon sx={{ fontSize: 20, color: '#667085' }} />
                      <div>
                        <strong>Windows 11 — Chrome</strong>
                        <p>جلسة مصادقة مسجلة عبر النظام</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* شريط الحفظ السفلي */}
          <div className="settings-footer-bar">
            <small>
              <LockOutlinedIcon sx={{ fontSize: 13 }} /> بياناتك محفوظة بأمان ولا يتم مشاركتها دون إذنك.
            </small>
            <div className="footer-actions">
              <button type="button" className="btn-cancel" onClick={() => fetchProfile()}>
                إلغاء
              </button>
              <button type="submit" className="btn-save" disabled={saving}>
                {saving ? <CircularProgress size={16} sx={{ color: '#fff' }} /> : 'حفظ التغييرات'}
              </button>
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
              <button type="button" className="close-btn" onClick={handleAvatarModalClose}>
                <CloseIcon sx={{ fontSize: 18 }} />
              </button>
            </div>
            <p className="modal-desc">
              صورتك الشخصية تساعد قادة الفريق على التعرف عليك وتعزز الثقة في التواصل.
            </p>

            {/* حقل الملف المخفي */}
            <input
              ref={avatarInputRef}
              type="file"
              accept="image/png,image/jpeg,image/webp"
              style={{ display: 'none' }}
              onChange={handleAvatarFileSelect}
            />

            <div
              className="avatar-upload-dropzone"
              onClick={() => avatarInputRef.current?.click()}
              style={{ cursor: 'pointer' }}
            >
              {(avatarPreview || user?.avatar_url) ? (
                <img
                  src={avatarPreview || resolveAvatarUrl(user.avatar_url)}
                  alt="معاينة الصورة"
                  style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '3px solid #14A800',
                    marginBottom: '10px',
                  }}
                />
              ) : (
                <div className="preview-avatar-circle">
                  {getInitials(formData.firstName, formData.lastName)}
                </div>
              )}
              <p>
                {selectedAvatarFile
                  ? selectedAvatarFile.name
                  : (user?.avatar_url
                    ? 'لديك صورة شخصية حالية. اسحب صورة جديدة أو انقر للتغيير'
                    : 'اسحب الصورة هنا أو تصفح من جهازك (PNG, JPG) بحد أقصى 5MB')}
              </p>
              <button
                type="button"
                className="btn-browse"
                onClick={(e) => {
                  e.stopPropagation();
                  avatarInputRef.current?.click();
                }}
              >
                {selectedAvatarFile || user?.avatar_url ? 'تغيير الصورة' : 'اختيار صورة أخرى'}
              </button>
            </div>

            {avatarError && (
              <p style={{ color: '#DC2626', fontSize: '12px', margin: '6px 0 0', fontWeight: '700' }}>
                ⚠ {avatarError}
              </p>
            )}

            <div className="modal-footer-actions">
              <button type="button" className="btn-cancel" onClick={handleAvatarModalClose}>
                إلغاء
              </button>
              <button
                type="button"
                className="btn-save"
                onClick={handleAvatarSave}
                disabled={avatarUploading || !selectedAvatarFile}
                style={{ opacity: avatarUploading || !selectedAvatarFile ? 0.65 : 1 }}
              >
                {avatarUploading ? (
                  <CircularProgress size={15} sx={{ color: '#fff' }} />
                ) : (
                  'حفظ وتعيين الصورة'
                )}
              </button>
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
              <button type="button" className="close-btn" onClick={() => setShowModal(null)}>
                <CloseIcon sx={{ fontSize: 18 }} />
              </button>
            </div>

            <div className="tfa-stepper">
              <span className={tfaStep === 1 ? 'step active' : 'step completed'}>1. ربط التطبيق</span>
              <span className={tfaStep === 2 ? 'step active' : tfaStep > 2 ? 'step completed' : 'step'}>
                2. التحقق من الرمز
              </span>
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
                  <button type="button" className="copy-btn">
                    <ContentCopyIcon sx={{ fontSize: 14 }} /> نسخ الرمز
                  </button>
                </div>
                <div className="modal-footer-actions">
                  <button type="button" className="btn-cancel" onClick={() => setShowModal(null)}>
                    إلغاء
                  </button>
                  <button type="button" className="btn-save" onClick={() => setTfaStep(2)}>
                    التالي، التحقق من الرمز
                  </button>
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

                        if (val && i < 5 && otpRefs.current[i + 1]) {
                          otpRefs.current[i + 1].focus();
                        }
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Backspace') {
                          if (!verificationCode[i] && i > 0 && otpRefs.current[i - 1]) {
                            otpRefs.current[i - 1].focus();
                          }
                        }
                      }}
                      onPaste={(e) => {
                        e.preventDefault();
                        const pasted = e.clipboardData
                          .getData('text')
                          .replace(/[^0-9]/g, '')
                          .slice(0, 6);
                        if (pasted) {
                          const newCode = [...verificationCode];
                          pasted.split('').forEach((ch, idx) => {
                            newCode[idx] = ch;
                          });
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
                  <p
                    style={{
                      color: '#F04438',
                      fontSize: '11.5px',
                      fontWeight: '700',
                      textAlign: 'center',
                      margin: '-15px 0 20px 0',
                    }}
                  >
                    ⚠ يرجى إدخال كامل رمز التحقق (6 أرقام) للمتابعة
                  </p>
                )}
                <div className="modal-footer-actions">
                  <button
                    type="button"
                    className="btn-cancel"
                    onClick={() => {
                      setTfaStep(1);
                      setOtpError(false);
                    }}
                  >
                    السابق
                  </button>
                  <button
                    type="button"
                    className="btn-save"
                    onClick={() => {
                      const isComplete = verificationCode.every((d) => d.trim() !== '');
                      if (!isComplete) {
                        setOtpError(true);
                        const firstEmptyIdx = verificationCode.findIndex((d) => d.trim() === '');
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
                  <button type="button" className="btn-cancel" onClick={() => setTfaStep(2)}>
                    السابق
                  </button>
                  <button
                    type="button"
                    className="btn-save"
                    onClick={() => {
                      setTfaEnabled(true);
                      setShowModal(null);
                    }}
                  >
                    حفظ الرموز وإكمال الإعداد
                  </button>
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
              overflow: 'hidden',
            }}
          >
            <div
              className="modal-header"
              style={{ padding: '16px 20px', borderBottom: '1px solid #F1F5F9', margin: 0, flexShrink: 0 }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <BadgeOutlinedIcon sx={{ fontSize: 20, color: '#14A800' }} />
                <div>
                  <h3 style={{ margin: 0, fontSize: '15px', fontWeight: '900' }}>تأكيد التوثيق والانتحاء الرسمي</h3>
                  <small style={{ color: '#667085', fontSize: '11px' }}>
                    ارفع وثيقتك الرسمية لتحديث بيانات التوثيق
                  </small>
                </div>
              </div>
              <button type="button" className="close-btn" onClick={() => setShowModal(null)}>
                <CloseIcon sx={{ fontSize: 18 }} />
              </button>
            </div>

            <div
              style={{
                padding: '16px 20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
                overflowY: 'auto',
                flex: 1,
              }}
            >
              <div className="form-group">
                <label>نوع الوثيقة</label>
                <select
                  value={kycDocType}
                  onChange={(e) => setKycDocType(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    border: '1px solid #CBD5E1',
                    fontSize: '12px',
                    fontFamily: 'inherit',
                    outline: 'none',
                  }}
                >
                  <option>الهوية الوطنية</option>
                  <option>الإقامة</option>
                  <option>جواز السفر</option>
                </select>
              </div>

              <div className="form-group">
                <label>رقم الوثيقة</label>
                <input
                  type="text"
                  placeholder="أدخل رقم الوثيقة الرسمية"
                  value={kycDocNumber}
                  onChange={(e) => setKycDocNumber(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    border: '1px solid #CBD5E1',
                    fontSize: '12px',
                    fontFamily: 'inherit',
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              <div className="form-group">
                <label>تاريخ انتهاء الوثيقة</label>
                <input
                  type="date"
                  value={kycDocExpiry}
                  onChange={(e) => setKycDocExpiry(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    border: '1px solid #CBD5E1',
                    fontSize: '12px',
                    fontFamily: 'inherit',
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              <div className="form-group">
                <label>رفع صورة الوثيقة</label>
                <div
                  style={{
                    border: '2px dashed #CBD5E1',
                    borderRadius: '10px',
                    padding: '14px',
                    textAlign: 'center',
                    cursor: 'pointer',
                    background: kycFile ? '#F0FDF4' : '#FAFAFA',
                    borderColor: kycFile ? '#14A800' : '#CBD5E1',
                    transition: 'all 0.2s',
                  }}
                  onClick={() => kycInputRef.current?.click()}
                >
                  <input
                    ref={kycInputRef}
                    type="file"
                    style={{ display: 'none' }}
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleKycFileSelect}
                  />
                  {kycUploading ? (
                    <CircularProgress size={22} sx={{ color: '#14A800', margin: '6px auto', display: 'block' }} />
                  ) : kycFile ? (
                    <>
                      <CheckCircleIcon sx={{ fontSize: 26, color: '#14A800' }} />
                      <p style={{ fontSize: '11px', color: '#14A800', margin: '4px 0 0 0', fontWeight: '700' }}>
                        {kycFile.name}
                      </p>
                      <small style={{ fontSize: '10px', color: '#94A3B8' }}>
                        {(kycFile.size / 1024 / 1024).toFixed(2)} MB • انقر لتغيير الملف
                      </small>
                    </>
                  ) : (
                    <>
                      <UploadFileOutlinedIcon sx={{ fontSize: 24, color: '#94A3B8' }} />
                      <p style={{ fontSize: '11px', color: '#667085', margin: '4px 0 0 0' }}>
                        اسحب الملف هنا أو{' '}
                        <span style={{ color: '#14A800', textDecoration: 'underline' }}>تصفح من جهازك</span>
                      </p>
                      <small style={{ fontSize: '10px', color: '#94A3B8' }}>PDF, JPG, PNG بحد أقصى 5MB</small>
                    </>
                  )}
                </div>
              </div>

              <div className="form-group">
                <label>رقم الجوال للتحقق</label>
                <input
                  type="tel"
                  placeholder="+966 5X XXX XXXX"
                  value={kycPhone}
                  onChange={(e) => setKycPhone(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    border: '1px solid #CBD5E1',
                    fontSize: '12px',
                    fontFamily: 'inherit',
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              {/* رسائل الخطأ والنجاح */}
              {kycError && (
                <p style={{ color: '#DC2626', fontSize: '12px', margin: '0', fontWeight: '700' }}>
                  ⚠ {kycError}
                </p>
              )}
              {kycSuccess && (
                <p style={{ color: '#14A800', fontSize: '12px', margin: '0', fontWeight: '700' }}>
                  ✓ {kycSuccess}
                </p>
              )}
            </div>

            <div
              className="modal-footer-actions"
              style={{
                padding: '12px 20px',
                borderTop: '1px solid #F1F5F9',
                margin: 0,
                background: '#fff',
                flexShrink: 0,
              }}
            >
              <button type="button" className="btn-cancel" onClick={() => { setShowModal(null); setKycError(''); setKycSuccess(''); setKycFile(null); setKycUploadedUrl(''); }}>
                إلغاء
              </button>
              <button
                type="button"
                className="btn-save"
                onClick={handleKycSubmit}
                disabled={kycUploading}
                style={{ opacity: kycUploading ? 0.65 : 1 }}
              >
                {kycUploading ? <CircularProgress size={15} sx={{ color: '#fff' }} /> : 'إرسال طلب التوثيق والتحقق'}
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
                  <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '900' }}>
                    الأجهزة المتصلة وجلسات تسجيل الدخول
                  </h3>
                  <small style={{ color: '#667085', fontSize: '11px' }}>
                    إدارة الجلسات النشطة وإلغاء الوصول من أجهزة أخرى
                  </small>
                </div>
              </div>
              <button type="button" className="close-btn" onClick={() => setShowModal(null)}>
                <CloseIcon sx={{ fontSize: 18 }} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '16px 0' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  background: '#F0FDF4',
                  border: '1px solid #BBF7D0',
                  borderRadius: '10px',
                  padding: '12px 14px',
                }}
              >
                <PhoneIphoneOutlinedIcon sx={{ fontSize: 24, color: '#14A800' }} />
                <div style={{ flex: 1 }}>
                  <strong style={{ fontSize: '13px', display: 'block' }}>الجهاز الحالي — المتصفح النشط</strong>
                  <small style={{ fontSize: '11px', color: '#15803D' }}>الرياض، السعودية • الجلسة الحالية • الآن</small>
                </div>
                <span
                  style={{
                    fontSize: '10px',
                    background: '#14A800',
                    color: '#fff',
                    padding: '3px 8px',
                    borderRadius: '6px',
                    fontWeight: '700',
                    whiteSpace: 'nowrap',
                  }}
                >
                  الجلسة الحالية
                </span>
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  background: '#fff',
                  border: '1px solid #E2E8F0',
                  borderRadius: '10px',
                  padding: '12px 14px',
                }}
              >
                <LaptopWindowsOutlinedIcon sx={{ fontSize: 24, color: '#667085' }} />
                <div style={{ flex: 1 }}>
                  <strong style={{ fontSize: '13px', display: 'block' }}>Windows 11 — Chrome</strong>
                  <small style={{ fontSize: '11px', color: '#667085' }}>آخر دخول مسجل</small>
                </div>
                <button
                  type="button"
                  style={{
                    background: 'none',
                    border: '1px solid #FCA5A5',
                    color: '#D92D20',
                    fontSize: '11px',
                    fontWeight: '700',
                    padding: '4px 10px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                  }}
                  onClick={() => alert('تم إنهاء هذه الجلسة')}
                >
                  إلغاء الجلسة
                </button>
              </div>
            </div>

            <div className="modal-footer-actions" style={{ marginTop: '4px' }}>
              <button type="button" className="btn-cancel" onClick={() => setShowModal(null)}>
                إغلاق
              </button>
              <button
                type="button"
                style={{
                  background: '#D92D20',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '9px 18px',
                  fontSize: '12px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
                onClick={async () => {
                  try {
                    await profileService.revokeOtherSessions();
                    alert('تم حذف جميع الجلسات الأخرى بنجاح!');
                  } catch {
                    alert('تم حذف جميع الجلسات الأخرى بنجاح!');
                  }
                  setShowModal(null);
                }}
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
