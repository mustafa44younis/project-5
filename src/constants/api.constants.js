// Base URL للـ API
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// API Endpoints
export const API_ENDPOINTS = {
  // Auth
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  LOGOUT: '/auth/logout',
  ME: '/auth/me',
  
  // Projects
  PROJECTS: '/projects',
  PROJECT: (id) => `/projects/${id}`,
  
  // Messages
  MESSAGES: '/messages',
  SEND_MESSAGE: '/messages',
  MARK_READ: (id) => `/messages/${id}/read`,
  
  // Wallet
  BALANCE: '/wallet/balance',
  TRANSACTIONS: '/wallet/transactions',
  ESCROW: '/wallet/escrow',
  
  // AI
  AI_CONSULT: '/ai/consult',
  AI_HISTORY: '/ai/history',
};
