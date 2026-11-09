import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authService } from '../services/auth.service';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => authService.getCurrentUser());
  const [isAuthenticated, setIsAuthenticated] = useState(() => authService.isAuthenticated());
  const [isLoading, setIsLoading] = useState(true);

  // تحديث حالة المستخدم من السيرفر
  const refreshUser = useCallback(async () => {
    if (!authService.isAuthenticated()) {
      setUser(null);
      setIsAuthenticated(false);
      setIsLoading(false);
      return;
    }

    try {
      const response = await authService.getMe();
      const userData = response?.data?.user || response?.data || null;
      if (userData) {
        setUser((prev) => {
          // دمج البيانات مع الحفاظ على avatar_url إن كان محفوظاً
          const merged = { ...prev, ...userData };
          if (!userData.avatar_url && prev?.avatar_url) {
            merged.avatar_url = prev.avatar_url;
          }
          try {
            localStorage.setItem('user', JSON.stringify(merged));
          } catch (_) {}
          return merged;
        });
        setIsAuthenticated(true);
      }
    } catch {
      // الحفاظ على بيانات المستخدم المحفوظة محلياً إن وُجدت بدلاً من تسجيل الخروج القسري
      const savedUser = authService.getCurrentUser();
      if (savedUser) {
        setUser(savedUser);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshUser();

    // الاستماع لحدث انتهاء الصلاحية من api.js
    const handleUnauthorized = () => {
      setUser(null);
      setIsAuthenticated(false);
    };

    window.addEventListener('auth:unauthorized', handleUnauthorized);
    return () => {
      window.removeEventListener('auth:unauthorized', handleUnauthorized);
    };
  }, [refreshUser]);

  const login = async (email, password, twoFactorCode = null) => {
    const response = await authService.login(email, password, twoFactorCode);

    if (response?.requires_2fa) {
      return response;
    }

    if (response?.success) {
      const loggedUser = response?.data?.user;
      setUser(loggedUser);
      setIsAuthenticated(true);
    }
    return response;
  };

  const register = async (formData) => {
    const response = await authService.register(formData);
    if (response?.success) {
      const newUser = response?.data?.user;
      setUser(newUser);
      setIsAuthenticated(true);
    }
    return response;
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
    setIsAuthenticated(false);
  };

  // تحديث بيانات المستخدم محلياً فوراً وحفظها في localStorage
  const updateUser = (partialData) => {
    setUser((prev) => {
      const updated = prev ? { ...prev, ...partialData } : partialData;
      if (updated) {
        try {
          localStorage.setItem('user', JSON.stringify(updated));
        } catch (_) {}
      }
      return updated;
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        login,
        register,
        logout,
        refreshUser,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Hook مخصص للوصول للـ Auth Context
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthContext;
