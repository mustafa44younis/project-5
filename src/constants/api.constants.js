// Base URL للـ API (يتم توجيهه عبر Vite Proxy أو الرابط المباشر)
export const API_BASE_URL =
  import.meta.env.VITE_API_URL || '/api';

// نقاط النهاية (Endpoints) المطابقة للـ Backend في Postman
export const API_ENDPOINTS = {
  // المصادقة (Authentication)
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    VERIFY_EMAIL: '/auth/verify-email',
    RESEND_VERIFICATION: '/auth/resend-verification',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
    ME: '/auth/me',
    GOOGLE: (role = 'client') => `/auth/google?role=${role}`,
    LINKEDIN: (role = 'client') => `/auth/linkedin?role=${role}`,
  },

  // لوحة التحكم (Dashboard)
  DASHBOARD: {
    OVERVIEW: '/dashboard/overview',
  },

  // المشاريع (Projects)
  PROJECTS: {
    LIST: (status = 'all') => `/projects?status=${status}`,
    DETAILS: (id) => `/projects/${id}`,
    CREATE: '/projects',
  },

  // المراحل والتسليمات (Milestones & Deliverables)
  MILESTONES: {
    REVIEW: (milestoneId) => `/milestones/${milestoneId}/review`,
    APPROVE: (milestoneId) => `/milestones/${milestoneId}/approve`,
    REQUEST_CHANGES: (milestoneId) => `/milestones/${milestoneId}/request-changes`,
    FINAL_DELIVERY: (projectId) => `/milestones/projects/${projectId}/final-delivery`,
    FINAL_SIGNOFF: (projectId) => `/milestones/projects/${projectId}/final-signoff`,
  },

  // المحفظة والمدفوعات وحساب الضمان (Payments & Escrow)
  PAYMENTS: {
    WALLET: '/payments/wallet',
    TRANSACTIONS: (page = 1, limit = 10) => `/payments/transactions?limit=${limit}&page=${page}`,
    TRANSACTION_DETAILS: (id) => `/payments/transactions/${id}`,
    ESCROW_DEPOSIT: '/payments/escrow/deposit',
    ESCROW_MILESTONES: '/payments/escrow-milestones',
    ESCROW_PREVIEW: (projectId) => `/payments/escrow/preview?projectId=${projectId}`,
    WALLET_TOPUP: '/payments/wallet/topup',
    DEPOSIT_CARD: '/payments/wallet/deposit-card',
    WITHDRAW: '/payments/withdraw',
    WITHDRAWALS: '/payments/withdrawals',
    DISPUTES: '/payments/disputes',
    INVOICE_DETAILS: (invoiceNumber) => `/payments/invoices/${invoiceNumber}`,
    BANK_TRANSFER_RECEIPT: '/payments/bank-transfers/receipt',
  },

  // المحادثات والرسائل والملفات المشتركة (Messages & Workspace)
  MESSAGES: {
    CONVERSATIONS: '/messages/conversations',
    CONVERSATION: (id) => `/messages/conversations/${id}`,
    CONTEXT: (id) => `/messages/conversations/${id}/context`,
    SEARCH: (id, query) => `/messages/conversations/${id}/search?query=${encodeURIComponent(query)}`,
    PRESENCE: (id) => `/messages/conversations/${id}/presence`,
    MESSAGES: (id, page = 1, limit = 50) =>
      `/messages/conversations/${id}/messages?page=${page}&limit=${limit}`,
    SEND: (id) => `/messages/conversations/${id}/messages`,
    MARK_READ: (id) => `/messages/conversations/${id}/read`,
    INTERVENTION: (id) => `/messages/conversations/${id}/intervention`,
    SHARED_FILES: (projectId, category = 'all') =>
      `/messages/projects/${projectId}/shared-files?category=${category}`,
  },

  // العقود والاستشارات (Contracts & Consultations)
  CONTRACTS: {
    CONSULTATIONS: '/contracts/consultations',
    CONSULTATION: (id) => `/contracts/consultations/${id}`,
    CREATE_CONSULTATION: '/contracts/consultations',
    UPDATE_BRIEF: (id) => `/contracts/consultations/${id}/brief`,
    CONSULTATION_MESSAGES: (id) => `/contracts/consultations/${id}/messages`,
    CONTRACT_DETAILS: (contractId) => `/contracts/${contractId}`,
    CONTRACT_BY_CONSULTATION: (consultationId) => `/contracts/consultations/${consultationId}/contract`,
    SIGN: (contractId) => `/contracts/${contractId}/sign`,
    EXPERTS: '/contracts/experts',
    BOOK_EXPERT: '/contracts/experts/book',
    MY_EXPERT_BOOKINGS: '/contracts/experts/my-bookings',
  },

  // الملف الشخصي والأمان (Profile, Security & KYC)
  PROFILE: {
    GET: '/profile',
    UPDATE: '/profile',
    DELETE_AVATAR: '/profile/avatar',
    CHANGE_PASSWORD: '/profile/change-password',
    SESSIONS: '/profile/sessions',
    DELETE_SESSION: (id) => `/profile/sessions/${id}`,
    REVOKE_OTHER_SESSIONS: '/profile/sessions/revoke-others',
    TWO_FACTOR_GENERATE: '/profile/2fa/generate',
    TWO_FACTOR_VERIFY: '/profile/2fa/verify',
    TWO_FACTOR_DISABLE: '/profile/2fa/disable',
    VERIFICATION: '/profile/verification',
    REQUEST_VERIFICATION: '/profile/verification/request',
    PREFERENCES: '/profile/preferences',
  },

  // رفع الملفات (Uploads)
  UPLOAD: {
    FILE: '/upload',
    AVATAR: '/upload/avatar',
  },

  // الإشعارات (Notifications)
  NOTIFICATIONS: {
    LIST: (page = 1, limit = 20) => `/notifications?page=${page}&limit=${limit}`,
    READ_ALL: '/notifications/read-all',
    READ_ONE: (id) => `/notifications/${id}/read`,
  },
};
