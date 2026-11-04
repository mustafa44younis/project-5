import api from './api';
import { API_ENDPOINTS } from '../constants/api.constants';

export const walletService = {
  // جلب الرصيد
  async getBalance() {
    return api.get(API_ENDPOINTS.BALANCE);
  },

  // جلب سجل المعاملات
  async getTransactions() {
    return api.get(API_ENDPOINTS.TRANSACTIONS);
  },

  // إنشاء حساب ضمان (Escrow)
  async createEscrow(escrowData) {
    return api.post(API_ENDPOINTS.ESCROW, escrowData);
  },
};
