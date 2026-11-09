import React, { useState, useEffect } from 'react';
import TopHeader from '../components/TopHeader';
import { dashboardService } from '../services/dashboard.service';
import './Overview.css';

// MUI Icons
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import SpaRoundedIcon from '@mui/icons-material/SpaRounded';
import SmartphoneRoundedIcon from '@mui/icons-material/SmartphoneRounded';
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import CreditCardRoundedIcon from '@mui/icons-material/CreditCardRounded';
import AccountBalanceWalletRoundedIcon from '@mui/icons-material/AccountBalanceWalletRounded';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import ChatBubbleOutlineRoundedIcon from '@mui/icons-material/ChatBubbleOutlineRounded';
import FolderRoundedIcon from '@mui/icons-material/FolderRounded';
import RocketLaunchRoundedIcon from '@mui/icons-material/RocketLaunchRounded';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';

export default function Overview({ onNavigate }) {
  const [overviewData, setOverviewData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    dashboardService.getOverview()
      .then((res) => {
        if (isMounted && res?.data) {
          setOverviewData(res.data);
        }
      })
      .catch((err) => {
        // في حال عدم توفر اتصال بالإنترنت يستمر العرض الافتراضي بسلاسة
        console.warn('Dashboard overview live fetch failed:', err.message);
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => { isMounted = false; };
  }, []);

  // الإحصائيات (الحية من السيرفر أو الافتراضية)
  const stats = overviewData?.stats || {
    active_projects: 3,
    completed_projects: 2,
    total_spent: 41500,
    wallet_balance: 12500,
  };

  const defaultProjects = [
    {
      id: 1,
      name: 'متجر سلة الخير',
      desc: 'تطوير متجر إلكتروني',
      leader: 'أحمد السالم',
      leaderImg: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
      progress: 65,
      status: 'قيد التنفيذ',
      statusClass: 'in-progress',
      subStatus: 'تطوير واجهات المتجر',
      date: '22 أكتوبر',
      icon: <ShoppingCartRoundedIcon sx={{ fontSize: 18, color: '#14A800' }} />
    },
    {
      id: 2,
      name: 'هوية نواة',
      desc: 'تصميم الهوية البصرية',
      leader: 'سارة القحطاني',
      leaderImg: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100',
      progress: 90,
      status: 'بانتظار المراجعة',
      statusClass: 'pending',
      subStatus: 'اعتماد دليل الهوية',
      date: '18 أكتوبر',
      icon: <SpaRoundedIcon sx={{ fontSize: 18, color: '#14A800' }} />
    },
    {
      id: 3,
      name: 'تطبيق موعد',
      desc: 'تطبيق حجز المواعيد',
      leader: 'خالد الحربي',
      leaderImg: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100',
      progress: 35,
      status: 'قيد التنفيذ',
      statusClass: 'in-progress',
      subStatus: 'تصميم تجربة المستخدم',
      date: '25 أكتوبر',
      icon: <SmartphoneRoundedIcon sx={{ fontSize: 18, color: '#14A800' }} />
    }
  ];

  const defaultTeam = [
    {
      id: 1,
      full_name: 'أحمد السالم',
      job_title: 'قائد التطوير • سلة الخير',
      avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100'
    },
    {
      id: 2,
      full_name: 'سارة القحطاني',
      job_title: 'قائدة التصميم • نواة',
      avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'
    },
    {
      id: 3,
      full_name: 'خالد الحربي',
      job_title: 'قائد المنتج • موعد',
      avatar_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100'
    },
    {
      id: 4,
      full_name: 'نورة الدوسري',
      job_title: 'مطورة واجهات • سلة الخير',
      avatar_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100'
    }
  ];

  const activeTeam = (overviewData?.team && overviewData.team.length > 0)
    ? overviewData.team
    : defaultTeam;

  const defaultEvents = [
    { id: 1, day: '18', month: 'أكتوبر', title: 'اعتماد دليل هوية نواة', sub: 'سارة القحطاني • 12:00 م', isGreen: false },
    { id: 2, day: '22', month: 'أكتوبر', title: 'تسليم واجهات سلة الخير', sub: 'أحمد السالم • 03:00 م', isGreen: true },
    { id: 3, day: '25', month: 'أكتوبر', title: 'مراجعة تجربة تطبيق موعد', sub: 'خالد الحربي • 11:00 ص', isGreen: true }
  ];

  const upcomingEvents = (overviewData?.upcoming_events && overviewData.upcoming_events.length > 0)
    ? overviewData.upcoming_events.map((ev, idx) => ({
        id: ev.id || idx,
        day: ev.event_day || '18',
        month: ev.event_month || 'أكتوبر',
        title: ev.title,
        sub: `${ev.assigned_to || 'فريق العمل'} • ${ev.event_time || '12:00 م'}`,
        isGreen: idx > 0
      }))
    : defaultEvents;

  const defaultActivities = [
    { id: 1, title: 'دليل هوية نواة جاهز للمراجعة', desc: 'أرسلت سارة القحطاني النسخة النهائية', time: 'منذ 30 دقيقة', isGreen: true },
    { id: 2, title: 'تقدم جديد في متجر سلة الخير', desc: 'حدّث أحمد السالم نسبة الإنجاز إلى 65%', time: 'منذ ساعتين', isGreen: false },
    { id: 3, title: 'تمت إضافة رصيد إلى محفظتك', desc: 'إيداع بقيمة 5,000 ر.س بنجاح', time: 'أمس 04:30 م', isGreen: true },
    { id: 4, title: 'بدء تصميم تجربة تطبيق موعد', desc: 'بدأ خالد الحربي العمل على المرحلة الثانية', time: 'أمس 10:00 ص', isGreen: false }
  ];

  const recentActivities = (overviewData?.recent_activities && overviewData.recent_activities.length > 0)
    ? overviewData.recent_activities.map((act, idx) => ({
        id: act.id || idx,
        title: act.title,
        desc: act.description || 'نشاط جديد في المشروع',
        time: act.time || 'اليوم',
        isGreen: idx % 2 === 0
      }))
    : defaultActivities;

  const rawActiveProjects = overviewData?.active_projects || overviewData?.activeProjects || [];
  const activeProjects = rawActiveProjects.length > 0
    ? rawActiveProjects.map((p, idx) => ({
        id: p.id,
        name: p.title || p.name,
        desc: p.category || p.desc || 'مشروع تقني',
        leader: p.team_leader?.full_name || 'قائد الفريق',
        leaderImg: p.team_leader?.avatar_url || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
        progress: Number(p.progress) || 0,
        status: p.status === 'under_review' ? 'بانتظار المراجعة' : (p.status === 'completed' ? 'مكتمل' : 'قيد التنفيذ'),
        statusClass: p.status === 'under_review' ? 'pending' : (p.status === 'completed' ? 'completed' : 'in-progress'),
        subStatus: p.current_phase_name || 'المرحلة الحالية',
        date: p.deadline_formatted || p.deadline || 'قريباً',
        icon: idx % 3 === 0 ? <ShoppingCartRoundedIcon sx={{ fontSize: 18, color: '#14A800' }} /> : (idx % 3 === 1 ? <SpaRoundedIcon sx={{ fontSize: 18, color: '#14A800' }} /> : <SmartphoneRoundedIcon sx={{ fontSize: 18, color: '#14A800' }} />)
      }))
    : defaultProjects;

  return (
    <div className="dashboard-overview-page" dir="rtl">
      {/* 1. الهيدر العلوي */}
      <TopHeader 
        onNewProject={() => onNavigate && onNavigate('new-project')} 
      />

      {/* 2. عنوان الصفحة ورأس النظرة العامة */}
      <div className="dash-title-section">
        <div className="title-right">
          <h1>نظرة عامة</h1>
          <p>مشاريعك، فريقك، وكل خطوة نحو الإنجاز في مكان واحد.</p>
        </div>
        <div className="status-all-badge">
          <span><CheckCircleRoundedIcon sx={{ fontSize: 16, verticalAlign: 'middle', ml: 0.5 }} /> جميع المشاريع على المسار</span>
        </div>
      </div>

      {/* 3. كروت الإحصائيات (4 كروت) */}
      <div className="stats-cards-grid">
        <div className="stat-card">
          <div className="sc-icon green-bg">
            <TrendingUpRoundedIcon sx={{ fontSize: 22, color: '#14A800' }} />
          </div>
          <div className="sc-info">
            <span className="lbl">المشاريع النشطة</span>
            <div className="num">{stats.active_projects}</div>
            <small>مشاريعك تقدم نحو الإنجاز</small>
          </div>
        </div>

        <div className="stat-card">
          <div className="sc-icon green-bg">
            <CheckCircleRoundedIcon sx={{ fontSize: 22, color: '#14A800' }} />
          </div>
          <div className="sc-info">
            <span className="lbl">المشاريع المكتملة</span>
            <div className="num">{stats.completed_projects}</div>
            <small>من الفكرة إلى التسليم بنجاح</small>
          </div>
        </div>

        <div className="stat-card">
          <div className="sc-icon gray-bg">
            <CreditCardRoundedIcon sx={{ fontSize: 22, color: '#475467' }} />
          </div>
          <div className="sc-info">
            <span className="lbl">إجمالي الإنفاق</span>
            <div className="num">{Number(stats.total_spent).toLocaleString()} <small>ر.س</small></div>
            <small>على جميع مشاريعك حتى اليوم</small>
          </div>
        </div>

        <div className="stat-card highlight-green">
          <div className="sc-icon dark-bg">
            <AccountBalanceWalletRoundedIcon sx={{ fontSize: 22, color: '#ffffff' }} />
          </div>
          <div className="sc-info">
            <span className="lbl">رصيد المحفظة</span>
            <div className="num green">{Number(stats.wallet_balance).toLocaleString()} <small>ر.س</small></div>
            <small>رصيد متاح لتمويل مشاريعك</small>
          </div>
        </div>
      </div>

      {/* 4. جدول المشاريع النشطة */}
      <div className="dash-sec-card">
        <div className="sec-header-flex">
          <div className="sec-title-badge">
            <h2>المشاريع النشطة</h2>
            <span className="badge-count">{activeProjects.length}</span>
          </div>
          <button className="btn-link-green" onClick={() => onNavigate('projects')}>
            عرض جميع المشاريع ←
          </button>
        </div>

        <div className="table-responsive">
          <table className="projects-table">
            <thead>
              <tr>
                <th>اسم المشروع</th>
                <th>قائد الفريق</th>
                <th>التقدم</th>
                <th>حالة المرحلة</th>
                <th>موعد التسليم</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {activeProjects.map((p) => (
                <tr 
                  key={p.id} 
                  onClick={() => onNavigate(p.status === 'بانتظار المراجعة' ? 'review-deliverables' : 'project-details', { id: p.id, title: p.name, name: p.name, leader: p.leader, ...p })} 
                  style={{ cursor: 'pointer' }}
                >
                  <td>
                    <div className="p-cell-title">
                      <span className="p-icon">{p.icon}</span>
                      <div>
                        <strong>{p.name}</strong>
                        <small>{p.desc}</small>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="p-cell-leader p-leader-cell">
                      <img 
                        src={p.leaderImg} 
                        alt={p.leader} 
                        className="leader-avatar-img"
                      />
                      <span>{p.leader}</span>
                    </div>
                  </td>
                  <td>
                    <div className="p-prog-cell">
                      <span>{p.progress}%</span>
                      <div className="p-track">
                        <div className="p-fill" style={{ width: `${p.progress}%` }}></div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="p-status-cell">
                      <span className={`p-badge ${p.statusClass}`}>{p.status}</span>
                      <small>{p.subStatus}</small>
                    </div>
                  </td>
                  <td>
                    <span className="p-date">{p.date}</span>
                  </td>
                  <td>
                    <span className="arrow-go"><ChevronLeftRoundedIcon fontSize="small" /></span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* تنبيه مراجعة المخرجات السفلي */}
        <div className="review-alert-banner">
          <div className="ra-text">
            <span><LightbulbOutlinedIcon sx={{ fontSize: 18, verticalAlign: 'middle', ml: 0.5, color: '#14A800' }} /> دليل هوية نواة جاهز لاعتمادك. مراجعتك تساعد الفريق على التقدم.</span>
          </div>
          <button className="btn-ra-action" onClick={() => onNavigate('review-deliverables', { id: 2, title: 'هوية نواة', fullTitle: 'هوية نواة - تصميم الهوية البصرية', code: 'AC-023', leader: 'سارة القحطاني' })}>
            مراجعة المخرجات
          </button>
        </div>
      </div>

      {/* 5. الشبكة السفلية (المواعيد - فريقك - آخر النشاطات) */}
      <div className="dash-three-cols-grid">
        
        {/* المواعيد القادمة والتقويم */}
        <div className="dash-sub-card">
          <div className="sec-header-flex">
            <h3>المواعيد القادمة</h3>
            <span className="sub-cnt">3 مواعيد</span>
          </div>

          <div className="mini-calendar-box">
            <div className="cal-header">
              <button><ChevronRightRoundedIcon fontSize="small" /></button>
              <strong>أكتوبر 2026</strong>
              <button><ChevronLeftRoundedIcon fontSize="small" /></button>
            </div>
            <div className="cal-grid-days">
              <span>أحد</span><span>إثنين</span><span>ثلاثاء</span><span>أربعاء</span><span>خميس</span><span>جمعة</span><span>سبت</span>
            </div>
            <div className="cal-grid-nums">
              <span className="muted"></span><span className="muted"></span><span className="muted"></span><span>1</span><span>2</span><span>3</span><span>4</span>
              <span>5</span><span>6</span><span>7</span><span>8</span><span>9</span><span>10</span><span>11</span>
              <span>12</span><span>13</span><span>14</span><span className="active-day">15</span><span>16</span><span>17</span><span className="event-day">18</span>
              <span>19</span><span>20</span><span>21</span><span className="event-day">22</span><span>23</span><span>24</span><span className="event-day">25</span>
              <span>26</span><span>27</span><span>28</span><span>29</span><span>30</span><span>31</span>
            </div>
          </div>

          <div className="upcoming-events-list">
            {upcomingEvents.map((ev) => (
              <div className="event-item" key={ev.id}>
                <div className={`ev-date-badge ${ev.isGreen ? 'green' : ''}`}>
                  {ev.day} <small>{ev.month}</small>
                </div>
                <div className="ev-info">
                  <strong>{ev.title}</strong>
                  <small>{ev.sub}</small>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* فريقك النشط */}
        <div className="dash-sub-card">
          <div className="sec-header-flex">
            <h3>فريقك النشط</h3>
            <span className="sub-cnt">{activeTeam.length} أعضاء</span>
          </div>

          <div className="active-status-line">● {Math.min(activeTeam.length, 3)} أعضاء متصلون الآن</div>

          <div className="team-members-list-col">
            {activeTeam.map((m) => (
              <div className="tm-col-item" key={m.id}>
                <img 
                  src={m.avatar_url || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100'} 
                  alt={m.full_name} 
                  className="team-member-avatar" 
                />
                <div className="tm-meta">
                  <strong>{m.full_name}</strong>
                  <small>{m.job_title || 'عضو بالفريق'}</small>
                </div>
                <button className="btn-chat-icon" onClick={() => onNavigate('messages', { teamMember: m })} title="مراسلة">
                  <ChatBubbleOutlineRoundedIcon sx={{ fontSize: 16 }} />
                </button>
              </div>
            ))}
          </div>

          <div className="team-footer-callout">
            <p>تواصل أسرع، إنجاز أفضل. شارك ملاحظاتك مباشرة مع قادة الفرق.</p>
            <button className="btn-open-messages" onClick={() => onNavigate('messages')}>
              فتح الرسائل
            </button>
          </div>
        </div>

        {/* آخر النشاطات */}
        <div className="dash-sub-card">
          <div className="sec-header-flex">
            <h3>آخر النشاطات</h3>
            <small className="time-sub">آخر التحديثات</small>
          </div>

          <div className="activities-timeline">
            {recentActivities.map((act) => (
              <div className="act-timeline-item" key={act.id}>
                <span className={`act-dot ${act.isGreen ? 'green' : ''}`}>
                  {act.isGreen ? <FolderRoundedIcon sx={{ fontSize: 14 }} /> : <TrendingUpRoundedIcon sx={{ fontSize: 14 }} />}
                </span>
                <div className="act-info">
                  <strong>{act.title}</strong>
                  <p>{act.desc}</p>
                  <small>{act.time}</small>
                </div>
              </div>
            ))}
          </div>

          <button className="btn-view-all-act" onClick={() => alert('عرض جميع النشاطات')}>
            عرض سجل النشاطات ←
          </button>
        </div>

      </div>
    </div>
  );
}