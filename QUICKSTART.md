# 快速开始指南

## 1. 配置环境变量

创建 `.env.local` 文件（项目根目录）：

```bash
# 复制示例文件
cp .env.local.example .env.local
```

编辑 `.env.local`，填入您的 Supabase 配置：

```env
NEXT_PUBLIC_SUPABASE_URL=https://pyxylchyjomttmavzxng.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=你的-anon-key
NEXT_PUBLIC_ADMIN_PASSWORD=你的管理密码
```

### 如何获取 Supabase 密钥？

1. 访问 [Supabase Dashboard](https://supabase.com/dashboard)
2. 选择您的项目：pyxylchyjomttmavzxng
3. 进入 **Settings** → **API**
4. 复制：
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon/public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## 2. 启动开发服务器

```bash
pnpm dev
```

访问: [http://localhost:3000](http://localhost:3000)

## 3. 登录系统

使用您在 `.env.local` 中设置的 `NEXT_PUBLIC_ADMIN_PASSWORD` 登录。

## 当前可用功能

✅ **数据浏览**
- 11 个数据表自动识别
- 分页、搜索、排序
- 智能字段类型识别

✅ **特殊字段支持**
- ID 字段：一键复制
- 时间戳：自动格式化（中文相对时间）
- 图片 URL：预览功能
- JSON 数据：格式化显示
- 布尔值：直观的标签显示

✅ **已识别的数据表**
1. 用户积分 (user_credits)
2. 积分交易记录 (credit_transactions)
3. 房间布局 (room_layouts)
4. 风水建议 (fengshui_advice)
5. 订阅管理 (subscriptions)
6. 套餐计划 (plans)
7. 支付历史 (payment_history)
8. 用户邀请 (user_invitations)
9. 用户反馈 (feedback)
10. 反馈积分奖励 (feedback_credits)
11. 系统健康检查 (_health)

## 下一步开发

如果您想添加编辑、删除功能，只需在 `src/config/resources.tsx` 中为相应资源添加配置，然后创建对应的编辑页面即可。

当前系统已经自动生成了所有必要的类型定义（基于您的 Supabase 类型文件）。

## 常见问题

### Q: 如何更新数据库表结构？

运行以下命令重新生成类型：

```bash
npx supabase gen types typescript --project-id pyxylchyjomttmavzxng --schema public > src/types/supabase.ts
```

然后重启开发服务器。

### Q: 如何添加新表？

如果您在 Supabase 中添加了新表：
1. 重新生成类型（见上一个问题）
2. 在 `src/config/resources.tsx` 中添加新表配置
3. 重启服务器

### Q: 如何部署到生产环境？

推荐使用 Vercel：

```bash
# 安装 Vercel CLI
npm i -g vercel

# 部署
vercel
```

在 Vercel 控制台中配置环境变量（与 .env.local 相同）。
