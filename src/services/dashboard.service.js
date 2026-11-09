import api from './api';
import { API_ENDPOINTS } from '../constants/api.constants';

export const dashboardService = {
  // جلب إحصائيات ونظرة عامة على لوحة التحكم
  async getOverview() {
    return api.get(API_ENDPOINTS.DASHBOARD.OVERVIEW);
  },
};

export default dashboardService;
