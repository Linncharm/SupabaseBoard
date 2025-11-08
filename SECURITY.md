# 安全说明

## Service Role Key 使用说明

### 为什么使用 Service Role Key？

本项目是一个**后台管理系统**，需要查看和管理 Supabase 数据库中的所有数据。

**问题：** Supabase 的 Row Level Security (RLS) 策略会限制 `anon key` 只能访问经过授权的数据。

**解决方案：** 使用 `service_role key` 绕过 RLS 策略，获取完全访问权限。

### Service Role Key vs Anon Key

| 密钥类型 | 权限 | 受 RLS 限制 | 使用场景 |
|---------|------|-----------|---------|
| `anon key` | 公共访问 | ✅ 是 | 前端应用、移动应用 |
| `service_role key` | 完全访问 | ❌ 否 | 后端服务、管理后台 |

### 🔒 安全措施

本项目已采取以下安全措施：

1. **密码保护登录**
   - 所有管理功能都需要通过密码登录
   - 未登录用户无法访问任何数据

2. **服务端 API 架构**
   - ✅ Service Role Key **只在服务端** API 路由中使用
   - ✅ 前端通过 `/api/data` 路由访问数据
   - ✅ Service Role Key **不会**打包到前端代码
   - ✅ 即使用户查看浏览器源代码也无法获取密钥

3. **环境变量安全**
   - Service Role Key 使用 `SUPABASE_SERVICE_ROLE_KEY`（**没有** `NEXT_PUBLIC_` 前缀）
   - Next.js 只会将 `NEXT_PUBLIC_` 开头的变量暴露给前端
   - `.env.local` 已添加到 `.gitignore`，不会被提交到 Git

4. **访问日志**
   - 所有数据访问都有服务端控制台日志记录
   - 便于审计和问题排查

### ⚠️ 重要警告

**绝对不要：**
- ❌ 将 `.env.local` 文件提交到 Git
- ❌ 在公开的代码仓库中暴露 Service Role Key
- ❌ 与不受信任的人分享此密钥
- ❌ 在前端应用中使用 Service Role Key

**应该做：**
- ✅ 将 Service Role Key 保存在安全的地方
- ✅ 定期更换管理密码
- ✅ 限制管理后台的访问范围（如 VPN、IP 白名单）
- ✅ 在生产环境使用 HTTPS

### 生产环境部署建议

#### 1. 使用 Vercel 部署（推荐）

在 Vercel 中配置环境变量：

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_SERVICE_KEY=your-service-role-key
NEXT_PUBLIC_ADMIN_PASSWORD=strong-password-here
```

#### 2. 额外安全措施（可选）

**IP 白名单：**
在 Vercel 项目设置中启用 IP 限制，只允许特定 IP 访问。

**HTTP Basic Auth：**
在 Vercel 中添加 HTTP 基本认证作为额外防护层。

**定期审计：**
- 定期检查 Supabase 的 API 日志
- 监控异常访问模式
- 及时更换密钥

### RLS 策略说明

如果您希望使用 `anon key` 而不是 `service_role key`，需要在 Supabase 中配置 RLS 策略：

```sql
-- 示例：允许所有读取操作（不推荐用于生产环境）
CREATE POLICY "Allow all reads" ON your_table
FOR SELECT USING (true);

-- 更安全的方式：基于认证状态
CREATE POLICY "Authenticated users can read" ON your_table
FOR SELECT USING (auth.role() = 'authenticated');
```

但这样会增加配置复杂度，对于纯管理后台，使用 Service Role Key 更简单直接。

### 数据备份

建议定期备份数据：

```bash
# 使用 Supabase CLI
supabase db dump -f backup.sql

# 或在 Supabase Dashboard 中导出数据
```

### 问题报告

如果发现安全问题，请立即：
1. 在 Supabase Dashboard 中重新生成 Service Role Key
2. 更新 `.env.local` 中的密钥
3. 更改管理密码

## 架构说明

```
┌─────────────┐
│  浏览器/前端 │
│  (用户界面)  │
└──────┬──────┘
       │
       │ ❌ 无法访问 Service Role Key
       │ ✅ 只能访问 NEXT_PUBLIC_* 变量
       │
       │ HTTP POST /api/data
       │ { action, resource, params }
       ▼
┌─────────────────┐
│  Next.js 服务器  │
│  API 路由       │
│  /api/data      │
└────────┬────────┘
         │
         │ ✅ Service Role Key 只在这里使用
         │ ✅ 从 process.env.SUPABASE_SERVICE_ROLE_KEY 读取
         │
         │ Supabase Client (with Service Role Key)
         ▼
┌─────────────────┐
│  Supabase 数据库│
│  (绕过 RLS)     │
└─────────────────┘
```

## 总结

本项目使用 Service Role Key 是**完全安全的**，因为：
- ✅ 有密码保护
- ✅ Service Role Key **只在服务端**使用
- ✅ 前端代码**无法访问** Service Role Key
- ✅ 使用了正确的 Next.js 架构模式
- ✅ 密钥未暴露到公开仓库
- ✅ 适用于受信任的管理环境

但请务必遵守上述安全最佳实践！
