import React, { useState, useEffect } from 'react';
import TopHeader from '../components/TopHeader';
import ChatBubbleOutlineRoundedIcon from '@mui/icons-material/ChatBubbleOutlineRounded';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import NorthWestRoundedIcon from '@mui/icons-material/NorthWestRounded';
import HourglassEmptyRoundedIcon from '@mui/icons-material/HourglassEmptyRounded';
import projectsService from '../services/projects.service';
import './ProjectDetails.css';

export default function ProjectDetails({ onNavigate, projectData }) {
  // القيمة المبدئية والافتراضية
  const initialProjectId = projectData?.id || 2;
  const [projectId, setProjectId] = useState(initialProjectId);
  const [loading, setLoading] = useState(false);
  const [apiProject, setApiProject] = useState(null);

  // جلب تفاصيل المشروع الحقيقية من الـ API
  useEffect(() => {
    let isMounted = true;
    const fetchProjectDetails = async () => {
      setLoading(true);
      try {
        const idToFetch = projectData?.id || 2;
        const res = await projectsService.getProject(idToFetch);
        if (isMounted && res?.data) {
          setApiProject(res.data);
          setProjectId(idToFetch);
        }
      } catch (err) {
        console.warn('⚠️ تعذر جلب تفاصيل المشروع من الـ API، سيتم استخدام البيانات المحلية المتاحة:', err.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchProjectDetails();
    return () => { isMounted = false; };
  }, [projectData?.id]);

  // دمج بيانات الـ API مع البيانات الافتراضية
  const project = {
    id: apiProject?.id || projectData?.id || 2,
    title: apiProject?.title || projectData?.title || 'هوية نواة',
    category: apiProject?.category || projectData?.category || 'تصميم وإبداع',
    fullTitle: apiProject?.title 
      ? `${apiProject.title} - ${apiProject.category || 'تصميم الهوية البصرية'}` 
      : (projectData?.fullTitle || 'هوية نواة - تصميم الهوية البصرية'),
    subtitle: apiProject?.description || projectData?.subtitle || 'تصميم وإبداع - بدأ في 01 أكتوبر 2026',
    code: projectData?.code || `AC-0${apiProject?.id ? apiProject.id * 10 + 3 : '23'}`,
    status: apiProject?.status === 'under_review' ? 'بانتظار المراجعة' :
            apiProject?.status === 'in_progress' ? 'قيد التنفيذ' :
            apiProject?.status === 'completed' ? 'مكتمل' :
            (projectData?.status || 'بانتظار المراجعة'),
    progress: apiProject?.progress !== undefined ? apiProject.progress : (projectData?.progress || 90),
    budget: apiProject?.budget 
      ? Number(apiProject.budget).toLocaleString() 
      : (projectData?.budget || '4,500'),
    date: apiProject?.deadline_formatted || apiProject?.deadline || projectData?.date || '18 أكتوبر',
    leader: apiProject?.team_leader?.full_name || projectData?.leader || 'سارة القحطاني',
    leaderRole: apiProject?.team_leader?.job_title || projectData?.leaderRole || 'قائد الفريق • مصممة هوية',
    leaderAvatar: apiProject?.team_leader?.avatar_url || null,
  };

  const isSallet = (project.title || '').includes('سلة') || (project.leader || '').includes('أحمد');
  const isMawid = (project.title || '').includes('موعد') || (project.leader || '').includes('خالد');

  const leaderName = isSallet ? 'أحمد السالم' : isMawid ? 'خالد الحربي' : (project.leader ? project.leader.replace('قائد المشروع: ', '').replace('قائد الفريق: ', '') : 'سارة القحطاني');
  const leaderRole = isSallet ? 'قائد المشروع • مصمم واجهات' : isMawid ? 'قائد المشروع • مطور تطبيقات' : (project.leaderRole || 'قائد الفريق • مصممة هوية');
  
  // صور شخصية متطابقة بدقة مع الاسم والجنس
  const leaderImg = project.leaderAvatar || (isSallet
    ? 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100'
    : isMawid
    ? 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100'
    : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100');

  // إعداد أعضاء الفريق (من API أو الافتراضي)
  const defaultTeamMembers = isSallet ? [
    {
      name: 'أحمد السالم',
      role: 'قائد المشروع • مصمم واجهات',
      img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
      status: '● متاح الآن'
    },
    {
      name: 'نورة الدوسري',
      role: 'مطورة واجهات أمامية',
      img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
      status: '● تعمل على المتجر'
    },
    {
      name: 'سعود المطيري',
      role: 'مختص تجربة الشراء والتسوق',
      img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100',
      status: '● متاح الآن'
    }
  ] : isMawid ? [
    {
      name: 'خالد الحربي',
      role: 'قائد المشروع • مطور تطبيقات',
      img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100',
      status: '● متاح الآن'
    },
    {
      name: 'منى الغامدي',
      role: 'مصممة واجهات وتجربة المستخدم UI/UX',
      img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100',
      status: '● تعمل على الشاشات'
    },
    {
      name: 'طارق الزهراني',
      role: 'مهندس تكامل الأنظمة والتقويم',
      img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100',
      status: '● متاح الآن'
    }
  ] : [
    {
      name: 'سارة القحطاني',
      role: 'قائد الفريق • مصممة هوية',
      img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100',
      status: '● متاحة الآن'
    },
    {
      name: 'هند الشمري',
      role: 'مصممة تايبوغرافي ومطبوعات',
      img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100',
      status: '● تعمل على الدليل'
    },
    {
      name: 'عبدالرحمن الشهري',
      role: 'مختص علامات تجارية',
      img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
      status: '● متاح الآن'
    }
  ];

  const teamMembers = (apiProject?.team_members && apiProject.team_members.length > 0)
    ? apiProject.team_members.map((m) => ({
        name: m.full_name,
        role: m.role_in_project || m.job_title || 'عضو بالفريق',
        img: m.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100',
        status: '● متاح الآن'
      }))
    : defaultTeamMembers;

  // إعداد المراحل (من الـ API أو المراحل الافتراضية)
  const apiMilestones = apiProject?.milestones;
  const completedMilestonesCount = apiMilestones 
    ? apiMilestones.filter(m => m.status === 'completed').length 
    : 2;
  const totalMilestonesCount = apiMilestones ? apiMilestones.length : 4;

  const projectIconChar = isSallet ? 'س' : isMawid ? 'م' : 'ن';
  const projectIconBg = isSallet ? '#14A800' : isMawid ? '#0BA5EC' : '#1E392A';

  // النشاطات الحقيقية أو الافتراضية
  const recentActivities = (apiProject?.recent_activities && apiProject.recent_activities.length > 0)
    ? apiProject.recent_activities
    : [
        {
          id: 1,
          icon: '📄',
          title: 'رفعت سارة دليل الهوية البصرية للمراجعة',
          subtitle: 'Nawa_Brand_Guidelines_v1.pdf',
          time: 'اليوم 10:45 ص'
        },
        {
          id: 2,
          icon: '🖼️',
          title: 'أضافت نورة تطبيقات الهوية إلى ملفات المشروع',
          subtitle: '3 ملفات • نماذج القرطاسية والتغليف',
          time: 'أمس 02:30 م'
        },
        {
          id: 3,
          icon: '✓',
          title: 'اعتمدت مفاهيم الشعار المبدئية',
          subtitle: 'اكتملت المرحلة الثانية بنجاح',
          time: '10 أكتوبر 11:20 ص'
        }
      ];

  return (
    <div className="project-details-page" dir="rtl">
      {/* 1. الهيدر العلوي الموحد */}
      <TopHeader 
        userName="عبد الله العتيبي" 
        userRole="حساب عميل" 
        onNewProject={() => onNavigate && onNavigate('ai')} 
      />

      {/* 2. مسار التنقل وعنوان الصفحة وكود المشروع */}
      <div className="pd-breadcrumb-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '22px' }}>
        <div>
          <span style={{ fontSize: '12px', color: '#667085', marginBottom: '4px', display: 'block' }}>
            <span 
              onClick={() => onNavigate && onNavigate('projects')} 
              style={{ cursor: 'pointer', color: '#14A800', fontWeight: '700' }}
            >
              مشاريعي
            </span> / {project.title || 'هوية نواة'}
          </span>
          <h1 style={{ fontSize: '24px', fontWeight: 900, color: '#181818', margin: 0 }}>
            تفاصيل المشروع {loading && <small style={{ fontSize: '12px', color: '#14A800', fontWeight: 'normal' }}> (جارٍ التحديث...)</small>}
          </h1>
        </div>
        <div style={{ background: '#ffffff', border: '1px solid #EAECF0', borderRadius: '8px', padding: '5px 14px', fontSize: '12px', fontWeight: '700', color: '#475467' }}>
          {project.code || 'AC-023'}
        </div>
      </div>

      {/* 3. البطاقة العلوية الرئيسية للمشروع */}
      <div className="pd-main-card">
        <div className="pd-main-top">
          <div className="pd-title-group">
            <div className="pd-project-icon" style={{ background: projectIconBg, color: '#ffffff', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '20px' }}>
              {projectIconChar}
            </div>
            <div>
              <h2 style={{ fontSize: '18px', fontWeight: '800', color: '#181818', margin: '0 0 4px 0' }}>
                {project.fullTitle}
              </h2>
              <p style={{ fontSize: '12px', color: '#667085', margin: 0 }}>
                {project.subtitle}
              </p>
            </div>
          </div>
          <span className="pd-badge-pending" style={{ 
            background: project.status === 'مكتمل' ? '#ECFDF3' : '#FEF0C7', 
            color: project.status === 'مكتمل' ? '#027A48' : '#B54708', 
            padding: '6px 14px', 
            borderRadius: '20px', 
            fontSize: '12px', 
            fontWeight: '700', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '6px' 
          }}>
            ● {project.status}
          </span>
        </div>

        <div className="pd-info-grid">
          {/* التقدم الإجمالي */}
          <div className="pd-info-col">
            <span className="lbl">التقدم الإجمالي</span>
            <div className="val green" style={{ fontSize: '20px', fontWeight: '900', color: '#14A800', margin: '4px 0' }}>
              {project.progress}%
            </div>
            <div className="mini-prog-track" style={{ width: '100%', height: '6px', background: '#EAECF0', borderRadius: '10px', overflow: 'hidden' }}>
              <div className="mini-prog-fill" style={{ width: `${project.progress}%`, height: '100%', background: '#14A800' }}></div>
            </div>
          </div>

          {/* الميزانية في الضمان */}
          <div className="pd-info-col">
            <span className="lbl">الميزانية في الضمان</span>
            <div className="val" style={{ fontSize: '18px', fontWeight: '800', color: '#181818', margin: '4px 0' }}>
              {project.budget} <small style={{ fontSize: '12px', color: '#667085' }}>ر.س</small>
            </div>
            <small className="sub" style={{ fontSize: '11px', color: '#14A800', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <ShieldOutlinedIcon sx={{ fontSize: 13 }} /> مدفوعاتك محمية حتى اعتماد المخرجات
            </small>
          </div>

          {/* موعد التسليم */}
          <div className="pd-info-col">
            <span className="lbl">موعد التسليم</span>
            <div className="val date" style={{ fontSize: '18px', fontWeight: '800', color: '#181818', margin: '4px 0', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CalendarMonthOutlinedIcon sx={{ fontSize: 18, color: '#667085' }} />
              {project.date}
            </div>
            <small className="sub" style={{ fontSize: '11px', color: '#667085' }}>
              الموعد النهائي للمرحلة
            </small>
          </div>

          {/* قائد الفريق */}
          <div className="pd-info-col leader-col">
            <span className="lbl">قائد الفريق</span>
            <div className="leader-box" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
              <img 
                src={leaderImg} 
                alt={leaderName} 
                style={{ width: '34px', height: '34px', borderRadius: '50%', objectFit: 'cover' }}
              />
              <strong style={{ fontSize: '13px', fontWeight: '800', color: '#181818' }}>
                {leaderName}
              </strong>
            </div>
          </div>
        </div>

        {/* أزرار الإجراءات */}
        <div className="pd-actions-row" style={{ display: 'flex', gap: '12px', marginTop: '20px', paddingTop: '16px', borderTop: '1px solid #F2F4F7' }}>
          <button 
            className="btn-chat-team" 
            onClick={() => onNavigate('messages', { projectId: project.id, leaderName })}
            style={{ background: '#14A800', color: '#ffffff', border: 'none', padding: '10px 20px', borderRadius: '10px', fontWeight: '700', fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <ChatBubbleOutlineRoundedIcon sx={{ fontSize: 16 }} /> مراسلة قائد الفريق
          </button>
          <button 
            className="btn-edit-contract" 
            onClick={() => onNavigate('final-delivery', { ...project, screen: 'contract' })}
            style={{ background: '#ffffff', color: '#344054', border: '1px solid #D0D5DD', padding: '10px 18px', borderRadius: '10px', fontWeight: '700', fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <DescriptionOutlinedIcon sx={{ fontSize: 16 }} /> بنود وعقد المشروع
          </button>
        </div>
      </div>

      {/* 4. قسم خريطة إنجاز المشروع */}
      <div className="pd-section-box">
        <div className="pd-sec-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
          <h3 style={{ fontSize: '17px', fontWeight: '900', color: '#181818', margin: 0 }}>خريطة إنجاز المشروع</h3>
          <span className="stages-count" style={{ fontSize: '12px', color: '#667085' }}>
            اكتملت {completedMilestonesCount} من أصل {totalMilestonesCount} مراحل
          </span>
        </div>

        <div className="milestones-grid">
          {apiMilestones && apiMilestones.length > 0 ? (
            apiMilestones.map((m, idx) => {
              const isCompleted = m.status === 'completed';
              const isUnderReview = m.status === 'under_review' || m.status === 'pending_review';
              const isLocked = m.status === 'locked' || m.status === 'pending';
              const isFinal = idx === apiMilestones.length - 1;

              if (isCompleted) {
                return (
                  <div className="milestone-card completed" key={m.id || idx}>
                    <div className="m-top">
                      <span className="m-status-badge">مكتملة</span>
                      <span className="m-check">
                        <CheckCircleRoundedIcon sx={{ fontSize: 18, color: '#14A800' }} />
                      </span>
                    </div>
                    <h4>{m.title}</h4>
                    <p className="m-sub">تم الاعتماد {m.due_date ? `في ${m.due_date}` : ''}</p>
                    <button 
                      className="m-link-text"
                      onClick={() => onNavigate('review-deliverables', { ...project, milestoneId: m.id, activeMilestone: m })}
                    >
                      عرض المخرجات <NorthWestRoundedIcon sx={{ fontSize: 13, mr: 0.5 }} />
                    </button>
                  </div>
                );
              }

              if (isUnderReview) {
                return (
                  <div 
                    key={m.id || idx}
                    className="milestone-card active-review" 
                    onClick={() => onNavigate('review-deliverables', { ...project, milestoneId: m.id, activeMilestone: m })} 
                    style={{ cursor: 'pointer', border: '1.5px solid #14A800', background: '#F8FCF7' }}
                  >
                    <div className="m-top">
                      <span className="m-status-badge pending" style={{ background: '#ffffff', color: '#14A800', border: '1px solid #14A800' }}>
                        بانتظار مراجعة العميل
                      </span>
                      <span className="m-num-badge" style={{ background: '#14A800', color: '#ffffff', width: '22px', height: '22px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: '800' }}>
                        $
                      </span>
                    </div>
                    <h4>{m.title}</h4>
                    <p className="m-sub">
                      {m.deliverables?.length ? `${m.deliverables.length} ملفات مرفقة` : (m.due_date ? `موعد التسليم: ${m.due_date}` : 'جاهز للمراجعة')}
                    </p>
                    <button 
                      className="btn-m-action" 
                      onClick={(e) => { e.stopPropagation(); onNavigate('review-deliverables', { ...project, milestoneId: m.id, activeMilestone: m }); }}
                      style={{ background: '#14A800', color: '#ffffff', border: 'none', padding: '8px 16px', borderRadius: '8px', fontWeight: '800', fontSize: '12px', width: '100%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
                    >
                      مراجعة المخرجات <ArrowBackRoundedIcon sx={{ fontSize: 15 }} />
                    </button>
                  </div>
                );
              }

              // Locked or Final
              return (
                <div 
                  className={`milestone-card ${isFinal ? '' : 'locked'}`} 
                  key={m.id || idx}
                  style={isFinal ? { cursor: 'pointer', border: '1px solid #D0D5DD' } : {}}
                  onClick={() => {
                    if (isFinal) {
                      onNavigate('final-delivery', { ...project, milestoneId: m.id });
                    }
                  }}
                >
                  <div className="m-top">
                    <span className="m-status-badge locked">
                      {isFinal ? 'مرحلة التسليم النهائي' : 'بانتظار اعتماد المرحلة السابقة'}
                    </span>
                    <span className="m-lock">
                      {isFinal ? <HourglassEmptyRoundedIcon sx={{ fontSize: 16, color: '#14A800' }} /> : <LockOutlinedIcon sx={{ fontSize: 16, color: '#98A2B3' }} />}
                    </span>
                  </div>
                  <h4>{m.title}</h4>
                  <p className="m-sub">{m.due_date ? `الموعد: ${m.due_date}` : 'الحزمة النهائية'}</p>
                  <span className="locked-text" style={{ fontSize: '11.5px', color: isFinal ? '#14A800' : '#98A2B3', display: 'block', marginTop: '12px', fontWeight: isFinal ? '700' : 'normal' }}>
                    {isFinal ? 'عرض حزمة التسليم النهائي ←' : 'تُفتح بعد الاعتماد'}
                  </span>
                </div>
              );
            })
          ) : (
            // العرض الافتراضي للمراحل في حال عدم توفرها من الخادم
            <>
              {/* المرحلة الأولى: مكتملة */}
              <div className="milestone-card completed">
                <div className="m-top">
                  <span className="m-status-badge">مكتملة</span>
                  <span className="m-check">
                    <CheckCircleRoundedIcon sx={{ fontSize: 18, color: '#14A800' }} />
                  </span>
                </div>
                <h4>{isSallet ? 'دراسة المتطلبات وتجربة المتسوق' : isMawid ? 'بناء رحلة المستخدم وهندسة الشاشات' : 'جلسة الاستكشاف وبناء المود بورد'}</h4>
                <p className="m-sub">تم الاعتماد في 04 أكتوبر</p>
                <button 
                  className="m-link-text"
                  onClick={() => onNavigate('review-deliverables', { ...project, milestoneId: 1 })}
                >
                  عرض المخرجات <NorthWestRoundedIcon sx={{ fontSize: 13, mr: 0.5 }} />
                </button>
              </div>

              {/* المرحلة الثانية: مكتملة */}
              <div className="milestone-card completed">
                <div className="m-top">
                  <span className="m-status-badge">مكتملة</span>
                  <span className="m-check">
                    <CheckCircleRoundedIcon sx={{ fontSize: 18, color: '#14A800' }} />
                  </span>
                </div>
                <h4>{isSallet ? 'تصميم الهيكل والتنقل في المتجر' : isMawid ? 'تصميم الشاشات التفاعلية الأولية' : 'تصميم مفاهيم الشعار المبدئية'}</h4>
                <p className="m-sub">تم الاعتماد في 10 أكتوبر</p>
                <button 
                  className="m-link-text"
                  onClick={() => onNavigate('review-deliverables', { ...project, milestoneId: 2 })}
                >
                  عرض المخرجات <NorthWestRoundedIcon sx={{ fontSize: 13, mr: 0.5 }} />
                </button>
              </div>

              {/* المرحلة الثالثة: بانتظار مراجعة العميل */}
              <div 
                className="milestone-card active-review" 
                onClick={() => onNavigate('review-deliverables', { ...project, milestoneId: 3 })} 
                style={{ cursor: 'pointer', border: '1.5px solid #14A800', background: '#F8FCF7' }}
              >
                <div className="m-top">
                  <span className="m-status-badge pending" style={{ background: '#ffffff', color: '#14A800', border: '1px solid #14A800' }}>
                    بانتظار مراجعة العميل
                  </span>
                  <span className="m-num-badge" style={{ background: '#14A800', color: '#ffffff', width: '22px', height: '22px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: '800' }}>
                    $
                  </span>
                </div>
                <h4>{isSallet ? 'تطوير وتصميم واجهات المتجر' : isMawid ? 'تصميم شاشات وتدفق حجز المواعيد' : 'تطوير دليل الهوية البصرية'}</h4>
                <p className="m-sub">{isSallet ? '20 أكتوبر - 18 صفحة مرفقة' : isMawid ? '14 أكتوبر - 16 شاشة مرفقة' : '16 أكتوبر - 3 ملفات مرفقة'}</p>
                <button 
                  className="btn-m-action" 
                  onClick={(e) => { e.stopPropagation(); onNavigate('review-deliverables', { ...project, milestoneId: 3 }); }}
                  style={{ background: '#14A800', color: '#ffffff', border: 'none', padding: '8px 16px', borderRadius: '8px', fontWeight: '800', fontSize: '12px', width: '100%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
                >
                  مراجعة المخرجات <ArrowBackRoundedIcon sx={{ fontSize: 15 }} />
                </button>
              </div>

              {/* المرحلة الرابعة: المغلقة */}
              <div 
                className="milestone-card locked" 
                style={{ cursor: 'pointer' }}
                onClick={() => onNavigate('final-delivery', { ...project, milestoneId: 4 })}
              >
                <div className="m-top">
                  <span className="m-status-badge locked">بانتظار اعتماد المرحلة السابقة</span>
                  <span className="m-lock">
                    <LockOutlinedIcon sx={{ fontSize: 16, color: '#98A2B3' }} />
                  </span>
                </div>
                <h4>{isSallet ? 'تسليم الواجهات البرمجية للمتجر' : isMawid ? 'تسليم ملفات Figma والتصميم التفاعلي' : 'التسليم النهائي وحزمة الملفات المصدرية'}</h4>
                <p className="m-sub">18 أكتوبر، الحزمة النهائية</p>
                <span className="locked-text" style={{ fontSize: '11.5px', color: '#98A2B3', display: 'block', marginTop: '12px' }}>
                  تُفتح بعد الاعتماد
                </span>
              </div>
            </>
          )}
        </div>
      </div>

      {/* 5. قسم فريق المشروع وآخر النشاطات */}
      <div className="pd-bottom-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: '20px', marginTop: '24px' }}>
        {/* فريق المشروع */}
        <div className="pd-sub-card">
          <div className="pd-sec-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#181818', margin: 0 }}>فريق مشروعك</h3>
            <span style={{ fontSize: '12px', color: '#667085' }}>{teamMembers.length} أعضاء</span>
          </div>
          <div className="team-members-list">
            {teamMembers.map((m, idx) => (
              <div 
                key={idx} 
                className="team-member-item" 
                style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 0', borderBottom: idx < teamMembers.length - 1 ? '1px solid #F2F4F7' : 'none' }}
              >
                <img 
                  src={m.img} 
                  alt={m.name} 
                  style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }} 
                />
                <div>
                  <strong style={{ fontSize: '13px', display: 'block', color: '#181818' }}>{m.name}</strong>
                  <small style={{ fontSize: '11px', color: '#667085' }}>{m.role}</small>
                </div>
                <span style={{ marginRight: 'auto', fontSize: '10px', color: '#14A800' }}>{m.status}</span>
              </div>
            ))}
          </div>
        </div>

        {/* آخر النشاطات */}
        <div className="pd-sub-card activities-card">
          <div className="pd-sec-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#181818', margin: 0 }}>آخر النشاطات</h3>
            <button className="link-all" onClick={() => onNavigate('messages')} style={{ background: 'none', border: 'none', color: '#14A800', fontSize: '12px', fontWeight: '700', cursor: 'pointer' }}>
              عرض الكل ←
            </button>
          </div>
          <div className="activities-list">
            {recentActivities.map((act, idx) => (
              <div 
                className="activity-item" 
                key={act.id || idx} 
                style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '8px 0', borderBottom: idx < recentActivities.length - 1 ? '1px solid #F2F4F7' : 'none' }}
              >
                <span className="act-icon" style={{ fontSize: '16px', color: '#14A800' }}>
                  {act.icon || (act.type === 'milestone' ? '✓' : act.type === 'deliverable' ? '📄' : '⚙️')}
                </span>
                <div className="act-content" style={{ flex: 1 }}>
                  <p style={{ margin: 0, fontSize: '12.5px', color: '#181818' }}>
                    <strong>{act.title}</strong>
                  </p>
                  <small style={{ color: '#667085', fontSize: '11px' }}>
                    {act.subtitle || act.description}
                  </small>
                </div>
                <span className="act-time" style={{ fontSize: '11px', color: '#98A2B3' }}>
                  {act.time || (act.created_at ? new Date(act.created_at).toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' }) : 'اليوم')}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
