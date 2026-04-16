# 踩坑记录 - Interview Manager

> 记录项目中遇到的问题和解决方案，避免重蹈覆辙。

## 1. Supabase + Prisma + Vercel Serverless 兼容性问题

### 问题描述
Vercel Serverless 环境连接 Supabase PostgreSQL 时报错：
- `Can't reach database server`
- `prepared statement "s0"/"s1" already exists`

### 根本原因
Supabase 使用 PgBouncer 连接池，PgBouncer 在 Transaction mode 下不支持 Prisma 的 prepared statements。

### 解决方案
**连接字符串格式：**
```
postgresql://postgres.[project-ref]:[password]@aws-[region].pooler.supabase.com:6543/postgres?pgbouncer=true
```

**注意：**
- 使用 **6543 端口**（连接池端口），不是 5432
- 需要 `?pgbouncer=true` 参数
- Prisma 版本需 >= 5.22

### 错误代码
```
PrismaClientUnknownRequestError: prepared statement "s1" already exists
```

---

## 2. Vercel 构建时无法连接数据库

### 问题描述
部署时 Prisma 尝试连接数据库进行静态生成，导致构建失败。

### 根本原因
Next.js 默认会预渲染页面，此时尝试连接数据库。

### 解决方案
在需要动态渲染的页面添加：
```typescript
export const dynamic = 'force-dynamic'
```

### 错误代码
```
PrismaClientInitializationError: Can't reach database server at build time
```

---

## 3. Next.js Date 对象处理

### 问题描述
`item.date.split is not a function` 错误。

### 根本原因
Prisma 从 PostgreSQL 返回 JavaScript Date 对象，不是 ISO 字符串。

### 解决方案
```typescript
// 错误 ❌
const dateKey = item.date.split('T')[0]

// 正确 ✅
const dateKey = new Date(item.date).toISOString().split('T')[0]
```

---

## 4. Cron API 的 User-Agent 验证

### 问题描述
Cron 请求被 401 拦截，无法正常执行。

### 根本原因
Vercel Cron 发出的请求 User-Agent 是 `vercel-cron/1.0`，但代码可能没有正确检查。

### 解决方案
```typescript
const userAgent = request.headers.get('user-agent')
if (!userAgent?.includes('vercel-cron')) {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
}
```

---

## 5. Supabase 连接字符串格式

### 问题描述
各种连接失败、认证失败。

### 正确格式
**新版 Supabase（推荐）：**
```
postgresql://postgres.[project-ref]:[password]@aws-[region].pooler.supabase.com:6543/postgres
```

**旧版格式：**
```
postgresql://postgres:[password]@db.[project-ref].supabase.co:5432/postgres
```

### 注意事项
- 确保密码正确（Supabase 数据库密码可能与账户密码不同）
- 需要在 Supabase Dashboard 设置 "Allow all IP addresses"
- Transaction mode 连接池不支持某些 Prisma 操作

---

## 6. 环境变量生效时机

### 问题描述
修改 Vercel 环境变量后部署不生效。

### 根本原因
- 环境变量修改后需要重新部署
- 可能存在缓存问题

### 解决方案
1. 在 Vercel Dashboard 修改环境变量
2. 点击 "Redeploy" 重新部署
3. 或使用 `vercel env rm` 删除后重新添加

---

## 7. 开发环境 vs 生产环境环境变量

### 问题描述
本地 `vercel env pull` 可能拉取错误的 environment（development 而非 production）。

### 解决方案
指定环境：
```bash
vercel env add DATABASE_URL production --value "..." --yes
vercel env rm DATABASE_URL development --yes
```

---

## 8. 时区问题

### 问题描述
邮件提醒时间与预期不符。

### 根本原因
- PostgreSQL 存储的是 UTC 时间
- JavaScript Date 对象默认使用本地时区
- Vercel 服务器在美国（UTC-5 左右）

### 注意事项
- 存储日期时考虑时区转换
- 显示时使用 `toLocaleDateString('zh-CN', { timeZone: 'Asia/Shanghai' })`
- 提醒时间计算使用 UTC 时间戳

---

## 9. Serverless 冷启动超时

### 问题描述
Cron 函数执行时间过长被中断。

### 解决方案
- 避免复杂查询
- 使用索引优化查询
- Cron 函数设置 `export const runtime = 'nodejs'`

---

## 10. Prisma 全局单例模式

### 问题描述
开发环境热更新时创建多个 Prisma 实例。

### 解决方案
```typescript
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

export const prisma = globalForPrisma.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}
```

---

## 关键配置清单

### Vercel 环境变量（Production）
| 变量名 | 说明 | 示例 |
|--------|------|------|
| DATABASE_URL | Supabase 连接串（含 pgBouncer） | `postgresql://postgres.xxxx:pass@aws-1.pooler.supabase.com:6543/postgres?pgbouncer=true` |
| DIRECT_URL | 直连数据库（用于某些 Prisma 操作） | 同上，去掉 pgBouncer 参数 |
| RESEND_API_KEY | 邮件发送 API Key | `re_xxxx` |

### Vercel Cron 配置（vercel.json）
```json
{
  "crons": [{
    "path": "/api/cron/check-reminders",
    "schedule": "*/10 * * * *"
  }]
}
```

---

## 快速排查清单

1. **数据库连接失败** → 检查连接字符串格式、端口、PgBouncer 参数
2. **Prepared statement 错误** → 确保连接字符串有 `?pgbouncer=true`
3. **构建失败** → 添加 `export const dynamic = 'force-dynamic'`
4. **Cron 不执行** → 检查 User-Agent 验证、日志输出
5. **邮件不发送** → 检查 RESEND_API_KEY、邮箱配置、垃圾邮件
