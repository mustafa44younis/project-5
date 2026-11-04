import React from 'react';
import './CaseStudy.css';
import madarImage from '../images/mmm.jpeg';

// MUI Icons
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import LayersRoundedIcon from '@mui/icons-material/LayersRounded';
import PersonOutlineRoundedIcon from '@mui/icons-material/PersonOutlineRounded';
import ArrowOutwardRoundedIcon from '@mui/icons-material/ArrowOutwardRounded';

export default function CaseStudy({ onNavigate, onRegister }) {
  return (
    <div className="case-study-page" dir="rtl">
      {/* الشريط العلوي */}
      <header className="case-header">
        <div className="case-header-title">
          <LayersRoundedIcon sx={{ color: '#16a34a', fontSize: 24 }} />
          <h2>دراسة حالة المشروع</h2>
        </div>

        <button 
          className="case-close-btn" 
          onClick={() => onNavigate && onNavigate('portfolio')} 
          title="إغلاق"
          aria-label="إغلاق"
        >
          <CloseRoundedIcon sx={{ fontSize: 20 }} />
        </button>
      </header>

      {/* صورة العرض الرئيسية للمشروع */}
      <div className="case-hero-banner">
        <div className="case-hero-inner">
          <img 
            src={madarImage} 
            alt="مدار - لوحة التحكم" 
            className="hero-laptop-img"
          />
        </div>
      </div>

      {/* الحاوية الرئيسية للمحتوى */}
      <main className="case-container">
        {/* عنوان وتفاصيل المشروع */}
        <div className="case-intro">
          <div className="case-meta-badges">
            <span className="case-badge-status">مكتمل</span>
            <span className="case-badge-cat">برمجة ومواقع</span>
          </div>
          <h1 className="case-title">مدار - منصة إدارة أعمال ذكية SaaS</h1>
          <p className="case-desc">
            مساحة عمل واحدة تجمع المهام والفرق والتقارير، لتمنح أصحاب الأعمال رؤية أوضح ليومهم.
          </p>
        </div>

        <hr className="case-divider" />

        {/* قسم: التحدي */}
        <section className="case-section">
          <h2 className="case-section-title">التحدي الذي بدأنا منه</h2>
          <p className="case-section-text">
            تشتّت المهام بين أدوات متعددة وصعوبة متابعة التقدم. كان المطلوب منصة سهلة الاستخدام، بصلاحيات واضحة وتجربة عربية متكاملة تنمو مع الفريق.
          </p>
        </section>

        {/* قسم: الحل والتقنيات */}
        <section className="case-section">
          <h2 className="case-section-title">حل متكامل، من الواجهة إلى البيانات</h2>
          <p className="case-section-text">
            صممنا لوحة تحكم مرنة، وربطنا إدارة المهام بتقارير مباشرة، مع بنية تقنية قابلة للتوسع ومراجعة لكل مرحلة قبل التسليم.
          </p>
          
          <div className="case-tech-tags">
            <span>PostgreSQL</span>
            <span>Node.js</span>
            <span>React</span>
          </div>
        </section>

        {/* قسم: الفريق والتخصصات */}
        <section className="case-section">
          <h2 className="case-section-title">خبرات مختلفة، تحت قيادة واحدة</h2>
          <div className="case-team-grid">
            <div className="case-role-card">
              <PersonOutlineRoundedIcon sx={{ fontSize: 24, color: '#16a34a' }} />
              <h4>قائد تقني</h4>
            </div>
            <div className="case-role-card">
              <PersonOutlineRoundedIcon sx={{ fontSize: 24, color: '#16a34a' }} />
              <h4>مصمم تجربة مستخدم</h4>
            </div>
            <div className="case-role-card">
              <PersonOutlineRoundedIcon sx={{ fontSize: 24, color: '#16a34a' }} />
              <h4>مطوّر واجهات وخلفية</h4>
            </div>
            <div className="case-role-card">
              <PersonOutlineRoundedIcon sx={{ fontSize: 24, color: '#16a34a' }} />
              <h4>مهندس جودة</h4>
            </div>
          </div>
        </section>

        {/* قسم: رأي العميل */}
        <section className="case-testimonial-box">
          <div className="case-quote-mark">
            <svg width="28" height="24" viewBox="0 0 28 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 19C4.2 19 2 16.8 2 14C2 9.2 5.5 5 9.5 3.5L10.5 5.5C7.8 6.7 6 9.3 5.8 12C6.4 11.7 7.2 11.5 8 11.5C10.5 11.5 12.5 13.5 12.5 16C12.5 18 10.5 19 8.5 19H7ZM19.5 19C16.7 19 14.5 16.8 14.5 14C14.5 9.2 18 5 22 3.5L23 5.5C20.3 6.7 18.5 9.3 18.3 12C18.9 11.7 19.7 11.5 20.5 11.5C23 11.5 25 13.5 25 16C25 18 23 19 21 19H19.5Z" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <p className="case-quote-text">
            «لم نكن نبحث عن تنفيذ فقط، بل عن فريق يفهم طريقة عملنا. مع مدار، أصبحت التفاصيل أوضح والتجربة أبسط.»
          </p>
          <span className="case-quote-author">صوت العميل – نموذج توضيحي</span>
        </section>

        {/* شريط الدعوة للعمل السفلي */}
        <footer className="case-footer-cta">
          <span className="case-cta-note">
            دراسة حالة توضيحية لعرض تجربة العمل على المنصة.
          </span>
          <button className="case-btn-cta" onClick={onRegister}>
            ابدأ مشروعًا مشابهًا <ArrowOutwardRoundedIcon sx={{ fontSize: 16, mr: 0.5 }} />
          </button>
        </footer>
      </main>
    </div>
  );
}
