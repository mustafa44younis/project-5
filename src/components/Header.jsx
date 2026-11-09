import { useState } from 'react';
import logoImage from '../images/Aaa.png';
import './Header.css';
import { useAuth } from '../context/AuthContext';

export default function Header({ 
  activePage = 'home', 
  page, 
  onNavigate, 
  onLogin, 
  onRegister 
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, isAuthenticated } = useAuth();

  const current = activePage || page || 'home';

  const handleNav = (targetId, hashTarget = null) => {
    setMobileOpen(false);

    if (hashTarget === 'home') {
      if (current === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
    }

    if (hashTarget && current === 'home') {
      const el = document.getElementById(hashTarget);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }

    if (onNavigate) {
      onNavigate(targetId);
      if (hashTarget && hashTarget !== 'home') {
        setTimeout(() => {
          const el = document.getElementById(hashTarget);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }, 150);
      }
    }
  };

  const handleLoginClick = () => {
    setMobileOpen(false);
    if (isAuthenticated) {
      if (onNavigate) onNavigate('dashboard');
    } else {
      if (onLogin) onLogin();
      else if (onNavigate) onNavigate('login');
    }
  };

  const handleRegisterClick = () => {
    setMobileOpen(false);
    if (isAuthenticated) {
      if (onNavigate) onNavigate('dashboard');
    } else {
      if (onRegister) onRegister();
      else if (onNavigate) onNavigate('register');
    }
  };

  return (
    <header className="unified-header" dir="rtl">
      <div className="unified-header__container">
        {/* الشعار على اليمين */}
        <div 
          className="unified-header__logo" 
          onClick={() => handleNav('home', 'home')} 
          style={{ cursor: 'pointer' }}
          title="منصة ACCESS"
        >
          <img src={logoImage} alt="ACCESS Logo" className="unified-header__logo-img" />
        </div>

        {/* الروابط في المنتصف */}
        <nav className={`unified-header__nav ${mobileOpen ? 'is-open open' : ''}`}>
          <button 
            type="button"
            className={`unified-header__link ${current === 'home' ? 'active' : ''}`}
            onClick={() => handleNav('home', 'home')}
          >
            الرئيسية
          </button>

          <button 
            type="button"
            className={`unified-header__link ${current === 'services' ? 'active' : ''}`}
            onClick={() => handleNav('home', 'benefits')}
          >
            خدماتنا
          </button>

          <button 
            type="button"
            className={`unified-header__link ${current === 'how' ? 'active' : ''}`}
            onClick={() => handleNav('home', 'steps')}
          >
            كيف نعمل
          </button>

          <button 
            type="button"
            className={`unified-header__link ${current === 'portfolio' ? 'active' : ''}`}
            onClick={() => handleNav('portfolio')}
          >
            معرض الأعمال
          </button>

          <button 
            type="button"
            className={`unified-header__link ${current === 'about' ? 'active' : ''}`}
            onClick={() => handleNav('about')}
          >
            من نحن
          </button>

          <button 
            type="button"
            className={`unified-header__link ${(current === 'contact' || current === 'escrow') ? 'active' : ''}`}
            onClick={() => handleNav('escrow')}
          >
            حماية المدفوعات والضمان
          </button>

          {/* أزرار الموبايل داخل القائمة المنسدلة */}
          <div className="unified-header__mobile-actions">
            {isAuthenticated ? (
              <button 
                type="button" 
                className="unified-header__btn-start" 
                onClick={() => handleNav('dashboard')}
              >
                لوحة التحكم ({user?.full_name?.split(' ')[0] || 'حسابي'})
              </button>
            ) : (
              <>
                <button type="button" className="unified-header__btn-login" onClick={handleLoginClick}>
                  تسجيل الدخول
                </button>
                <button type="button" className="unified-header__btn-start" onClick={handleRegisterClick}>
                  ابدأ مشروعك
                </button>
              </>
            )}
          </div>
        </nav>

        {/* أزرار العمليات على اليسار */}
        <div className="unified-header__actions">
          {isAuthenticated ? (
            <button 
              type="button" 
              className="unified-header__btn-start" 
              onClick={() => handleNav('dashboard')}
              style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <span>لوحة التحكم</span>
              <small style={{ opacity: 0.85, fontWeight: 'normal' }}>
                ({user?.full_name?.split(' ')[0] || 'حسابي'})
              </small>
            </button>
          ) : (
            <>
              <button type="button" className="unified-header__btn-login" onClick={handleLoginClick}>
                تسجيل الدخول
              </button>
              <button type="button" className="unified-header__btn-start" onClick={handleRegisterClick}>
                ابدأ مشروعك
              </button>
            </>
          )}
        </div>

        {/* زر القائمة للشاشات الصغيرة */}
        <button 
          type="button"
          className={`unified-header__burger ${mobileOpen ? 'is-active open' : ''}`} 
          onClick={() => setMobileOpen(!mobileOpen)} 
          aria-label="القائمة"
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
