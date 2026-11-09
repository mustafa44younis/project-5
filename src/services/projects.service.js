import api from './api';
import { API_ENDPOINTS } from '../constants/api.constants';

export const projectsService = {
  // جلب قائمة المشاريع (الكل، النشطة، المكتملة...)
  async getProjects(status = 'all') {
    return api.get(API_ENDPOINTS.PROJECTS.LIST(status));
  },

  // جلب تفاصيل مشروع محدد
  async getProject(id) {
    return api.get(API_ENDPOINTS.PROJECTS.DETAILS(id));
  },

  // إنشاء مشروع جديد
  async createProject(projectData) {
    return api.post(API_ENDPOINTS.PROJECTS.CREATE, projectData);
  },

  // مراجعة مرحلة تسليم
  async getMilestoneReview(milestoneId) {
    return api.get(API_ENDPOINTS.MILESTONES.REVIEW(milestoneId));
  },

  // اعتماد مرحلة وتسليم الدفعة
  async approveMilestone(milestoneId, notes = '') {
    return api.post(API_ENDPOINTS.MILESTONES.APPROVE(milestoneId), { notes });
  },

  // طلب تعديلات على المرحلة
  async requestChanges(milestoneId, feedback) {
    return api.post(API_ENDPOINTS.MILESTONES.REQUEST_CHANGES(milestoneId), { feedback });
  },

  // جلب بيانات التسليم النهائي للمشروع
  async getFinalDelivery(projectId) {
    return api.get(API_ENDPOINTS.MILESTONES.FINAL_DELIVERY(projectId));
  },

  // التوقيع والاستلام النهائي
  async finalSignoff(projectId, rating = 5, feedback = '') {
    return api.post(API_ENDPOINTS.MILESTONES.FINAL_SIGNOFF(projectId), { rating, feedback });
  },
};

export default projectsService;
