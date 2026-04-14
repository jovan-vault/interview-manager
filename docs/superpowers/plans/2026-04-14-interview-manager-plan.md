# 面试时间管理器 - 实现计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 搭建一个完整的面试时间管理网页应用，支持添加/编辑/删除面试记录，按日期分组展示，并通过唯一链接分享面试信息。

**Architecture:** 使用 Next.js 14 App Router 构建全栈应用，Prisma ORM 操作 PostgreSQL 数据库，前端使用 Tailwind CSS，部署在 Vercel 平台。分享功能通过 UUID Token 实现，无需用户认证。

**Tech Stack:** Next.js 14, Prisma, PostgreSQL, Tailwind CSS, Vercel

---

## 文件结构

```
/                       # 根目录
├── prisma/
│   └── schema.prisma   # 数据库模型定义
├── src/
│   ├── app/
│   │   ├── layout.tsx              # 根布局
│   │   ├── page.tsx                # 首页 - 面试列表
│   │   ├── globals.css             # 全局样式
│   │   ├── interviews/
│   │   │   ├── new/
│   │   │   │   └── page.tsx        # 添加面试页
│   │   │   └── [id]/
│   │   │       ├── page.tsx        # 面试详情页
│   │   │       └── edit/
│   │   │           └── page.tsx    # 编辑面试页
│   │   ├── share/
│   │   │   └── [token]/
│   │   │       └── page.tsx        # 分享页（只读）
│   │   └── api/
│   │       └── interviews/
│   │           ├── route.ts        # GET (列表) / POST (创建)
│   │           └── [id]/
│   │               └── route.ts    # GET / PUT / DELETE
│   ├── components/
│   │   ├── InterviewCard.tsx       # 面试卡片组件
│   │   ├── InterviewForm.tsx       # 面试表单组件
│   │   └── ShareButton.tsx         # 分享按钮组件
│   └── lib/
│       └── prisma.ts               # Prisma 客户端实例
├── .env                           # 环境变量
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.js
```

---

## Task 1: 初始化 Next.js 项目

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `next.config.js`
- Create: `tailwind.config.ts`
- Create: `src/app/globals.css`
- Create: `src/app/layout.tsx`
- Create: `src/app/page.tsx`
- Create: `.env`

- [ ] **Step 1: 创建 package.json**

```json
{
  "name": "interview-manager",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "db:push": "prisma db push",
    "db:generate": "prisma generate",
    "db:studio": "prisma studio"
  },
  "dependencies": {
    "next": "14.2.3",
    "react": "^18",
    "react-dom": "^18",
    "@prisma/client": "^5.12"
  },
  "devDependencies": {
    "typescript": "^5",
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "prisma": "^5.12",
    "tailwindcss": "^3.4.1",
    "postcss": "^8",
    "autoprefixer": "^10",
    "eslint": "^8",
    "eslint-config-next": "14.2.3"
  }
}
```

- [ ] **Step 2: 创建 tsconfig.json**

```json
{
  "compilerOptions": {
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./src/*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

- [ ] **Step 3: 创建 next.config.js**

```js
/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = nextConfig
```

- [ ] **Step 4: 创建 tailwind.config.ts**

```ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: { extend: {} },
  plugins: [],
}
export default config
```

- [ ] **Step 5: 创建 postcss.config.js**

```js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

- [ ] **Step 6: 创建 src/app/globals.css**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root { --foreground-rgb: 0, 0, 0; --background-start-rgb: 214, 219, 220; --background-end-rgb: 255, 255, 255; }
body { color: rgb(var(--foreground-rgb)); background: linear-gradient(to bottom, transparent, rgb(var(--background-end-rgb))) rgb(var(--background-start-rgb)); }
```

- [ ] **Step 7: 创建 src/app/layout.tsx**

```tsx
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '面试时间管理器',
  description: '管理你的面试时间，不再错过任何面试',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen bg-gray-50">{children}</body>
    </html>
  )
}
```

- [ ] **Step 8: 创建 src/app/page.tsx (首页占位)**

```tsx
export default function Home() {
  return <main className="p-8"><h1 className="text-2xl font-bold">面试时间管理器</h1></main>
}
```

- [ ] **Step 9: 创建 .env**

```
DATABASE_URL="postgresql://user:password@localhost:5432/interview_manager?schema=public"
```

- [ ] **Step 10: 初始化项目**

Run: `npm install`
Expected: 安装所有依赖

---

## Task 2: 设置 Prisma 和数据库

**Files:**
- Create: `prisma/schema.prisma`
- Create: `src/lib/prisma.ts`

- [ ] **Step 1: 创建 prisma/schema.prisma**

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Interview {
  id           String   @id @default(uuid())
  date         DateTime @db.Date
  startTime    String
  endTime      String
  company      String
  position     String
  positionUrl  String?
  interviewType String  @default(VIDEO)
  meetingUrl   String?
  notes        String?
  shareToken   String   @unique @default(uuid())
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
}

enum InterviewType {
  VIDEO
  ONSITE
}
```

- [ ] **Step 2: 创建 src/lib/prisma.ts**

```ts
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

export const prisma = globalForPrisma.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
```

- [ ] **Step 3: 生成 Prisma 客户端**

Run: `npx prisma generate`
Expected: PrismaClient generated

---

## Task 3: 创建面试列表页 (首页)

**Files:**
- Modify: `src/app/page.tsx`
- Create: `src/components/InterviewCard.tsx`

- [ ] **Step 1: 创建 src/components/InterviewCard.tsx**

```tsx
interface Interview {
  id: string
  date: string
  startTime: string
  endTime: string
  company: string
  position: string
  interviewType: string
  meetingUrl?: string | null
}

interface Props { interview: Interview }

export default function InterviewCard({ interview }: Props) {
  const date = new Date(interview.date)
  const dateStr = date.toLocaleDateString('zh-CN', { weekday: 'long', month: 'long', day: 'numeric' })
  const isVideo = interview.interviewType === 'VIDEO'

  return (
    <div className="bg-white rounded-lg shadow p-4 mb-3 border border-gray-100">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-lg">{interview.company}</h3>
          <p className="text-gray-600">{interview.position}</p>
        </div>
        <span className={`text-xs px-2 py-1 rounded ${isVideo ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>
          {isVideo ? '视频' : '现场'}
        </span>
      </div>
      <div className="mt-3 text-sm text-gray-500">
        <p>📅 {dateStr}</p>
        <p>🕐 {interview.startTime} - {interview.endTime}</p>
        {isVideo && interview.meetingUrl && (
          <a href={interview.meetingUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline mt-1 block">
            🔗 加入视频会议
          </a>
        )}
      </div>
      <div className="mt-3 flex gap-2">
        <a href={`/interviews/${interview.id}`} className="text-sm text-blue-600 hover:underline">查看详情</a>
        <a href={`/interviews/${interview.id}/edit`} className="text-sm text-gray-600 hover:underline">编辑</a>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: 修改 src/app/page.tsx**

```tsx
import InterviewCard from '@/components/InterviewCard'

async function getInterviews() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/interviews`, { cache: 'no-store' })
  if (!res.ok) return []
  return res.json()
}

export default async function Home() {
  const interviews = await getInterviews()

  const grouped = interviews.reduce((acc: Record<string, typeof interviews>, item: any) => {
    const dateKey = item.date.split('T')[0]
    if (!acc[dateKey]) acc[dateKey] = []
    acc[dateKey].push(item)
    return acc
  }, {})

  const sortedDates = Object.keys(grouped).sort()

  return (
    <main className="max-w-2xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">📅 面试日程</h1>
        <a href="/interviews/new" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
          + 添加面试
        </a>
      </div>

      {sortedDates.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <p className="text-lg">暂无面试安排</p>
          <p className="mt-2">点击上方按钮添加你的第一个面试</p>
        </div>
      ) : (
        sortedDates.map(date => (
          <div key={date} className="mb-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-3">
              {new Date(date).toLocaleDateString('zh-CN', { month: 'long', day: 'numeric', weekday: 'long' })}
            </h2>
            {grouped[date].map((interview: any) => (
              <InterviewCard key={interview.id} interview={interview} />
            ))}
          </div>
        ))
      )}
    </main>
  )
}
```

---

## Task 4: 创建 API 路由

**Files:**
- Create: `src/app/api/interviews/route.ts`
- Create: `src/app/api/interviews/[id]/route.ts`

- [ ] **Step 1: 创建 src/app/api/interviews/route.ts**

```ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const interviews = await prisma.interview.findMany({ orderBy: { date: 'asc' } })
  return NextResponse.json(interviews)
}

export async function POST(request: Request) {
  const body = await request.json()
  const { date, startTime, endTime, company, position, positionUrl, interviewType, meetingUrl, notes } = body

  const interview = await prisma.interview.create({
    data: {
      date: new Date(date),
      startTime,
      endTime,
      company,
      position,
      positionUrl: positionUrl || null,
      interviewType,
      meetingUrl: meetingUrl || null,
      notes: notes || null,
    },
  })

  return NextResponse.json(interview, { status: 201 })
}
```

- [ ] **Step 2: 创建 src/app/api/interviews/[id]/route.ts**

```ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const interview = await prisma.interview.findUnique({ where: { id: params.id } })
  if (!interview) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(interview)
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const body = await request.json()
  const { date, startTime, endTime, company, position, positionUrl, interviewType, meetingUrl, notes } = body

  const interview = await prisma.interview.update({
    where: { id: params.id },
    data: {
      date: new Date(date),
      startTime,
      endTime,
      company,
      position,
      positionUrl: positionUrl || null,
      interviewType,
      meetingUrl: meetingUrl || null,
      notes: notes || null,
    },
  })

  return NextResponse.json(interview)
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  await prisma.interview.delete({ where: { id: params.id } })
  return NextResponse.json({ success: true })
}
```

---

## Task 5: 创建面试表单组件

**Files:**
- Create: `src/components/InterviewForm.tsx`

- [ ] **Step 1: 创建 src/components/InterviewForm.tsx**

```tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface FormData {
  date: string
  startTime: string
  endTime: string
  company: string
  position: string
  positionUrl: string
  interviewType: 'VIDEO' | 'ONSITE'
  meetingUrl: string
  notes: string
}

interface Props {
  initialData?: Partial<FormData>
  mode: 'create' | 'edit'
  id?: string
}

export default function InterviewForm({ initialData, mode, id }: Props) {
  const router = useRouter()
  const [form, setForm] = useState<FormData>({
    date: initialData?.date || '',
    startTime: initialData?.startTime || '',
    endTime: initialData?.endTime || '',
    company: initialData?.company || '',
    position: initialData?.position || '',
    positionUrl: initialData?.positionUrl || '',
    interviewType: initialData?.interviewType || 'VIDEO',
    meetingUrl: initialData?.meetingUrl || '',
    notes: initialData?.notes || '',
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const url = mode === 'create' ? '/api/interviews' : `/api/interviews/${id}`
    const method = mode === 'create' ? 'POST' : 'PUT'

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })

    if (res.ok) {
      router.push('/')
      router.refresh()
    } else {
      alert('保存失败')
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto">
      <div>
        <label className="block text-sm font-medium text-gray-700">日期</label>
        <input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} required
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">开始时间</label>
          <input type="time" value={form.startTime} onChange={e => setForm({ ...form, startTime: e.target.value })} required
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">结束时间</label>
          <input type="time" value={form.endTime} onChange={e => setForm({ ...form, endTime: e.target.value })} required
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">公司名称</label>
        <input type="text" value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} required
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500" />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">岗位名称</label>
        <input type="text" value={form.position} onChange={e => setForm({ ...form, position: e.target.value })} required
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500" />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">职位链接 (可选)</label>
        <input type="url" value={form.positionUrl} onChange={e => setForm({ ...form, positionUrl: e.target.value })}
          placeholder="https://..."
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500" />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">面试形式</label>
        <select value={form.interviewType} onChange={e => setForm({ ...form, interviewType: e.target.value as 'VIDEO' | 'ONSITE' })}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500">
          <option value="VIDEO">视频面试</option>
          <option value="ONSITE">现场面试</option>
        </select>
      </div>

      {form.interviewType === 'VIDEO' && (
        <div>
          <label className="block text-sm font-medium text-gray-700">视频会议链接</label>
          <input type="url" value={form.meetingUrl} onChange={e => setForm({ ...form, meetingUrl: e.target.value })}
            placeholder="https://feishu.cn/..."
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500" />
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700">备注 (可选)</label>
        <textarea value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} rows={3}
          placeholder="面试官姓名、注意事项等..."
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500" />
      </div>

      <div className="flex gap-3">
        <button type="submit" disabled={loading}
          className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50">
          {loading ? '保存中...' : '保存'}
        </button>
        <button type="button" onClick={() => router.back()}
          className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300">
          取消
        </button>
      </div>
    </form>
  )
}
```

---

## Task 6: 创建添加/编辑/详情页面

**Files:**
- Create: `src/app/interviews/new/page.tsx`
- Create: `src/app/interviews/[id]/page.tsx`
- Create: `src/app/interviews/[id]/edit/page.tsx`

- [ ] **Step 1: 创建 src/app/interviews/new/page.tsx**

```tsx
import InterviewForm from '@/components/InterviewForm'

export default function NewInterview() {
  return (
    <main className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">添加面试</h1>
      <InterviewForm mode="create" />
    </main>
  )
}
```

- [ ] **Step 2: 创建 src/app/interviews/[id]/page.tsx**

```tsx
import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import Link from 'next/link'

export default async function InterviewDetail({ params }: { params: { id: string } }) {
  const interview = await prisma.interview.findUnique({ where: { id: params.id } })
  if (!interview) notFound()

  const date = new Date(interview.date).toLocaleDateString('zh-CN', { weekday: 'long', month: 'long', day: 'numeric' })
  const isVideo = interview.interviewType === 'VIDEO'

  return (
    <main className="max-w-2xl mx-auto p-4">
      <div className="mb-6">
        <Link href="/" className="text-blue-600 hover:underline">← 返回列表</Link>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-2xl font-bold">{interview.company}</h1>
            <p className="text-gray-600 text-lg">{interview.position}</p>
          </div>
          <span className={`text-sm px-3 py-1 rounded ${isVideo ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>
            {isVideo ? '视频面试' : '现场面试'}
          </span>
        </div>

        <div className="space-y-3 text-gray-700">
          <p><span className="font-medium">📅 日期：</span>{date}</p>
          <p><span className="font-medium">🕐 时间：</span>{interview.startTime} - {interview.endTime}</p>

          {interview.positionUrl && (
            <p><span className="font-medium">🔗 职位链接：</span>
              <a href={interview.positionUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline ml-1">
                查看职位
              </a>
            </p>
          )}

          {isVideo && interview.meetingUrl && (
            <p><span className="font-medium">🎥 会议链接：</span>
              <a href={interview.meetingUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline ml-1">
                加入会议
              </a>
            </p>
          )}

          {interview.notes && (
            <p><span className="font-medium">📝 备注：</span>{interview.notes}</p>
          )}
        </div>

        <div className="mt-6 flex gap-3">
          <Link href={`/interviews/${interview.id}/edit`}
            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">
            编辑
          </Link>
          <button onClick={async () => {
            if (confirm('确定删除这条面试记录？')) {
              await fetch(`/api/interviews/${interview.id}`, { method: 'DELETE' })
              window.location.href = '/'
            }
          }}
            className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600">
            删除
          </button>
        </div>
      </div>
    </main>
  )
}
```

- [ ] **Step 3: 创建 src/app/interviews/[id]/edit/page.tsx**

```tsx
import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import InterviewForm from '@/components/InterviewForm'

export default async function EditInterview({ params }: { params: { id: string } }) {
  const interview = await prisma.interview.findUnique({ where: { id: params.id } })
  if (!interview) notFound()

  const initialData = {
    date: interview.date.toISOString().split('T')[0],
    startTime: interview.startTime,
    endTime: interview.endTime,
    company: interview.company,
    position: interview.position,
    positionUrl: interview.positionUrl || '',
    interviewType: interview.interviewType,
    meetingUrl: interview.meetingUrl || '',
    notes: interview.notes || '',
  }

  return (
    <main className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">编辑面试</h1>
      <InterviewForm mode="edit" id={interview.id} initialData={initialData} />
    </main>
  )
}
```

---

## Task 7: 创建分享页面

**Files:**
- Create: `src/app/share/[token]/page.tsx`
- Modify: `src/app/api/interviews/route.ts` (添加按 token 获取)

- [ ] **Step 1: 修改 src/app/api/interviews/route.ts 添加按 shareToken 查询**

```ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const token = searchParams.get('token')

  if (token) {
    const interview = await prisma.interview.findUnique({ where: { shareToken: token } })
    if (!interview) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(interview)
  }

  const interviews = await prisma.interview.findMany({ orderBy: { date: 'asc' } })
  return NextResponse.json(interviews)
}

export async function POST(request: Request) {
  const body = await request.json()
  const { date, startTime, endTime, company, position, positionUrl, interviewType, meetingUrl, notes } = body

  const interview = await prisma.interview.create({
    data: {
      date: new Date(date),
      startTime,
      endTime,
      company,
      position,
      positionUrl: positionUrl || null,
      interviewType,
      meetingUrl: meetingUrl || null,
      notes: notes || null,
    },
  })

  return NextResponse.json(interview, { status: 201 })
}
```

- [ ] **Step 2: 创建 src/app/share/[token]/page.tsx**

```tsx
import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'

export default async function SharePage({ params }: { params: { token: string } }) {
  const interview = await prisma.interview.findUnique({ where: { shareToken: params.token } })
  if (!interview) notFound()

  const date = new Date(interview.date).toLocaleDateString('zh-CN', { weekday: 'long', month: 'long', day: 'numeric' })
  const isVideo = interview.interviewType === 'VIDEO'

  return (
    <main className="max-w-2xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">📅 面试邀请</h1>
          <p className="text-gray-500 mt-1">来自面试时间管理器的分享</p>
        </div>

        <div className="space-y-4 border-t pt-6">
          <div className="text-center">
            <h2 className="text-xl font-semibold">{interview.company}</h2>
            <p className="text-gray-600">{interview.position}</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 space-y-2">
            <p className="text-center">
              <span className="text-2xl">📅</span> {date}
            </p>
            <p className="text-center text-gray-700 font-medium">
              🕐 {interview.startTime} - {interview.endTime}
            </p>
            <p className="text-center">
              <span className={`inline-block px-3 py-1 rounded text-sm ${isVideo ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>
                {isVideo ? '🎥 视频面试' : '🏢 现场面试'}
              </span>
            </p>
          </div>

          {isVideo && interview.meetingUrl && (
            <div className="text-center">
              <a href={interview.meetingUrl} target="_blank" rel="noopener noreferrer"
                className="inline-block bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition">
                🎥 加入视频会议
              </a>
            </div>
          )}

          {interview.positionUrl && (
            <p className="text-center text-sm text-gray-500">
              职位链接：<a href={interview.positionUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                点击查看
              </a>
            </p>
          )}

          {interview.notes && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
              <p className="text-sm font-medium text-yellow-800">📝 备注</p>
              <p className="text-yellow-700 mt-1">{interview.notes}</p>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
```

---

## Task 8: 添加分享按钮组件

**Files:**
- Create: `src/components/ShareButton.tsx`
- Modify: `src/app/interviews/[id]/page.tsx`

- [ ] **Step 1: 创建 src/components/ShareButton.tsx**

```tsx
'use client'

import { useState } from 'react'

interface Props { shareToken: string }

export default function ShareButton({ shareToken }: Props) {
  const [copied, setCopied] = useState(false)
  const shareUrl = typeof window !== 'undefined' ? `${window.location.origin}/share/${shareToken}` : ''

  const handleCopy = async () => {
    await navigator.clipboard.writeText(shareUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button onClick={handleCopy}
      className="bg-gray-100 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-200 transition flex items-center gap-2">
      {copied ? '✓ 已复制' : '🔗 复制分享链接'}
    </button>
  )
}
```

- [ ] **Step 2: 修改 src/app/interviews/[id]/page.tsx 添加分享按钮**

在详情页添加分享按钮到操作区：

```tsx
// 在 import 部分添加
import ShareButton from '@/components/ShareButton'

// 在详情页的按钮区域，将编辑/删除按钮放在一行，ShareButton 单独一行或放在合适位置
```

---

## Task 9: 添加空状态和 404 页面

**Files:**
- Create: `src/app/not-found.tsx`

- [ ] **Step 1: 创建 src/app/not-found.tsx**

```tsx
import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="max-w-2xl mx-auto p-4 text-center py-20">
      <h1 className="text-6xl font-bold text-gray-300 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">页面不存在</h2>
      <p className="text-gray-500 mb-6">你访问的页面可能已被删除或不存在</p>
      <Link href="/" className="text-blue-600 hover:underline">返回首页</Link>
    </main>
  )
}
```

---

## Task 10: 部署配置

**Files:**
- Create: `vercel.json` (可选)
- Modify: `.env.example`

- [ ] **Step 1: 创建 .env.example**

```
DATABASE_URL="postgresql://user:password@host:5432/interview_manager?schema=public"
```

- [ ] **Step 2: 更新 README 说明部署步骤**

---

## 实现计划总结

| Task | 内容 |
|------|------|
| Task 1 | 初始化 Next.js 项目 |
| Task 2 | 设置 Prisma 和数据库 |
| Task 3 | 创建面试列表页 (首页) |
| Task 4 | 创建 API 路由 |
| Task 5 | 创建面试表单组件 |
| Task 6 | 创建添加/编辑/详情页面 |
| Task 7 | 创建分享页面 |
| Task 8 | 添加分享按钮组件 |
| Task 9 | 添加空状态和 404 页面 |
| Task 10 | 部署配置 |

---

**Plan complete.** 保存于 `docs/superpowers/plans/2026-04-14-interview-manager-plan.md`
