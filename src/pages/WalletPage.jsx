import React, { useState, useEffect } from 'react';
import TopHeader from '../components/TopHeader';
import './WalletPage.css';

// استيراد كافة أيقونات MUI المطلوبة لتطابق Figma 100%
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import AddIcon from '@mui/icons-material/Add';
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import CloseIcon from '@mui/icons-material/Close';
import QrCode2Icon from '@mui/icons-material/QrCode2';
import PrintOutlinedIcon from '@mui/icons-material/PrintOutlined';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import AutoRenewIcon from '@mui/icons-material/Autorenew';
import GavelIcon from '@mui/icons-material/Gavel';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';

export default function WalletPage({ onNavigate, initialModal = null }) {
  // حالة المودالات النشطة
  const [activeModal, setActiveModal] = useState(initialModal);

  useEffect(() => {
    if (initialModal) {
      setActiveModal(initialModal);
    }
  }, [initialModal]); 

  // بيانات الإيداع وطرق الدفع
  const [depositAmount, setDepositAmount] = useState('5,000');
  const [paymentMethod, setPaymentMethod] = useState('card'); // 'card' أو 'wire'

  // حقول نموذج بطاقة الدفع
  const [cardNumber, setCardNumber] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardErrors, setCardErrors] = useState({});

  // بيانات استرداد الرصيد وحساب البنك
  const [withdrawAmount, setWithdrawAmount] = useState('12,500');
  const [bankName, setBankName] = useState('الراجحي');
  const [accountName, setAccountName] = useState('أحمد محمد العتيبي');
  const [iban, setIban] = useState('SA03 8000 0200 6080 1016 7519');

  // بيانات النزاع المالي
  const [disputeProject, setDisputeProject] = useState('متجر سلة الخير');
  const [disputeStage, setDisputeStage] = useState('تطوير واجهات المتجر وبرمجة السلة');
  const [disputeDetails, setDisputeDetails] = useState('');

  // المعاملة المختارة للمعاينة
  const [selectedTxn, setSelectedTxn] = useState({
    id: 'TXN-90821',
    date: '15 أكتوبر 2026 - 10:45 ص',
    type: 'إيداع رصيد بنكي',
    amount: '+ 10,000 ر.س',
    status: 'ناجحة',
    gateway: 'مدى / البطاقة الائتمانية',
    refNo: 'REF-884920193'
  });

  return (
    <div className="wallet-page-container" dir="rtl">
      
      {/* 1. التوب هيدر العلوي */}
      <TopHeader 
        userName="عبدالله العتيبي" 
        userRole="حساب عميل" 
        onNewProject={() => onNavigate && onNavigate('new-project')} 
      />

      {/* المحتوى الرئيسي للمحفظة */}
      <main className="wallet-main-content" style={{ padding: '30px 40px', width: '100%', boxSizing: 'border-box' }}>
        
        <div className="wallet-header-row">
          <div>
            <h1>المحفظة المالية والمدفوعات</h1>
            <p>أدر أموالك بأمان، وتابع كافة مسارات المعاملات والمشاريع في مكان واحد.</p>
          </div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <button className="btn-deposit-action" onClick={() => setActiveModal('payment-methods')} style={{ background: '#181818', fontSize: '12px' }}>
              <CreditCardOutlinedIcon sx={{ fontSize: 16 }} /> إدارة البطاقات
            </button>
            <button className="btn-deposit-action" onClick={() => setActiveModal('export-report')} style={{ background: '#344054', fontSize: '12px' }}>
              <DownloadOutlinedIcon sx={{ fontSize: 16 }} /> تصدير التقرير
            </button>
            <span className="secure-badge" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <ShieldOutlinedIcon sx={{ fontSize: 14 }} /> محفظتك بأمان
            </span>
          </div>
        </div>

        {/* بطاقات الإحصائيات العلوية */}
        <div className="wallet-stats-grid">
          <div className="w-stat-card">
            <div className="stat-top">
              <AccountBalanceWalletOutlinedIcon sx={{ color: '#14A800', fontSize: 26 }} />
              <SettingsOutlinedIcon className="info-icon" onClick={() => setActiveModal('wallet-settings')} style={{ cursor: 'pointer', color: '#98A2B3' }} title="إعدادات المحفظة" />
            </div>
            <span className="stat-lbl">الرصيد المتاح</span>
            <div className="stat-val">12,500 <small>ر.س</small></div>
            <span className="stat-sub">دعم المشروع الحالي</span>
            <div style={{ display: 'flex', gap: '8px', marginTop: 'auto' }}>
              <button className="btn-deposit-action" style={{ flex: 2 }} onClick={() => setActiveModal('deposit')}>
                <AddIcon sx={{ fontSize: 16 }} /> إيداع رصيد
              </button>
              <button className="btn-withdraw-action" style={{ flex: 1 }} onClick={() => setActiveModal('withdraw')}>
                استرداد
              </button>
            </div>
          </div>

          <div className="w-stat-card">
            <div className="stat-top">
              <LockOutlinedIcon sx={{ color: '#D97706', fontSize: 26 }} />
              <LockOutlinedIcon className="info-icon" onClick={() => setActiveModal('escrow-release')} style={{ cursor: 'pointer', color: '#98A2B3' }} title="تحرير دفعة" />
            </div>
            <span className="stat-lbl">أموال قيد الضمان - Escrow</span>
            <div className="stat-val">29,000 <small>ر.س</small></div>
            <span className="stat-sub" style={{ color: '#D97706' }}>محجوزة للمراحل المستحقة النشطة</span>
            <div style={{ display: 'flex', gap: '6px', marginTop: 'auto' }}>
              <button className="btn-escrow-action" style={{ flex: 1 }} onClick={() => setActiveModal('escrow')}>
                تأكيد حجز ضمان ←
              </button>
              <button className="btn-invoice-link" style={{ flex: 1 }} onClick={() => setActiveModal('escrow-release')}>
                تحرير دفعة
              </button>
            </div>
          </div>

          <div className="w-stat-card">
            <div className="stat-top">
              <ReceiptLongOutlinedIcon sx={{ color: '#667085', fontSize: 26 }} />
              <FlagOutlinedIcon className="info-icon" onClick={() => setActiveModal('dispute-status')} style={{ cursor: 'pointer', color: '#98A2B3' }} title="حالة النزاعات" />
            </div>
            <span className="stat-lbl">إجمالي المصروفات والنزاعات</span>
            <div className="stat-val">41,500 <small>ر.س</small></div>
            <span className="stat-sub">إجمالي ما صرف على مشاريعك</span>
            <div style={{ display: 'flex', gap: '6px', marginTop: 'auto' }}>
              <button className="btn-dispute-trigger" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }} onClick={() => setActiveModal('dispute')}>
                <FlagOutlinedIcon sx={{ fontSize: 16 }} /> فتح نزاع مالي
              </button>
              <button className="btn-invoice-link" style={{ flex: 1 }} onClick={() => setActiveModal('dispute-status')}>
                متابعة النزاعات
              </button>
            </div>
          </div>
        </div>

        {/* دفعات المراحل قيد الضمان */}
        <div className="wallet-section-box">
          <div className="sec-title-flex">
            <div>
              <h2>دفعات المراحل قيد الضمان</h2>
              <p>تبقى أموالك محجوزة في الضمان حتى تسليم المشروعات وفق شروط كل مرحلة.</p>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button className="btn-invoice-link" onClick={() => setActiveModal('refund')}>طلب استرداد مرحلة ملغاة</button>
              <button className="btn-invoice-link" onClick={() => setActiveModal('nda-modal')}>اتفاقية السرية (NDA)</button>
              <span className="stages-count-badge">3 مراحل نشطة</span>
            </div>
          </div>

          <div className="table-responsive">
            <table className="wallet-table">
              <thead>
                <tr>
                  <th>المشروع</th>
                  <th>اسم المرحلة</th>
                  <th>المبلغ المحجوز</th>
                  <th>شروط تحرير الدفعة</th>
                  <th>الحالة</th>
                </tr>
              </thead>
              <tbody>
                <tr onClick={() => setActiveModal('escrow')} style={{ cursor: 'pointer' }}>
                  <td><strong>متجر سلة الخير</strong></td>
                  <td>المرحلة 2: تطوير واجهات المتجر وبرمجة السلة</td>
                  <td><strong>8,000 ر.س</strong></td>
                  <td>عند اعتماد التسليم النهائي</td>
                  <td><span className="status-pill status-active">قيد التنفيذ</span></td>
                </tr>
                <tr onClick={() => setActiveModal('escrow')} style={{ cursor: 'pointer' }}>
                  <td><strong>هوية نواة</strong></td>
                  <td>تسليم الهوية البصرية</td>
                  <td><strong>8,000 ر.س</strong></td>
                  <td>عند اعتماد التسليم النهائي</td>
                  <td><span className="status-pill status-warning">بانتظار المراجعة</span></td>
                </tr>
                <tr onClick={() => setActiveModal('escrow')} style={{ cursor: 'pointer' }}>
                  <td><strong>تطبيق موعد</strong></td>
                  <td>تصميم واجهات التطبيق</td>
                  <td><strong>6,000 ر.س</strong></td>
                  <td>عند اعتماد التسليم النهائي</td>
                  <td><span className="status-pill status-active">قيد التنفيذ</span></td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="table-footer-summary">
            إجمالي الأموال قيد الضمان: <strong>29,000 ر.س</strong>
          </div>
        </div>

        {/* سجل المعاملات */}
        <div className="wallet-section-box">
          <div className="sec-title-flex">
            <h2>سجل المعاملات والعمليات المالية</h2>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <button className="btn-invoice-link" onClick={() => setActiveModal('auto-recharge')} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <AutoRenewIcon sx={{ fontSize: 14 }} /> الشحن التلقائي
              </button>
              <select className="filter-select">
                <option>كل المعاملات</option>
                <option>إيداع</option>
                <option>حجز ضمان</option>
              </select>
            </div>
          </div>

          <div className="table-responsive">
            <table className="wallet-table">
              <thead>
                <tr>
                  <th>التاريخ والوقت</th>
                  <th>الوصف</th>
                  <th>المبلغ (ر.س)</th>
                  <th>الحالة</th>
                  <th>الإجراءات السريعة</th>
                </tr>
              </thead>
              <tbody>
                <tr className="clickable-row" onClick={() => setActiveModal('txn-details')}>
                  <td>15 أكتوبر 2026 <br/><small style={{ color: '#98A2B3' }}>10:45 ص</small></td>
                  <td><strong>إيداع رصيد بنكي</strong> <br/><small style={{ color: '#667085' }}>تحويل مالي إلى المحفظة</small></td>
                  <td style={{ color: '#14A800', fontWeight: '800' }}>+ 10,000</td>
                  <td><span className="status-pill status-success">ناجحة</span></td>
                  <td>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <button className="btn-invoice-link" onClick={(e) => { e.stopPropagation(); setActiveModal('invoice'); }}>
                        <DownloadOutlinedIcon sx={{ fontSize: 13 }} /> فاتورة
                      </button>
                    </div>
                  </td>
                </tr>
                <tr className="clickable-row" onClick={() => setActiveModal('declined-error')}>
                  <td>14 أكتوبر 2026 <br/><small style={{ color: '#98A2B3' }}>02:15 م</small></td>
                  <td><strong>حجز دفعة مشروع هوية نواة</strong> <br/><small style={{ color: '#667085' }}>محاولة خصم من البطاقة</small></td>
                  <td style={{ color: '#D92D20', fontWeight: '800' }}>- 8,000</td>
                  <td><span className="status-pill status-danger">مرفوضة</span></td>
                  <td>
                    <button className="btn-invoice-link" style={{ color: '#D92D20', borderColor: '#FCA5A5' }} onClick={(e) => { e.stopPropagation(); setActiveModal('declined-error'); }}>
                      تفاصيل الخطأ
                    </button>
                  </td>
                </tr>
                <tr className="clickable-row" onClick={() => setActiveModal('wire-receipt')}>
                  <td>12 أكتوبر 2026 <br/><small style={{ color: '#98A2B3' }}>19:20 م</small></td>
                  <td><strong>إيداع عبر تحويل بنكي</strong> <br/><small style={{ color: '#667085' }}>إيصال تحويل بانتظار التدقيق</small></td>
                  <td style={{ fontWeight: '800' }}>+ 5,000</td>
                  <td><span className="status-pill status-warning">قيد التدقيق</span></td>
                  <td>
                    <button className="btn-invoice-link" onClick={(e) => { e.stopPropagation(); setActiveModal('wire-receipt'); }}>
                      معاينة الإيصال
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </main>

      {/* ====================================================
         مودالات النظام الشاملة بأيقونات MUI المطابقة لـ Figma
         ==================================================== */}

      {/* 1. مودال إيداع رصيد */}
      {activeModal === 'deposit' && (
        <div className="modal-overlay-custom">
          <div className="modal-card-custom" style={{ width: '520px', textAlign: 'right' }}>
            <div className="modal-top-row">
              <span style={{ fontSize: '17px', fontWeight: '900' }}>إيداع رصيد في المحفظة المالية</span>
              <button className="close-btn" onClick={() => setActiveModal(null)}><CloseIcon sx={{ fontSize: 18 }} /></button>
            </div>
            <p style={{ fontSize: '11px', color: '#667085', marginBottom: '14px' }}>شحن رصيدك لتمويل مشاريعك بأمان.</p>

            <div style={{ marginBottom: '14px' }}>
              <label style={{ fontSize: '11.5px', fontWeight: '800', display: 'block', marginBottom: '4px' }}>مبلغ الإيداع</label>
              <input type="text" value={depositAmount} onChange={(e) => setDepositAmount(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #CBD5E1', boxSizing: 'border-box', fontWeight: 'bold' }} />
              <div style={{ display: 'flex', gap: '6px', marginTop: '6px' }}>
                {['20,000 ر.س', '10,000 ر.س', '5,000 ر.س', '1,000 ر.س'].map((amt, idx) => (
                  <button key={idx} type="button" onClick={() => setDepositAmount(amt.replace(' ر.س', ''))} style={{ flex: 1, padding: '6px', background: '#F8FAFC', border: '1px solid #CBD5E1', borderRadius: '6px', fontSize: '11px', cursor: 'pointer', fontWeight: 'bold' }}>{amt}</button>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: '14px' }}>
              <label style={{ fontSize: '11.5px', fontWeight: '800', display: 'block', marginBottom: '6px' }}>طريقة الدفع</label>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button 
                  type="button" 
                  onClick={() => setPaymentMethod('card')}
                  style={{ flex: 1, padding: '10px', border: paymentMethod === 'card' ? '2px solid #14A800' : '1px solid #CBD5E1', borderRadius: '8px', background: paymentMethod === 'card' ? '#F0FDF4' : '#fff', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
                >
                  <CreditCardOutlinedIcon sx={{ fontSize: 16 }} /> بطاقة ائتمانية / مدى / Apple Pay
                </button>
                <button 
                  type="button" 
                  onClick={() => setPaymentMethod('wire')}
                  style={{ flex: 1, padding: '10px', border: paymentMethod === 'wire' ? '2px solid #14A800' : '1px solid #CBD5E1', borderRadius: '8px', background: paymentMethod === 'wire' ? '#F0FDF4' : '#fff', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
                >
                  <AccountBalanceIcon sx={{ fontSize: 16 }} /> تحويل بنكي مباشر
                </button>
              </div>
            </div>

            {paymentMethod === 'card' ? (
              <div style={{ background: '#F8FAFC', padding: '12px', borderRadius: '8px', border: '1px solid #E2E8F0', marginBottom: '14px' }}>
                <div style={{ display: 'flex', gap: '10px', marginBottom: '8px', alignItems: 'center', fontSize: '11px', fontWeight: 'bold', color: '#667085' }}>
                  <span>Apple Pay</span> • <span>mada</span> • <span>VISA</span> • <span>Mastercard</span>
                </div>
                <label style={{ fontSize: '11px', fontWeight: '700', display: 'block', marginBottom: '4px' }}>رقم البطاقة</label>
                <input type="text" placeholder="0000 0000 0000 0000" style={{ width: '100%', padding: '8px', marginBottom: '8px', borderRadius: '6px', border: '1px solid #CBD5E1', boxSizing: 'border-box' }} />
                <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                  <div style={{ flex: 1 }}>
                    <label style={{ fontSize: '10.5px', fontWeight: '700', display: 'block', marginBottom: '2px' }}>رمز التحقق (CVV)</label>
                    <input type="password" placeholder="CVV" style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #CBD5E1', boxSizing: 'border-box', textAlign: 'center' }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={{ fontSize: '10.5px', fontWeight: '700', display: 'block', marginBottom: '2px' }}>تاريخ الانتهاء</label>
                    <input type="text" placeholder="MM/YY" style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #CBD5E1', boxSizing: 'border-box', textAlign: 'center' }} />
                  </div>
                </div>
                <label style={{ fontSize: '11px', fontWeight: '700', display: 'block', marginBottom: '4px' }}>الاسم على البطاقة</label>
                <input type="text" placeholder="الاسم كما يظهر على البطاقة" style={{ width: '100%', padding: '8px', marginBottom: '8px', borderRadius: '6px', border: '1px solid #CBD5E1', boxSizing: 'border-box' }} />
                <label style={{ display: 'block', fontSize: '11px', cursor: 'pointer' }}>
                  <input type="checkbox" defaultChecked /> حفظ البطاقة للاستخدام المستقبلي
                </label>
              </div>
            ) : (
              <div style={{ background: '#F8FAFC', padding: '12px', borderRadius: '8px', border: '1px solid #E2E8F0', marginBottom: '14px', fontSize: '12px' }}>
                <div style={{ fontWeight: 'bold', marginBottom: '6px' }}>بيانات الحساب البنكي للتحويل:</div>
                <div style={{ color: '#667085', marginBottom: '4px' }}>بنك الراجحي | شركة ACCESS للحلول البرمجية</div>
                <div style={{ fontFamily: 'monospace', background: '#E2E8F0', padding: '6px', borderRadius: '4px', fontWeight: 'bold' }}>SA44 2000 0001 2345 6789 0000</div>
              </div>
            )}

            <div style={{ background: '#F8FAFC', padding: '10px', borderRadius: '8px', textAlign: 'right', marginBottom: '16px', fontSize: '11.5px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}><span>المبلغ المراد إيداعه:</span><strong>{depositAmount || '0'} ر.س</strong></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}><span>رسوم المعاملات:</span><strong>0 ر.س</strong></div>
              <hr style={{ border: '0', borderTop: '1px solid #E2E8F0', margin: '6px 0' }}/>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', color: '#14A800' }}><span>الإجمالي المضاف للمحفظة:</span><span>{depositAmount || '0'} ر.س</span></div>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button type="button" onClick={() => setActiveModal(null)} style={{ flex: 1, background: '#fff', border: '1px solid #CBD5E1', padding: '12px', borderRadius: '10px', fontWeight: '700', cursor: 'pointer', color: '#344054' }}>
                إلغاء
              </button>
              <button 
                type="button" 
                onClick={() => {
                  alert(`تم إيداع مبلغ ${depositAmount || '5,000'} ر.س بنجاح في محفظتك!`);
                  setActiveModal(null);
                }} 
                style={{ flex: 2, background: '#14A800', color: '#fff', border: 'none', padding: '12px', borderRadius: '10px', fontWeight: '800', cursor: 'pointer' }}
              >
                تأكيد الإيداع وإتمام العملية ←
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. مودال استرداد الرصيد المتاح */}
      {activeModal === 'withdraw' && (
        <div className="modal-overlay-custom">
          <div className="modal-card-custom" style={{ width: '500px' }}>
            <div className="modal-top-row">
              <span style={{ fontSize: '17px', fontWeight: '900', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <AccountBalanceWalletOutlinedIcon sx={{ color: '#14A800', fontSize: 20 }} /> استرداد الرصيد المتاح إلى حسابك البنكي
              </span>
              <button className="close-btn" onClick={() => setActiveModal(null)}><CloseIcon sx={{ fontSize: 18 }} /></button>
            </div>
            <p style={{ fontSize: '11px', color: '#667085', textAlign: 'right', marginBottom: '12px' }}>أدخل بيانات حسابك البنكي لتحويل رصيدك بأمان.</p>
            
            <div style={{ background: '#F0FDF4', padding: '12px', borderRadius: '8px', border: '1px solid #DCFCE7', textAlign: 'right', margin: '10px 0', fontSize: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: '#166534', fontWeight: 'bold' }}>الرصيد القابل للاسترداد:</span>
              <strong style={{ color: '#14A800', fontSize: '15px' }}>12,500 ر.س</strong>
            </div>

            <div style={{ textAlign: 'right', marginBottom: '12px' }}>
              <label style={{ fontSize: '11.5px', fontWeight: '800', display: 'block', marginBottom: '4px' }}>المبلغ المراد استرداده</label>
              <input type="text" value={withdrawAmount} onChange={(e) => setWithdrawAmount(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #CBD5E1', boxSizing: 'border-box', fontWeight: 'bold' }} />
              <span style={{ fontSize: '10.5px', color: '#667085', display: 'block', marginTop: '2px' }}>الحد الأقصى: 12,500 ر.س | استرداد كامل الرصيد</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', textAlign: 'right', marginBottom: '12px' }}>
              <div>
                <label style={{ fontSize: '11.5px', fontWeight: '800', display: 'block', marginBottom: '4px' }}>اسم البنك المستلم</label>
                <select value={bankName} onChange={(e) => setBankName(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #CBD5E1', boxSizing: 'border-box', background: '#fff' }}>
                  <option>الراجحي</option>
                  <option>الأهلي السعودي</option>
                  <option>الإنماء</option>
                  <option>الرياض</option>
                </select>
              </div>
              <div>
                <label style={{ fontSize: '11.5px', fontWeight: '800', display: 'block', marginBottom: '4px' }}>اسم صاحب الحساب</label>
                <input type="text" value={accountName} onChange={(e) => setAccountName(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #CBD5E1', boxSizing: 'border-box' }} />
              </div>
            </div>

            <div style={{ textAlign: 'right', marginBottom: '16px' }}>
              <label style={{ fontSize: '11.5px', fontWeight: '800', display: 'block', marginBottom: '4px' }}>رقم الايبان البنكي الدولي (IBAN)</label>
              <input type="text" value={iban} onChange={(e) => setIban(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #CBD5E1', fontFamily: 'monospace', boxSizing: 'border-box' }} />
              <span style={{ fontSize: '10.5px', color: '#667085', display: 'block', marginTop: '2px' }}>التحويل الدولي المباشر من 24 إلى 48 ساعة عمل</span>
            </div>

            <div style={{ background: '#FEFCE8', padding: '10px', borderRadius: '8px', border: '1px solid #FEF08A', textAlign: 'right', marginBottom: '16px', fontSize: '11.5px', color: '#854D0E' }}>
              ⏱ تتم معالجة طلبات الاسترداد البنكي خلال مدة تتراوح بين 24 إلى 48 ساعة عمل.
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button type="button" onClick={() => setActiveModal(null)} style={{ flex: 1, background: '#fff', border: '1px solid #CBD5E1', padding: '12px', borderRadius: '10px', fontWeight: '700', cursor: 'pointer', color: '#344054' }}>
                إلغاء
              </button>
              <button type="button" onClick={() => { alert('تم تقديم طلب الاسترداد بنجاح!'); setActiveModal(null); }} style={{ flex: 2, background: '#14A800', color: '#fff', border: 'none', padding: '12px', borderRadius: '10px', fontWeight: '800', cursor: 'pointer' }}>
                تأكيد طلب الاسترداد
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. مودال تأكيد حجز الضمان */}
      {activeModal === 'escrow' && (
        <div className="modal-overlay-custom">
          <div className="modal-card-custom" style={{ width: '500px' }}>
            <div className="modal-top-row">
              <span style={{ fontSize: '16px', fontWeight: '900', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <LockOutlinedIcon sx={{ color: '#14A800', fontSize: 18 }} /> تأكيد تمويل المرحلة وحجز المبلغ في الضمان
              </span>
              <button className="close-btn" onClick={() => setActiveModal(null)}><CloseIcon sx={{ fontSize: 16 }} /></button>
            </div>
            <p style={{ fontSize: '11px', color: '#667085', textAlign: 'right', marginBottom: '8px' }}>المرحلة الثانية - تطوير واجهات المتجر وبرمجة السلة</p>
            
            <div style={{ background: '#F0FDF4', padding: '12px', borderRadius: '8px', border: '1px solid #DCFCE7', textAlign: 'right', margin: '10px 0', fontSize: '12px' }}>
              <strong style={{ fontSize: '15px', color: '#14A800' }}>8,000 ر.س</strong>
              <div style={{ fontWeight: 'bold', color: '#181818', marginTop: '2px' }}>متجر سلة الخير</div>
              <span style={{ fontSize: '10.5px', color: '#166534', display: 'block', marginTop: '4px' }}>✓ المبلغ يبقى محجوزاً في حساب الضمان (Escrow) ولا يصرف إلا بعد موافقتك على التسليم.</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', textAlign: 'right', marginBottom: '16px' }}>
              <label 
                style={{ padding: '10px', border: paymentMethod === 'card' ? '2px solid #14A800' : '1px solid #CBD5E1', borderRadius: '8px', background: paymentMethod === 'card' ? '#F0FDF4' : '#fff', fontSize: '12px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                onClick={() => setPaymentMethod('card')}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><CreditCardOutlinedIcon sx={{ fontSize: 16 }} /> بطاقة مدى / بطاقة ائتمانية</span>
                <input type="radio" name="pay-method" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} />
              </label>

              <label 
                style={{ padding: '10px', border: paymentMethod === 'apple' ? '2px solid #14A800' : '1px solid #CBD5E1', borderRadius: '8px', background: paymentMethod === 'apple' ? '#F0FDF4' : '#fff', fontSize: '12px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                onClick={() => setPaymentMethod('apple')}
              >
                <span>🍏 Apple Pay</span>
                <input type="radio" name="pay-method" checked={paymentMethod === 'apple'} onChange={() => setPaymentMethod('apple')} />
              </label>

              <label 
                style={{ padding: '10px', border: paymentMethod === 'wallet' ? '2px solid #14A800' : '1px solid #CBD5E1', borderRadius: '8px', background: paymentMethod === 'wallet' ? '#F0FDF4' : '#fff', fontSize: '12px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                onClick={() => setPaymentMethod('wallet')}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><AccountBalanceWalletOutlinedIcon sx={{ fontSize: 16 }} /> الرصيد المتاح في المحفظة (12,500 ر.س)</span>
                <input type="radio" name="pay-method" checked={paymentMethod === 'wallet'} onChange={() => setPaymentMethod('wallet')} />
              </label>
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <button type="button" onClick={() => { setActiveModal(null); if (onNavigate) onNavigate('final-delivery', { screen: 'contract' }); }} style={{ flex: 1, background: '#fff', border: '1px solid #CBD5E1', padding: '10px', borderRadius: '8px', fontWeight: '700', cursor: 'pointer', color: '#344054' }}>
                العودة لمراجعة العقد
              </button>
              <button 
                type="button" 
                onClick={() => {
                  if (paymentMethod === 'card') {
                    setActiveModal('payment-form');
                  } else if (paymentMethod === 'apple') {
                    setActiveModal('apple-pay');
                  } else if (paymentMethod === 'wallet') {
                    setActiveModal('wallet-pay');
                  } else {
                    setActiveModal('success-action');
                  }
                }} 
                style={{ flex: 2, background: '#14A800', color: '#fff', border: 'none', padding: '10px', borderRadius: '8px', fontWeight: '800', cursor: 'pointer' }}
              >
                حجز المبلغ في الضمان وتأكيد البدء
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. مودال بيانات الدفع وإدخال البطاقة */}
      {activeModal === 'payment-form' && (
        <div className="modal-overlay-custom">
          <div className="modal-card-custom" style={{ width: '460px' }}>
            <div className="modal-top-row">
              <span style={{ fontSize: '16px', fontWeight: '900' }}>بيانات الدفع</span>
              <button className="close-btn" onClick={() => setActiveModal('escrow')}><CloseIcon sx={{ fontSize: 16 }} /></button>
            </div>
            
            <div style={{ textAlign: 'right', margin: '14px 0' }}>
              <label style={{ fontSize: '11px', fontWeight: '700', display: 'block', marginBottom: '4px' }}>رقم البطاقة</label>
              <div style={{ position: 'relative', border: '1px solid #CBD5E1', borderRadius: '8px', padding: '8px 12px', background: '#fff', display: 'flex', alignItems: 'center' }}>
                <span style={{ fontSize: '12px', color: '#667085', marginLeft: '10px', display: 'flex', alignItems: 'center', gap: '4px' }}><CreditCardOutlinedIcon sx={{ fontSize: 16 }} /> MADA / VISA</span>
                <input type="text" placeholder="0000 0000 0000 0000" style={{ border: 'none', outline: 'none', width: '100%', fontSize: '13px', textAlign: 'right' }} />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', textAlign: 'right', marginBottom: '14px' }}>
              <div>
                <label style={{ fontSize: '11px', fontWeight: '700', display: 'block', marginBottom: '4px' }}>رمز التحقق (CVV)</label>
                <input type="password" placeholder="CVV" style={{ width: '100%', padding: '9px', borderRadius: '8px', border: '1px solid #CBD5E1', boxSizing: 'border-box', textAlign: 'center' }} />
              </div>
              <div>
                <label style={{ fontSize: '11px', fontWeight: '700', display: 'block', marginBottom: '4px' }}>تاريخ الانتهاء</label>
                <input type="text" placeholder="MM/YY" style={{ width: '100%', padding: '9px', borderRadius: '8px', border: '1px solid #CBD5E1', boxSizing: 'border-box', textAlign: 'center' }} />
              </div>
            </div>

            <div style={{ textAlign: 'right', marginBottom: '16px' }}>
              <label style={{ fontSize: '11px', fontWeight: '700', display: 'block', marginBottom: '4px' }}>الاسم على البطاقة</label>
              <input type="text" placeholder="الاسم كما يظهر على البطاقة" style={{ width: '100%', padding: '9px', borderRadius: '8px', border: '1px solid #CBD5E1', boxSizing: 'border-box' }} />
            </div>

            <div style={{ textAlign: 'center', fontSize: '11px', color: '#667085', marginBottom: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
              <LockOutlinedIcon sx={{ fontSize: 14 }} /> بيانات الدفع مشفرة وآمنة
            </div>

            <button type="button" onClick={() => setActiveModal('success-action')} style={{ width: '100%', background: '#14A800', color: '#fff', border: 'none', padding: '12px', borderRadius: '10px', fontWeight: '800', cursor: 'pointer' }}>
              تأكيد الدفع 8,000 ر.س
            </button>
          </div>
        </div>
      )}

      {/* 4b. مودال Apple Pay */}
      {activeModal === 'apple-pay' && (
        <div className="modal-overlay-custom">
          <div className="modal-card-custom" style={{ width: '400px', textAlign: 'right' }}>
            <div className="modal-top-row">
              <span style={{ fontSize: '16px', fontWeight: '900' }}>← بيانات الدفع</span>
              <button className="close-btn" onClick={() => setActiveModal('escrow')}><CloseIcon sx={{ fontSize: 16 }} /></button>
            </div>

            {/* المبلغ المطلوب */}
            <div style={{ background: '#F9FAFB', border: '1px solid #EAEAEA', borderRadius: '10px', padding: '12px 16px', marginBottom: '20px', textAlign: 'right' }}>
              <span style={{ fontSize: '12px', color: '#667085' }}>المبلغ المطلوب: </span>
              <strong style={{ fontSize: '13px', color: '#181818' }}>4,000 ر.س</strong>
            </div>

            {/* Apple Pay Logo */}
            <div style={{ background: '#000000', borderRadius: '14px', padding: '28px 20px', textAlign: 'center', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                <span style={{ color: '#ffffff', fontSize: '28px', fontWeight: '300', letterSpacing: '1px' }}>Pay</span>
              </div>
            </div>

            {/* Face ID */}
            <div style={{ textAlign: 'center', marginBottom: '8px' }}>
              <div style={{ fontSize: '36px', marginBottom: '8px' }}>
                <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#667085" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block' }}>
                  <path d="M9 3H5a2 2 0 00-2 2v4m6-6h6m-6 0v18m6-18h4a2 2 0 012 2v4M3 9v6m18-6v6M3 15v4a2 2 0 002 2h4m10-6v4a2 2 0 01-2 2h-4"/>
                  <path d="M9 10v.01M15 10v.01M9.5 14.5s.9 1 2.5 1 2.5-1 2.5-1"/>
                </svg>
              </div>
              <p style={{ fontSize: '11.5px', color: '#667085', margin: 0 }}>
                انقر مرتين على الزر الجانبي للتأكيد بواسطة Face ID
              </p>
            </div>

            {/* رابط الأمان */}
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <span style={{ fontSize: '11px', color: '#14A800', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <LockOutlinedIcon sx={{ fontSize: 13 }} /> دفع مشفر وآمن 100%
              </span>
            </div>

            {/* زر الدفع */}
            <button
              type="button"
              onClick={() => setActiveModal('success-action')}
              style={{ width: '100%', background: '#000000', color: '#fff', border: 'none', padding: '14px', borderRadius: '12px', fontWeight: '800', cursor: 'pointer', fontSize: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              الدفع بواسطة Apple Pay (4,000 ر.س)
            </button>

            <button type="button" onClick={() => setActiveModal('escrow')} style={{ width: '100%', background: 'transparent', border: 'none', color: '#667085', fontSize: '12px', cursor: 'pointer', marginTop: '12px', padding: '6px' }}>
              العودة لمراجعة العقد
            </button>
          </div>
        </div>
      )}

      {/* 4c. مودال الدفع من المحفظة */}
      {activeModal === 'wallet-pay' && (
        <div className="modal-overlay-custom">
          <div className="modal-card-custom" style={{ width: '400px', textAlign: 'right' }}>
            <div className="modal-top-row">
              <span style={{ fontSize: '16px', fontWeight: '900' }}>← الدفع من المحفظة</span>
              <button className="close-btn" onClick={() => setActiveModal('escrow')}><CloseIcon sx={{ fontSize: 16 }} /></button>
            </div>

            {/* بطاقة الرصيد الخضراء */}
            <div style={{ background: '#F0FDF4', border: '1px solid #DCFCE7', borderRadius: '12px', padding: '16px 18px', marginBottom: '16px' }}>
              <div style={{ marginBottom: '10px' }}>
                <span style={{ fontSize: '12px', color: '#166534', fontWeight: '800' }}>الرصيد المتاح حالياً: </span>
                <strong style={{ fontSize: '16px', color: '#14A800' }}>12,500 ر.س</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#475467', marginBottom: '6px' }}>
                <span>المبلغ المطلوب حجزه:</span>
                <span>4,000 ر.س</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#475467' }}>
                <span>الرصيد المتبقي بعد العملية:</span>
                <strong style={{ color: '#181818' }}>8,500 ر.س</strong>
              </div>
            </div>

            {/* نص الضمان */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', background: '#F9FAFB', border: '1px solid #EAEAEA', borderRadius: '10px', padding: '12px', marginBottom: '20px' }}>
              <LockOutlinedIcon sx={{ fontSize: 16, color: '#667085', marginTop: '1px', flexShrink: 0 }} />
              <p style={{ fontSize: '11.5px', color: '#667085', margin: 0, lineHeight: '1.6' }}>
                المبلغ يبقى محجوزاً في حساب الضمان (Escrow) ولا يُصرف إلا بعد موافقتك على التسليم
              </p>
            </div>

            {/* زر التأكيد */}
            <button
              type="button"
              onClick={() => setActiveModal('success-action')}
              style={{ width: '100%', background: '#14A800', color: '#fff', border: 'none', padding: '14px', borderRadius: '12px', fontWeight: '800', cursor: 'pointer', fontSize: '14px', boxShadow: '0 4px 15px #14a80033' }}
            >
              تأكيد الدفع وحجز المبلغ
            </button>

            <button type="button" onClick={() => setActiveModal('escrow')} style={{ width: '100%', background: 'transparent', border: 'none', color: '#667085', fontSize: '12px', cursor: 'pointer', marginTop: '12px', padding: '6px', textAlign: 'center' }}>
              العودة لمراجعة العقد
            </button>
          </div>
        </div>
      )}

      {/* 5. مودال نجاح الحجز وتأكيد العقد */}
      {activeModal === 'success-action' && (
        <div className="modal-overlay-custom">
          <div className="modal-card-custom" style={{ width: '420px', textAlign: 'center' }}>
            <div style={{ width: '45px', height: '45px', background: '#DCFCE7', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px auto' }}>
              <CheckCircleIcon sx={{ color: '#16A34A', fontSize: 26 }} />
            </div>
            <h3 style={{ fontSize: '16px', fontWeight: '900', color: '#181818', margin: '0 0 6px 0' }}>تم حجز الدفعة المالية وتأكيد العقد بنجاح! 🎉</h3>
            <p style={{ fontSize: '11px', color: '#667085', margin: '0 0 14px 0' }}>مشروعك أصبح الآن قيد التنفيذ رسمياً.</p>
            <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', padding: '10px', borderRadius: '8px', textAlign: 'right', marginBottom: '14px', fontSize: '11.5px' }}>
              <strong>متجر سلة الخير</strong>
              <div style={{ color: '#667085', margin: '2px 0' }}>المرحلة الثانية - 8,000 ر.س</div>
              <a href="#download" onClick={(e) => { e.preventDefault(); alert('تم تحميل نسخة PDF بنجاح!'); }} style={{ color: '#14A800', fontSize: '11px', textDecoration: 'underline', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <DownloadOutlinedIcon sx={{ fontSize: 14 }} /> تحميل نسخة PDF من العقد المكتمل والتوقيع
              </a>
            </div>
            <button 
              type="button" 
              onClick={() => {
                setActiveModal(null);
                if (onNavigate) {
                  onNavigate('projects');
                }
              }} style={{ width: '100%', background: '#14A800', color: '#fff', border: 'none', padding: '10px', borderRadius: '8px', fontWeight: '800', cursor: 'pointer' }}>
              الانتقال إلى لوحة تحكم المشروع
            </button>
          </div>
        </div>
      )}

      {/* 6. مودال تحرير دفعة الضمان للمستقل */}
      {activeModal === 'escrow-release' && (
        <div className="modal-overlay-custom">
          <div className="modal-card-custom" style={{ width: '460px' }}>
            <div className="modal-top-row">
              <span style={{ fontSize: '17px', fontWeight: '900' }}>تحرير دفعة الضمان للمستقل</span>
              <button className="close-btn" onClick={() => setActiveModal(null)}><CloseIcon sx={{ fontSize: 18 }} /></button>
            </div>
            <p style={{ fontSize: '12px', color: '#667085', textAlign: 'right', margin: '12px 0' }}>هل أنت متأكد من اعتماد التسليم وتحرير مبلغ 15,000 ر.س لفريق العمل؟</p>
            <button type="button" onClick={() => { alert('تم تحرير الدفعة بنجاح!'); setActiveModal(null); }} style={{ width: '100%', background: '#14A800', color: '#fff', border: 'none', padding: '12px', borderRadius: '10px', fontWeight: '800', cursor: 'pointer' }}>
              تأكيد التحرير الفوري ✓
            </button>
          </div>
        </div>
      )}

      {/* 7. مودال طلب تدخل الإدارة وفض نزاع مالي */}
      {activeModal === 'dispute' && (
        <div className="modal-overlay-custom">
          <div className="modal-card-custom" style={{ width: '560px', textAlign: 'right' }}>
            <div className="modal-top-row">
              <div>
                <span style={{ fontSize: '17px', fontWeight: '900', color: '#D92D20', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <GavelIcon sx={{ fontSize: 20 }} /> طلب تدخل الإدارة وفض نزاع مالي
                </span>
                <span style={{ fontSize: '11px', color: '#667085' }}>فتح تذكرة نزاع مالي</span>
              </div>
              <button className="close-btn" onClick={() => setActiveModal(null)}><CloseIcon sx={{ fontSize: 18 }} /></button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', margin: '14px 0 10px 0' }}>
              <div>
                <label style={{ fontSize: '11.5px', fontWeight: '800', display: 'block', marginBottom: '4px' }}>اختر المشروع</label>
                <select value={disputeProject} onChange={(e) => setDisputeProject(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #CBD5E1', background: '#fff', boxSizing: 'border-box' }}>
                  <option>متجر سلة الخير</option>
                  <option>متجر رواق</option>
                  <option>هوية نواة</option>
                </select>
              </div>
              <div>
                <label style={{ fontSize: '11.5px', fontWeight: '800', display: 'block', marginBottom: '4px' }}>المرحلة</label>
                <select value={disputeStage} onChange={(e) => setDisputeStage(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #CBD5E1', background: '#fff', boxSizing: 'border-box' }}>
                  <option>تطوير واجهات المتجر وبرمجة السلة</option>
                  <option>تصميم الواجهات والتجربة</option>
                </select>
              </div>
            </div>

            <div style={{ background: '#F8FAFC', padding: '10px 14px', borderRadius: '8px', border: '1px solid #E2E8F0', marginBottom: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px' }}>
              <span style={{ color: '#667085' }}>المبلغ المحجوز في هذه المرحلة:</span>
              <strong style={{ color: '#D92D20', fontSize: '14px' }}>15,000 ر.س</strong>
            </div>

            <div style={{ marginBottom: '12px', fontSize: '12px' }}>
              <label style={{ fontWeight: '800', display: 'block', marginBottom: '6px' }}>سبب النزاع</label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '11.5px' }}>
                  <input type="radio" name="dispute-reason" defaultChecked /> تأخير غير مبرر عن موعد التسليم المتفق عليه
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '11.5px' }}>
                  <input type="radio" name="dispute-reason" /> عدم مطابقة المخرجات لبنود ومواصفات العقد
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '11.5px' }}>
                  <input type="radio" name="dispute-reason" /> انقطاع تواصل قائد الفريق
                </label>
              </div>
            </div>

            <div style={{ marginBottom: '12px' }}>
              <label style={{ fontSize: '11.5px', fontWeight: '800', display: 'block', marginBottom: '4px' }}>تفاصيل الشكوى</label>
              <textarea 
                rows={3} 
                value={disputeDetails} 
                onChange={(e) => setDisputeDetails(e.target.value)} 
                placeholder="اشرح المشكلة بالتفصيل لإدارة التحكيم..." 
                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #CBD5E1', boxSizing: 'border-box', fontFamily: 'inherit' }} 
              />
            </div>

            <div style={{ marginBottom: '12px' }}>
              <label style={{ fontSize: '11.5px', fontWeight: '800', display: 'block', marginBottom: '4px' }}>إرفاق أدلة لدعم الشكوى</label>
              <div style={{ border: '2px dashed #CBD5E1', padding: '14px', borderRadius: '8px', textAlign: 'center', background: '#FAFAFA' }}>
                <FileUploadOutlinedIcon sx={{ fontSize: 26, color: '#667085' }} />
                <p style={{ fontSize: '11px', color: '#667085', margin: '4px 0 0 0' }}>اسحب الملفات هنا أو اختر ملفات <br/><small style={{ color: '#98A2B3' }}>لدعم شكوتك بأدلة أو ملفات صالحة</small></p>
              </div>
            </div>

            <div style={{ background: '#FEF2F2', padding: '10px', borderRadius: '8px', border: '1px solid #FEE2E2', marginBottom: '16px', fontSize: '11px', color: '#991B1B' }}>
              ⚠️ سيتم تجميد مبلغ 15,000 ر.س في حساب الضمان فوراً ومنع تحريره حتى صدور القرار الإداري خلال 48 ساعة.
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button type="button" onClick={() => setActiveModal(null)} style={{ flex: 1, background: '#fff', border: '1px solid #CBD5E1', padding: '12px', borderRadius: '10px', fontWeight: '700', cursor: 'pointer', color: '#344054' }}>
                إلغاء والتواصل مع قائد الفريق أولاً
              </button>
              <button type="button" onClick={() => { alert('تم تقديم تذكرة النزاع وتجميد المبلغ بنجاح!'); setActiveModal(null); }} style={{ flex: 1.5, background: '#D92D20', color: '#fff', border: 'none', padding: '12px', borderRadius: '10px', fontWeight: '800', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                <FlagOutlinedIcon sx={{ fontSize: 16 }} /> تجميد المرحلة والتقديم لتذكرة النزاع
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 8. مودال متابعة حالة النزاع */}
      {activeModal === 'dispute-status' && (
        <div className="modal-overlay-custom">
          <div className="modal-card-custom" style={{ width: '480px' }}>
            <div className="modal-top-row">
              <span style={{ fontSize: '17px', fontWeight: '900' }}>متابعة حالة النزاع وتذاكر التحكيم</span>
              <button className="close-btn" onClick={() => setActiveModal(null)}><CloseIcon sx={{ fontSize: 18 }} /></button>
            </div>
            <div style={{ background: '#FEFCE8', padding: '12px', borderRadius: '8px', border: '1px solid #FEF08A', textAlign: 'right', margin: '14px 0', fontSize: '12px', color: '#854D0E' }}>
              <strong>التذكرة #DISP-409:</strong> قيد المراجعة من قسم التحكيم المالي.
            </div>
            <button type="button" onClick={() => setActiveModal(null)} style={{ width: '100%', background: '#181818', color: '#fff', border: 'none', padding: '10px', borderRadius: '8px', fontWeight: '800', cursor: 'pointer' }}>
              إغلاق
            </button>
          </div>
        </div>
      )}

      {/* 9. مودال تفاصيل المعاملة */}
      {activeModal === 'txn-details' && (
        <div className="modal-overlay-custom">
          <div className="modal-card-custom" style={{ width: '460px' }}>
            <div className="modal-top-row">
              <span style={{ fontSize: '16px', fontWeight: '900' }}>تفاصيل المعاملة المالية</span>
              <button className="close-btn" onClick={() => setActiveModal(null)}><CloseIcon sx={{ fontSize: 18 }} /></button>
            </div>
            <div style={{ background: '#F8FAFC', padding: '16px', borderRadius: '12px', border: '1px solid #E2E8F0', textAlign: 'right', margin: '14px 0', fontSize: '12px' }}>
              <div>رقم المعاملة: <strong>{selectedTxn.id}</strong></div>
              <div>النوع: <strong>{selectedTxn.type}</strong></div>
              <div>المبلغ: <strong style={{ color: '#14A800' }}>{selectedTxn.amount}</strong></div>
            </div>
            <button type="button" onClick={() => setActiveModal('invoice')} style={{ width: '100%', background: '#14A800', color: '#fff', border: 'none', padding: '10px', borderRadius: '8px', fontWeight: '800', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
              <DescriptionOutlinedIcon sx={{ fontSize: 18 }} /> معاينة الفاتورة الضريبية
            </button>
          </div>
        </div>
      )}

      {/* 10. مودال الفاتورة الضريبية المبسطة */}
      {activeModal === 'invoice' && (
        <div className="modal-overlay-custom">
          <div className="modal-card-custom" style={{ width: '560px', textAlign: 'right' }}>
            <div className="modal-top-row">
              <span style={{ fontSize: '17px', fontWeight: '900' }}>معاينة الفاتورة الضريبية المبسطة</span>
              <button className="close-btn" onClick={() => setActiveModal(null)}><CloseIcon sx={{ fontSize: 18 }} /></button>
            </div>
            
            <div style={{ border: '1px solid #CBD5E1', padding: '16px', borderRadius: '10px', background: '#fff', margin: '14px 0', fontSize: '11.5px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                <div>
                  <strong style={{ fontSize: '16px', color: '#14A800' }}>ACCESS</strong>
                  <div style={{ fontSize: '11px', color: '#667085' }}>فاتورة ضريبية مبسطة (Tax Invoice)</div>
                </div>
                <div style={{ background: '#F1F5F9', padding: '6px', borderRadius: '8px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#475569' }}>
                  <QrCode2Icon sx={{ fontSize: 38 }} />
                  <span style={{ fontSize: '9px', fontWeight: 'bold' }}>رمز التحقق</span>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', background: '#F8FAFC', padding: '10px', borderRadius: '8px', marginBottom: '12px' }}>
                <div>
                  <div>رقم الفاتورة: <strong>INV-2026-0091</strong></div>
                  <div>تاريخ الإصدار: <strong>15 أكتوبر 2026</strong></div>
                  <div>العميل: <strong>عبدالله محمد العتيبي</strong></div>
                </div>
                <div>
                  <div>المورد: <strong>شركة ACCESS للحلول البرمجية</strong></div>
                  <div>الرقم الضريبي: <strong style={{ fontFamily: 'monospace' }}>300012345600003</strong></div>
                </div>
              </div>

              <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '12px', fontSize: '11px' }}>
                <thead>
                  <tr style={{ background: '#F1F5F9', borderBottom: '1px solid #CBD5E1' }}>
                    <th style={{ padding: '6px', textAlign: 'right' }}>البند</th>
                    <th style={{ padding: '6px', textAlign: 'center' }}>الكمية</th>
                    <th style={{ padding: '6px', textAlign: 'center' }}>سعر الوحدة</th>
                    <th style={{ padding: '6px', textAlign: 'center' }}>الضريبة</th>
                    <th style={{ padding: '6px', textAlign: 'left' }}>الإجمالي</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                    <td style={{ padding: '6px' }}>إيداع رصيد المحفظة / تمويل مشروع</td>
                    <td style={{ padding: '6px', textAlign: 'center' }}>1</td>
                    <td style={{ padding: '6px', textAlign: 'center' }}>10,000 ر.س</td>
                    <td style={{ padding: '6px', textAlign: 'center' }}>15%</td>
                    <td style={{ padding: '6px', textAlign: 'left', fontWeight: 'bold' }}>10,000 ر.س</td>
                  </tr>
                </tbody>
              </table>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#F0FDF4', padding: '10px', borderRadius: '8px', border: '1px solid #DCFCE7', fontWeight: 'bold', fontSize: '13px', color: '#166534' }}>
                <span>الإجمالي شامل الضريبة:</span>
                <span style={{ color: '#14A800' }}>10,000 ر.س</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button type="button" onClick={() => alert('جاري طباعة الفاتورة...')} style={{ flex: 1, background: '#fff', border: '1px solid #CBD5E1', padding: '12px', borderRadius: '10px', fontWeight: '700', cursor: 'pointer', color: '#344054', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                <PrintOutlinedIcon sx={{ fontSize: 18 }} /> طباعة
              </button>
              <button type="button" onClick={() => alert('تم تحميل نسخة المعاينة بنجاح!')} style={{ flex: 2, background: '#14A800', color: '#fff', border: 'none', padding: '12px', borderRadius: '10px', fontWeight: '800', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                <DownloadOutlinedIcon sx={{ fontSize: 18 }} /> تحميل نسخة المعاينة (PDF)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 11. مودال إيصال التحويل قيد التدقيق */}
      {activeModal === 'wire-receipt' && (
        <div className="modal-overlay-custom">
          <div className="modal-card-custom" style={{ width: '420px', textAlign: 'right', padding: '32px 28px' }}>

            {/* زر الإغلاق */}
            <div style={{ display: 'flex', justifyContent: 'flex-left', marginBottom: '8px' }}>
              <button className="close-btn" onClick={() => setActiveModal(null)} style={{ marginRight: 'auto' }}>
                <CloseIcon sx={{ fontSize: 18 }} />
              </button>
            </div>

            {/* أيقونة الساعة */}
            <div style={{ textAlign: 'center', marginBottom: '16px' }}>
              <div style={{
                width: '56px', height: '56px',
                border: '2.5px solid #14A800',
                borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto',
                background: '#fff'
              }}>
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#14A800" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
              </div>
            </div>

            {/* العنوان والوصف */}
            <h2 style={{ fontSize: '18px', fontWeight: '900', color: '#181818', textAlign: 'center', margin: '0 0 8px 0' }}>
              إيصال التحويل قيد التدقيق المحاسبي
            </h2>
            <p style={{ fontSize: '12px', color: '#667085', textAlign: 'center', lineHeight: '1.7', margin: '0 0 20px 0' }}>
              تم استلام صورة الإيصال بنجاح وجارٍ مطابقتها<br />
              مع كشف الحساب البنكي / ACCESS
            </p>

            {/* تفاصيل التحويل */}
            <div style={{ border: '1px solid #EAEAEA', borderRadius: '12px', overflow: 'hidden', marginBottom: '16px' }}>
              {[
                { label: 'المبلغ المحول:', value: '10,000 ر.س', bold: true },
                { label: 'اسم البنك المحول منه:', value: 'مصرف الراجحي' },
                { label: 'اسم صاحب الحساب:', value: 'عبدالله محمد العتيبي' },
              ].map((row, i) => (
                <div key={i} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '13px 16px',
                  borderBottom: i < 2 ? '1px solid #F1F5F9' : 'none',
                  background: '#fff'
                }}>
                  <span style={{ fontSize: '12px', color: '#667085' }}>{row.label}</span>
                  <span style={{ fontSize: '13px', fontWeight: row.bold ? '900' : '700', color: '#181818' }}>
                    {row.value}
                  </span>
                </div>
              ))}
              {/* صف المدة */}
              <div style={{ padding: '13px 16px', background: '#fff', borderTop: '1px solid #F1F5F9' }}>
                <div style={{ fontSize: '12px', color: '#667085', marginBottom: '4px' }}>المدة المتوقعة للاعتماد</div>
                <div style={{ fontSize: '13px', fontWeight: '700', color: '#181818' }}>
                  خلال 15 إلى 30 دقيقة خلال ساعات العمل الرسمية
                </div>
              </div>
            </div>

            {/* بطاقة الإشعار الخضراء */}
            <div style={{
              background: '#F0FDF4', border: '1px solid #DCFCE7',
              borderRadius: '10px', padding: '12px 14px',
              marginBottom: '20px',
              display: 'flex', alignItems: 'flex-start', gap: '8px'
            }}>
              <span style={{ fontSize: '16px', marginTop: '1px' }}>🔔</span>
              <p style={{ fontSize: '11.5px', color: '#166534', margin: 0, lineHeight: '1.6' }}>
                سيصلك إشعار فوري وسيتم تحديث رصيد محفظتك فور اعتماد المحاسب للعملية
              </p>
            </div>

            {/* زر التأكيد */}
            <button
              type="button"
              onClick={() => setActiveModal(null)}
              style={{
                width: '100%', background: '#14A800', color: '#fff',
                border: 'none', padding: '14px', borderRadius: '12px',
                fontWeight: '800', cursor: 'pointer', fontSize: '14px',
                boxShadow: '0 4px 15px #14a80033'
              }}
            >
              حسناً، فهمت ومتابعة
            </button>
          </div>
        </div>
      )}

      {/* 12. مودال تفاصيل العملية المرفوضة وخطأ الدفع (مطابق تماماً لصورة Figma 100%) */}
      {activeModal === 'declined-error' && (
        <div className="modal-overlay-custom" onClick={() => setActiveModal(null)}>
          <div 
            className="modal-card-custom" 
            style={{ 
              width: '540px', 
              maxWidth: '92vw', 
              padding: '36px 32px 28px', 
              borderRadius: '24px', 
              textAlign: 'center', 
              background: '#ffffff',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.2)',
              position: 'relative'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* أيقونة الخطأ الدائرية الكبيرة المزدوجة */}
            <div style={{ 
              width: '64px', 
              height: '64px', 
              background: '#FEE4E2', 
              borderRadius: '50%', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              margin: '0 auto 20px auto' 
            }}>
              <div style={{
                width: '42px',
                height: '42px',
                background: '#D92D20',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontSize: '26px',
                fontWeight: '900',
                fontFamily: 'sans-serif'
              }}>
                !
              </div>
            </div>

            {/* العنوان الرئيسي */}
            <h2 style={{ fontSize: '22px', fontWeight: '900', color: '#101828', margin: '0 0 10px 0' }}>
              تعذر إتمام عملية الدفع وحجز الضمان
            </h2>

            {/* النص الفرعي التوضيحي */}
            <p style={{ fontSize: '13px', color: '#667085', margin: '0 0 24px 0', lineHeight: 1.6 }}>
              لم نتمكن من خصم مبلغ 4,000 ر.س من بطاقتك الائتمانية المنتهية بـ (4022 ****)
            </p>

            {/* صندوق سبب الرفض والملحوظة */}
            <div style={{ 
              background: '#FFF6F5', 
              border: '1px solid #FECDCA', 
              borderRadius: '16px', 
              padding: '20px 22px', 
              textAlign: 'center', 
              marginBottom: '24px' 
            }}>
              <p style={{ 
                fontSize: '13px', 
                fontWeight: '800', 
                color: '#1D2939', 
                margin: '0 0 16px 0',
                lineHeight: 1.6
              }}>
                سبب الرفض: رصيد غير كافٍ أو تم رفض المعاملة من البنك المصدر (رمز الخطأ: 05_DECLINED)
              </p>
              <div style={{ borderTop: '1px solid #FEE4E2', paddingTop: '12px' }}>
                <span style={{ fontSize: '11.5px', color: '#98A2B3' }}>
                  ملاحظة: مسودة العقد ونطاق العمل محفوظة بالكامل ولن تضطر لإعادة ملء البيانات
                </span>
              </div>
            </div>

            {/* الأزرار والإجراءات */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button 
                type="button" 
                onClick={() => {
                  setActiveModal('payment-form');
                }} 
                style={{ 
                  width: '100%', 
                  background: '#14A800', 
                  color: '#ffffff', 
                  border: 'none', 
                  padding: '13px', 
                  borderRadius: '12px', 
                  fontWeight: '800', 
                  fontSize: '14px', 
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  boxShadow: '0 2px 8px rgba(20, 168, 0, 0.25)'
                }}
              >
                إعادة المحاولة / استخدام وسيلة دفع أخرى
              </button>

              <button 
                type="button" 
                onClick={() => {
                  setPaymentMethod('wire');
                  setActiveModal('deposit');
                }} 
                style={{ 
                  width: '100%', 
                  background: '#ffffff', 
                  color: '#344054', 
                  border: '1px solid #D0D5DD', 
                  padding: '12px', 
                  borderRadius: '12px', 
                  fontWeight: '800', 
                  fontSize: '13.5px', 
                  cursor: 'pointer',
                  fontFamily: 'inherit'
                }}
              >
                التحويل عبر الحساب البنكي المباشر
              </button>

              <button 
                type="button" 
                onClick={() => {
                  if (onNavigate) {
                    onNavigate('messages');
                  }
                  setActiveModal(null);
                }} 
                style={{ 
                  background: 'transparent', 
                  border: 'none', 
                  color: '#14A800', 
                  fontSize: '12.5px', 
                  fontWeight: '700', 
                  cursor: 'pointer', 
                  marginTop: '6px',
                  fontFamily: 'inherit'
                }}
              >
                مراسلة الدعم المالي للمساعدة
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 13. مودال استرداد أموال مرحلة ملغاة */}
      {activeModal === 'refund' && (
        <div className="modal-overlay-custom">
          <div className="modal-card-custom" style={{ width: '460px' }}>
            <div className="modal-top-row">
              <span style={{ fontSize: '16px', fontWeight: '900' }}>طلب استرداد أموال مرحلة ملغاة</span>
              <button className="close-btn" onClick={() => setActiveModal(null)}><CloseIcon sx={{ fontSize: 18 }} /></button>
            </div>
            <p style={{ fontSize: '12px', color: '#667085', textAlign: 'right', margin: '12px 0' }}>سيتم إعادة المبلغ المحجوز بالضمان إلى رصيدك المتاح فوراً بعد موافقة الإدارة.</p>
            <button type="button" onClick={() => { alert('تم تقديم طلب الاسترداد بنجاح!'); setActiveModal(null); }} style={{ width: '100%', background: '#14A800', color: '#fff', border: 'none', padding: '10px', borderRadius: '8px', fontWeight: '800', cursor: 'pointer' }}>
              تأكيد طلب الاسترداد للمحفظة
            </button>
          </div>
        </div>
      )}

      {/* 14. مودال إدارة بطاقات الدفع */}
      {activeModal === 'payment-methods' && (
        <div className="modal-overlay-custom">
          <div className="modal-card-custom" style={{ width: '460px' }}>
            <div className="modal-top-row">
              <span style={{ fontSize: '16px', fontWeight: '900' }}>إدارة بطاقات الدفع المحفوظة</span>
              <button className="close-btn" onClick={() => setActiveModal(null)}><CloseIcon sx={{ fontSize: 18 }} /></button>
            </div>
            <div style={{ background: '#F8FAFC', padding: '12px', borderRadius: '8px', border: '1px solid #E2E8F0', textAlign: 'right', margin: '12px 0', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CreditCardOutlinedIcon sx={{ fontSize: 20, color: '#14A800' }} />
              <div>مدى تنتهي بـ (4092) - <strong>الافتراضية</strong></div>
            </div>
            <button type="button" onClick={() => { alert('تم إضافة البطاقة بنجاح!'); setActiveModal(null); }} style={{ width: '100%', background: '#14A800', color: '#fff', border: 'none', padding: '10px', borderRadius: '8px', fontWeight: '800', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
              <AddIcon sx={{ fontSize: 16 }} /> إضافة بطاقة جديدة
            </button>
          </div>
        </div>
      )}

      {/* 15. مودال إعدادات المحفظة */}
      {activeModal === 'wallet-settings' && (
        <div className="modal-overlay-custom">
          <div className="modal-card-custom" style={{ width: '460px' }}>
            <div className="modal-top-row">
              <span style={{ fontSize: '16px', fontWeight: '900' }}>إعدادات العملة والتنبيهات المالية</span>
              <button className="close-btn" onClick={() => setActiveModal(null)}><CloseIcon sx={{ fontSize: 18 }} /></button>
            </div>
            <div style={{ textAlign: 'right', margin: '12px 0', fontSize: '12px' }}>
              <label>العملة الافتراضية:</label>
              <select style={{ width: '100%', padding: '8px', marginTop: '6px', borderRadius: '6px', border: '1px solid #CBD5E1' }}>
                <option>ريال سعودي (SAR)</option>
                <option>دولار أمريكي (USD)</option>
              </select>
            </div>
            <button type="button" onClick={() => { alert('تم حفظ الإعدادات!'); setActiveModal(null); }} style={{ width: '100%', background: '#14A800', color: '#fff', border: 'none', padding: '10px', borderRadius: '8px', fontWeight: '800', cursor: 'pointer' }}>
              حفظ التغييرات
            </button>
          </div>
        </div>
      )}

      {/* 16. مودال الشحن التلقائي */}
      {activeModal === 'auto-recharge' && (
        <div className="modal-overlay-custom">
          <div className="modal-card-custom" style={{ width: '460px' }}>
            <div className="modal-top-row">
              <span style={{ fontSize: '16px', fontWeight: '900' }}>تفعيل الشحن التلقائي للرصيد</span>
              <button className="close-btn" onClick={() => setActiveModal(null)}><CloseIcon sx={{ fontSize: 18 }} /></button>
            </div>
            <p style={{ fontSize: '12px', color: '#667085', textAlign: 'right', margin: '12px 0' }}>شحن المحفظة تلقائياً بمبلغ 5,000 ر.س عندما ينخفض الرصيد عن 1,000 ر.س.</p>
            <button type="button" onClick={() => { alert('تم تفعيل الشحن التلقائي بنجاح!'); setActiveModal(null); }} style={{ width: '100%', background: '#14A800', color: '#fff', border: 'none', padding: '10px', borderRadius: '8px', fontWeight: '800', cursor: 'pointer' }}>
              تفعيل النظام التلقائي ✓
            </button>
          </div>
        </div>
      )}

      {/* 17. مودال اتفاقية السرية NDA */}
      {activeModal === 'nda-modal' && (
        <div className="modal-overlay-custom">
          <div className="modal-card-custom" style={{ width: '500px' }}>
            <div className="modal-top-row">
              <span style={{ fontSize: '16px', fontWeight: '900' }}>اتفاقية سرية المعلومات وحماية الملكية الفكرية (NDA)</span>
              <button className="close-btn" onClick={() => setActiveModal(null)}><CloseIcon sx={{ fontSize: 18 }} /></button>
            </div>
            <div style={{ background: '#F8FAFC', padding: '12px', borderRadius: '8px', border: '1px solid #E2E8F0', textAlign: 'right', margin: '12px 0', fontSize: '11px', color: '#334155', maxHeight: '120px', overflowY: 'auto' }}>
              بند 1: التزام منصة ACCESS وقائد الفريق بعدم مشاركة أو استغلال الفكرة أو النماذج خارج نطاق المشروع.<br/><br/>
              بند 2: ملكية العميل الكاملة بنسبة 100% لكافة المخرجات والملفات والأكواد المصدرية.
            </div>
            <label style={{ display: 'block', textAlign: 'right', fontSize: '11.5px', marginBottom: '14px', cursor: 'pointer' }}>
              <input type="checkbox" /> أوافق على بنود اتفاقية عدم الإفصاح وشروط التعاقد
            </label>
            <button type="button" onClick={() => { alert('تم توقيع الاتفاقية بنجاح!'); setActiveModal(null); }} style={{ width: '100%', background: '#14A800', color: '#fff', border: 'none', padding: '10px', borderRadius: '8px', fontWeight: '800', cursor: 'pointer' }}>
              توقيع الاتفاقية
            </button>
          </div>
        </div>
      )}

      {/* 18. مودال تصدير التقرير المالي */}
      {activeModal === 'export-report' && (
        <div className="modal-overlay-custom">
          <div className="modal-card-custom" style={{ width: '460px' }}>
            <div className="modal-top-row">
              <span style={{ fontSize: '16px', fontWeight: '900' }}>تصدير تقرير المعاملات المالي</span>
              <button className="close-btn" onClick={() => setActiveModal(null)}><CloseIcon sx={{ fontSize: 18 }} /></button>
            </div>
            <div style={{ display: 'flex', gap: '10px', margin: '16px 0' }}>
              <button type="button" onClick={() => alert('تم تحميل تقرير PDF بنجاح!')} style={{ flex: 1, padding: '12px', background: '#181818', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                <DownloadOutlinedIcon sx={{ fontSize: 16 }} /> تصدير PDF
              </button>
              <button type="button" onClick={() => alert('تم تحميل تقرير Excel / CSV بنجاح!')} style={{ flex: 1, padding: '12px', background: '#14A800', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                <DownloadOutlinedIcon sx={{ fontSize: 16 }} /> تصدير Excel
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}