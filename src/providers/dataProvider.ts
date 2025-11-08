import { DataProvider } from '@refinedev/core';

// 使用 API 路由而不是直接访问 Supabase
// 这样 SERVICE_ROLE_KEY 只在服务端使用，不会暴露给前端
async function apiRequest(action: string, resource: string, params: any = {}) {
  const response = await fetch('/api/data', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      action,
      resource,
      params,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'API request failed');
  }

  return response.json();
}

export const dataProvider: DataProvider = {
  getList: async ({ resource, pagination, filters, sorters, meta }) => {
    const result = await apiRequest('getList', resource, {
      pagination,
      filters,
      sorters,
    });

    return {
      data: result.data as any,
      total: result.total,
    };
  },

  getOne: async ({ resource, id }) => {
    const result = await apiRequest('getOne', resource, { id });

    return {
      data: result.data as any,
    };
  },

  create: async ({ resource, variables }) => {
    const result = await apiRequest('create', resource, { variables });

    return {
      data: result.data as any,
    };
  },

  update: async ({ resource, id, variables }) => {
    const result = await apiRequest('update', resource, { id, variables });

    return {
      data: result.data as any,
    };
  },

  deleteOne: async ({ resource, id }) => {
    const result = await apiRequest('deleteOne', resource, { id });

    return {
      data: result.data as any,
    };
  },

  getApiUrl: () => {
    return '/api/data';
  },

  custom: async ({ url, method, filters, sorters, payload, query, headers }) => {
    // 自定义请求处理
    throw new Error('Custom method not implemented');
  },
};
