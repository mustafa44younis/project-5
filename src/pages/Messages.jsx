import React, { useState } from 'react';
import TopHeader from '../components/TopHeader';

// MUI Icons Imports
import SearchIcon from '@mui/icons-material/Search';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import MicIcon from '@mui/icons-material/Mic';
import SendIcon from '@mui/icons-material/Send';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import VideocamIcon from '@mui/icons-material/Videocam';
import CloseIcon from '@mui/icons-material/Close';
import LinkIcon from '@mui/icons-material/Link';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import ImageIcon from '@mui/icons-material/Image';
import CropFreeIcon from '@mui/icons-material/CropFree';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DownloadIcon from '@mui/icons-material/Download';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';
import ErrorRoundedIcon from '@mui/icons-material/ErrorRounded';
import WifiOffIcon from '@mui/icons-material/WifiOff';
import MicNoneIcon from '@mui/icons-material/MicNone';
import PinDropOutlinedIcon from '@mui/icons-material/PinDropOutlined';
import NotificationsOffOutlinedIcon from '@mui/icons-material/NotificationsOffOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import PictureAsPdfOutlinedIcon from '@mui/icons-material/PictureAsPdfOutlined';
import ReportProblemOutlinedIcon from '@mui/icons-material/ReportProblemOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import MicOffIcon from '@mui/icons-material/MicOff';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import CallEndIcon from '@mui/icons-material/CallEnd';
import AddIcon from '@mui/icons-material/Add';

import './Messages.css';
import emptyMessagesImg from '../images/empty-messages.png';
import basketVegetablesImg from '../images/basket-vegetables.jpg';

export default function Messages({ userName = "عبدالله العتيبي", userRole = "حساب عميل", onNewProject, onNavigate }) {
  // المحادثة النشطة حالياً
  const [activeChatId, setActiveChatId] = useState('chat1');
  const [filterType, setFilterType] = useState('all'); // 'all', 'unread'
  const [hasMessages, setHasMessages] = useState(true); // false = حالة فارغة بدون رسائل
  const [messageInput, setMessageInput] = useState('');

  // القوائم والمودالات
  const [showAttachMenu, setShowAttachMenu] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [showFigmaModal, setShowFigmaModal] = useState(false);
  const [showFilesGallery, setShowFilesGallery] = useState(false);
  const [showCallModal, setShowCallModal] = useState(false);
  const [showImageLightbox, setShowImageLightbox] = useState(false);
  const [lightboxZoom, setLightboxZoom] = useState(100);
  const [currentImageIndex, setCurrentImageIndex] = useState(2);
  const [showEditProjectModal, setShowEditProjectModal] = useState(false); // مودال تعديل ملخص المشروع

  // حالات نموذج تعديل تفاصيل ملخص المشروع
  const [projectName, setProjectName] = useState('متجر سلة خير');
  const [projectDesc, setProjectDesc] = useState('متجر إلكتروني للمنتجات الحرفية المحلية..');
  const [targetAudience, setTargetAudience] = useState(['المتسوقون في السعودية', 'محبو الصناعات اليدوية']);
  const [features, setFeatures] = useState(['كاتالوج المنتجات', 'بوابات الدفع', 'تتبع الطلبات']);
  const [newFeatureInput, setNewFeatureInput] = useState('');
  const [showAddFeature, setShowAddFeature] = useState(false);
  const [techStack, setTechStack] = useState({ next: true, shopify: true, flutter: false, node: false });
  const [minBudget, setMinBudget] = useState('12,000');
  const [maxBudget, setMaxBudget] = useState('18,000');
  const [minWeeks, setMinWeeks] = useState('4');
  const [maxWeeks, setMaxWeeks] = useState('6');

  // حالات تسجيل الصوت
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState('0:24');

  // البحث داخل المحادثة
  const [searchInChatQuery, setSearchInChatQuery] = useState('');
  const [showSearchHeader, setShowSearchHeader] = useState(false);

  // رابط التصميم
  const [figmaLink, setFigmaLink] = useState('https://www.figma.com/design/roaad-platform');

  // قائمة المحادثات
  const conversations = [
    {
      id: 'chat1',
      name: 'أحمد السالم',
      role: 'تصميم منصة رؤاد - قائد المشروع',
      avatar: 'أ س',
      lastMsg: 'ممتاز، نبدأ بعد اعتماد النسخة النهائية.',
      time: '10:42 ص',
      unreadCount: 2,
      online: true,
      project: 'متجر سلة الخير',
      stage: 'تطوير واجهات المتجر',
      progress: 65,
      deliveryDate: '22 أكتوبر'
    },
    {
      id: 'chat2',
      name: 'سارة القحطاني',
      role: 'الهوية البصرية',
      avatar: 'س ق',
      lastMsg: 'شكراً لك، بانتظار ملاحظاتك.',
      time: '09:15 ص',
      unreadCount: 1,
      online: true,
      project: 'هوية بصرية',
      stage: 'مراجعة ألوان الشعار',
      progress: 40,
      deliveryDate: '28 أكتوبر'
    },
    {
      id: 'chat3',
      name: 'محمد خالد',
      role: 'تطوير المتجر الإلكتروني',
      avatar: 'م خ',
      lastMsg: 'تم تحديث نسخة المتجر للمراجعة',
      time: 'أمس',
      unreadCount: 0,
      online: false,
      project: 'متجر إلكتروني',
      stage: 'ربط بوابات الدفع',
      progress: 80,
      deliveryDate: '30 أكتوبر'
    },
    {
      id: 'chat4',
      name: 'فريق دعم ACCESS',
      role: 'الدعم الفني والتقني',
      avatar: 'A',
      lastMsg: 'يسعدنا مساعدتك في أي وقت',
      time: 'أمس',
      unreadCount: 0,
      online: true,
      project: 'استفسار عام',
      stage: 'متاح 24/7',
      progress: 100,
      deliveryDate: '-'
    }
  ];

  const currentChat = conversations.find(c => c.id === activeChatId) || conversations[0];

  // رسائل المحادثة الحالية
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      sender: 'other',
      senderName: 'أحمد السالم',
      text: 'صباح الخير عبدالله، انتهينا من تحديث واجهات المتجر. هذا رابط التصميم للمراجعة.',
      time: '10:30 ص',
      hasFigmaLink: true,
      figmaTitle: 'واجهات متجر سلة الخير',
      figmaUrl: 'figma.com/design/salat-alkhair'
    },
    {
      id: 2,
      sender: 'me',
      text: 'يعطيك العافية أحمد. أرسل لي معاينة الصفحة الرئيسية ونسخة العقد وسأراجعها اليوم.',
      time: '10:34 ص',
      status: 'read'
    },
    {
      id: 3,
      sender: 'other',
      senderName: 'أحمد السالم',
      text: 'تفضل، هذه الصورة المقترحة للواجهة والعقد المتفق عليه.',
      time: '10:38 ص',
      hasImage: true,
      imageSrc: basketVegetablesImg,
      hasFile: true,
      fileName: 'عقد تطوير متجر سلة الخير.pdf',
      fileSize: '1.2 MB • 6 صفحات'
    },
    {
      id: 4,
      sender: 'other',
      senderName: 'أحمد السالم',
      isAudio: true,
      audioDuration: '0:32',
      time: '10:40 ص'
    },
    {
      id: 5,
      sender: 'me',
      text: 'ممتاز سأضيف ملاحظاتي على Figma. نلتقي على موعد التسليم في 22 أكتوبر.',
      time: '10:42 ص',
      status: 'read'
    }
  ]);

  // إعادة إرسال الرسالة عند الضغط على زر "إعادة الإرسال"
  const handleRetryMessage = (id) => {
    const msgToRetry = chatMessages.find(m => m.id === id);
    if (!msgToRetry) return;

    try {
      // التحقق الشرطي: إذا انقطع الاتصال أو حدث خطأ
      if (!navigator.onLine) {
        throw new Error('تعذر الإرسال، تحقق من اتصالك');
      }

      // في حال نجاح الإرسال، تحويل الحالة إلى sent
      setChatMessages(prev => prev.map(m => {
        if (m.id === id) {
          return {
            ...m,
            status: 'sent',
            errorMessage: null,
            time: 'الآن'
          };
        }
        return m;
      }));
    } catch (err) {
      // في حال استمرار الخطأ، إبقاء رسالة الخطأ
      setChatMessages(prev => prev.map(m => {
        if (m.id === id) {
          return {
            ...m,
            status: 'error',
            errorMessage: err.message || 'تعذر الإرسال، تحقق من اتصالك'
          };
        }
        return m;
      }));
    }
  };

  // حذف الرسالة عند الضغط على زر "حذف الرسالة"
  const handleDeleteMessage = (id) => {
    setChatMessages(prev => prev.filter(m => m.id !== id));
  };

  // شرط وجود أي رسالة خطأ في المحادثة الحالية لإظهار تنبيه عدم استقرار الاتصال
  const hasErrorMessage = chatMessages.some(m => m.status === 'error');

  // إرسال الرسائل مع المعالجة الشرطية للأخطاء
  const handleSendMessage = (e) => {
    e?.preventDefault();
    if (!messageInput.trim() && !isRecording) return;

    if (isRecording) {
      try {
        if (!navigator.onLine) {
          throw new Error('تعذر الإرسال، تحقق من اتصالك');
        }

        setChatMessages(prev => [
          ...prev,
          {
            id: Date.now(),
            sender: 'me',
            isAudio: true,
            audioDuration: recordingTime,
            time: 'الآن',
            status: 'sent'
          }
        ]);
      } catch (err) {
        // في حال حدوث خطأ أثناء الإرسال الصوتي
        setChatMessages(prev => [
          ...prev,
          {
            id: Date.now(),
            sender: 'me',
            senderName: 'أنت',
            isAudio: true,
            audioDuration: recordingTime,
            time: 'الآن',
            status: 'error',
            errorMessage: err.message || 'تعذر الإرسال، تحقق من اتصالك'
          }
        ]);
      }
      setIsRecording(false);
      return;
    }

    const currentText = messageInput;
    setMessageInput('');

    try {
      // جملة شرطية: إذا كان هناك انقطاع في الاتصال أو خطأ في إرسال الرسالة
      if (!navigator.onLine) {
        throw new Error('تعذر الإرسال، تحقق من اتصالك');
      }

      // في حال نجاح الإرسال تضاف الرسالة بحالة طبيعية (sent)
      setChatMessages(prev => [
        ...prev,
        {
          id: Date.now(),
          sender: 'me',
          text: currentText,
          time: 'الآن',
          status: 'sent'
        }
      ]);
    } catch (err) {
      // في حال حدوث خطأ في إرسال الرسالة تظهر رسالة الخطأ بهذا التصميم
      setChatMessages(prev => [
        ...prev,
        {
          id: Date.now(),
          sender: 'me',
          senderName: 'أنت',
          text: currentText,
          time: 'الآن',
          status: 'error',
          errorMessage: err.message || 'تعذر الإرسال، تحقق من اتصالك'
        }
      ]);
    }
  };

  const handleRemoveAudience = (indexToRemove) => {
    setTargetAudience(targetAudience.filter((_, idx) => idx !== indexToRemove));
  };

  const handleRemoveFeature = (indexToRemove) => {
    setFeatures(features.filter((_, idx) => idx !== indexToRemove));
  };

  const handleAddFeature = () => {
    if (newFeatureInput.trim()) {
      setFeatures([...features, newFeatureInput.trim()]);
      setNewFeatureInput('');
      setShowAddFeature(false);
    }
  };

  return (
    <div className="messages-page-wrapper" dir="rtl">
      {/* الهيدر الرئيسي الموحد للمنصة */}
      <TopHeader 
        userName={userName} 
        userRole={userRole} 
        onNewProject={onNewProject || (() => onNavigate && onNavigate('new-project'))} 
      />

      {/* ترويسة صفحة الرسائل */}
      <div className="messages-header-banner">
        <div>
          <h2>الرسائل</h2>
          <p>تواصل مع فريقك، وشارك الملفات والقرارات التي تدفع مشروعك للأمام.</p>
        </div>
        <span className="unread-counter-badge">3 رسائل غير مقروءة</span>
      </div>

      {/* حالة عدم وجود رسائل */}
      {!hasMessages ? (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '60vh',
          textAlign: 'center',
          gap: '16px'
        }}>
          <img 
            src={emptyMessagesImg} 
            alt="لا توجد رسائل" 
            style={{ width: '220px', maxWidth: '80%', opacity: 0.92 }} 
          />
          <h3 style={{ fontSize: '20px', fontWeight: '900', color: '#181818', margin: '0' }}>
            لا توجد رسائل نشطة حالياً
          </h3>
          <p style={{ fontSize: '13px', color: '#667085', maxWidth: '380px', lineHeight: 1.7, margin: '0' }}>
            ستظهر محادثاتك هنا تلقائياً بمجرد بدء مشروعك والتواصل مع فريق المخصص لك
          </p>
          <button
            type="button"
            onClick={() => onNavigate && onNavigate('new-project')}
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
              marginTop: '4px'
            }}
          >
            + ابدأ مشروعك وتواصل مع فريقك
          </button>
        </div>
      ) : (
        <>
      {/* تخطيط الصفحة الرئيسي المعدل: (المحادثات اليمين -> الشات الوسط -> سياق المشروع الشمال) */}
      <div className="messages-layout-grid">
        
        {/* العمود 1 (على اليمين): قائمة المحادثات */}
        <div className="conversations-list-sidebar">
          <div className="sidebar-card">
            <div className="sidebar-header-row">
              <h3>المحادثات</h3>
              <button type="button" className="btn-new-chat" title="محادثة جديدة">+</button>
            </div>

            {/* صندوق البحث في القائمة */}
            <div className="search-chats-box">
              <SearchIcon sx={{ fontSize: 18, color: '#888' }} />
              <input type="text" placeholder="ابحث عن محادثة أو مشروع..." />
            </div>

            {/* تبويب الفلترة */}
            <div className="filter-tabs-row">
              <button 
                type="button" 
                className={filterType === 'all' ? 'active' : ''} 
                onClick={() => setFilterType('all')}
              >
                الكل
              </button>
              <button 
                type="button" 
                className={filterType === 'unread' ? 'active' : ''} 
                onClick={() => setFilterType('unread')}
              >
                غير المقروءة
              </button>
            </div>

            {/* قائمة العناصر */}
            <div className="chats-list-scroll">
              {conversations
                .filter(c => filterType === 'all' || c.unreadCount > 0)
                .map((chat) => (
                  <div 
                    key={chat.id} 
                    className={`chat-item-row ${activeChatId === chat.id ? 'active' : ''}`}
                    onClick={() => setActiveChatId(chat.id)}
                  >
                    <div className="chat-avatar">{chat.avatar}</div>
                    <div className="chat-info">
                      <div className="chat-title-row">
                        <strong>{chat.name}</strong>
                        <small className="chat-time">{chat.time}</small>
                      </div>
                      <span className="chat-sub-project">{chat.role}</span>
                      <p className="chat-last-preview">
                        {hasErrorMessage && activeChatId === chat.id ? (
                          <span style={{ color: '#DC2626', fontWeight: '700' }}>تعذر إرسال رسالتك الأخيرة</span>
                        ) : (
                          chat.lastMsg
                        )}
                      </p>
                    </div>
                    {chat.unreadCount > 0 && <span className="unread-dot-badge">{chat.unreadCount}</span>}
                  </div>
                ))}
            </div>

            <div className="security-encrypted-footer">
              <CheckCircleIcon sx={{ fontSize: 13, color: '#14A800' }} /> محادثاتك ومرفقاتك في مكان آمن
            </div>
          </div>
        </div>

        {/* العمود 2 (في الوسط): منطقة المحادثة الحالية */}
        <div className="active-chat-area">
          
          {/* هيدر المحادثة العلوي */}
          <div className="active-chat-header">
            <div className="chat-user-meta">
              <div className="user-avatar-circle">{currentChat.avatar}</div>
              <div>
                <div className="user-name-row">
                  <h3>{currentChat.name}</h3>
                  {currentChat.online && <span className="online-indicator">متصل الآن</span>}
                </div>
                <p>{currentChat.role}</p>
              </div>
            </div>

            <div className="header-actions-row">
              <button 
                type="button" 
                className="icon-action-btn" 
                title="بدء مكالمة فيديو"
                onClick={() => setShowCallModal(true)}
              >
                <VideocamIcon sx={{ fontSize: 20 }} />
              </button>
              
              <div className="more-menu-wrapper">
                <button 
                  type="button" 
                  className="icon-action-btn" 
                  title="خيارات المحادثة"
                  onClick={() => setShowMoreMenu(!showMoreMenu)}
                >
                  <MoreVertIcon sx={{ fontSize: 20 }} />
                </button>

                {/* القائمة المنسدلة الخيارات ثلاثية النقاط */}
                {showMoreMenu && (
                  <div className="dropdown-menu-card">
                    <div className="dropdown-item">
                      <PersonOutlineOutlinedIcon sx={{ fontSize: 16 }} /> عرض بطاقة قائد المشروع
                    </div>
                    <div className="dropdown-item">
                      <PinDropOutlinedIcon sx={{ fontSize: 16 }} /> تثبيت المحادثة في الأعلى
                    </div>
                    <div className="dropdown-item" onClick={() => { setShowSearchHeader(!showSearchHeader); setShowMoreMenu(false); }}>
                      <SearchIcon sx={{ fontSize: 16 }} /> البحث داخل نصوص المحادثة
                    </div>
                    <div className="dropdown-item">
                      <NotificationsOffOutlinedIcon sx={{ fontSize: 16 }} /> كتم الإشعارات لهذه المحادثة
                    </div>
                    <div className="dropdown-item" onClick={() => { setShowCallModal(true); setShowMoreMenu(false); }}>
                      <CalendarTodayOutlinedIcon sx={{ fontSize: 16 }} /> جدولة مكالمة مراجعة سريعة (Google Meet / Zoom)
                    </div>
                    <div className="dropdown-item">
                      <PictureAsPdfOutlinedIcon sx={{ fontSize: 16 }} /> تصدير سجل المحادثة كملف PDF
                    </div>
                    <div className="dropdown-item danger">
                      <ReportProblemOutlinedIcon sx={{ fontSize: 16 }} /> الإبلاغ عن مخالفة أو فتح تذكرة دعم فني
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* شريط البحث المدمج داخل المحادثة عند تفعيله */}
          {showSearchHeader && (
            <div className="chat-search-bar-inline">
              <SearchIcon sx={{ fontSize: 18, color: '#777' }} />
              <input 
                type="text" 
                placeholder="ابحث في محادثة أحمد السالم..." 
                value={searchInChatQuery}
                onChange={(e) => setSearchInChatQuery(e.target.value)}
              />
              <span className="search-results-tag">3 نتائج مطابقة</span>
              <button type="button" onClick={() => setShowSearchHeader(false)}><CloseIcon sx={{ fontSize: 16 }} /></button>
            </div>
          )}

          {/* منطقة استعراض الرسائل */}
          <div className="messages-scroll-body">
            <div className="date-separator"><span>اليوم، 17 أكتوبر</span></div>

            {chatMessages.map((msg) => (
              <div key={msg.id} className={`message-bubble-wrapper ${msg.sender} ${msg.status === 'error' ? 'has-error' : ''}`}>
                <div className={`message-bubble ${msg.sender} ${msg.status === 'error' ? 'error-message' : ''}`}>
                  {msg.status === 'error' && (
                    <span className="bubble-author-error">{msg.senderName || 'أنت'}</span>
                  )}
                  {msg.senderName && <span className="bubble-author">{msg.senderName}</span>}
                  
                  {msg.text && <p className="bubble-text">{msg.text}</p>}

                  {/* في حال وجود رابط Figma */}
                  {msg.hasFigmaLink && (
                    <div className="figma-preview-card" onClick={() => setShowFigmaModal(true)}>
                      <div className="figma-icon-bg">Figma</div>
                      <div>
                        <strong>{msg.figmaTitle}</strong>
                        <small>{msg.figmaUrl}</small>
                      </div>
                    </div>
                  )}

                  {/* في حال وجود صورة مرفقة */}
                  {msg.hasImage && (
                    <div 
                      className="chat-image-preview-bubble"
                      onClick={() => setShowImageLightbox(true)}
                      style={{ marginTop: '8px', marginBottom: '8px', cursor: 'pointer', borderRadius: '12px', overflow: 'hidden', border: '1px solid #E2E8F0', position: 'relative' }}
                    >
                      <img 
                        src={msg.imageSrc || basketVegetablesImg} 
                        alt="معاينة واجهة المتجر" 
                        style={{ width: '100%', maxHeight: '200px', objectFit: 'cover', display: 'block' }} 
                      />
                      <div style={{ position: 'absolute', bottom: '8px', right: '8px', background: 'rgba(0,0,0,0.65)', color: '#fff', fontSize: '11px', padding: '3px 8px', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <ImageIcon sx={{ fontSize: 14 }} /> انقر للتكبير والمعاينة
                      </div>
                    </div>
                  )}

                  {/* في حال وجود ملف مرفق أو عقد */}
                  {msg.hasFile && (
                    <div className="attachment-file-card">
                      <div className="file-info-row">
                        <PictureAsPdfOutlinedIcon sx={{ fontSize: 28, color: '#14A800' }} />
                        <div>
                          <strong>{msg.fileName}</strong>
                          <small>{msg.fileSize}</small>
                        </div>
                        <button type="button" className="download-btn" title="تحميل الملف"><DownloadIcon sx={{ fontSize: 18 }} /></button>
                      </div>
                    </div>
                  )}

                  {/* في حال وجود رسالة صوتية */}
                  {msg.isAudio && (
                    <div className="audio-player-bubble">
                      <button type="button" className="audio-play-btn"><PlayArrowIcon sx={{ fontSize: 20 }} /></button>
                      <div className="audio-waveform-visual">
                        <span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span>
                      </div>
                      <small className="audio-time">{msg.audioDuration}</small>
                    </div>
                  )}

                  <span className="bubble-timestamp">
                    {msg.time} {msg.status === 'read' && <CheckCircleIcon sx={{ fontSize: 12, color: '#14A800' }} />}
                  </span>
                </div>

                {/* شريط حالة الخطأ وإعادة الإرسال المطابق للصورة */}
                {msg.status === 'error' && (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginTop: '4px' }}>
                    <div className="message-error-status-bar">
                      <span className="error-circle-badge">!</span>
                      <span>{msg.errorMessage || 'تعذر الإرسال، تحقق من اتصالك'}</span>
                    </div>
                    <div className="message-error-actions-row">
                      <button 
                        type="button" 
                        className="btn-msg-error-action delete"
                        onClick={() => handleDeleteMessage(msg.id)}
                      >
                        حذف الرسالة
                      </button>
                      <button 
                        type="button" 
                        className="btn-msg-error-action retry"
                        onClick={() => handleRetryMessage(msg.id)}
                      >
                        إعادة الإرسال <RefreshRoundedIcon sx={{ fontSize: 13 }} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* شريط كتابة الرسالة / التسجيل الصوتي */}
          <div className="chat-input-footer-area">
            
            {/* في حال التسجيل الصوتي الحي */}
            {isRecording ? (
              <div className="recording-live-bar">
                <div className="recording-indicator">
                  <span className="red-dot-pulsing"></span>
                  <span>{recordingTime} جاري التسجيل...</span>
                </div>
                <div className="audio-live-waveform">
                  <span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span>
                </div>
                <div className="recording-actions">
                  <button type="button" className="btn-cancel-rec" onClick={() => setIsRecording(false)}><DeleteOutlinedIcon sx={{ fontSize: 18 }} /> إنهاء وحذف</button>
                  <button type="button" className="btn-send-rec" onClick={handleSendMessage}><SendIcon sx={{ fontSize: 16, transform: 'scaleX(-1)' }} /> إرسال التسجيل</button>
                </div>
              </div>
            ) : (
              /* في حال الكتابة العادية */
              <form className="chat-form" onSubmit={handleSendMessage}>
                <div className="input-field-wrapper">
                  {/* أيقونة المرفقات المشبك على اليمين داخل الحقل */}
                  <div className="attach-menu-container">
                    <button 
                      type="button" 
                      className="attach-btn" 
                      title="إرفاق ملف"
                      onClick={() => setShowAttachMenu(!showAttachMenu)}
                    >
                      <AttachFileIcon sx={{ fontSize: 20, transform: 'rotate(45deg)', color: '#64748B' }} />
                    </button>

                    {showAttachMenu && (
                      <div className="attach-popup-menu">
                        <div className="attach-option-item" onClick={() => setShowAttachMenu(false)}>
                          <ImageIcon sx={{ color: '#14A800', fontSize: 18 }} />
                          <div><strong>رفع صور أو فيديوهات</strong><small>PNG, JPG, MP4</small></div>
                        </div>
                        <div className="attach-option-item" onClick={() => setShowAttachMenu(false)}>
                          <InsertDriveFileIcon sx={{ color: '#14A800', fontSize: 18 }} />
                          <div><strong>إرفاق مستند أو عقد</strong><small>PDF, DOCX, ZIP</small></div>
                        </div>
                        <div className="attach-option-item" onClick={() => { setShowFigmaModal(true); setShowAttachMenu(false); }}>
                          <LinkIcon sx={{ color: '#14A800', fontSize: 18 }} />
                          <div><strong>مشاركة رابط تصميم خارجي</strong><small>Figma / GitHub</small></div>
                        </div>
                        <div className="attach-option-item" onClick={() => setShowAttachMenu(false)}>
                          <CropFreeIcon sx={{ color: '#14A800', fontSize: 18 }} />
                          <div><strong>مشاركة لقطة شاشة توضيحية</strong><small>مع تحديد الملاحظات</small></div>
                        </div>
                      </div>
                    )}
                  </div>

                  <textarea 
                    rows={1}
                    placeholder="اكتب رسالتك هنا..."
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage(e);
                      }
                    }}
                  />
                </div>

                <button 
                  type="button" 
                  className="mic-action-btn" 
                  title="تسجيل رسالة صوتية"
                  onClick={() => setIsRecording(true)}
                >
                  <MicNoneIcon sx={{ fontSize: 20 }} />
                </button>

                <button type="submit" className="send-message-btn" title="إرسال">
                  <SendIcon sx={{ fontSize: 18, transform: 'scaleX(-1)' }} />
                </button>
              </form>
            )}

            <div className="chat-footer-note-row">
              {hasErrorMessage ? (
                <div className="connection-unstable-indicator">
                  <WifiOffIcon sx={{ fontSize: 14 }} />
                  <span>الاتصال غير مستقر</span>
                </div>
              ) : (
                <div></div>
              )}
              <div className="chat-footer-note">Enter للإرسال • Shift + Enter لسطر جديد</div>
            </div>
          </div>

        </div>

        {/* العمود 3 (على الشمال): لوحة سياق المشروع الجانبية */}
        <div className="project-context-sidebar">
          <div className="context-card">
            <span className="context-label">سياق المشروع</span>
            
            <div className="project-mini-brand">
              <div className="brand-icon-box">🛒</div>
              <div>
                <h4>{projectName}</h4>
                <small>{currentChat.role}</small>
              </div>
            </div>

            <div className="status-tag-green">قيد التنفيذ</div>

            <div className="progress-section">
              <div className="progress-label-row">
                <span>إنجاز المشروع</span>
                <strong>{currentChat.progress}%</strong>
              </div>
              <div className="progress-bar-bg">
                <div className="progress-bar-fill" style={{ width: `${currentChat.progress}%` }}></div>
              </div>
            </div>

            <div className="stage-info-box">
              <small>المرحلة الحالية</small>
              <strong>{currentChat.stage}</strong>
              <small className="date">التسليم: {currentChat.deliveryDate}</small>
            </div>

            <div className="shared-files-section">
              <div className="section-title-row">
                <strong>الملفات المشتركة</strong>
                <button type="button" onClick={() => setShowFilesGallery(true)}>عرض الكل</button>
              </div>

              <div className="shared-file-item" onClick={() => setShowImageLightbox(true)}>
                <img src={basketVegetablesImg} alt="معاينة" style={{ width: 26, height: 26, objectFit: "cover", borderRadius: 4 }} />
                <div>
                  <span>معاينة واجهة المتجر.png</span>
                  <small>PNG • 2.4 MB</small>
                </div>
              </div>

              <div className="shared-file-item" onClick={() => setShowFilesGallery(true)}>
                <InsertDriveFileIcon sx={{ fontSize: 18, color: '#14A800' }} />
                <div>
                  <span>تصميم واجهات المتجر</span>
                  <small>Figma Link</small>
                </div>
              </div>

              <div className="shared-file-item" onClick={() => setShowFilesGallery(true)}>
                <PictureAsPdfOutlinedIcon sx={{ fontSize: 18, color: '#14A800' }} />
                <div>
                  <span>عقد تطوير المتجر.pdf</span>
                  <small>PDF • 1.2 MB</small>
                </div>
              </div>
            </div>

            {/* الزر الذي يفتح مودال تعديل تفاصيل ملخص المشروع المطابق للصورة */}
            <button 
              type="button" 
              className="btn-full-project-details"
              onClick={() => setShowEditProjectModal(true)}
            >
              تفاصيل المشروع الكاملة <ArrowBackIcon sx={{ fontSize: 14 }} />
            </button>
          </div>
        </div>

      </div>

      </>
      )} {/* نهاية الشرط hasMessages */}

      {/* مودال تعديل تفاصيل ملخص المشروع (المطابق للصورة) */}
      {showEditProjectModal && (
        <div className="modal-overlay">
          <div className="modal-card modal-lg" style={{ width: '680px', maxWidth: '95%', maxHeight: '90vh', overflowY: 'auto' }}>
            
            {/* هيدر المودال */}
            <div className="modal-header" style={{ borderBottom: 'none', paddingBottom: 0, marginBottom: '16px' }}>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: '900', margin: '0 0 4px 0' }}>تعديل تفاصيل ملخص المشروع</h3>
                <small style={{ fontSize: '11.5px', color: '#888' }}>راجع تفاصيل مشروعك قبل اعتماد الملخص وبدء التنفيذ.</small>
              </div>
              <button type="button" className="close-btn" onClick={() => setShowEditProjectModal(false)}>
                <CloseIcon sx={{ fontSize: 18 }} />
              </button>
            </div>

            <div className="modal-body-content" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              
              {/* 1. اسم المشروع */}
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', marginBottom: '6px', color: '#333' }}>اسم المشروع</label>
                <input 
                  type="text" 
                  value={projectName} 
                  onChange={(e) => setProjectName(e.target.value)} 
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #E2E8F0', background: '#FAFAFA', fontFamily: 'inherit', fontSize: '13px', outline: 'none' }}
                />
              </div>

              {/* 2. وصف ونشاط المشروع */}
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', marginBottom: '6px', color: '#333' }}>وصف ونشاط المشروع</label>
                <textarea 
                  rows={2}
                  value={projectDesc}
                  onChange={(e) => setProjectDesc(e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #E2E8F0', background: '#FAFAFA', fontFamily: 'inherit', fontSize: '13px', resize: 'none', outline: 'none' }}
                />
              </div>

              {/* 3. الجمهور المستهدف */}
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', marginBottom: '6px', color: '#333' }}>الجمهور المستهدف</label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center', padding: '10px 12px', border: '1px solid #E2E8F0', borderRadius: '8px', background: '#FAFAFA' }}>
                  {targetAudience.map((aud, index) => (
                    <span key={index} style={{ background: '#F1F5F9', color: '#334155', padding: '4px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: '600', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                      {aud}
                      <CloseIcon sx={{ fontSize: 13, cursor: 'pointer', color: '#64748B' }} onClick={() => handleRemoveAudience(index)} />
                    </span>
                  ))}
                </div>
              </div>

              {/* 4. المزايا الأساسية */}
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', marginBottom: '6px', color: '#333' }}>المزايا الأساسية</label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center' }}>
                  {features.map((feat, index) => (
                    <span key={index} style={{ background: '#EAF7E6', color: '#14A800', border: '1px solid #14A800', padding: '6px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: '700', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                      <CheckCircleIcon sx={{ fontSize: 15, color: '#14A800' }} />
                      {feat}
                      <CloseIcon sx={{ fontSize: 14, cursor: 'pointer', color: '#14A800' }} onClick={() => handleRemoveFeature(index)} />
                    </span>
                  ))}

                  {showAddFeature ? (
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                      <input 
                        type="text" 
                        placeholder="اكتب الميزة..." 
                        value={newFeatureInput} 
                        onChange={(e) => setNewFeatureInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleAddFeature()}
                        style={{ padding: '6px 10px', borderRadius: '6px', border: '1px solid #14A800', fontSize: '12px', outline: 'none' }}
                        autoFocus
                      />
                      <button type="button" onClick={handleAddFeature} style={{ background: '#14A800', color: '#fff', border: 'none', borderRadius: '6px', padding: '6px 12px', fontSize: '12px', cursor: 'pointer', fontWeight: '700' }}>إضافة</button>
                    </div>
                  ) : (
                    <button 
                      type="button" 
                      onClick={() => setShowAddFeature(true)}
                      style={{ background: '#fff', border: '1px dashed #CBD5E1', color: '#64748B', padding: '6px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: '700', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                    >
                      <AddIcon sx={{ fontSize: 15 }} /> إضافة ميزة
                    </button>
                  )}
                </div>
              </div>

              {/* 5. التقنيات المقترحة */}
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', marginBottom: '6px', color: '#333' }}>التقنيات المقترحة</label>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <button 
                    type="button" 
                    onClick={() => setTechStack({ ...techStack, next: !techStack.next })}
                    style={{ background: techStack.next ? '#EAF7E6' : '#FAFAFA', border: techStack.next ? '1px solid #14A800' : '1px solid #E2E8F0', color: techStack.next ? '#14A800' : '#64748B', padding: '6px 14px', borderRadius: '8px', fontSize: '12px', fontWeight: '700', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                  >
                    Next.js {techStack.next ? '✓' : '+'}
                  </button>

                  <button 
                    type="button" 
                    onClick={() => setTechStack({ ...techStack, shopify: !techStack.shopify })}
                    style={{ background: techStack.shopify ? '#EAF7E6' : '#FAFAFA', border: techStack.shopify ? '1px solid #14A800' : '1px solid #E2E8F0', color: techStack.shopify ? '#14A800' : '#64748B', padding: '6px 14px', borderRadius: '8px', fontSize: '12px', fontWeight: '700', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                  >
                    Shopify {techStack.shopify ? '✓' : '+'}
                  </button>

                  <button 
                    type="button" 
                    onClick={() => setTechStack({ ...techStack, flutter: !techStack.flutter })}
                    style={{ background: techStack.flutter ? '#EAF7E6' : '#FAFAFA', border: techStack.flutter ? '1px solid #14A800' : '1px solid #E2E8F0', color: techStack.flutter ? '#14A800' : '#64748B', padding: '6px 14px', borderRadius: '8px', fontSize: '12px', fontWeight: '700', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                  >
                    Flutter {techStack.flutter ? '✓' : '+'}
                  </button>

                  <button 
                    type="button" 
                    onClick={() => setTechStack({ ...techStack, node: !techStack.node })}
                    style={{ background: techStack.node ? '#EAF7E6' : '#FAFAFA', border: techStack.node ? '1px solid #14A800' : '1px solid #E2E8F0', color: techStack.node ? '#14A800' : '#64748B', padding: '6px 14px', borderRadius: '8px', fontSize: '12px', fontWeight: '700', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                  >
                    Node.js {techStack.node ? '✓' : '+'}
                  </button>
                </div>
              </div>

              {/* 6. النطاق الزمني والميزانية المتوقعة */}
              <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '16px', marginTop: '4px' }}>
                <strong style={{ display: 'block', fontSize: '12.5px', fontWeight: '800', marginBottom: '14px', textAlign: 'center', color: '#1E293B' }}>النطاق الزمني والميزانية المتوقعة</strong>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  
                  {/* الميزانية */}
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', color: '#64748B', fontWeight: '700', marginBottom: '6px', textAlign: 'center' }}>الميزانية المتوقعة</label>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                      <div>
                        <span style={{ display: 'block', fontSize: '10px', color: '#94A3B8', textAlign: 'center', marginBottom: '2px' }}>الحد الأدنى</span>
                        <div style={{ position: 'relative' }}>
                          <input 
                            type="text" 
                            value={minBudget} 
                            onChange={(e) => setMinBudget(e.target.value)} 
                            style={{ width: '100%', padding: '8px 24px 8px 8px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '12px', fontWeight: '700', textAlign: 'center', background: '#fff' }}
                          />
                          <span style={{ position: 'absolute', right: '8px', top: '8px', fontSize: '10px', color: '#94A3B8' }}>ر.س</span>
                        </div>
                      </div>

                      <div>
                        <span style={{ display: 'block', fontSize: '10px', color: '#94A3B8', textAlign: 'center', marginBottom: '2px' }}>الحد الأقصى</span>
                        <div style={{ position: 'relative' }}>
                          <input 
                            type="text" 
                            value={maxBudget} 
                            onChange={(e) => setMaxBudget(e.target.value)} 
                            style={{ width: '100%', padding: '8px 24px 8px 8px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '12px', fontWeight: '700', textAlign: 'center', background: '#fff' }}
                          />
                          <span style={{ position: 'absolute', right: '8px', top: '8px', fontSize: '10px', color: '#94A3B8' }}>ر.س</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* المدة */}
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', color: '#64748B', fontWeight: '700', marginBottom: '6px', textAlign: 'center' }}>المدة المتوقعة بالأسابيع</label>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                      <div>
                        <span style={{ display: 'block', fontSize: '10px', color: '#94A3B8', textAlign: 'center', marginBottom: '2px' }}>الحد الأدنى</span>
                        <div style={{ position: 'relative' }}>
                          <input 
                            type="text" 
                            value={minWeeks} 
                            onChange={(e) => setMinWeeks(e.target.value)} 
                            style={{ width: '100%', padding: '8px 36px 8px 8px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '12px', fontWeight: '700', textAlign: 'center', background: '#fff' }}
                          />
                          <span style={{ position: 'absolute', right: '8px', top: '8px', fontSize: '10px', color: '#94A3B8' }}>أسابيع</span>
                        </div>
                      </div>

                      <div>
                        <span style={{ display: 'block', fontSize: '10px', color: '#94A3B8', textAlign: 'center', marginBottom: '2px' }}>الحد الأقصى</span>
                        <div style={{ position: 'relative' }}>
                          <input 
                            type="text" 
                            value={maxWeeks} 
                            onChange={(e) => setMaxWeeks(e.target.value)} 
                            style={{ width: '100%', padding: '8px 36px 8px 8px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '12px', fontWeight: '700', textAlign: 'center', background: '#fff' }}
                          />
                          <span style={{ position: 'absolute', right: '8px', top: '8px', fontSize: '10px', color: '#94A3B8' }}>أسابيع</span>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>

                <small style={{ display: 'block', textAlign: 'center', fontSize: '10px', color: '#94A3B8', marginTop: '12px' }}>
                  تقديرات أولية غير ملزمة. تراجع بعد تأكيد نطاق العمل مع الفريق.
                </small>
              </div>

            </div>

            {/* أزرار الإجراء السفلية */}
            <div className="modal-footer-actions" style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px', borderTop: 'none', paddingTop: 0 }}>
              <button 
                type="button" 
                className="btn-cancel" 
                onClick={() => setShowEditProjectModal(false)}
                style={{ background: '#fff', border: '1px solid #CBD5E1', color: '#334155', borderRadius: '8px', padding: '9px 18px', fontSize: '12px', fontWeight: '700', cursor: 'pointer' }}
              >
                إلغاء التعديل
              </button>
              <button 
                type="button" 
                className="btn-save" 
                onClick={() => {
                  setShowEditProjectModal(false);
                  if (onNavigate) {
                    onNavigate('review-deliverables', {
                    id: 1,
                    key: 'sallet',
                    title: projectName || 'متجر سلة الخير',
                    name: projectName || 'متجر سلة الخير',
                    fullTitle: 'متجر سلة الخير - تطوير واجهات المتجر',
                    deliverableTitle: 'نماذج وتصميم واجهات متجر سلة الخير',
                    code: 'AC-019',
                    leader: 'أحمد السالم'
                  });
                  }
                }}
                style={{ background: '#14A800', color: '#fff', border: 'none', borderRadius: '8px', padding: '9px 22px', fontSize: '12px', fontWeight: '700', cursor: 'pointer' }}
              >
                حفظ وتحديث الملخص
              </button>
            </div>

          </div>
        </div>
      )}

      {/* مودال مشاركة رابط تصميم خارجي (Figma / GitHub) */}
      {showFigmaModal && (
        <div className="modal-overlay">
          <div className="modal-card modal-sm">
            <div className="modal-header">
              <div className="modal-title-with-icon">
                <LinkIcon sx={{ color: '#14A800', fontSize: 22 }} />
                <div>
                  <h3>مشاركة رابط تصميم خارجي</h3>
                  <small>شارِك رابطاً من Figma / GitHub ليتمكن فريق المشروع من مراجعة التصميم.</small>
                </div>
              </div>
              <button type="button" className="close-btn" onClick={() => setShowFigmaModal(false)}><CloseIcon sx={{ fontSize: 18 }} /></button>
            </div>

            <div className="modal-body">
              <label>رابط التصميم</label>
              <div className="input-with-icon">
                <LinkIcon sx={{ color: '#888', fontSize: 18 }} />
                <input 
                  type="text" 
                  value={figmaLink} 
                  onChange={(e) => setFigmaLink(e.target.value)} 
                  placeholder="https://www.figma.com/design/..."
                />
              </div>
              <small className="hint-text">تأكد من تفعيل صلاحية عرض الرابط لأعضاء الفريق.</small>
            </div>

            <div className="modal-footer-actions">
              <button type="button" className="btn-cancel" onClick={() => setShowFigmaModal(false)}>إلغاء</button>
              <button 
                type="button" 
                className="btn-save" 
                onClick={() => {
                  setChatMessages(prev => [
                    ...prev,
                    {
                      id: Date.now(),
                      sender: 'me',
                      text: 'شاركت معكم رابط التصميم المحدث:',
                      hasFigmaLink: true,
                      figmaTitle: 'واجهات تصميم المنصة',
                      figmaUrl: figmaLink,
                      time: 'الآن',
                      status: 'sent'
                    }
                  ]);
                  setShowFigmaModal(false);
                }}
              >
                مشاركة الرابط
              </button>
            </div>
          </div>
        </div>
      )}

      {/* مودال معرض الملفات والمستندات المشتركة */}
      {showFilesGallery && (
        <div className="modal-overlay">
          <div className="modal-card modal-lg">
            <div className="modal-header">
              <div>
                <h3>الملفات والمستندات المشتركة - {currentChat.project}</h3>
                <small>كل ملفات المشروع وروابطه في مكان واحد بينك وبين فريق العمل.</small>
              </div>
              <button type="button" className="close-btn" onClick={() => setShowFilesGallery(false)}><CloseIcon sx={{ fontSize: 18 }} /></button>
            </div>

            <div className="gallery-tabs-row">
              <button type="button" className="active">الكل (8)</button>
              <button type="button">التصاميم والصور (PNG/JPG)</button>
              <button type="button">المستندات والعقود (PDF)</button>
              <button type="button">روابط Figma الخارجية</button>
            </div>

            <div className="gallery-grid">
              <div className="gallery-card-item">
                <div className="card-top">
                  <PictureAsPdfOutlinedIcon sx={{ fontSize: 32, color: '#E74C3C' }} />
                  <div>
                    <strong>عقد تطوير متجر سلة الخير.pdf</strong>
                    <small>1.2 MB • 6 صفحات</small>
                  </div>
                </div>
                <div className="card-actions">
                  <button type="button">تحميل</button>
                  <button type="button">عرض</button>
                </div>
              </div>

              <div className="gallery-card-item">
                <div className="card-top">
                  <img src={basketVegetablesImg} alt="معاينة" style={{ width: 44, height: 44, objectFit: "cover", borderRadius: 8 }} />
                  <div>
                    <strong>معاينة واجهة المتجر الرئيسية.png</strong>
                    <small>2.4 MB • تصميم واجهة</small>
                  </div>
                </div>
                <div className="card-actions">
                  <button type="button" onClick={() => { setShowImageLightbox(true); setShowFilesGallery(false); }}>عرض</button>
                  <button type="button" onClick={() => alert('جاري تحميل الملف...')}>تحميل</button>
                </div>
              </div>

              <div className="gallery-card-item">
                <div className="card-top">
                  <LinkIcon sx={{ fontSize: 32, color: '#14A800' }} />
                  <div>
                    <strong>واجهات متجر سلة الخير - Figma</strong>
                    <small>figma.com • رابط خارجي</small>
                  </div>
                </div>
                <div className="card-actions">
                  <button type="button" onClick={() => window.open(figmaLink, '_blank')}>فتح في Figma</button>
                </div>
              </div>
            </div>

            <div className="modal-footer-actions">
              <button type="button" className="btn-cancel" onClick={() => setShowFilesGallery(false)}>إغلاق</button>
            </div>
          </div>
        </div>
      )}

      {/* مودال واجهة مكالمة الفيديو / الصوت المباشرة */}
      {showCallModal && (
        <div className="modal-overlay call-overlay">
          <div className="call-modal-card">
            <div className="call-header">
              <span className="live-badge">مكالمة مباشرة جارية</span>
              <button type="button" className="close-btn" onClick={() => setShowCallModal(false)}><CloseIcon sx={{ fontSize: 18, color: '#fff' }} /></button>
            </div>

            <div className="call-video-viewport">
              <div className="remote-user-avatar">
                <span>أ س</span>
                <h4>م. أحمد السالم</h4>
                <small>قائد المشروع - متجر سلة الخير</small>
              </div>
              <div className="local-user-pip">أنت</div>
            </div>

            <div className="call-controls-bar">
              <button type="button" className="call-tool-btn" title="كتم الصوت"><MicOffIcon sx={{ fontSize: 20 }} /></button>
              <button type="button" className="call-tool-btn" title="إيقاف الكاميرا"><VideocamOffIcon sx={{ fontSize: 20 }} /></button>
              <button type="button" className="call-tool-btn" title="مستوى الصوت"><VolumeUpIcon sx={{ fontSize: 20 }} /></button>
              <button type="button" className="call-end-btn" title="إنهاء المكالمة" onClick={() => setShowCallModal(false)}>
                <CallEndIcon sx={{ fontSize: 22 }} />
              </button>
            </div>
          </div>
        </div>
      )}

    
      {/* مودال استعراض ومعاينة تصميم واجهة المتجر بالحجم الكامل (Lightbox) المطابق للصورة */}
      {showImageLightbox && (
        <div className="lightbox-overlay" dir="rtl">
          {/* الشريط العلوي الداكن العائم */}
          <div className="lightbox-top-bar">
            {/* معلومات الملف على اليمين */}
            <div className="lightbox-file-meta">
              <div className="lightbox-file-icon">
                <ImageIcon sx={{ fontSize: 20, color: '#94A3B8' }} />
              </div>
              <div className="lightbox-file-texts">
                <strong>واجهة_المتجر_الرئيسية_v2.png</strong>
                <small>أحمد السالم (قائد الفريق)</small>
              </div>
            </div>

            {/* أدوات التكبير / التصغير في المنتصف */}
            <div className="lightbox-zoom-controls">
              <button 
                type="button" 
                className="zoom-btn"
                onClick={() => setLightboxZoom(prev => Math.max(50, prev - 10))}
                title="تصغير"
              >
                −
              </button>
              <span className="zoom-value">{lightboxZoom}%</span>
              <button 
                type="button" 
                className="zoom-btn"
                onClick={() => setLightboxZoom(prev => Math.min(200, prev + 10))}
                title="تكبير"
              >
                +
              </button>
              <button 
                type="button" 
                className="zoom-reset-btn"
                onClick={() => setLightboxZoom(100)}
              >
                Reset
              </button>
            </div>

            {/* زر التحميل والإغلاق على اليسار */}
            <div className="lightbox-actions-left">
              <button 
                type="button" 
                className="btn-lightbox-download"
                onClick={() => alert('جاري تحميل واجهة_المتجر_الرئيسية_v2.png...')}
              >
                <DownloadIcon sx={{ fontSize: 16 }} /> تحميل الملف
              </button>
              <button 
                type="button" 
                className="lightbox-close-btn"
                onClick={() => { setShowImageLightbox(false); setLightboxZoom(100); }}
                title="إغلاق"
              >
                <CloseIcon sx={{ fontSize: 20 }} />
              </button>
            </div>
          </div>

          {/* مساحة العرض الرئيسية في الوسط مع دعم التكبير والتمرير */}
          <div className="lightbox-viewport">
            <div 
              className="lightbox-card-container"
              style={{ transform: `scale(${lightboxZoom / 100})`, transformOrigin: 'center center', transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)' }}
            >
              {/* واجهة متجر سلة الخير المطابقة لتصميم الصورة تماماً */}
              <div className="store-mockup-wrapper">
                {/* الشريط الإعلاني الأخضر الداكن */}
                <div className="store-mockup-announcement">
                  من خير أرضنا.. إلى باب بيتك — توصيل مجاني للطلبات فوق 200 ر.س
                </div>

                {/* هيدر المتجر */}
                <div className="store-mockup-navbar">
                  <div className="store-brand">
                    <span className="store-brand-icon">🌱</span>
                    <div>
                      <strong>سلة الخير</strong>
                      <small>خيرات بلدنا.. إلى بيتك</small>
                    </div>
                  </div>

                  <div className="store-nav-links">
                    <span className="active">الرئيسية</span>
                    <span>جميع المنتجات</span>
                    <span>عروض الخير</span>
                    <span>قصتنا</span>
                  </div>

                  <div className="store-nav-actions">
                    <SearchIcon sx={{ fontSize: 18, color: '#334155', cursor: 'pointer' }} />
                    <PersonOutlineOutlinedIcon sx={{ fontSize: 18, color: '#334155', cursor: 'pointer' }} />
                    <span className="store-cart-badge">🛒</span>
                  </div>
                </div>

                {/* البانر الرئيسي (Hero Section) */}
                <div className="store-mockup-hero">
                  <div className="hero-text-side">
                    <span className="hero-green-tag">طازج من الحصاد بكل حب</span>
                    <h2>خير الطبيعة،<br />أقرب مما تتخيّل.</h2>
                    <p>منتجات محلية مختارة بعناية، بجودة تثق بها وفائدة تجمع كل من تحب.</p>
                    <button type="button" className="btn-store-explore">تصفح خيراتنا ←</button>
                  </div>

                  <div className="hero-image-side">
                    <div className="basket-image-placeholder">
                      <img src={basketVegetablesImg} alt="سلة خضار وفواكه طازجة" className="basket-hero-img" />
                    </div>
                  </div>
                </div>

                {/* قسم الأكثر حباً على مائدتكم */}
                <div className="store-mockup-products-section">
                  <div className="section-head-row">
                    <h3>الأكثر حباً على مائدتكم</h3>
                    <a href="#all" onClick={(e) => e.preventDefault()}>عرض جميع المنتجات ←</a>
                  </div>

                  <div className="store-products-grid">
                    <div className="product-card-mockup">
                      <div className="product-img-box">🌴 🍯</div>
                      <div className="product-info-box">
                        <strong>تمور سكري فاخرة</strong>
                        <small>حصاد الموسم • 1 كجم</small>
                        <div className="product-price-row">
                          <span className="price">35 ر.س</span>
                          <button type="button" className="add-cart-mini">+</button>
                        </div>
                      </div>
                    </div>

                    <div className="product-card-mockup">
                      <div className="product-img-box">🫒 🏺</div>
                      <div className="product-info-box">
                        <strong>زيت زيتون بكر</strong>
                        <small>عصرة أولى • 500 مل</small>
                        <div className="product-price-row">
                          <span className="price">55 ر.س</span>
                          <button type="button" className="add-cart-mini">+</button>
                        </div>
                      </div>
                    </div>

                    <div className="product-card-mockup">
                      <div className="product-img-box">🍯 🐝</div>
                      <div className="product-info-box">
                        <strong>عسل سدر طبيعي</strong>
                        <small>من خيرات مزارعنا المحلية</small>
                        <div className="product-price-row">
                          <span className="price">89 ر.س</span>
                          <button type="button" className="add-cart-mini">+</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* الشريط السفلي العائم مع معلومات الملف وأزرار التنقل */}
          <div className="lightbox-bottom-bar">
            <div className="lightbox-dimensions-text">
              PNG • 2400 × 1800 px • 2.4 MB
            </div>

            <div className="lightbox-pagination-pill">
              <button 
                type="button" 
                className="page-nav-btn"
                onClick={() => setCurrentImageIndex(prev => prev > 1 ? prev - 1 : 6)}
              >
                السابق ❯
              </button>
              <div className="page-counter-texts">
                <strong>{currentImageIndex} من 6</strong>
                <small>صور المشروع</small>
              </div>
              <button 
                type="button" 
                className="page-nav-btn"
                onClick={() => setCurrentImageIndex(prev => prev < 6 ? prev + 1 : 1)}
              >
                ❮ التالي
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
