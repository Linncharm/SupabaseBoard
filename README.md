# Supabase Board

一个用于展示和管理 Supabase 数据库的后台管理系统。

## 技术栈

- **Refine** - 后台管理框架
- **Next.js 14** - React 全栈框架
- **TypeScript** - 类型安全
- **Material UI** - UI 组件库
- **Supabase** - 后端数据库

## 功能特性

- 🔐 简单密码认证
- 📊 自动识别数据库表结构
- 📝 数据 CRUD 操作（创建、读取、更新、删除）
- 🔍 数据搜索、过滤、排序
- 📄 分页支持
- 🎨 Material Design 风格界面
- 📱 响应式设计

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 配置环境变量

复制 `.env.example` 到 `.env.local` 并填写您的 Supabase 配置：

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Admin Login
NEXT_PUBLIC_ADMIN_PASSWORD=your-admin-password

# Service Role Key (用于获取表结构)
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

**获取 Supabase 配置信息：**

1. 登录 [Supabase Dashboard](https://supabase.com/dashboard)
2. 选择您的项目
3. 进入 Settings → API
4. 复制 `URL` 和 `anon/public` key
5. 复制 `service_role` key（注意：此 key 权限较高，请妥善保管）

### 3. 同步数据库表结构

```bash
npm run sync-schema
```

这个命令会连接到您的 Supabase 数据库，获取所有表的结构信息，并保存到 `src/config/schema.json`。

### 4. 生成 TypeScript 类型定义

```bash
npm run prepare-schema
```

这个命令会根据数据库表结构生成 TypeScript 类型定义和资源配置。

### 5. 启动开发服务器

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 即可看到应用。

默认登录密码为您在 `.env.local` 中设置的 `NEXT_PUBLIC_ADMIN_PASSWORD`。

## 开发指南

### 项目结构

```
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── layout.tsx       # 根布局
│   │   ├── page.tsx         # 主页
│   │   └── login/           # 登录页
│   ├── providers/           # Refine Providers
│   │   ├── dataProvider.ts  # 数据提供者
│   │   └── authProvider.ts  # 认证提供者
│   ├── utils/               # 工具函数
│   │   └── supabase.ts      # Supabase 客户端
│   ├── types/               # TypeScript 类型
│   │   └── database.ts      # 自动生成的数据库类型
│   └── config/              # 配置文件
│       └── schema.json      # 数据库表结构
├── scripts/                 # 脚本
│   ├── sync-schema.ts       # 同步数据库表结构
│   └── prepare-schema.ts    # 生成类型定义
└── public/                  # 静态资源
```

### 可用脚本

- `npm run dev` - 启动开发服务器
- `npm run build` - 构建生产版本
- `npm run start` - 启动生产服务器
- `npm run lint` - 运行 ESLint
- `npm run typecheck` - 类型检查
- `npm run sync-schema` - 同步数据库表结构
- `npm run prepare-schema` - 生成类型定义

## 部署

### Vercel（推荐）

1. 将代码推送到 GitHub
2. 在 [Vercel](https://vercel.com) 中导入项目
3. 配置环境变量（与 `.env.local` 相同）
4. 部署

### 其他平台

本项目是标准的 Next.js 应用，可以部署到任何支持 Next.js 的平台。

## 常见问题

### Q: 如何添加新的表？

A: 在 Supabase 中创建新表后，运行以下命令更新配置：

```bash
npm run sync-schema
npm run prepare-schema
```

然后重启开发服务器。

### Q: 如何自定义字段显示？

A: 编辑生成的资源页面，根据字段类型添加自定义渲染逻辑。

### Q: 如何修改登录方式？

A: 编辑 `src/providers/authProvider.ts`，可以集成 Supabase Auth 或其他认证方式。

## License

MIT
