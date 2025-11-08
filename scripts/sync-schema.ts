import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

// 加载环境变量
dotenv.config({ path: '.env.local' });

interface TableColumn {
  column_name: string;
  data_type: string;
  is_nullable: string;
  column_default: string | null;
  character_maximum_length: number | null;
}

interface TableInfo {
  table_name: string;
  columns: TableColumn[];
}

async function syncDatabaseSchema() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceKey) {
    console.error('❌ 错误: 请在 .env.local 中配置 NEXT_PUBLIC_SUPABASE_URL 和 SUPABASE_SERVICE_ROLE_KEY');
    process.exit(1);
  }

  console.log('🔄 正在连接到 Supabase...');
  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  try {
    // 获取所有表
    console.log('📊 正在获取数据库表列表...');
    const { data: tables, error: tablesError } = await supabase
      .rpc('get_all_tables');

    if (tablesError) {
      // 如果没有自定义函数，使用 information_schema
      console.log('⚠️  未找到 get_all_tables 函数，使用 information_schema 查询');

      const { data: schemaData, error: schemaError } = await supabase
        .from('information_schema.tables')
        .select('table_name')
        .eq('table_schema', 'public')
        .not('table_name', 'in', '(schema_migrations)');

      if (schemaError) {
        console.error('❌ 获取表列表失败:', schemaError);
        process.exit(1);
      }

      const tableInfos: TableInfo[] = [];

      // 获取每个表的列信息
      for (const table of schemaData || []) {
        console.log(`  📋 正在获取表 "${table.table_name}" 的结构...`);

        const { data: columns, error: columnsError } = await supabase
          .from('information_schema.columns')
          .select('column_name, data_type, is_nullable, column_default, character_maximum_length')
          .eq('table_schema', 'public')
          .eq('table_name', table.table_name)
          .order('ordinal_position');

        if (columnsError) {
          console.error(`❌ 获取表 "${table.table_name}" 的列信息失败:`, columnsError);
          continue;
        }

        tableInfos.push({
          table_name: table.table_name,
          columns: columns || [],
        });
      }

      // 保存到文件
      const outputPath = path.join(process.cwd(), 'src', 'config', 'schema.json');
      const outputDir = path.dirname(outputPath);

      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }

      fs.writeFileSync(outputPath, JSON.stringify(tableInfos, null, 2), 'utf-8');

      console.log(`\n✅ 成功同步 ${tableInfos.length} 个表的结构`);
      console.log(`📁 结构文件保存在: ${outputPath}\n`);
      console.log('📊 表列表:');
      tableInfos.forEach((table) => {
        console.log(`  - ${table.table_name} (${table.columns.length} 列)`);
      });
    }
  } catch (error) {
    console.error('❌ 同步失败:', error);
    process.exit(1);
  }
}

syncDatabaseSchema();
