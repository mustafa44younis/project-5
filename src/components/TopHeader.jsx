import React, { useState, useEffect, useRef } from 'react';
import './TopHeader.css';
import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import { useAuth } from '../context/AuthContext';
import notificationsService from '../services/notifications.service';

export default function TopHeader({ 
  userName, 
  greetingName,
  userRole, 
  onNewProject,
  embedded = false 
}) {
  const { user } = useAuth();
  
  const currentName = userName || user?.full_name || "عبد الله العتيبي";
  const roleNameMap = {
    client: 'حساب عميل',
    team_leader: 'قائد فريق',
    specialist: 'مستقل محترف',
  };
  const currentRole = userRole || (user?.role ? roleNameMap[user.role] || user.role : "حساب عميل");
  
  const initials = currentName
    .split(' ')
    .filter(Boolean)
    .map(n => n[0])
    .slice(0, 2)
    .join(' ') || 'ع ع';

  const displayGreeting = greetingName || (currentName ? currentName.split(' ').slice(0, 2).join(' ') : 'عزيزنا');

  // معالجة رابط الصورة الشخصية للتوافق مع الخادم والبروكسي
  const resolveAvatarUrl = (url) => {
    if (!url) return null;
    if (url.startsWith('data:') || url.startsWith('blob:')) return url;
    if (url.includes('localhost:5000/uploads/')) {
      return url.replace(/^https?:\/\/localhost:5000/, '');
    }
    return url;
  };

  const [avatarLoadError, setAvatarLoadError] = useState(false);
  const avatarSrc = resolveAvatarUrl(user?.avatar_url);

  useEffect(() => {
    setAvatarLoadError(false);
  }, [user?.avatar_url]);

  // إدارة قائمة الإشعارات
  const [showDropdown, setShowDropdown] = useState(false);
  const [unreadCount, setUnreadCount] = useState(2);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'تم رفع دليل الهوية للمراجعة',
      body: 'قامت سارة برفع مسودة الدليل للمراجعة والاعتماد.',
      is_read: false,
      created_at: 'منذ ساعتين'
    },
    {
      id: 2,
      title: 'دفعة الضمان في الحساب',
      body: 'تم تأكيد حجز مبلغ المرحلة في حساب الضمان Escrow.',
      is_read: false,
      created_at: 'اليوم'
    },
    {
      id: 3,
      title: 'مرحباً بك في منصة ACCESS',
      body: 'اكتمل إعداد حسابك بنجاح وجاهز لبدء المشاريع.',
      is_read: true,
      created_at: 'أمس'
    }
  ]);

  const dropdownRef = useRef(null);

  // جلب الإشعارات الحقيقية من الخادم
  useEffect(() => {
    let isMounted = true;
    const fetchNotifications = async () => {
      try {
        const res = await notificationsService.getNotifications(1, 10);
        if (isMounted && res?.data) {
          const list = res.data.notifications || [];
          if (list.length > 0) {
            setNotifications(list);
            setUnreadCount(res.data.unread_count || 0);
          }
        }
      } catch (err) {
        // تجاهل الخطأ واستخدام القائمة المبدئية
      }
    };

    fetchNotifications();
    return () => { isMounted = false; };
  }, []);

  // إغلاق القائمة عند النقر خارجها
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // تعليم إشعار كمقروء
  const handleMarkAsRead = async (id) => {
    try {
      await notificationsService.markOneAsRead(id);
    } catch (_) {}
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, is_read: true } : n));
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  // تعليم الكل كمقروء
  const handleMarkAllRead = async () => {
    try {
      await notificationsService.markAllAsRead();
    } catch (_) {}
    setNotifications(prev => prev.map(n => ({ ...n, is_read: true })));
    setUnreadCount(0);
  };

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
        <div style={{ position: 'relative' }} ref={dropdownRef}>
          <div 
            className="dash-notification-bell" 
            title="الإشعارات" 
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <NotificationsNoneRoundedIcon sx={{ fontSize: 21, color: '#475467' }} />
            {unreadCount > 0 && <span className="notif-dot"></span>}
          </div>

          {/* القائمة المنسدلة للإشعارات */}
          {showDropdown && (
            <div className="notifications-dropdown-menu">
              <div className="notif-menu-header">
                <strong>الإشعارات {unreadCount > 0 && `(${unreadCount})`}</strong>
                {unreadCount > 0 && (
                  <button type="button" onClick={handleMarkAllRead}>تعليم الكل كمقروء</button>
                )}
              </div>
              <div className="notif-menu-list">
                {notifications.length === 0 ? (
                  <div style={{ padding: '24px 16px', textAlign: 'center', fontSize: '12px', color: '#667085' }}>
                    لا توجد إشعارات حالياً
                  </div>
                ) : (
                  notifications.map((notif) => (
                    <div 
                      key={notif.id} 
                      className={`notif-menu-item ${!notif.is_read ? 'unread' : ''}`}
                      onClick={() => handleMarkAsRead(notif.id)}
                    >
                      {!notif.is_read && <span className="notif-item-dot"></span>}
                      <div className="notif-item-body">
                        <div className="notif-item-title">{notif.title}</div>
                        <p className="notif-item-text">{notif.body}</p>
                        <span className="notif-item-time">
                          {typeof notif.created_at === 'string' && notif.created_at.includes('T')
                            ? new Date(notif.created_at).toLocaleDateString('ar-SA', { hour: '2-digit', minute: '2-digit' })
                            : notif.created_at}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* فاصل رأسي خفيف مطابق للصورة */}
        <div className="header-divider-line"></div>

        {/* بروفايل المستخدم */}
        <div className="dash-header-profile">
          <div className="header-avatar-circle" style={{ overflow: 'hidden' }}>
            {avatarSrc && !avatarLoadError ? (
              <img
                src={avatarSrc}
                alt={currentName}
                onError={() => setAvatarLoadError(true)}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: '50%',
                  display: 'block',
                }}
              />
            ) : (
              initials
            )}
          </div>
          <div className="header-user-meta">
            <strong>{currentName}</strong>
            <small>{currentRole}</small>
          </div>
          <span className="header-arrow">
            <KeyboardArrowDownRoundedIcon sx={{ fontSize: 18, color: '#667085' }} />
          </span>
        </div>
      </div>
    </header>
  );
}
