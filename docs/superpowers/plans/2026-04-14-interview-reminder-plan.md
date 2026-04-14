# 面试提醒功能 - 实现计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 实现面试前邮件提醒功能，用户可设置提醒时间和接收邮箱，Vercel Cron 每分钟检查并发送提醒邮件。

**Architecture:** 在 Interview 模型新增 reminderMinutes 和 reminderSent 字段，新建 Settings 模型存储用户邮箱，通过 Resend API 发送邮件，Vercel Cron Job 触发检查逻辑。

**Tech Stack:** Next.js 14, Prisma, Resend, React Email, Vercel Cron

---

## 文件结构

```
/                           # 根目录
├── prisma/
│   └── schema.prisma       # 修改：新增字段和 Settings 表
├── src/
│   ├── app/
│   │   ├── settings/
│   │   │   └── page.tsx            # 设置页面
│   │   └── api/
│   │       ├── settings/
│   │       │   └── route.ts        # 设置 API
│   │       └── cron/
│   │           └── check-reminders/
│   │               └── route.ts    # Cron 检查 API
│   ├── components/
│   │   └── EmailTemplate.tsx       # 邮件模板组件（复用）
│   ├── lib/
│   │   └── resend.ts               # Resend 客户端
│   └── emails/
│       └── ReminderEmail.tsx        # React Email 邮件模板
├── vercel.json                      # Cron 配置
├── .env                            # 新增环境变量
└── package.json                    # 新增依赖
```

---

## Task 1: 安装依赖和配置环境变量

**Files:**
- Modify: `package.json`
- Modify: `.env`

- [ ] **Step 1: 添加 Resend 依赖到 package.json**

运行命令: `npm install resend @react-email/components`

- [ ] **Step 2: 更新 .env 文件添加新变量**

```env
# Resend API Key
RESEND_API_KEY="re_xxxxx_your_key_here"

# Cron Job 验证密钥
CRON_SECRET="your-random-secret-key"
```

---

## Task 2: 更新数据库模型

**Files:**
- Modify: `prisma/schema.prisma`

- [ ] **Step 1: 更新 prisma/schema.prisma**

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Interview {
  id              String   @id @default(uuid())
  date            DateTime @db.Date
  startTime       String
  endTime         String
  company         String
  position        String
  positionUrl     String?
  interviewType   InterviewType @default(VIDEO)
  meetingUrl      String?
  notes           String?
  shareToken      String   @unique @default(uuid())
  reminderMinutes Int      @default(60)
  reminderSent    Boolean  @default(false)
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
}

model Settings {
  id        String   @id @default(uuid())
  email     String   @unique
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

enum InterviewType {
  VIDEO
  ONSITE
}
```

- [ ] **Step 2: 运行数据库迁移**

Run: `npx prisma db push`
Expected: 数据库 schema 已更新

---

## Task 3: 创建 Resend 客户端

**Files:**
- Create: `src/lib/resend.ts`

- [ ] **Step 1: 创建 src/lib/resend.ts**

```ts
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendReminderEmail({
  to,
  company,
  position,
  date,
  startTime,
  endTime,
  interviewType,
  meetingUrl,
  notes,
}: {
  to: string
  company: string
  position: string
  date: string
  startTime: string
  endTime: string
  interviewType: string
  meetingUrl?: string | null
  notes?: string | null
}) {
  const isVideo = interviewType === 'VIDEO'
  const dateStr = new Date(date).toLocaleDateString('zh-CN', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  })

  const html = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #1a1a1a;">📅 面试提醒</h1>

      <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h2 style="margin: 0 0 10px 0;">${company}</h2>
        <p style="margin: 0; color: #666;">${position}</p>
      </div>

      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #eee;"><strong>📅 日期</strong></td>
          <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${dateStr}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #eee;"><strong>🕐 时间</strong></td>
          <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${startTime} - ${endTime}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #eee;"><strong>📋 类型</strong></td>
          <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${isVideo ? '🎥 视频面试' : '🏢 现场面试'}</td>
        </tr>
      </table>

      ${isVideo && meetingUrl ? `
        <div style="margin: 20px 0; text-align: center;">
          <a href="${meetingUrl}" style="display: inline-block; background: #0066cc; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">
            🎥 加入视频会议
          </a>
        </div>
      ` : ''}

      ${notes ? `
        <div style="background: #fffbeb; border: 1px solid #fcd34d; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 0; color: #92400e;"><strong>📝 备注</strong></p>
          <p style="margin: 5px 0 0 0; color: #92400e;">${notes}</p>
        </div>
      ` : ''}

      <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;" />
      <p style="color: #999; font-size: 12px;">来自面试时间管理器</p>
    </div>
  `

  const text = `
📅 面试提醒

公司: ${company}
岗位: ${position}
时间: ${dateStr} ${startTime} - ${endTime}
类型: ${isVideo ? '视频面试' : '现场面试'}

${isVideo && meetingUrl ? `🎥 加入视频会议: ${meetingUrl}\n` : ''}
${notes ? `📝 备注: ${notes}\n` : ''}
---

来自面试时间管理器
  `.trim()

  const { data, error } = await resend.emails.send({
    from: '面试提醒 <onboarding@resend.dev>',
    to: [to],
    subject: `📅 面试提醒 - ${company} ${position}`,
    html,
    text,
  })

  if (error) {
    console.error('Resend error:', error)
    throw new Error(`Failed to send email: ${error.message}`)
  }

  return data
}
```

---

## Task 4: 创建设置 API

**Files:**
- Create: `src/app/api/settings/route.ts`

- [ ] **Step 1: 创建 src/app/api/settings/route.ts**

```ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const settings = await prisma.settings.findFirst()
  return NextResponse.json({ email: settings?.email || null })
}

export async function POST(request: Request) {
  const body = await request.json()
  const { email } = body

  if (!email || !email.includes('@')) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
  }

  const settings = await prisma.settings.upsert({
    where: { id: 'default' },
    update: { email },
    create: { id: 'default', email },
  })

  return NextResponse.json({ email: settings.email })
}
```

---

## Task 5: 创建 Cron 检查 API

**Files:**
- Create: `src/app/api/cron/check-reminders/route.ts`

- [ ] **Step 1: 创建 src/app/api/cron/check-reminders/route.ts**

```ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { sendReminderEmail } from '@/lib/resend'

export async function POST(request: Request) {
  // 验证 CRON_SECRET
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // 获取设置中的邮箱
  const settings = await prisma.settings.findFirst()
  if (!settings?.email) {
    return NextResponse.json({ message: 'No reminder email configured' })
  }

  const now = new Date()

  // 查询需要发送提醒的面试
  // 条件: reminderSent = false 且 面试时间 - reminderMinutes <= now
  const interviews = await prisma.interview.findMany({
    where: {
      reminderSent: false,
    },
  })

  const toSend: string[] = []

  for (const interview of interviews) {
    const interviewDateTime = new Date(interview.date)
    const [hours, minutes] = interview.startTime.split(':').map(Number)
    interviewDateTime.setHours(hours, minutes, 0, 0)

    const reminderTime = new Date(interviewDateTime.getTime() - interview.reminderMinutes * 60 * 1000)

    if (reminderTime <= now) {
      try {
        await sendReminderEmail({
          to: settings.email,
          company: interview.company,
          position: interview.position,
          date: interview.date.toISOString(),
          startTime: interview.startTime,
          endTime: interview.endTime,
          interviewType: interview.interviewType,
          meetingUrl: interview.meetingUrl,
          notes: interview.notes,
        })

        await prisma.interview.update({
          where: { id: interview.id },
          data: { reminderSent: true },
        })

        toSend.push(interview.id)
      } catch (error) {
        console.error(`Failed to send reminder for interview ${interview.id}:`, error)
      }
    }
  }

  return NextResponse.json({
    success: true,
    sent: toSend.length,
    ids: toSend,
  })
}
```

---

## Task 6: 创建设置页面

**Files:**
- Create: `src/app/settings/page.tsx`

- [ ] **Step 1: 创建 src/app/settings/page.tsx**

```tsx
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function SettingsPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    fetch('/api/settings')
      .then(res => res.json())
      .then(data => {
        if (data.email) setEmail(data.email)
      })
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const res = await fetch('/api/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    })

    if (res.ok) {
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    }
    setLoading(false)
  }

  return (
    <main className="max-w-xl mx-auto p-4">
      <div className="mb-6">
        <Link href="/" className="text-blue-600 hover:underline">← 返回列表</Link>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold mb-2">⚙️ 设置</h1>
        <p className="text-gray-500 mb-6">设置你的提醒接收邮箱</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              提醒邮箱
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
            />
            <p className="text-xs text-gray-500 mt-1">
              面试提醒邮件将发送到此邮箱
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? '保存中...' : saved ? '✓ 已保存' : '保存设置'}
          </button>
        </form>
      </div>

      <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h2 className="font-medium text-yellow-800 mb-2">💡 提醒</h2>
        <ul className="text-sm text-yellow-700 space-y-1">
          <li>• 提醒邮件会在面试前指定时间发送</li>
          <li>• 每条面试可以设置不同的提醒时间</li>
          <li>• 确保邮箱地址填写正确，以免错过提醒</li>
        </ul>
      </div>
    </main>
  )
}
```

---

## Task 7: 更新面试表单

**Files:**
- Modify: `src/components/InterviewForm.tsx`

- [ ] **Step 1: 在 FormData 接口添加 reminderMinutes**

```tsx
interface FormData {
  // ... 现有字段
  reminderMinutes: number  // 新增
}
```

- [ ] **Step 2: 在 useState 初始化中添加 reminderMinutes**

```tsx
const [form, setForm] = useState<FormData>({
  // ... 现有字段
  reminderMinutes: initialData?.reminderMinutes || 60,
})
```

- [ ] **Step 3: 在表单中添加提醒时间输入框**（在备注字段之前）

```tsx
<div>
  <label className="block text-sm font-medium text-gray-700">
    提醒时间
  </label>
  <div className="flex items-center gap-2">
    <input
      type="number"
      min="10"
      max="1440"
      value={form.reminderMinutes}
      onChange={e => setForm({ ...form, reminderMinutes: parseInt(e.target.value) || 60 })}
      required
      className="flex-1 rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
    />
    <span className="text-gray-500">分钟前</span>
  </div>
  <p className="text-xs text-gray-500 mt-1">
    面试前多少分钟发送提醒（10-1440分钟）
  </p>
</div>
```

- [ ] **Step 4: 更新 handleSubmit 包含 reminderMinutes**

```tsx
body: JSON.stringify({
  ...form,
  reminderMinutes: form.reminderMinutes,
})
```

---

## Task 8: 更新 API 支持新字段

**Files:**
- Modify: `src/app/api/interviews/route.ts`
- Modify: `src/app/api/interviews/[id]/route.ts`

- [ ] **Step 1: 更新 POST 处理包含 reminderMinutes**

在 `src/app/api/interviews/route.ts` 的 POST 方法中添加 `reminderMinutes` 字段：
```ts
data: {
  // ... 现有字段
  reminderMinutes: body.reminderMinutes || 60,
}
```

- [ ] **Step 2: 更新 PUT 处理包含 reminderMinutes**

在 `src/app/api/interviews/[id]/route.ts` 的 PUT 方法中添加 `reminderMinutes` 字段：
```ts
data: {
  // ... 现有字段
  reminderMinutes: body.reminderMinutes || 60,
}
```

---

## Task 9: 配置 Vercel Cron

**Files:**
- Create: `vercel.json`

- [ ] **Step 1: 创建 vercel.json**

```json
{
  "crons": [{
    "path": "/api/cron/check-reminders",
    "schedule": "* * * * *"
  }]
}
```

---

## Task 10: 更新详情页显示提醒时间

**Files:**
- Modify: `src/app/interviews/[id]/page.tsx`

- [ ] **Step 1: 在详情页添加提醒时间显示**

在备注之前添加提醒时间显示：
```tsx
<p><span className="font-medium">⏰ 提醒：</span>面试前 {interview.reminderMinutes} 分钟</p>
```

---

## Task 11: 更新 .env.example

**Files:**
- Modify: `.env.example`

- [ ] **Step 1: 添加新环境变量**

```env
# 数据库
DATABASE_URL="postgresql://..."

# Resend API Key (用于发送提醒邮件)
RESEND_API_KEY="re_xxxxx_your_key_here"

# Cron Job 验证密钥
CRON_SECRET="your-random-secret-key"
```

---

## 实现计划总结

| Task | 内容 |
|------|------|
| 1 | 安装依赖和配置环境变量 |
| 2 | 更新数据库模型（新增字段和 Settings 表） |
| 3 | 创建 Resend 客户端和邮件发送函数 |
| 4 | 创建设置 API（GET/POST /api/settings） |
| 5 | 创建 Cron 检查 API |
| 6 | 创建设置页面 |
| 7 | 更新面试表单添加提醒时间字段 |
| 8 | 更新 API 支持新字段 |
| 9 | 配置 Vercel Cron |
| 10 | 更新详情页显示提醒时间 |
| 11 | 更新 .env.example |

---

## 部署后需要做的

1. **注册 Resend**: https://resend.com 注册账号获取 API Key
2. **设置环境变量**: 在 Vercel 项目 Settings > Environment Variables 中添加:
   - `RESEND_API_KEY`: 你的 Resend API Key
   - `CRON_SECRET`: 随机字符串
3. **启用 Cron**: Vercel 会自动根据 vercel.json 配置启用 Cron
4. **验证域名** (可选): 在 Resend 中验证你的域名以便使用自定义发件人
