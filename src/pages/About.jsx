import React from 'react';
import logoImage from '../images/Aaa.png';
import './About.css';
import Header from '../components/Header';

export default function About({ onNavigate, onLogin, onRegister }) {
  const values = [
    {
      num: "١",
      title: "إشراف تقني متكامل",
      desc: "قائد تقني يستوعب الفكرة، يوجه الفريق، ويتابع التفاصيل، بدءاً من البناء وحتى التسليم النهائي.",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#14A800" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
        </svg>
      )
    },
    {
      num: "٢",
      title: "أمان مالي كامل",
      desc: "مدفوعاتك محمية بنظام الضمان، ولا تُحرر إلا بعد موافقتك واستلام المخرجات.",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#14A800" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        </svg>
      )
    },
    {
      num: "٣",
      title: "التزام وجودة",
      desc: "موافقة على مخرجات دقيقة، وتقييم مستمر لضمان أعلى مستويات الجودة.",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#14A800" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
          <line x1="16" y1="2" x2="16" y2="6"/>
          <line x1="8" y1="2" x2="8" y2="6"/>
          <line x1="3" y1="10" x2="21" y2="10"/>
        </svg>
      )
    },
    {
      num: "٤",
      title: "اكتشاف ذكي",
      desc: "نستعين بالذكاء الاصطناعي لدمج متطلبات مشروعك وتحديد الأهداف والنطاق بدقة.",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#14A800" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z"/>
          <path d="M12 6v6l4 2"/>
        </svg>
      )
    }
  ];

  const team = [
    {
      name: "ريم السالم",
      role: "الإدارة والمنتج والإشراف",
      desc: "تعمل على إدارة وتطوير المنتجات",
      img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop",
      position: "center 20%"
    },
    {
      name: "عمر الحسن",
      role: "القائد التقني",
      desc: "خبرة في التطوير وبناء الأنظمة",
      img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop",
      position: "center 20%"
    },
    {
      name: "ليان مراد",
      role: "قائدة تجربة المستخدم",
      desc: "تحول الأفكار إلى تجربة سهلة",
      img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop",
      position: "center 20%"
    },
    {
      name: "يوسف عمران",
      role: "هندسة الجودة والتسليم",
      desc: "تضمن الجودة في أفضل شكل",
      img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&auto=format&fit=crop",
      position: "center 20%"
    }
  ];

  return (
    <div className="about-page" dir="rtl">
      {/* 1. Navbar */}
      <Header 
        activePage="about" 
        onNavigate={onNavigate} 
        onLogin={onLogin} 
        onRegister={onRegister} 
      />

      {/* 2. Top Hero Section */}
      <section className="about-hero-bottom">
        <div className="hero-container">
          <div className="hero-image-wrapper">
            <div className="hero-img-box">
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop" 
                alt="فريق العمل" 
                className="hero-img"
              />
              <div className="img-badge">
                <span className="badge-icon">🌿</span>
                <span>فريق واحد، مسؤولية مشتركة.</span>
              </div>
            </div>
          </div>

          <div className="hero-content">
            <span className="section-pill">— من نحن</span>
            <h2 className="hero-title">نُقرّب المسافة بين الأفكار والإنجاز</h2>
            <p className="hero-desc">
              نحن منصة ACCESS نجمع مرونة العمل الحر واحترافية الوكالة في تجربة واحدة. نعمل بنظام المواهب المناسبة وبإشراف تقني من أول سؤال حتى آخر تفصيلة.
            </p>
            <div className="hero-btns">
              <button className="btn-green" onClick={onRegister}>
                لتتحدث عن فكرتك ←
              </button>
              <button className="btn-outline" onClick={() => onNavigate && onNavigate('portfolio')}>
                استكشف أعمالنا
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Partner Note */}
      <div className="partner-note-section">
        <h3>شريك في الرحلة، لا مجرد حلقة وصل.</h3>
        <p>بدأت الفكرة من سؤال بسيط: لماذا يضطر صاحب المشروع للاختيار بين مرونة المستقلين وتنظيم الوكالات؟ صممنا أكسس لتدمج الأفضل من الاثنين، لنمنح رؤيتك سوياً فريق عمل متكامل تفاصيل التنفيذ.</p>
        <span className="check-text">✓ تواصل واضح، مسؤولية محددة، وتسليم تطمئن إليه</span>
      </div>

      {/* 4. Values Section */}
      <section className="values-section">
        <div className="section-header-right">
          <span className="section-sub-title">ما الذي نعتمد عليه؟</span>
          <h2>قيم تصنع فرقاً في تجربتك</h2>
          <p>ليست مجرد كلام على الورق، بل معايير نترجمها إلى خطوات واضحة في كل مشروع.</p>
        </div>

        <div className="values-grid">
          {values.map((v, i) => (
            <div className="value-card" key={i}>
              <div className="val-top">
                <span className="val-icon">{v.icon}</span>
                <span className="val-num">{v.num}</span>
              </div>
              <h3>{v.title}</h3>
              <p>{v.desc}</p>
            </div>
          ))}
        </div>

        {/* Process Bar */}
        <div className="process-bar">
          <div className="process-title">من أول فكرة، إلى تسليم واثق.</div>
          <div className="process-steps">
            <span>تراجع وتستلم 📋</span>
            <span>تشكيل الفريق واعتمد 🤝</span>
            <span>تقسيم وتحديد النطاق 🗺️</span>
            <span>تستلم وتسلّم 🎯</span>
          </div>
        </div>
      </section>

      {/* 5. Team Section */}
      <section className="team-section">
        <div className="section-header-right">
          <span className="section-sub-title">القيادة والفريق الأساسي</span>
          <h2>نؤمن بالأشخاص وراء الإنجاز</h2>
          <p>خلف كل مشروع ناجح، يقف أفراد يمتلكون الشغف والخبرة لنقل مشاريعك إلى مستوى أفضل.</p>
        </div>

        <div className="team-grid">
          {team.map((member, i) => (
            <div className="team-card" key={i}>
              <div className="team-img-box">
                <img src={member.img} alt={member.name} style={{ objectPosition: member.position || "center 20%" }} />
              </div>
              <h3>{member.name}</h3>
              <span className="team-role">{member.role}</span>
              <p className="team-desc">{member.desc}</p>
            </div>
          ))}
        </div>

        <div className="join-network-note">
          <span>هذا بالإضافة لشبكتنا الممتدة!</span>
          <button className="link-green" onClick={onRegister}>انضم إلى شبكة خبرائنا ↗</button>
        </div>
      </section>

      {/* 6. CTA Banner */}
      <section className="cta-banner-section">
        <div className="cta-box">
          <div className="cta-text">
            <h2>فكرتك تستحق الفريق المناسب</h2>
            <p>شاركنا طموحك، ودعنا نحوله معاً إلى منتج يستحق أن يُرى.</p>
          </div>
          <button className="btn-green-cta" onClick={onRegister}>
            ابدأ مشروعك الآن ↗
          </button>
        </div>
      </section>

      {/* 7. Footer */}
      <footer className="about-footer">
        <div className="footer-container">
          <div className="footer-brand">
            <div className="f-logo">
              <img src={logoImage} alt="ACCESS Logo" className="about-logo-image footer-logo" />
            </div>
            <p>خبرات مستقلة تعمل بروح فريق واحد، تجمع المواهب والإشراف التقني لتصنع معك إنجازك القادم.</p>
          </div>
          <div className="footer-col">
            <h4>اكتشف ACCESS</h4>
            <span onClick={() => onNavigate && onNavigate('about')}>من نحن</span>
            <span onClick={() => onNavigate && onNavigate('portfolio')}>معرض الأعمال</span>
            <span>خدماتنا</span>
            <span>انضم كمستقل</span>
          </div>
          <div className="footer-col">
            <h4>المساعدة</h4>
            <span>الأسئلة الشائعة</span>
            <span>الشروط والأحكام</span>
            <span onClick={() => onNavigate && onNavigate('privacy')}>سياسة الخصوصية</span>
          </div>
          <div className="footer-col">
            <h4>نبني شيئاً مميزاً</h4>
            <span>شاركنا تجربتك</span>
          </div>
        </div>
        <div className="footer-bottom">
          <span>جميع الحقوق محفوظة © ACCESS 2026</span>
        </div>
      </footer>
    </div>
  );
}