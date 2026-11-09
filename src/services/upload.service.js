import api from './api';
import { API_ENDPOINTS } from '../constants/api.constants';

export const uploadService = {
  /**
   * رفع ملف عام (مستند، صورة، ملف مضغوط، تسجيل صوتي)
   * يتم حفظه في مجلد uploads على الخادم
   */
  async uploadFile(file) {
    const formData = new FormData();
    formData.append('file', file);

    const response = await api.post(API_ENDPOINTS.UPLOAD.FILE, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  },

  /**
   * رفع وتحديث الصورة الشخصية للعميل
   * يقوم بتخزين الصورة وتحديث عمود avatar_url في جدول users في قاعدة البيانات
   */
  async uploadAvatar(file) {
    const formData = new FormData();
    formData.append('avatar', file);

    const response = await api.post(API_ENDPOINTS.UPLOAD.AVATAR, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  },

  /**
   * حفظ بيانات الملف في جدول الملفات المشتركة للمشروع (project_shared_files) في قاعدة البيانات
   */
  async saveSharedFileMetadata(projectId, fileData) {
    const response = await api.post(`/messages/projects/${projectId}/shared-files`, {
      fileName: fileData.fileName || fileData.file_name,
      fileUrl: fileData.fileUrl || fileData.file_url,
      fileType: fileData.fileType || fileData.file_type || 'FILE',
      fileCategory: fileData.fileCategory || fileData.file_category || 'documents',
      fileSize: fileData.fileSize || fileData.file_size || '1.0 MB',
      previewImageUrl: fileData.previewImageUrl || fileData.preview_image_url || null,
      audioDuration: fileData.audioDuration || fileData.audio_duration || null,
    });

    return response.data;
  },

  /**
   * رفع الملف وحفظه مباشرة في قاعدة بيانات مستودع ملفات المشروع المشتركة
   */
  async uploadAndSaveToProject(projectId, file, category = null) {
    // 1. رفع الملف الفعلي على السيرفر
    const uploadRes = await this.uploadFile(file);
    const uploaded = uploadRes?.data || uploadRes;

    // 2. تسجيل وحفظ الملف في قاعدة البيانات
    const dbRecord = await this.saveSharedFileMetadata(projectId, {
      fileName: uploaded.file_name,
      fileUrl: uploaded.file_url,
      fileType: uploaded.file_type,
      fileCategory: category || uploaded.file_category,
      fileSize: uploaded.file_size,
    });

    return {
      uploaded,
      dbRecord: dbRecord?.data || dbRecord,
    };
  },
};

export default uploadService;
