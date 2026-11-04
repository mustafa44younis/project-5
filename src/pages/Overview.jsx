import React from 'react';
import TopHeader from '../components/TopHeader';
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
  const activeProjects = [
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

  return (
    <div className="dashboard-overview-page" dir="rtl">
      {/* 1. الهيدر العلوي */}
      <TopHeader 
        userName="عبدالله" 
        userRole="حساب عميل" 
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
            <div className="num">3</div>
            <small>مشاريعك تقدم نحو الإنجاز</small>
          </div>
        </div>

        <div className="stat-card">
          <div className="sc-icon green-bg">
            <CheckCircleRoundedIcon sx={{ fontSize: 22, color: '#14A800' }} />
          </div>
          <div className="sc-info">
            <span className="lbl">المشاريع المكتملة</span>
            <div className="num">2</div>
            <small>من الفكرة إلى التسليم بنجاح</small>
          </div>
        </div>

        <div className="stat-card">
          <div className="sc-icon gray-bg">
            <CreditCardRoundedIcon sx={{ fontSize: 22, color: '#475467' }} />
          </div>
          <div className="sc-info">
            <span className="lbl">إجمالي الإنفاق</span>
            <div className="num">41,500 <small>ر.س</small></div>
            <small>على جميع مشاريعك حتى اليوم</small>
          </div>
        </div>

        <div className="stat-card highlight-green">
          <div className="sc-icon dark-bg">
            <AccountBalanceWalletRoundedIcon sx={{ fontSize: 22, color: '#ffffff' }} />
          </div>
          <div className="sc-info">
            <span className="lbl">رصيد المحفظة</span>
            <div className="num green">12,500 <small>ر.س</small></div>
            <small>رصيد متاح لتمويل مشاريعك</small>
          </div>
        </div>
      </div>

      {/* 4. جدول المشاريع النشطة */}
      <div className="dash-sec-card">
        <div className="sec-header-flex">
          <div className="sec-title-badge">
            <h2>المشاريع النشطة</h2>
            <span className="badge-count">3</span>
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
            <div className="event-item">
              <div className="ev-date-badge">18 <small>أكتوبر</small></div>
              <div className="ev-info">
                <strong>اعتماد دليل هوية نواة</strong>
                <small>سارة القحطاني • 12:00 م</small>
              </div>
            </div>

            <div className="event-item">
              <div className="ev-date-badge green">22 <small>أكتوبر</small></div>
              <div className="ev-info">
                <strong>تسليم واجهات سلة الخير</strong>
                <small>أحمد السالم • 03:00 م</small>
              </div>
            </div>

            <div className="event-item">
              <div className="ev-date-badge green">25 <small>أكتوبر</small></div>
              <div className="ev-info">
                <strong>مراجعة تجربة تطبيق موعد</strong>
                <small>خالد الحربي • 11:00 ص</small>
              </div>
            </div>
          </div>
        </div>

        {/* فريقك النشط */}
        <div className="dash-sub-card">
          <div className="sec-header-flex">
            <h3>فريقك النشط</h3>
            <span className="sub-cnt">4 أعضاء</span>
          </div>

          <div className="active-status-line">● 3 أعضاء متصلون الآن</div>

          <div className="team-members-list-col">
            <div className="tm-col-item">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100" 
                alt="أحمد" 
                className="team-member-avatar" 
              />
              <div className="tm-meta">
                <strong>أحمد السالم</strong>
                <small>قائد التطوير • سلة الخير</small>
              </div>
              <button className="btn-chat-icon" onClick={() => onNavigate('messages')} title="مراسلة">
                <ChatBubbleOutlineRoundedIcon sx={{ fontSize: 16 }} />
              </button>
            </div>

            <div className="tm-col-item">
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100" 
                alt="سارة" 
                className="team-member-avatar" 
              />
              <div className="tm-meta">
                <strong>سارة القحطاني</strong>
                <small>قائدة التصميم • نواة</small>
              </div>
              <button className="btn-chat-icon" onClick={() => onNavigate('messages')} title="مراسلة">
                <ChatBubbleOutlineRoundedIcon sx={{ fontSize: 16 }} />
              </button>
            </div>

            <div className="tm-col-item">
              <img 
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100" 
                alt="خالد" 
                className="team-member-avatar" 
              />
              <div className="tm-meta">
                <strong>خالد الحربي</strong>
                <small>قائد المنتج • موعد</small>
              </div>
              <button className="btn-chat-icon" onClick={() => onNavigate('messages')} title="مراسلة">
                <ChatBubbleOutlineRoundedIcon sx={{ fontSize: 16 }} />
              </button>
            </div>

            <div className="tm-col-item">
              <img 
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100" 
                alt="نورة" 
                className="team-member-avatar" 
              />
              <div className="tm-meta">
                <strong>نورة الدوسري</strong>
                <small>مطورة واجهات • سلة الخير</small>
              </div>
              <button className="btn-chat-icon" onClick={() => onNavigate('messages')} title="مراسلة">
                <ChatBubbleOutlineRoundedIcon sx={{ fontSize: 16 }} />
              </button>
            </div>
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
            <small className="time-sub">آخر يومين</small>
          </div>

          <div className="activities-timeline">
            <div className="act-timeline-item">
              <span className="act-dot green">
                <FolderRoundedIcon sx={{ fontSize: 14 }} />
              </span>
              <div className="act-info">
                <strong>دليل هوية نواة جاهز للمراجعة</strong>
                <p>أرسلت سارة القحطاني النسخة النهائية</p>
                <small>منذ 30 دقيقة</small>
              </div>
            </div>

            <div className="act-timeline-item">
              <span className="act-dot">
                <TrendingUpRoundedIcon sx={{ fontSize: 14 }} />
              </span>
              <div className="act-info">
                <strong>تقدم جديد في متجر سلة الخير</strong>
                <p>حدّث أحمد السالم نسبة الإنجاز إلى 65%</p>
                <small>منذ ساعتين</small>
              </div>
            </div>

            <div className="act-timeline-item">
              <span className="act-dot green">
                <CreditCardRoundedIcon sx={{ fontSize: 14 }} />
              </span>
              <div className="act-info">
                <strong>تمت إضافة رصيد إلى محفظتك</strong>
                <p>إيداع بقيمة 5,000 ر.س بنجاح</p>
                <small>أمس 04:30 م</small>
              </div>
            </div>

            <div className="act-timeline-item">
              <span className="act-dot">
                <RocketLaunchRoundedIcon sx={{ fontSize: 14 }} />
              </span>
              <div className="act-info">
                <strong>بدء تصميم تجربة تطبيق موعد</strong>
                <p>بدأ خالد الحربي العمل على المرحلة الثانية</p>
                <small>أمس 10:00 ص</small>
              </div>
            </div>
          </div>

          <button className="btn-view-all-act" onClick={() => alert('عرض جميع النشاطات')}>
            عرض سجل النشاطات ←
          </button>
        </div>

      </div>
    </div>
  );
}