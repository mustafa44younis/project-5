import api from './api';
import { API_ENDPOINTS } from '../constants/api.constants';

export const walletService = {
  // جلب بيانات المحفظة (الرصيد المتاح، رصيد الضمان، إجمالي المصروفات)
  async getWallet() {
    return api.get(API_ENDPOINTS.PAYMENTS.WALLET);
  },

  // جلب جدول دفعات المراحل قيد الضمان
  async getEscrowMilestones() {
    return api.get(API_ENDPOINTS.PAYMENTS.ESCROW_MILESTONES);
  },

  // معاينة دفعة الضمان قبل الإيداع
  async previewEscrow(projectId) {
    return api.get(API_ENDPOINTS.PAYMENTS.ESCROW_PREVIEW(projectId));
  },

  // إيداع مبلغ في حساب الضمان (Escrow Deposit)
  async depositEscrow(data) {
    return api.post(API_ENDPOINTS.PAYMENTS.ESCROW_DEPOSIT, data);
  },

  // شحن المحفظة السريع
  async topupWallet(amount, method = 'card') {
    return api.post(API_ENDPOINTS.PAYMENTS.WALLET_TOPUP, { amount, method });
  },

  // إيداع مباشر عبر البطاقة
  async depositCard(cardData) {
    return api.post(API_ENDPOINTS.PAYMENTS.DEPOSIT_CARD, cardData);
  },

  // طلب سحب رصيد (استرداد)
  async withdraw(data) {
    return api.post(API_ENDPOINTS.PAYMENTS.WITHDRAW, data);
  },

  // جلب طلبات السحب
  async getWithdrawals() {
    return api.get(API_ENDPOINTS.PAYMENTS.WITHDRAWALS);
  },

  // فتح نزاع مالي
  async createDispute(data) {
    return api.post(API_ENDPOINTS.PAYMENTS.DISPUTES, data);
  },

  // جلب النزاعات المالية
  async getDisputes() {
    return api.get(API_ENDPOINTS.PAYMENTS.DISPUTES);
  },

  // جلب سجل المعاملات المالية
  async getTransactions(page = 1, limit = 10) {
    return api.get(API_ENDPOINTS.PAYMENTS.TRANSACTIONS(page, limit));
  },

  // جلب تفاصيل معاملة معينة
  async getTransactionDetails(id) {
    return api.get(API_ENDPOINTS.PAYMENTS.TRANSACTION_DETAILS(id));
  },

  // جلب تفاصيل الفاتورة الضريبية
  async getInvoiceDetails(invoiceNumber) {
    return api.get(API_ENDPOINTS.PAYMENTS.INVOICE_DETAILS(invoiceNumber));
  },

  // رفع إيصال التحويل البنكي
  async submitBankTransferReceipt(data) {
    return api.post(API_ENDPOINTS.PAYMENTS.BANK_TRANSFER_RECEIPT, data);
  },
};

export default walletService;
