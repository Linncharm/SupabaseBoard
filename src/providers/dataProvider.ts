import { DataProvider } from '@refinedev/core';
import { supabase } from '@/utils/supabase';

export const dataProvider: DataProvider = {
  getList: async ({ resource, pagination, filters, sorters, meta }) => {
    const { current = 1, pageSize = 10 } = pagination ?? {};

    let query = supabase.from(resource).select('*', { count: 'exact' });

    // 应用过滤器
    if (filters) {
      filters.forEach((filter) => {
        if ('field' in filter) {
          const { field, operator, value } = filter;

          switch (operator) {
            case 'eq':
              query = query.eq(field, value);
              break;
            case 'ne':
              query = query.neq(field, value);
              break;
            case 'lt':
              query = query.lt(field, value);
              break;
            case 'gt':
              query = query.gt(field, value);
              break;
            case 'lte':
              query = query.lte(field, value);
              break;
            case 'gte':
              query = query.gte(field, value);
              break;
            case 'in':
              query = query.in(field, value);
              break;
            case 'contains':
              query = query.ilike(field, `%${value}%`);
              break;
            case 'containss':
              query = query.like(field, `%${value}%`);
              break;
          }
        }
      });
    }

    // 应用排序
    if (sorters && sorters.length > 0) {
      sorters.forEach((sorter) => {
        if (sorter.field) {
          query = query.order(sorter.field, {
            ascending: sorter.order === 'asc',
          });
        }
      });
    }

    // 应用分页
    if (pagination?.mode === 'off') {
      // 不分页
    } else {
      const from = (current - 1) * pageSize;
      const to = from + pageSize - 1;
      query = query.range(from, to);
    }

    const { data, error, count } = await query;

    if (error) {
      throw error;
    }

    return {
      data: data || [],
      total: count || 0,
    };
  },

  getOne: async ({ resource, id }) => {
    const { data, error } = await supabase
      .from(resource)
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      throw error;
    }

    return {
      data,
    };
  },

  create: async ({ resource, variables }) => {
    const { data, error } = await supabase
      .from(resource)
      .insert(variables)
      .select()
      .single();

    if (error) {
      throw error;
    }

    return {
      data,
    };
  },

  update: async ({ resource, id, variables }) => {
    const { data, error } = await supabase
      .from(resource)
      .update(variables)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw error;
    }

    return {
      data,
    };
  },

  deleteOne: async ({ resource, id }) => {
    const { data, error } = await supabase
      .from(resource)
      .delete()
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw error;
    }

    return {
      data,
    };
  },

  getApiUrl: () => {
    return process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  },

  custom: async ({ url, method, filters, sorters, payload, query, headers }) => {
    // 自定义请求处理
    throw new Error('Custom method not implemented');
  },
};
