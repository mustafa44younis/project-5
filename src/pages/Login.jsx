import { useState, useEffect } from "react";
import logoImage from '../images/Aaw.png';
import './Login.css';
import { useAuth } from '../context/AuthContext';
import { authService } from '../services/auth.service';
import { API_BASE_URL } from '../constants/api.constants';

// MUI Icons
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import HttpsRoundedIcon from '@mui/icons-material/HttpsRounded';
import MailOutlineRoundedIcon from '@mui/icons-material/MailOutlineRounded';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import PersonOutlineRoundedIcon from '@mui/icons-material/PersonOutlineRounded';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';

/* ================= اللوحة الجانبية (Side Panel) ================= */
function SidePanel() {
  return (
    <div className="side" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100vh", boxSizing: "border-box" }}>
      <div>
        <div className="login-brand-box" style={{ marginBottom: "25px" }}>
          <img src={logoImage} alt="ACCESS Logo" className="login-sidebar-logo-image" />
        </div>
        <div className="badge">أفكار كبيرة. بداية واحدة.</div>
        <div className="headline" style={{ fontSize: "28px", lineHeight: "1.4", margin: "12px 0" }}>
          شريكك من الفكرة،<br />
          إلى أول إنجاز.
        </div>
        <div className="sub" style={{ fontSize: "14px", opacity: 0.9, lineHeight: "1.6" }}>
          نجمع طموحك بالفريق المناسب، في مساحة واحدة<br />
          للعمل بثقة ووضوح.
        </div>
      </div>

      <div style={{ width: "100%", marginBottom: "10px" }}>
        <div className="card" style={{ backgroundColor: "#ffffff", color: "#181818", padding: "16px 20px", borderRadius: "14px", boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h4 style={{ margin: 0, color: "#181818", fontSize: "14px" }}>مشروعك القادم</h4>
            <span style={{ fontSize: "11px", color: "#14A800", fontWeight: "bold" }}>قيد التنفيذ</span>
          </div>
          <div className="proj" style={{ marginTop: "10px", fontWeight: "bold", color: "#181818", fontSize: "13px" }}>
            من الفكرة إلى الإطلاق
          </div>
          <div className="quote" style={{ fontSize: "12px", margin: "6px 0 16px 0", color: "#666" }}>
            فريق متكامل يعمل على تحقيق رؤيتك
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "12px", borderTop: "1px solid #eaeaea", fontSize: "11px", color: "#666" }}>
            <span>خبرات مختلفة، هدف واحد</span>
            <div style={{ display: "flex", gap: "8px", fontWeight: "bold", color: "#14A800" }}>
              <span>ن</span><span>م</span><span>س</span>
            </div>
          </div>
        </div>

        <div className="rating" style={{ marginTop: "16px", fontSize: "12px", color: "#ffffff", opacity: 0.9, textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center", gap: "4px" }}>
          <span className="num" style={{ fontWeight: "bold", display: "inline-flex", alignItems: "center", gap: "2px" }}>
            <StarRoundedIcon sx={{ fontSize: 16, color: "#F2B848" }} /> 4.95
          </span>
          <span>|</span>
          <b>+250 مشروع</b>
        </div>
        <div style={{ fontSize: "11px", opacity: 0.8, marginTop: "2px", textAlign: "center", color: "#ffffff" }}>
          ثقة تتحدث عبر كل مشروع ناجح
        </div>
      </div>
    </div>
  );
}

function FormHeader({ title, desc, onClose }) {
  return (
    <>
      <button className="close" title="إغلاق" onClick={onClose}>
        <CloseRoundedIcon fontSize="small" />
      </button>
      <span className="lang" style={{ display: "inline-flex", alignItems: "center", gap: "5px" }}>
        <HttpsRoundedIcon sx={{ fontSize: 15, color: "#14A800" }} /> اتصال آمن ومشفّر
      </span>
      <h2>{title}</h2>
      <div className="desc">{desc}</div>
    </>
  );
}

function Field({ 
  label, 
  placeholder, 
  type = "text", 
  icon, 
  error, 
  hint, 
  value = "", 
  onChange, 
  showPassword, 
  onTogglePassword 
}) {
  return (
    <>
      {label && <label>{label}</label>}
      <div className={"field" + (error ? " error" : "")}>
        {icon === "eye" && (
          <button 
            type="button" 
            className="icon" 
            tabIndex="-1" 
            onClick={onTogglePassword}
            style={{ cursor: 'pointer', background: 'none', border: 'none', display: 'flex', alignItems: 'center' }}
            title={showPassword ? "إخفاء كلمة المرور" : "عرض كلمة المرور"}
          >
            {showPassword ? <VisibilityOffOutlinedIcon sx={{ fontSize: 18 }} /> : <VisibilityOutlinedIcon sx={{ fontSize: 18 }} />}
          </button>
        )}
        <input 
          type={type} 
          placeholder={placeholder} 
          value={value}
          onChange={onChange}
        />
        {icon === "mail"  && <span className="icon"><MailOutlineRoundedIcon sx={{ fontSize: 18 }} /></span>}
        {icon === "phone" && <span className="icon"><LocalPhoneOutlinedIcon sx={{ fontSize: 18 }} /></span>}
        {icon === "lock"  && <span className="icon"><LockOutlinedIcon sx={{ fontSize: 18 }} /></span>}
        {icon === "user"  && <span className="icon"><PersonOutlineRoundedIcon sx={{ fontSize: 18 }} /></span>}
      </div>
      {hint && (
        <div className={"hint " + (error ? "error" : "success")} style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          {error ? <InfoOutlinedIcon sx={{ fontSize: 14 }} /> : <CheckRoundedIcon sx={{ fontSize: 14 }} />}
          {hint}
        </div>
      )}
    </>
  );
}

function Checkbox({ children }) {
  const [on, setOn] = useState(true);
  return (
    <div className="check" onClick={() => setOn(!on)}>
      <span className="box" style={{ background: on ? "#14A800" : "#d0d5dd", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
        {on ? <CheckRoundedIcon sx={{ fontSize: 12, color: "#ffffff" }} /> : null}
      </span>
      {children}
    </div>
  );
}

function Socials() {
  return (
    <>
      <div className="divider">أو تسجيل الدخول عبر</div>
      <div className="socials">
        <a href={`${API_BASE_URL}/auth/linkedin?role=client`} className="soc" style={{ textDecoration: 'none' }}>
          <span className="in">in</span> LinkedIn
        </a>
        <a href={`${API_BASE_URL}/auth/google?role=client`} className="soc" style={{ textDecoration: 'none' }}>
          <span className="g">G</span> Google
        </a>
      </div>
    </>
  );
}

/* ================= شاشات المصادقة الفرعية ================= */

function SignupScreen({ onSignup, go, onClose }) {
  const { register } = useAuth();
  const [role, setRole] = useState(0);
  const roles = ["صاحب عمل / عميل", "قائد فريق", "مستقل محترف"];

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!fullName.trim() || fullName.trim().length < 3) {
      newErrors.fullName = "يرجى كتابة الاسم الكامل (3 أحرف على الأقل)";
    }
    if (!email.trim()) {
      newErrors.email = "يرجى كتابة البريد الإلكتروني";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      newErrors.email = "يرجى إدخال بريد إلكتروني صحيح (مثال: name@gmail.com)";
    }
    if (!password.trim() || password.length < 6) {
      newErrors.password = "كلمة المرور يجب أن تكون 6 أحرف على الأقل";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");
    if (!validate()) return;

    setIsLoading(true);
    try {
      const res = await register({
        full_name: fullName.trim(),
        email: email.trim(),
        phone: phone.trim() || null,
        password,
        role,
      });

      if (res?.success) {
        if (onSignup) {
          onSignup(email.trim(), res?.data?.user);
        } else {
          go("success");
        }
      }
    } catch (err) {
      const msg = err.errors && Array.isArray(err.errors)
        ? err.errors.join('، ')
        : (err.message || "حدث خطأ أثناء إنشاء الحساب، يرجى المحاولة لاحقاً");
      setServerError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="form-side">
      <FormHeader title="ابدأ رحلتك مع ACCESS" desc="حساب واحد، وفرص لا حدود لها. اختر دورك لدينا" onClose={onClose} />
      
      {serverError && (
        <div style={{
          backgroundColor: '#FEE2E2',
          color: '#DC2626',
          padding: '10px 14px',
          borderRadius: '8px',
          fontSize: '13px',
          marginBottom: '16px',
          border: '1px solid #FCA5A5',
          lineHeight: '1.5'
        }}>
          {serverError}
        </div>
      )}

      <div className="toggle">
        {roles.map((r, i) => (
          <div key={r} className={i === role ? "on" : ""} onClick={() => setRole(i)}>{r}</div>
        ))}
      </div>
      <form onSubmit={handleSubmit} style={{ width: '100%' }} noValidate>
        <Field 
          label="الاسم الكامل" 
          placeholder="سارة أحمد" 
          icon="user" 
          value={fullName}
          onChange={(e) => {
            setFullName(e.target.value);
            if (errors.fullName) setErrors(prev => ({ ...prev, fullName: null }));
          }}
          error={!!errors.fullName}
          hint={errors.fullName}
        />
        <Field 
          label="البريد الإلكتروني" 
          placeholder="name@gmail.com" 
          icon="mail" 
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (errors.email) setErrors(prev => ({ ...prev, email: null }));
          }}
          error={!!errors.email}
          hint={errors.email}
        />
        <Field 
          label="رقم الهاتف" 
          placeholder="+966 55 123 4567" 
          icon="phone" 
          value={phone}
          onChange={(e) => {
            setPhone(e.target.value);
            if (errors.phone) setErrors(prev => ({ ...prev, phone: null }));
          }}
          error={!!errors.phone}
          hint={errors.phone}
        />
        <Field 
          label="كلمة المرور" 
          type={showPassword ? "text" : "password"} 
          placeholder="••••••••" 
          icon="eye" 
          showPassword={showPassword}
          onTogglePassword={() => setShowPassword(!showPassword)}
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            if (errors.password) setErrors(prev => ({ ...prev, password: null }));
          }}
          error={!!errors.password}
          hint={errors.password || (password.length >= 6 ? "قوة كلمة المرور: قوية جداً" : null)}
        />
        <Checkbox>أوافق على الشروط وسياسة الخصوصية</Checkbox>
        <button type="submit" className="btn" disabled={isLoading}>
          {isLoading ? "جاري إنشاء الحساب..." : "إنشاء حساب جديد"}
        </button>
      </form>
      <div className="link">لديك حساب بالفعل؟ <button type="button" onClick={() => go("login")}>تسجيل الدخول</button></div>
    </div>
  );
}

function LoginScreen({ onLogin, go, onClose }) {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // التحقق الإلزامي من تعبئة الحقول قبل الدخول
  const validate = () => {
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = "يرجى كتابة البريد الإلكتروني";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      newErrors.email = "يرجى إدخال بريد إلكتروني صحيح (مثال: name@gmail.com)";
    }

    if (!password.trim()) {
      newErrors.password = "يرجى كتابة كلمة المرور للمتابعة";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");
    
    // إذا كانت الحقول فارغة يتم إيقاف الإرسال وإظهار رسائل الخطأ الحمراء
    if (!validate()) {
      return;
    }

    setIsLoading(true);
    try {
      const res = await login(email.trim(), password);
      if (res?.success) {
        if (onLogin) {
          onLogin(email.trim(), res?.data?.user);
        } else {
          go("success");
        }
      }
    } catch (err) {
      const msg = err.errors && Array.isArray(err.errors)
        ? err.errors.join('، ')
        : (err.message || "فشل تسجيل الدخول، تأكد من صحة البريد الإلكتروني وكلمة المرور");
      setServerError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="form-side">
      <FormHeader title="مرحباً بعودتك" desc="سجّل دخولك وأكمل رحلة إنجازك" onClose={onClose} />
      
      {serverError && (
        <div style={{
          backgroundColor: '#FEE2E2',
          color: '#DC2626',
          padding: '10px 14px',
          borderRadius: '8px',
          fontSize: '13px',
          marginBottom: '16px',
          border: '1px solid #FCA5A5',
          lineHeight: '1.5'
        }}>
          {serverError}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ width: '100%' }} noValidate>
        <Field 
          label="البريد الإلكتروني" 
          placeholder="name@gmail.com" 
          icon="mail" 
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (errors.email) {
              setErrors(prev => ({ ...prev, email: null }));
            }
          }}
          error={!!errors.email} 
          hint={errors.email} 
        />
        <Field 
          label="كلمة المرور" 
          type={showPassword ? "text" : "password"} 
          placeholder="••••••••" 
          icon="eye" 
          showPassword={showPassword}
          onTogglePassword={() => setShowPassword(!showPassword)}
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            if (errors.password) {
              setErrors(prev => ({ ...prev, password: null }));
            }
          }}
          error={!!errors.password} 
          hint={errors.password} 
        />
        <Checkbox>تسجيل الدخول تلقائياً</Checkbox>
        <button type="submit" className="btn" disabled={isLoading}>
          {isLoading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
        </button>
        <button type="button" className="btn ghost" onClick={() => go("reset")}>إعادة تعيين كلمة المرور</button>
      </form>
      <Socials />
      <div className="link">ليس لديك حساب؟ <button type="button" onClick={() => go("signup")}>إنشاء حساب</button></div>
    </div>
  );
}

function ResetScreen({ onReset, go, onClose }) {
  const [step, setStep] = useState("request"); // "request" | "confirm"
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleRequestReset = async (e) => {
    e.preventDefault();
    setServerError("");
    setSuccessMsg("");
    
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setErrors({ email: "يرجى كتابة بريد إلكتروني صحيح" });
      return;
    }

    setIsLoading(true);
    try {
      await authService.forgotPassword(email.trim());
      setSuccessMsg("تم إرسال رابط / رمز استعادة كلمة المرور إلى بريدك الإلكتروني بنجاح.");
      setStep("confirm");
    } catch (err) {
      setServerError(err.message || "تعذر إرسال رابط الاستعادة، يرجى المحاولة لاحقاً");
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirmReset = async (e) => {
    e.preventDefault();
    setServerError("");
    setSuccessMsg("");

    const newErrors = {};
    if (!token.trim()) newErrors.token = "رمز التحقق أو التوكن مطلوب";
    if (!newPass.trim() || newPass.length < 6) newErrors.newPass = "كلمة المرور يجب أن تكون 6 أحرف على الأقل";
    if (newPass !== confirmPass) newErrors.confirmPass = "كلمات المرور غير متطابقة";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setIsLoading(true);
    try {
      await authService.resetPassword(token.trim(), newPass);
      setSuccessMsg("تم تغيير كلمة المرور بنجاح! يمكنك الآن تسجيل الدخول.");
      setTimeout(() => {
        go("login");
      }, 2000);
    } catch (err) {
      setServerError(err.message || "رمز التحقق غير صالح أو منتهي الصلاحية");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="form-side">
      <FormHeader 
        title="إعادة تعيين كلمة المرور" 
        desc={step === "request" ? "أدخل بريدك الإلكتروني المسجل لنرسل لك رابط الاستعادة" : "أدخل رمز التحقق وكلمة المرور الجديدة"} 
        onClose={onClose} 
      />

      {successMsg && (
        <div style={{
          backgroundColor: '#ECFDF5',
          color: '#059669',
          padding: '10px 14px',
          borderRadius: '8px',
          fontSize: '13px',
          marginBottom: '16px',
          border: '1px solid #A7F3D0',
          lineHeight: '1.5'
        }}>
          {successMsg}
        </div>
      )}

      {serverError && (
        <div style={{
          backgroundColor: '#FEE2E2',
          color: '#DC2626',
          padding: '10px 14px',
          borderRadius: '8px',
          fontSize: '13px',
          marginBottom: '16px',
          border: '1px solid #FCA5A5',
          lineHeight: '1.5'
        }}>
          {serverError}
        </div>
      )}

      {step === "request" ? (
        <form onSubmit={handleRequestReset} style={{ width: '100%' }} noValidate>
          <Field 
            label="البريد الإلكتروني" 
            placeholder="name@gmail.com" 
            icon="mail" 
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email) setErrors(prev => ({ ...prev, email: null }));
            }}
            error={!!errors.email}
            hint={errors.email}
          />
          <button type="submit" className="btn" style={{ marginTop: 20 }} disabled={isLoading}>
            {isLoading ? "جاري الإرسال..." : "إرسال رابط الاستعادة"}
          </button>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 12 }}>
            <button type="button" className="btn ghost" onClick={() => setStep("confirm")}>
              لدي رمز تحقق مسبقاً
            </button>
            <button type="button" className="btn ghost" onClick={() => go("login")}>
              <ArrowForwardRoundedIcon sx={{ fontSize: 16, verticalAlign: 'middle', ml: 0.5 }} /> العودة للدخول
            </button>
          </div>
        </form>
      ) : (
        <form onSubmit={handleConfirmReset} style={{ width: '100%' }} noValidate>
          <Field 
            label="رمز التحقق (Token)" 
            placeholder="أدخل الرمز أو التوكن المستلم" 
            icon="lock" 
            value={token}
            onChange={(e) => {
              setToken(e.target.value);
              if (errors.token) setErrors(prev => ({ ...prev, token: null }));
            }}
            error={!!errors.token}
            hint={errors.token}
          />
          <Field 
            label="كلمة المرور الجديدة" 
            type="password" 
            placeholder="••••••••" 
            icon="lock" 
            value={newPass}
            onChange={(e) => {
              setNewPass(e.target.value);
              if (errors.newPass) setErrors(prev => ({ ...prev, newPass: null }));
            }}
            error={!!errors.newPass}
            hint={errors.newPass}
          />
          <Field 
            label="تأكيد كلمة المرور الجديدة" 
            type="password" 
            placeholder="••••••••" 
            icon="lock" 
            value={confirmPass}
            onChange={(e) => {
              setConfirmPass(e.target.value);
              if (errors.confirmPass) setErrors(prev => ({ ...prev, confirmPass: null }));
            }}
            error={!!errors.confirmPass}
            hint={errors.confirmPass}
          />
          <button type="submit" className="btn" style={{ marginTop: 22 }} disabled={isLoading}>
            {isLoading ? "جاري حفظ التغيير..." : "حفظ كلمة المرور الجديدة"}
          </button>
          <button type="button" className="btn ghost" onClick={() => setStep("request")}>
            <ArrowForwardRoundedIcon sx={{ fontSize: 16, verticalAlign: 'middle', ml: 0.5 }} /> العودة لطلب رمز جديد
          </button>
        </form>
      )}
    </div>
  );
}

function SuccessScreen({ onComplete, onClose, userEmail }) {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setPct((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 12;
      });
    }, 40);

    const redirectTimer = setTimeout(() => {
      onComplete();
    }, 600);

    return () => {
      clearInterval(timer);
      clearTimeout(redirectTimer);
    };
  }, [onComplete]);

  return (
    <div className="form-side">
      <button className="close" onClick={onClose} title="إغلاق">
        <CloseRoundedIcon fontSize="small" />
      </button>
      <span className="lang" style={{ display: "inline-flex", alignItems: "center", gap: "5px" }}>
        <HttpsRoundedIcon sx={{ fontSize: 15, color: "#14A800" }} /> اتصال آمن ومشفّر
      </span>
      <div className="success-wrap">
        <div className="ok-circle" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <CheckRoundedIcon sx={{ fontSize: 32, color: "#14A800" }} />
        </div>
        <h2 style={{ marginTop: 22 }}>مرحباً بعودتك! جاري نقلك إلى لوحة التحكم…</h2>
        <div className="details">
          تم تسجيل دخولك بنجاح. مباشرة يمكنك متابعة مشاريعك وفرقك بامتيازات كاملة<br />
          <b>{userEmail || "name@company.com"}</b> — متصل بحسابك الشخصي
        </div>
        <div className="progress-wrap">
          <div className="progress-lbl"><span>جاري التحويل…</span><span>{pct}%</span></div>
          <div className="bar"><i style={{ width: `${pct}%` }}></i></div>
        </div>
        <button 
          type="button" 
          className="btn" 
          style={{ marginTop: '20px', width: '100%' }} 
          onClick={onComplete}
        >
          الدخول للوحة التحكم فوراً ←
        </button>
      </div>
    </div>
  );
}

export default function Login({ initialScreen = "login", onNavigate }) {
  const [authScreen, setAuthScreen] = useState(initialScreen);
  const [loggedInEmail, setLoggedInEmail] = useState("");

  useEffect(() => {
    setAuthScreen(initialScreen);
  }, [initialScreen]);

  const handleLoginSuccess = (email) => {
    if (email) setLoggedInEmail(email);
    setAuthScreen("success");
  };

  const renderForm = () => {
    if (authScreen === "signup") {
      return (
        <SignupScreen 
          onSignup={handleLoginSuccess} 
          go={(s) => setAuthScreen(s)} 
          onClose={() => onNavigate("home")} 
        />
      );
    }
    if (authScreen === "reset") {
      return (
        <ResetScreen 
          onReset={handleLoginSuccess} 
          go={(s) => setAuthScreen(s)} 
          onClose={() => onNavigate("home")} 
        />
      );
    }
    if (authScreen === "success") {
      return (
        <SuccessScreen 
          userEmail={loggedInEmail}
          onComplete={() => onNavigate("dashboard")} 
          onClose={() => onNavigate("home")} 
        />
      );
    }
    return (
      <LoginScreen 
        onLogin={handleLoginSuccess} 
        go={(s) => setAuthScreen(s)} 
        onClose={() => onNavigate("home")} 
      />
    );
  };

  return (
    <div className="auth-wrapper" dir="rtl">
      <div className="frame">
        <SidePanel />
        {renderForm()}
      </div>
    </div>
  );
}
