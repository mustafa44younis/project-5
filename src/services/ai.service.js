import api from './api';
import { API_ENDPOINTS } from '../constants/api.constants';

export const aiService = {
  // جلب كافة جلسات الاستشارة السابقة
  async getConsultations() {
    return api.get(API_ENDPOINTS.CONTRACTS.CONSULTATIONS);
  },

  // بدء استشارة ذكية جديدة لمشروع
  async createConsultation(data) {
    return api.post(API_ENDPOINTS.CONTRACTS.CREATE_CONSULTATION, data);
  },

  // جلب تفاصيل الاستشارة والرسائل المتبادلة
  async getConsultation(id) {
    return api.get(API_ENDPOINTS.CONTRACTS.CONSULTATION(id));
  },

  // تحديث مسودة البريف الذكي (Smart Brief) يدوياً
  async updateBrief(id, briefData) {
    return api.put(API_ENDPOINTS.CONTRACTS.UPDATE_BRIEF(id), briefData);
  },

  // إرسال رسالة في محادثة الاستشارة مع الذكاء الاصطناعي
  async sendConsultationMessage(id, message) {
    return api.post(API_ENDPOINTS.CONTRACTS.CONSULTATION_MESSAGES(id), { message });
  },

  // جلب أو توليد العقد المبدئي المرتبط بجلسة الاستشارة
  async getContractByConsultation(consultationId) {
    return api.get(API_ENDPOINTS.CONTRACTS.CONTRACT_BY_CONSULTATION(consultationId));
  },

  // جلب تفاصيل عقد
  async getContract(contractId) {
    return api.get(API_ENDPOINTS.CONTRACTS.CONTRACT_DETAILS(contractId));
  },

  // توقيع واعتماد العقد المبدئي وإنشاء المشروع
  async signContract(contractId, signatureData = {}) {
    return api.post(API_ENDPOINTS.CONTRACTS.SIGN(contractId), signatureData);
  },

  // جلب الخبراء التقنيين والمواعيد المتاحة
  async getExperts() {
    return api.get(API_ENDPOINTS.CONTRACTS.EXPERTS);
  },

  // حجز موعد مع خبير
  async bookExpert(bookingData) {
    return api.post(API_ENDPOINTS.CONTRACTS.BOOK_EXPERT, bookingData);
  },

  // جلب حجوزات الخبراء الخاصة بالعميل
  async getMyBookings() {
    return api.get(API_ENDPOINTS.CONTRACTS.MY_EXPERT_BOOKINGS);
  },
};

export default aiService;
