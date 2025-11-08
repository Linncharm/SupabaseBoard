import * as fs from 'fs';
import * as path from 'path';

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

// 数据类型映射
const dataTypeMap: Record<string, string> = {
  'bigint': 'number',
  'integer': 'number',
  'smallint': 'number',
  'numeric': 'number',
  'real': 'number',
  'double precision': 'number',
  'boolean': 'boolean',
  'text': 'string',
  'character varying': 'string',
  'varchar': 'string',
  'char': 'string',
  'uuid': 'string',
  'timestamp with time zone': 'string',
  'timestamp without time zone': 'string',
  'date': 'string',
  'time': 'string',
  'json': 'any',
  'jsonb': 'any',
  'array': 'any[]',
};

function mapDataType(pgType: string): string {
  return dataTypeMap[pgType.toLowerCase()] || 'any';
}

function generateTypeDefinitions(tables: TableInfo[]): string {
  let output = '// 自动生成的类型定义文件\n';
  output += '// 请不要手动修改此文件\n\n';

  tables.forEach((table) => {
    const interfaceName = toPascalCase(table.table_name);
    output += `export interface ${interfaceName} {\n`;

    table.columns.forEach((column) => {
      const tsType = mapDataType(column.data_type);
      const optional = column.is_nullable === 'YES' ? '?' : '';
      output += `  ${column.column_name}${optional}: ${tsType};\n`;
    });

    output += '}\n\n';
  });

  // 生成资源配置
  output += '// 资源配置\n';
  output += 'export const RESOURCES = [\n';
  tables.forEach((table) => {
    output += `  {\n`;
    output += `    name: '${table.table_name}',\n`;
    output += `    label: '${toReadableLabel(table.table_name)}',\n`;
    output += `    icon: 'TableChart',\n`;
    output += `  },\n`;
  });
  output += '] as const;\n\n';

  // 生成表名联合类型
  output += 'export type TableName = ';
  output += tables.map(t => `'${t.table_name}'`).join(' | ');
  output += ';\n';

  return output;
}

function toPascalCase(str: string): string {
  return str
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
}

function toReadableLabel(str: string): string {
  return str
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

async function prepareSchema() {
  const schemaPath = path.join(process.cwd(), 'src', 'config', 'schema.json');

  if (!fs.existsSync(schemaPath)) {
    console.error('❌ 错误: 未找到 schema.json 文件');
    console.log('💡 请先运行: npm run sync-schema');
    process.exit(1);
  }

  console.log('📖 正在读取表结构...');
  const schemaContent = fs.readFileSync(schemaPath, 'utf-8');
  const tables: TableInfo[] = JSON.parse(schemaContent);

  console.log('🔨 正在生成 TypeScript 类型定义...');
  const typeDefinitions = generateTypeDefinitions(tables);

  const outputPath = path.join(process.cwd(), 'src', 'types', 'database.ts');
  const outputDir = path.dirname(outputPath);

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(outputPath, typeDefinitions, 'utf-8');

  console.log(`✅ 类型定义生成成功: ${outputPath}`);
  console.log(`\n📊 已生成 ${tables.length} 个表的类型定义:`);
  tables.forEach((table) => {
    console.log(`  - ${toPascalCase(table.table_name)} (来自 ${table.table_name})`);
  });
}

prepareSchema();
