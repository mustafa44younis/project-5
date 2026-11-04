import api from './api';
import { API_ENDPOINTS } from '../constants/api.constants';

export const projectsService = {
  // جلب قائمة المشاريع
  async getProjects() {
    return api.get(API_ENDPOINTS.PROJECTS);
  },

  // جلب تفاصيل مشروع
  async getProject(id) {
    return api.get(API_ENDPOINTS.PROJECT(id));
  },

  // إنشاء مشروع جديد
  async createProject(projectData) {
    return api.post(API_ENDPOINTS.PROJECTS, projectData);
  },

  // تعديل مشروع
  async updateProject(id, projectData) {
    return api.put(API_ENDPOINTS.PROJECT(id), projectData);
  },
};
