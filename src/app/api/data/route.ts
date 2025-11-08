import { NextRequest, NextResponse } from 'next/server';
import { supabaseServer } from '@/utils/supabase-server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, resource, params } = body;

    console.log(`📡 API Request: ${action} on ${resource}`);

    switch (action) {
      case 'getList': {
        const { pagination, filters, sorters } = params;
        const { current = 1, pageSize = 10 } = pagination ?? {};

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let query: any = supabaseServer.from(resource as any).select('*', { count: 'exact' });

        // 应用过滤器
        if (filters && Array.isArray(filters)) {
          filters.forEach((filter: any) => {
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
          sorters.forEach((sorter: any) => {
            if (sorter.field) {
              query = query.order(sorter.field, {
                ascending: sorter.order === 'asc',
              });
            }
          });
        }

        // 应用分页
        if (pagination?.mode !== 'off') {
          const from = (current - 1) * pageSize;
          const to = from + pageSize - 1;
          query = query.range(from, to);
        }

        const { data, error, count } = await query;

        if (error) {
          console.error(`❌ Error fetching ${resource}:`, error);
          return NextResponse.json({ error: error.message }, { status: 400 });
        }

        console.log(`✅ Fetched ${resource}: ${data?.length || 0} records`);

        return NextResponse.json({
          data: data || [],
          total: count || 0,
        });
      }

      case 'getOne': {
        const { id } = params;
        const { data, error } = await supabaseServer
          .from(resource as any)
          .select('*')
          .eq('id', id)
          .single();

        if (error) {
          console.error(`❌ Error fetching ${resource}/${id}:`, error);
          return NextResponse.json({ error: error.message }, { status: 400 });
        }

        return NextResponse.json({ data });
      }

      case 'create': {
        const { variables } = params;
        const { data, error } = await supabaseServer
          .from(resource as any)
          .insert(variables as any)
          .select()
          .single();

        if (error) {
          console.error(`❌ Error creating ${resource}:`, error);
          return NextResponse.json({ error: error.message }, { status: 400 });
        }

        return NextResponse.json({ data });
      }

      case 'update': {
        const { id, variables } = params;
        const { data, error } = await supabaseServer
          .from(resource as any)
          .update(variables as any)
          .eq('id', id)
          .select()
          .single();

        if (error) {
          console.error(`❌ Error updating ${resource}/${id}:`, error);
          return NextResponse.json({ error: error.message }, { status: 400 });
        }

        return NextResponse.json({ data });
      }

      case 'deleteOne': {
        const { id } = params;
        const { data, error } = await supabaseServer
          .from(resource as any)
          .delete()
          .eq('id', id)
          .select()
          .single();

        if (error) {
          console.error(`❌ Error deleting ${resource}/${id}:`, error);
          return NextResponse.json({ error: error.message }, { status: 400 });
        }

        return NextResponse.json({ data });
      }

      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }
  } catch (error: any) {
    console.error('❌ API Error:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}
