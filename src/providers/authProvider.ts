import { AuthProvider } from '@refinedev/core';

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'admin123';
const AUTH_KEY = 'supabase-board-auth';

export const authProvider: AuthProvider = {
  login: async ({ password }) => {
    if (password === ADMIN_PASSWORD) {
      localStorage.setItem(AUTH_KEY, 'authenticated');
      return {
        success: true,
        redirectTo: '/',
      };
    }

    return {
      success: false,
      error: {
        name: 'LoginError',
        message: '密码错误',
      },
    };
  },

  logout: async () => {
    localStorage.removeItem(AUTH_KEY);
    return {
      success: true,
      redirectTo: '/login',
    };
  },

  check: async () => {
    const isAuthenticated = localStorage.getItem(AUTH_KEY);

    if (isAuthenticated) {
      return {
        authenticated: true,
      };
    }

    return {
      authenticated: false,
      redirectTo: '/login',
      logout: true,
    };
  },

  getPermissions: async () => {
    return ['admin'];
  },

  getIdentity: async () => {
    return {
      id: 1,
      name: 'Admin',
      avatar: undefined,
    };
  },

  onError: async (error) => {
    console.error(error);
    return { error };
  },
};
