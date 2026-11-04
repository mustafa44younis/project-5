import React, { useState } from 'react';
import logoImage from '../images/Aaa.png';
import madarImage from '../images/mmm.jpeg';
import './Portfolio.css';
import Header from '../components/Header';

export default function Portfolio({ onNavigate, onLogin, onRegister }) {
  const [activeTab, setActiveTab] = useState("الكل");
  const [searchTerm, setSearchTerm] = useState("");

  const categories = ["الكل", "تصميم وموقع ويب", "تطبيقات جوال", "تصميم هوية بصرية", "موشن جرافيك"];

  const projects = [
    {
      id: 1,
      title: "هوية نواة - نظام بصري متكامل للعلامة التجارية",
      category: "تصميم هوية بصرية",
      catTag: "هوية بصرية",
      desc: "استراتيجية العلامة، نظام ألوان ودليل الهوية.",
      linkText: "عرض دراسة الحالة ←",
      status: "مكتمل",
      img: "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?q=80&w=600&auto=format&fit=crop"
    },
    {
      id: 2,
      title: "مدار - منصة إدارة أعمال ذكية كـ SaaS",
      category: "تصميم وموقع ويب",
      catTag: "برمجة وموقع",
      desc: "تجربة مستخدم ولوحة تحكم متكاملة للمؤسسات.",
      linkText: "تجربة المنصة ↗",
      status: "مكتمل",
      img: madarImage
     
    },
    {
      id: 3,
      title: "رفيق - تجربة سفر وحجوزات ذكية",
      category: "تطبيقات جوال",
      catTag: "تطبيقات جوال",
      desc: "تطبيق لتسهيل رحلاتك وتخطيط المواعيد.",
      linkText: "استكشف المشروع ↗",
      status: "مكتمل",
      img: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=600&auto=format&fit=crop"
    },
    {
      id: 4,
      title: "سوق - تجربة تسوق أقرب لعملائك",
      category: "تصميم وموقع ويب",
      catTag: "برمجة وموقع",
      desc: "متجر إلكتروني فائق السرعة والأداء.",
      linkText: "استكشف المشروع ↗",
      status: "مكتمل",
      img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600&auto=format&fit=crop"
    },
    {
      id: 5,
      title: "أثر - حكاية علامة تنبض بالحياة",
      category: "موشن جرافيك",
      catTag: "موشن جرافيك",
      desc: "فيديو تعريفي تفاعلي يعرض خدمات المنصة.",
      linkText: "استكشف المشروع ↗",
      status: "مكتمل",
      img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=600&auto=format&fit=crop"
    },
    {
      id: 6,
      title: "ميزان - إدارة مالية بوضوح أكبر",
      category: "تطبيقات جوال",
      catTag: "تطبيقات جوال",
      desc: "تطبيق للمحاسبة وتتبع المصاريف والمدفوعات.",
      linkText: "استكشف المشروع ↗",
      status: "مكتمل",
      img: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=600&auto=format&fit=crop"
    },
    {
      id: 7,
      title: "بُنّ - هوية من أصل الحكاية",
      category: "تصميم هوية بصرية",
      catTag: "هوية بصرية",
      desc: "هوية تجارية فاخرة لمقاهي ومحمصة قهوة.",
      linkText: "استكشف المشروع ↗",
      status: "مكتمل",
      img: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=600&auto=format&fit=crop"
    },
    {
      id: 8,
      title: "نبض - الرعاية الصحية في متناولك",
      category: "تطبيقات جوال",
      catTag: "تطبيقات جوال",
      desc: "منصة لحجز المواعيد والاستشارات الطبية.",
      linkText: "استكشف المشروع ↗",
      status: "مكتمل",
      img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=600&auto=format&fit=crop"
    },
    {
      id: 9,
      title: "أفق - مساحة جديدة للتعلم",
      category: "تصميم وموقع ويب",
      catTag: "برمجة وموقع",
      desc: "منصة تعليمية تقدم دورات تفاعلية.",
      linkText: "استكشف المشروع ↗",
      status: "مكتمل",
      img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=600&auto=format&fit=crop"
    }
  ];

  const filteredProjects = projects.filter(p => {
    const matchesCategory = activeTab === "الكل" || p.category === activeTab;
    const matchesSearch = p.title.includes(searchTerm) || p.desc.includes(searchTerm);
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="portfolio-page" dir="rtl">
      {/* Unified Header */}
      <Header 
        activePage="portfolio" 
        onNavigate={onNavigate} 
        onLogin={onLogin} 
        onRegister={onRegister} 
      />

      <section className="portfolio-hero">
        <span className="hero-sub">◆ معرض الأعمال</span>
        <h1>أفكار تحولت إلى قصص نجاح تقنية</h1>
        <p>مشاريع متكاملة، وخبرات موثقة. اكتشف كيف تحولت أفكارنا التقنية لتحديات الأعمال إلى تجارب رقمية تصنع الفرق.</p>

        {/* Search Input */}
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input 
            type="text" 
            placeholder="ابحث عن مشروع، خدمة أو مجال..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Filter Categories */}
        <div className="categories-filter">
          {categories.map((cat) => (
            <button 
              key={cat} 
              className={`filter-btn ${activeTab === cat ? 'active' : ''}`}
              onClick={() => setActiveTab(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      <section className="portfolio-content">
        <div className="section-title-row">
          <h2>كل مشروع، حكاية مختلفة</h2>
          <span className="count-badge">٩ أفكار تم إنجازها</span>
        </div>

        <div className="projects-grid">
          {filteredProjects.map((project) => (
            <div className="project-card" key={project.id} onClick={() => onNavigate && onNavigate('case')}>
              <div className="card-image-wrap">
                <img src={project.img} alt={project.title} />
                <span className="badge-status">✓ {project.status}</span>
              </div>

              <div className="card-body">
                <span className="card-category-tag">{project.catTag}</span>
                <h3>{project.title}</h3>
                <p>{project.desc}</p>
                
                <div className="card-footer">
                  <span className="project-link">{project.linkText}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Box */}
      <section className="portfolio-cta">
        <div className="cta-card">
          <div className="cta-icon-box">↗</div>
          <div className="cta-text">
            <h2>هل لديك فكرة مشروع مشابه؟</h2>
            <p>شاركنا طموحك، ودعنا نحوله معاً إلى منتج يستحق أن يُرى.</p>
          </div>
          <button className="btn-primary-lg" onClick={onRegister}>ابدأ مشروعك الآن ←</button>
        </div>
      </section>

      {/* Footer */}
      <footer className="portfolio-footer">
        <div className="footer-container">
          <div className="footer-brand">
            <div className="brand-logo">
              <img src={logoImage} alt="ACCESS Logo" className="portfolio-logo-image footer-logo" />
            </div>
            <p>خبرات مستقلة تعمل بروح فريق واحد، نجمع المواهب والإنضباط التقني لنصنع معك إنجازك القادم.</p>
          </div>

          <div className="footer-col">
            <h4>اكتشف ACCESS</h4>
            <a href="#services">خدماتنا</a>
            <a href="#portfolio">معرض الأعمال</a>
            <a href="#about" onClick={(e) => { e.preventDefault(); onNavigate && onNavigate('about'); }}>من نحن</a>
            <a href="#escrow" onClick={(e) => { e.preventDefault(); onNavigate && onNavigate('escrow'); }}>الضمان المستقل</a>
          </div>

          <div className="footer-col">
            <h4>المساعدة</h4>
            <a href="#faq">الأسئلة الشائعة</a>
            <a href="#terms">الشروط والأحكام</a>
            <a href="#privacy" onClick={(e) => { e.preventDefault(); onNavigate && onNavigate('privacy'); }}>سياسة الخصوصية</a>
          </div>

          <div className="footer-col">
            <h4>تواصل معنا</h4>
            <p>تحدث مع فريقنا</p>
            <div className="social-icons">
              <span>in</span>
              <span>📷</span>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>جميع الحقوق محفوظة منصة ACCESS © 2026</span>
          <span>الشروط · الخصوصية · الأمان المالي</span>
        </div>
      </footer>
    </div>
  );
}
