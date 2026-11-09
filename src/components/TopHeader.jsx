import React from 'react';
import './TopHeader.css';
import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';

export default function TopHeader({ 
  userName = "عبد الله العتيبي", 
  greetingName,
  userRole = "حساب عميل", 
  onNewProject,
  embedded = false 
}) {
  const displayGreeting = greetingName || (userName ? userName.split(' ').slice(0, 2).join(' ') : 'عبد الله');

  return (
    <header className={`dash-top-header ${embedded ? 'embedded' : ''}`} dir="rtl">
      {/* القسم الأيمن: الترحيب والوصف */}
      <div className="dash-user-welcome">
        <h1>مرحباً، {displayGreeting} 👋</h1>
        <span>كل ما تحتاجه لإنجاز مشروعك في مكان واحد</span>
      </div>

      {/* القسم الأيسر: الإشعارات وبروفايل المستخدم */}
      <div className="dash-top-actions-group">
        {/* زر الإشعارات */}
        <div className="dash-notification-bell" title="الإشعارات">
          <NotificationsNoneRoundedIcon sx={{ fontSize: 21, color: '#475467' }} />
          <span className="notif-dot"></span>
        </div>

        {/* فاصل رأسي خفيف مطابق للصورة */}
        <div className="header-divider-line"></div>

        {/* بروفايل المستخدم */}
        <div className="dash-header-profile">
          <div className="header-avatar-circle">ع ع</div>
          <div className="header-user-meta">
            <strong>{userName}</strong>
            <small>{userRole}</small>
          </div>
          <span className="header-arrow">
            <KeyboardArrowDownRoundedIcon sx={{ fontSize: 18, color: '#667085' }} />
          </span>
        </div>
      </div>
    </header>
  );
}
