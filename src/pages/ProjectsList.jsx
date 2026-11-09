import React, { useState, useEffect } from 'react';
import TopHeader from '../components/TopHeader';
import ProjectDetails from './ProjectDetails';
import { projectsService } from '../services/projects.service';
import './ProjectsList.css';
import emptyProjectsImg from '../images/empty-projects.png';

// MUI Icons
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import InsightsRoundedIcon from '@mui/icons-material/InsightsRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import PersonOutlineRoundedIcon from '@mui/icons-material/PersonOutlineRounded';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import ArrowOutwardRoundedIcon from '@mui/icons-material/ArrowOutwardRounded';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import SpaRoundedIcon from '@mui/icons-material/SpaRounded';
import SmartphoneRoundedIcon from '@mui/icons-material/SmartphoneRounded';

export default function ProjectsList({ onNavigate }) {
  const [filter, setFilter] = useState('الكل');
  const [search, setSearch] = useState('');
  const [selectedProjectForDetails, setSelectedProjectForDetails] = useState(null);
  const [liveProjects, setLiveProjects] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    const statusMap = {
      'الكل': 'all',
      'قيد التنفيذ': 'in_progress',
      'بانتظار المراجعة': 'under_review',
      'المكتملة': 'completed'
    };
    const statusParam = statusMap[filter] || 'all';
    projectsService.getProjects(statusParam)
      .then((res) => {
        if (isMounted && res?.data) {
          setLiveProjects(res.data);
        }
      })
      .catch((err) => {
        console.warn('Projects live fetch failed:', err.message);
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => { isMounted = false; };
  }, [filter]);

  const defaultProjects = [
    {
      id: 1,
      title: 'متجر سلة الخير',
      fullTitle: 'متجر سلة الخير - تطوير واجهات المتجر',
      subtitle: 'تصميم واجهات وتجربة المستخدم UI/UX',
      code: 'AC-019',
      leader: 'قائد المشروع: أحمد السالم',
      leaderImg: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
      leaderRole: 'قائد المشروع • مصمم واجهات',
      status: 'قيد التنفيذ',
      statusClass: 'in-progress',
      progress: 65,
      nextAction: 'المرحلة الحالية: تطوير واجهات المتجر',
      budget: 'الميزانية غير محدودة',
      date: '22 أكتوبر',
      icon: <ShoppingCartRoundedIcon sx={{ fontSize: 24, color: '#14A800' }} />
    },
    {
      id: 2,
      title: 'هوية نواة',
      fullTitle: 'هوية نواة - تصميم الهوية البصرية',
      subtitle: 'تصميم وإبداع - بدأ في 01 أكتوبر 2026',
      code: 'AC-023',
      leader: 'قائد المشروع: سارة القحطاني',
      leaderImg: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100',
      leaderRole: 'قائد الفريق • مصممة هوية',
      status: 'بانتظار المراجعة',
      statusClass: 'pending',
      progress: 90,
      nextAction: 'المخرجات جاهزة لمراجعتك',
      budget: '4,500 ر.س',
      date: '18 أكتوبر',
      icon: <SpaRoundedIcon sx={{ fontSize: 24, color: '#14A800' }} />
    },
    {
      id: 3,
      title: 'تطبيق موعد',
      fullTitle: 'تطبيق موعد - تصميم تجربة المستخدم',
      subtitle: 'تصميم واجهات وتجربة المستخدم UI/UX',
      code: 'AC-031',
      leader: 'قائد المشروع: خالد الحربي',
      leaderImg: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100',
      leaderRole: 'قائد المشروع • مطور تطبيقات',
      status: 'قيد التنفيذ',
      statusClass: 'in-progress',
      progress: 35,
      nextAction: 'تفاصيل المرحلة غير محدودة',
      budget: 'الميزانية غير محدودة',
      date: 'الموعد غير محدد',
      icon: <SmartphoneRoundedIcon sx={{ fontSize: 24, color: '#14A800' }} />
    }
  ];

  const rawList = Array.isArray(liveProjects) 
    ? liveProjects 
    : (liveProjects?.projects || []);

  const counts = liveProjects?.counts || {
    all: rawList.length || 3,
    in_progress: rawList.filter(p => p.status === 'in_progress').length || 2,
    under_review: rawList.filter(p => p.status === 'under_review').length || 1,
    completed: rawList.filter(p => p.status === 'completed').length || 0,
  };

  const projects = rawList.length > 0
    ? rawList.map((p, idx) => ({
        id: p.id,
        title: p.title,
        fullTitle: `${p.title} - ${p.current_phase_name || p.category || 'مشروع تقني'}`,
        subtitle: p.category || 'تطوير وتصميم',
        code: `AC-${String(p.id).padStart(3, '0')}`,
        leader: `قائد المشروع: ${p.team_leader?.full_name || 'قائد الفريق'}`,
        leaderImg: p.team_leader?.avatar_url || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
        leaderRole: p.team_leader?.job_title || p.team_leader?.role || 'قائد الفريق',
        status: p.status === 'under_review' ? 'بانتظار المراجعة' : (p.status === 'completed' ? 'مكتمل' : 'قيد التنفيذ'),
        statusClass: p.status === 'under_review' ? 'pending' : (p.status === 'completed' ? 'completed' : 'in-progress'),
        progress: Number(p.progress) || 0,
        nextAction: `المرحلة الحالية: ${p.current_phase_name || 'قيد التطوير'}`,
        budget: p.budget ? `${Number(p.budget).toLocaleString()} ر.س` : 'الميزانية غير محدودة',
        date: p.deadline_formatted || p.deadline || 'قريباً',
        icon: idx % 3 === 0 ? <ShoppingCartRoundedIcon sx={{ fontSize: 24, color: '#14A800' }} /> : (idx % 3 === 1 ? <SpaRoundedIcon sx={{ fontSize: 24, color: '#14A800' }} /> : <SmartphoneRoundedIcon sx={{ fontSize: 24, color: '#14A800' }} />)
      }))
    : defaultProjects;

  // دالة فتح صفحة تفاصيل المشروع مباشرة
  const handleOpenProjectDetails = (project) => {
    setSelectedProjectForDetails(project);
    if (onNavigate) {
      onNavigate('project-details', project);
    }
  };

  // دالة الرجوع لقائمة المشاريع
  const handleBackToProjects = () => {
    setSelectedProjectForDetails(null);
    if (onNavigate) {
      onNavigate('projects');
    }
  };

  // إذا تم اختيار مشروع لعرض تفاصيله يتم عرض صفحة ProjectDetails مباشرة
  if (selectedProjectForDetails) {
    return (
      <ProjectDetails 
        projectData={selectedProjectForDetails}
        onNavigate={(target, data) => {
          if (target === 'projects' || target === 'back') {
            handleBackToProjects();
          } else if (onNavigate) {
            onNavigate(target, data);
          }
        }}
      />
    );
  }

  const filteredProjects = projects.filter(p => {
    const matchesFilter = 
      filter === 'الكل' || 
      (filter === 'قيد التنفيذ' && p.status === 'قيد التنفيذ') ||
      (filter === 'بانتظار المراجعة' && p.status === 'بانتظار المراجعة') ||
      (filter === 'المكتملة' && p.status === 'مكتملة');
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="projects-list-page" dir="rtl">
      {/* 1. الهيدر العلوي الموحد */}
      <TopHeader 
        userName="عبد الله العتيبي" 
        userRole="حساب عميل" 
        onNewProject={() => onNavigate && onNavigate('ai')} 
      />

      {/* 2. رأس الصفحة */}
      <div 
        className="proj-top-header-section" 
        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', width: '100%' }}
      >
        <div className="proj-header-right">
          <h1>مشاريعي</h1>
          <p>تابع تقدم أعمالك، وتعاون مع فريقك من الفكرة إلى الإنجاز</p>
        </div>
        <button 
          className="btn-new-project-main" 
          onClick={() => onNavigate && onNavigate('ai')}
          style={{
            background: '#14A800',
            color: '#ffffff',
            border: 'none',
            padding: '10px 22px',
            borderRadius: '12px',
            fontWeight: '800',
            fontSize: '13px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 4px 12px rgba(20, 168, 0, 0.2)',
            whiteSpace: 'nowrap'
          }}
        >
          <AddRoundedIcon sx={{ fontSize: 18 }} /> مشروع جديد
        </button>
      </div>

      {/* 3. كارت الإحصائيات العلوي */}
      <div className="proj-summary-card">
        <div className="summary-info">
          <div className="summary-icon">
            <InsightsRoundedIcon sx={{ fontSize: 28, color: '#14A800' }} />
          </div>
          <div>
            <h3>كل خطوة تقربك من الإنجاز</h3>
            <p>نظرة سريعة على مسار مشاريعك في ACCESS</p>
          </div>
        </div>
        <div className="summary-stats-boxes">
          <div className="stat-box">
            <span className="num gray">{counts.completed ?? 0}</span>
            <span className="lbl">مشاريع مكتملة</span>
          </div>
          <div className="stat-box">
            <span className="num orange">{counts.under_review ?? 1}</span>
            <span className="lbl">بانتظار المراجعة</span>
          </div>
          <div className="stat-box">
            <span className="num green">{counts.in_progress ?? 2}</span>
            <span className="lbl">قيد التنفيذ</span>
          </div>
        </div>
      </div>

      {/* 4. شريط الفلترة والبحث */}
      <div className="proj-filter-bar">
        <div className="filter-tabs">
          <button className={filter === 'الكل' ? 'active' : ''} onClick={() => setFilter('الكل')}>الكل ({counts.all ?? 3})</button>
          <button className={filter === 'قيد التنفيذ' ? 'active' : ''} onClick={() => setFilter('قيد التنفيذ')}>قيد التنفيذ ({counts.in_progress ?? 2})</button>
          <button className={filter === 'بانتظار المراجعة' ? 'active' : ''} onClick={() => setFilter('بانتظار المراجعة')}>بانتظار المراجعة ({counts.under_review ?? 1})</button>
          <button className={filter === 'المكتملة' ? 'active' : ''} onClick={() => setFilter('المكتملة')}>المكتملة ({counts.completed ?? 0})</button>
        </div>
        <div className="search-input-box">
          <SearchRoundedIcon sx={{ color: '#667085', fontSize: 20 }} />
          <input 
            type="text" 
            placeholder="ابحث عن مشروع..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* 5. شبكة كروت المشاريع */}
      <div className="projects-cards-grid">
        {filteredProjects.length === 0 ? (
          /* ===== حالة عدم وجود مشاريع ===== */
          <div style={{
            gridColumn: '1 / -1',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '48px 24px',
            background: '#fff',
            borderRadius: '16px',
            border: '1px solid #EAEAEA',
            textAlign: 'center',
            gap: '12px',
            minHeight: '320px'
          }}>
            <img
              src={emptyProjectsImg}
              alt="لا توجد مشاريع"
              style={{ width: '200px', maxWidth: '80%', marginBottom: '8px' }}
            />
            <h3 style={{ fontSize: '20px', fontWeight: '900', color: '#181818', margin: 0 }}>
              لا توجد لديك مشاريع قيد التنفيذ حالياً
            </h3>
            <p style={{ fontSize: '13px', color: '#667085', maxWidth: '400px', lineHeight: 1.7, margin: 0 }}>
              ابدأ بتحويل فكرتك اليوم إلى مشروع حقيقي. اختر نوع الاستشارة وبما تعاون فريقك المخصص
            </p>
            <button
              type="button"
              onClick={() => onNavigate && onNavigate('ai')}
              style={{
                background: '#14A800',
                color: '#fff',
                border: 'none',
                borderRadius: '10px',
                padding: '11px 28px',
                fontSize: '13.5px',
                fontWeight: '800',
                cursor: 'pointer',
                fontFamily: 'inherit',
                marginTop: '4px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              + ابدأ مشروعك الأول الآن
            </button>
            <small style={{ fontSize: '11px', color: '#94A3B8', marginTop: '4px' }}>
              خطوات الأول الاستشارية الذكية لتوضيح فكرتك
            </small>
          </div>
        ) : (
        filteredProjects.map((project) => (
          <div className="proj-card" key={project.id}>
            <div className="proj-card-top">
              <span className={`proj-status-badge ${project.statusClass}`}>
                {project.status}
              </span>
              <div className="proj-icon-bg">{project.icon}</div>
              <button className="btn-options-dots">
                <MoreHorizRoundedIcon sx={{ fontSize: 18 }} />
              </button>
            </div>

            <div className="proj-card-main">
              <h2 
                onClick={() => handleOpenProjectDetails(project)} 
                style={{ cursor: 'pointer' }}
                title="اضغط لعرض تفاصيل المشروع"
              >
                {project.title}
              </h2>
              <p className="proj-sub">{project.subtitle}</p>
              <div className="proj-leader-info" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <img 
                  src={project.leaderImg} 
                  alt={project.leader} 
                  style={{ width: '22px', height: '22px', borderRadius: '50%', objectFit: 'cover' }} 
                />
                <span>{project.leader}</span>
              </div>

              <div className="proj-progress-section">
                <div className="prog-labels">
                  <span>إنجاز المشروع</span>
                  <span style={{ fontWeight: 800, color: '#14A800' }}>{project.progress}%</span>
                </div>
                <div className="prog-bar-track">
                  <div className="prog-bar-fill" style={{ width: `${project.progress}%` }}></div>
                </div>
                <div className="next-action-text">{project.nextAction}</div>
              </div>
            </div>

            <div className="proj-card-meta">
              <div className="meta-item">
                <MonetizationOnOutlinedIcon sx={{ fontSize: 16, color: '#667085', verticalAlign: 'text-bottom', ml: 0.5 }} /> 
                {project.budget}
              </div>
              <div className="meta-item">
                <CalendarMonthOutlinedIcon sx={{ fontSize: 16, color: '#667085', verticalAlign: 'text-bottom', ml: 0.5 }} /> 
                {project.date}
              </div>
            </div>

            <div className="proj-card-actions">
              <button 
                className="btn-review-outline" 
                onClick={() => onNavigate ? onNavigate('review-deliverables', project) : handleOpenProjectDetails(project)}
              >
                مراجعة المخرجات
              </button>
              {/* زر عرض تفاصيل المشروع المربوط مباشرة بصفحة ProjectDetails */}
              <button 
                className="btn-details-link" 
                onClick={() => handleOpenProjectDetails(project)}
                style={{ cursor: 'pointer' }}
              >
                عرض تفاصيل المشروع <ArrowOutwardRoundedIcon sx={{ fontSize: 16, verticalAlign: 'middle', mr: 0.5 }} />
              </button>
            </div>
          </div>
        ))
        )} {/* نهاية الشرط filteredProjects.length === 0 */}
      </div>

      {/* 6. البانرات السفلية */}
      <div className="proj-bottom-banners">
        <div className="banner-card green-bg">
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span className="b-icon">
              <AutoAwesomeRoundedIcon sx={{ fontSize: 24, color: '#ffffff' }} />
            </span>
            <div className="b-text">
              <h3>لمستك الأخيرة تصنع الفرق</h3>
              <p>مخرجات «هوية نواة» بانتظار مراجعتك. شارك ملاحظاتك مع سارة القحطاني</p>
            </div>
          </div>
          <button 
            className="btn-banner-white" 
            onClick={() => onNavigate ? onNavigate('review-deliverables', projects[1]) : handleOpenProjectDetails(projects[1])}
          >
            مراجعة المخرجات
          </button>
        </div>

        <div className="banner-card dark-bg">
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span className="b-icon">
              <LightbulbOutlinedIcon sx={{ fontSize: 24, color: '#14A800' }} />
            </span>
            <div className="b-text">
              <h3>فكرتك القادمة تبدأ بمحادثة</h3>
              <p>حوّل فكرتك إلى ملخص واضح مع الاستشارة الذكية</p>
            </div>
          </div>
          <button className="btn-banner-green" onClick={() => onNavigate && onNavigate('ai')}>
            ابدأ الاستشارة الذكية <ArrowOutwardRoundedIcon sx={{ fontSize: 16, verticalAlign: 'middle', mr: 0.5 }} />
          </button>
        </div>
      </div>
    </div>
  );
}
