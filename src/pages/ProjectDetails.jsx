import React from 'react';
import TopHeader from '../components/TopHeader';
import ChatBubbleOutlineRoundedIcon from '@mui/icons-material/ChatBubbleOutlineRounded';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import NorthWestRoundedIcon from '@mui/icons-material/NorthWestRounded';
import './ProjectDetails.css';

export default function ProjectDetails({ onNavigate, projectData }) {
  // استخدام بيانات المشروع المُمررة أو الافتراضية "هوية نواة"
  const project = projectData || {
    id: 2,
    title: 'هوية نواة',
    fullTitle: 'هوية نواة - تصميم الهوية البصرية',
    subtitle: 'تصميم وإبداع - بدأ في 01 أكتوبر 2026',
    code: 'AC-023',
    status: 'بانتظار المراجعة',
    progress: 90,
    budget: '4,500',
    date: '18 أكتوبر',
    leader: 'سارة القحطاني',
    leaderRole: 'قائد الفريق • مصممة هوية'
  };

  const isSallet = (project.title || '').includes('سلة') || (project.leader || '').includes('أحمد');
  const isMawid = (project.title || '').includes('موعد') || (project.leader || '').includes('خالد');

  const leaderName = isSallet ? 'أحمد السالم' : isMawid ? 'خالد الحربي' : (project.leader ? project.leader.replace('قائد المشروع: ', '').replace('قائد الفريق: ', '') : 'سارة القحطاني');
  const leaderRole = isSallet ? 'قائد المشروع • مصمم واجهات' : isMawid ? 'قائد المشروع • مطور تطبيقات' : 'قائد الفريق • مصممة هوية';
  
  // صور شخصية متطابقة بدقة مع الاسم والجنس (رجل لأحمد وخالد، امرأة لسارة)
  const leaderImg = isSallet
    ? 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100' // صورة أحمد السالم (رجل مهني)
    : isMawid
    ? 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100' // صورة خالد الحربي (رجل مهني)
    : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'; // صورة سارة القحطاني (امرأة مهنية)

  const teamMembers = isSallet ? [
    {
      name: 'أحمد السالم',
      role: 'قائد المشروع • مصمم واجهات',
      img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100', // رجل
      status: '● متاح الآن'
    },
    {
      name: 'نورة الدوسري',
      role: 'مطورة واجهات أمامية',
      img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100', // امرأة
      status: '● تعمل على المتجر'
    },
    {
      name: 'سعود المطيري',
      role: 'مختص تجربة الشراء والتسوق',
      img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100', // رجل
      status: '● متاح الآن'
    }
  ] : isMawid ? [
    {
      name: 'خالد الحربي',
      role: 'قائد المشروع • مطور تطبيقات',
      img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100', // رجل
      status: '● متاح الآن'
    },
    {
      name: 'منى الغامدي',
      role: 'مصممة واجهات وتجربة المستخدم UI/UX',
      img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100', // امرأة
      status: '● تعمل على الشاشات'
    },
    {
      name: 'طارق الزهراني',
      role: 'مهندس تكامل الأنظمة والتقويم',
      img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100', // رجل
      status: '● متاح الآن'
    }
  ] : [
    {
      name: 'سارة القحطاني',
      role: 'قائد الفريق • مصممة هوية',
      img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100', // امرأة
      status: '● متاحة الآن'
    },
    {
      name: 'هند الشمري',
      role: 'مصممة تايبوغرافي ومطبوعات',
      img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100', // امرأة
      status: '● تعمل على الدليل'
    },
    {
      name: 'عبدالرحمن الشهري',
      role: 'مختص علامات تجارية',
      img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100', // رجل
      status: '● متاح الآن'
    }
  ];

  const projectIconChar = isSallet ? 'س' : isMawid ? 'م' : 'ن';
  const projectIconBg = isSallet ? '#14A800' : isMawid ? '#0BA5EC' : '#1E392A';

  const stage1Title = isSallet ? 'دراسة المتطلبات وتجربة المتسوق' : isMawid ? 'بناء رحلة المستخدم وهندسة الشاشات' : 'جلسة الاستكشاف وبناء المود بورد';
  const stage2Title = isSallet ? 'تصميم الهيكل والتنقل في المتجر' : isMawid ? 'تصميم الشاشات التفاعلية الأولية' : 'تصميم مفاهيم الشعار المبدئية';
  const stage3Title = isSallet ? 'تطوير وتصميم واجهات المتجر' : isMawid ? 'تصميم شاشات وتدفق حجز المواعيد' : 'تطوير دليل الهوية البصرية';
  const stage3Sub = isSallet ? '20 أكتوبر - 18 صفحة مرفقة' : isMawid ? '14 أكتوبر - 16 شاشة مرفقة' : '16 أكتوبر - 3 ملفات مرفقة';
  const stage4Title = isSallet ? 'تسليم الواجهات البرمجية للمتجر' : isMawid ? 'تسليم ملفات Figma والتصميم التفاعلي' : 'التسليم النهائي وحزمة الملفات المصدرية';

  return (
    <div className="project-details-page" dir="rtl">
      {/* 1. الهيدر العلوي الموحد */}
      <TopHeader 
        userName="عبد الله العتيبي" 
        userRole="حساب عميل" 
        onNewProject={() => onNavigate && onNavigate('ai')} 
      />

      {/* 2. مسار التنقل وعنوان الصفحة وكود المشروع AC-023 كما في الصورة */}
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
          <h1 style={{ fontSize: '24px', fontWeight: 900, color: '#181818', margin: 0 }}>تفاصيل المشروع</h1>
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
                {project.fullTitle || `${project.title} - تصميم الهوية البصرية`}
              </h2>
              <p style={{ fontSize: '12px', color: '#667085', margin: 0 }}>
                {project.subtitle || 'تصميم وإبداع - بدأ في 01 أكتوبر 2026'}
              </p>
            </div>
          </div>
          <span className="pd-badge-pending" style={{ background: '#FEF0C7', color: '#B54708', padding: '6px 14px', borderRadius: '20px', fontSize: '12px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '6px' }}>
            ● بانتظار المراجعة
          </span>
        </div>

        <div className="pd-info-grid">
          {/* التقدم الإجمالي */}
          <div className="pd-info-col">
            <span className="lbl">التقدم الإجمالي</span>
            <div className="val green" style={{ fontSize: '20px', fontWeight: '900', color: '#14A800', margin: '4px 0' }}>
              {project.progress || 90}%
            </div>
            <div className="mini-prog-track" style={{ width: '100%', height: '6px', background: '#EAECF0', borderRadius: '10px', overflow: 'hidden' }}>
              <div className="mini-prog-fill" style={{ width: `${project.progress || 90}%`, height: '100%', background: '#14A800' }}></div>
            </div>
          </div>

          {/* الميزانية في الضمان */}
          <div className="pd-info-col">
            <span className="lbl">الميزانية في الضمان</span>
            <div className="val" style={{ fontSize: '18px', fontWeight: '800', color: '#181818', margin: '4px 0' }}>
              {project.budget || '4,500'} <small style={{ fontSize: '12px', color: '#667085' }}>ر.س</small>
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
              {project.date || '18 أكتوبر'}
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
            onClick={() => onNavigate('messages')}
            style={{ background: '#14A800', color: '#ffffff', border: 'none', padding: '10px 20px', borderRadius: '10px', fontWeight: '700', fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <ChatBubbleOutlineRoundedIcon sx={{ fontSize: 16 }} /> مراسلة قائد الفريق
          </button>
          <button 
            className="btn-edit-contract" 
            onClick={() => alert('طلب تعديل بنود العقد')}
            style={{ background: '#ffffff', color: '#344054', border: '1px solid #D0D5DD', padding: '10px 18px', borderRadius: '10px', fontWeight: '700', fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <DescriptionOutlinedIcon sx={{ fontSize: 16 }} /> طلب تعديل في العقد
          </button>
        </div>
      </div>

      {/* 4. قسم خريطة إنجاز المشروع (الأربع مراحل) */}
      <div className="pd-section-box">
        <div className="pd-sec-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
          <h3 style={{ fontSize: '17px', fontWeight: '900', color: '#181818', margin: 0 }}>خريطة إنجاز المشروع</h3>
          <span className="stages-count" style={{ fontSize: '12px', color: '#667085' }}>اكتملت مرحلتان من أصل 4 مراحل</span>
        </div>

        <div className="milestones-grid">
          {/* المرحلة الأولى: مكتملة */}
          <div className="milestone-card completed">
            <div className="m-top">
              <span className="m-status-badge">مكتملة</span>
              <span className="m-check">
                <CheckCircleRoundedIcon sx={{ fontSize: 18, color: '#14A800' }} />
              </span>
            </div>
            <h4>{stage1Title}</h4>
            <p className="m-sub">تم الاعتماد في 04 أكتوبر</p>
            <button className="m-link-text">
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
            <h4>{stage2Title}</h4>
            <p className="m-sub">تم الاعتماد في 10 أكتوبر</p>
            <button className="m-link-text">
              عرض المخرجات <NorthWestRoundedIcon sx={{ fontSize: 13, mr: 0.5 }} />
            </button>
          </div>

          {/* المرحلة الثالثة: بانتظار مراجعة العميل (محددة باللون الأخضر المميز كما بالصورة) */}
          <div 
            className="milestone-card active-review" 
            onClick={() => onNavigate('review-deliverables', project)} 
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
            <h4>{stage3Title}</h4>
            <p className="m-sub">{stage3Sub}</p>
            <button 
              className="btn-m-action" 
              onClick={(e) => { e.stopPropagation(); onNavigate('review-deliverables', project); }}
              style={{ background: '#14A800', color: '#ffffff', border: 'none', padding: '8px 16px', borderRadius: '8px', fontWeight: '800', fontSize: '12px', width: '100%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
            >
              مراجعة المخرجات <ArrowBackRoundedIcon sx={{ fontSize: 15 }} />
            </button>
          </div>

          {/* المرحلة الرابعة: المغلقة */}
          <div className="milestone-card locked">
            <div className="m-top">
              <span className="m-status-badge locked">بانتظار اعتماد المرحلة السابقة</span>
              <span className="m-lock">
                <LockOutlinedIcon sx={{ fontSize: 16, color: '#98A2B3' }} />
              </span>
            </div>
            <h4>{stage4Title}</h4>
            <p className="m-sub">18 أكتوبر، الحزمة النهائية</p>
            <span className="locked-text" style={{ fontSize: '11.5px', color: '#98A2B3', display: 'block', marginTop: '12px' }}>
              تُفتح بعد الاعتماد
            </span>
          </div>
        </div>
      </div>

      {/* 5. قسم فريق المشروع وآخر النشاطات */}
      <div className="pd-bottom-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: '20px', marginTop: '24px' }}>
        {/* فريق المشروع */}
        <div className="pd-sub-card">
          <div className="pd-sec-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#181818', margin: 0 }}>فريق مشروعك</h3>
            <span style={{ fontSize: '12px', color: '#667085' }}>3 أعضاء</span>
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
            <button className="link-all" onClick={() => alert('عرض كافة النشاطات')} style={{ background: 'none', border: 'none', color: '#14A800', fontSize: '12px', fontWeight: '700', cursor: 'pointer' }}>
              عرض الكل ←
            </button>
          </div>
          <div className="activities-list">
            <div className="activity-item" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '8px 0', borderBottom: '1px solid #F2F4F7' }}>
              <span className="act-icon" style={{ fontSize: '16px', color: '#14A800' }}>📄</span>
              <div className="act-content" style={{ flex: 1 }}>
                <p style={{ margin: 0, fontSize: '12.5px', color: '#181818' }}><strong>رفعت سارة دليل الهوية البصرية للمراجعة</strong></p>
                <small style={{ color: '#14A800', fontSize: '11px' }}>Nawa_Brand_Guidelines_v1.pdf</small>
              </div>
              <span className="act-time" style={{ fontSize: '11px', color: '#98A2B3' }}>اليوم 10:45 ص</span>
            </div>

            <div className="activity-item" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '8px 0', borderBottom: '1px solid #F2F4F7' }}>
              <span className="act-icon" style={{ fontSize: '16px', color: '#14A800' }}>🖼️</span>
              <div className="act-content" style={{ flex: 1 }}>
                <p style={{ margin: 0, fontSize: '12.5px', color: '#181818' }}><strong>أضافت نورة تطبيقات الهوية إلى ملفات المشروع</strong></p>
                <small style={{ color: '#667085', fontSize: '11px' }}>3 ملفات • نماذج القرطاسية والتغليف</small>
              </div>
              <span className="act-time" style={{ fontSize: '11px', color: '#98A2B3' }}>أمس 02:30 م</span>
            </div>

            <div className="activity-item" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '8px 0' }}>
              <span className="act-icon" style={{ fontSize: '16px', color: '#14A800' }}>✓</span>
              <div className="act-content" style={{ flex: 1 }}>
                <p style={{ margin: 0, fontSize: '12.5px', color: '#181818' }}><strong>اعتمدت مفاهيم الشعار المبدئية</strong></p>
                <small style={{ color: '#667085', fontSize: '11px' }}>اكتملت المرحلة الثانية بنجاح</small>
              </div>
              <span className="act-time" style={{ fontSize: '11px', color: '#98A2B3' }}>10 أكتوبر 11:20 ص</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
