import React, { useState, useEffect } from 'react';
import SmartConsultation from '../pages/SmartConsultation';
import SmartConversation from '../pages/SmartConversation';
import Overview from '../pages/Overview';
import ProjectsList from '../pages/ProjectsList';
import ProjectDetails from '../pages/ProjectDetails';
import ReviewDeliverables from '../pages/ReviewDeliverables';
import FinalDelivery from '../pages/​FinalDelivery';
import WalletPage from '../pages/WalletPage'; // <-- استيراد صفحة المحفظة المالية بنجاح
import Settings from '../pages/Settings';
import Profile from '../pages/Profile';
import Messages from '../pages/Messages';

import logoimage from '../images/Aaa.png';
import './ClientLayout.css';

// MUI Icons
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import FolderRoundedIcon from '@mui/icons-material/FolderRounded';
import SmartToyRoundedIcon from '@mui/icons-material/SmartToyRounded';
import AccountBalanceWalletRoundedIcon from '@mui/icons-material/AccountBalanceWalletRounded';
import ChatBubbleOutlineRoundedIcon from '@mui/icons-material/ChatBubbleOutlineRounded';
import PersonOutlineRoundedIcon from '@mui/icons-material/PersonOutlineRounded';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import HeadsetMicRoundedIcon from '@mui/icons-material/HeadsetMicRounded';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';

export default function ClientLayout({
  initialTab = 'dashboard',
  subView = 'consultation',
  onLogout,
  onNavigate
}) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [consultationSubView, setConsultationSubView] = useState(subView || 'consultation');
  const [consultationData, setConsultationData] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [walletModal, setWalletModal] = useState(initialTab === 'wallet-escrow' ? 'escrow' : null);

  useEffect(() => {
    if (initialTab === 'wallet-escrow') {
      setActiveTab('wallet');
      setWalletModal('escrow');
    } else if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  useEffect(() => {
    if (subView) setConsultationSubView(subView);
  }, [subView]);

  const handleNavigation = (target, data = null) => {
    if (target === 'smartConversation') {
      setActiveTab('ai');
      setConsultationSubView('conversation');
      if (data) setConsultationData(data);
    } else if (target === 'ai' || target === 'smartConsultation' || target === 'new-project') {
      setActiveTab('ai');
      setConsultationSubView('consultation');
      if (data) setConsultationData(data);
    } else if (
      target === 'project-details' ||
      target === 'projectDetails' ||
      target === 'ProjectDetails'
    ) {
      setActiveTab('project-details');
      if (data) setSelectedProject(data);
    } else if (target === 'review-deliverables') {
      setActiveTab('review-deliverables');
      if (data) setSelectedProject(data);
    } else if (target === 'final-delivery') {
      setActiveTab('final-delivery');
      if (data) setSelectedProject(data);
    } else if (target === 'wallet' || target === 'wallet-escrow') {
      setActiveTab('wallet');
      if (target === 'wallet-escrow') {
        setWalletModal('escrow');
      } else if (data) {
        setWalletModal(typeof data === 'string' ? data : data.modal || null);
      } else {
        setWalletModal(null);
      }
    } else if (target === 'home' || target === 'logout') {
      if (onLogout) onLogout();
      else if (onNavigate) onNavigate('home');
      return;
    } else {
      setActiveTab(target);
    }

    if (onNavigate) {
      onNavigate(target);
    }
  };

  return (
    <div className="client-layout" dir="rtl">
      {/* القائمة الجانبية الثابتة على اليمين */}
      <aside className="client-sidebar-right">
        <div
          className="dash-brand-box"
          onClick={() => handleNavigation('home')}
          style={{ cursor: 'pointer' }}
          title="العودة للرئيسية"
        >
          <img src={logoimage} alt="ACCESS Logo" className="sidebar-logo-image" />
          <span className="dash-role-subtitle">مساحة العميل</span>

        </div>

        <nav className="dash-menu-list">
          <button
            className={activeTab === 'dashboard' ? 'active' : ''}
            onClick={() => handleNavigation('dashboard')}
          >
            <span className="menu-icon"><DashboardRoundedIcon fontSize="small" /></span> لوحة التحكم
          </button>

          <button
            className={(activeTab === 'projects' || activeTab === 'project-details' || activeTab === 'review-deliverables' || activeTab === 'final-delivery') ? 'active' : ''}
            onClick={() => handleNavigation('projects')}
          >
            <span className="menu-icon"><FolderRoundedIcon fontSize="small" /></span> مشاريعي <span className="badge-num">3</span>
          </button>

          <button
            className={activeTab === 'ai' ? 'active' : ''}
            onClick={() => handleNavigation('ai')}
          >
            <span className="menu-icon"><SmartToyRoundedIcon fontSize="small" /></span> الاستشارة
          </button>

          <button
            className={activeTab === 'wallet' ? 'active' : ''}
            onClick={() => handleNavigation('wallet')}
          >
            <span className="menu-icon"><AccountBalanceWalletRoundedIcon fontSize="small" /></span> المحفظة المالية
          </button>

          <button
            className={activeTab === 'messages' ? 'active' : ''}
            onClick={() => handleNavigation('messages')}
          >
            <span className="menu-icon"><ChatBubbleOutlineRoundedIcon fontSize="small" /></span> الرسائل <span className="badge-num">2</span>
          </button>

          <button
            className={activeTab === 'profile' ? 'active' : ''}
            onClick={() => handleNavigation('profile')}
          >
            <span className="menu-icon"><PersonOutlineRoundedIcon fontSize="small" /></span> الملف الشخصي
          </button>

          <button
            className={activeTab === 'settings' ? 'active' : ''}
            onClick={() => handleNavigation('settings')}
          >
            <span className="menu-icon"><SettingsOutlinedIcon fontSize="small" /></span> الإعدادات
          </button>
        </nav>

        <div className="dash-support-card">
          <div className="sup-icon"><HeadsetMicRoundedIcon sx={{ fontSize: 26, color: "#14A800" }} /></div>
          <strong>نحن هنا لمساعدتك</strong>
          <p>فريق الدعم معك في كل خطوة.</p>
          <button className="btn-outline-green" onClick={() => handleNavigation('messages')}>تواصل معنا</button>
        </div>

        <div className="dash-user-bottom-box">
          <div
            className="user-info-row"
            onClick={() => handleNavigation('profile')}
            style={{ cursor: 'pointer' }}
            title="الملف الشخصي"
          >
          </div>
          <button
            className="btn-logout"
            onClick={() => handleNavigation('logout')}
            title="تسجيل الخروج"
          >
            <LogoutRoundedIcon fontSize="small" />
            <span>تسجيل الخروج</span>
          </button>
        </div>
      </aside>

      {/* المحتوى الرئيسي على اليسار وبجوار السايدبار تماماً */}
      <main className="client-main-content">
        {activeTab === 'dashboard' && <Overview onNavigate={handleNavigation} />}
        {activeTab === 'projects' && <ProjectsList onNavigate={handleNavigation} />}
        {(activeTab === 'project-details' || activeTab === 'projectDetails') && <ProjectDetails onNavigate={handleNavigation} projectData={selectedProject} />}
        {activeTab === 'review-deliverables' && <ReviewDeliverables onNavigate={handleNavigation} projectData={selectedProject} />}
        {activeTab === 'final-delivery' && <FinalDelivery onNavigate={handleNavigation} projectData={selectedProject} />}
        {activeTab === 'wallet' && <WalletPage onNavigate={handleNavigation} initialModal={walletModal} />} {/* <-- عرض صفحة المحفظة المالية هنا بنجاح */}
        {activeTab === 'settings' && <Settings onNavigate={handleNavigation} />}
        {activeTab === 'profile' && <Profile onNavigate={handleNavigation} />}
        {activeTab === 'messages' && <Messages onNavigate={handleNavigation} userName="عبدالله العتيبي" userRole="حساب عميل" />}
        {activeTab === 'ai' && (
          consultationSubView === 'conversation' ? (
            <SmartConversation
              onNavigate={handleNavigation}
              onNewProject={() => handleNavigation('projects')}
              initialData={consultationData}
              initialIdea={consultationData?.idea}
              initialMessage={consultationData?.message}
            />
          ) : (
            <SmartConsultation
              onNavigate={handleNavigation}
            />
          )
        )}
      </main>
    </div>
  );
}
