# 前端重构实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 重构面试管理应用前端样式：首页面试列表改时间线布局，新增招呼语生成和问题记录两个独立页面

**Architecture:** 采用现代简约风格，垂直时间线布局。首页保持 max-w-2xl 宽度，新页面使用 max-w-5xl。组件化设计，新页面为纯展示（无实际功能）。

**Tech Stack:** Next.js 14 App Router, Tailwind CSS, TypeScript

---

## 文件结构

```
src/
├── app/
│   ├── greeting/
│   │   └── page.tsx              # [新建] 招呼语生成页面
│   ├── questions/
│   │   └── page.tsx              # [新建] 问题记录页面
│   ├── page.tsx                  # [修改] 首页（面试列表时间线化）
│   └── layout.tsx                # [修改] 导航栏（添加新入口）
├── components/
│   ├── InterviewTimeline.tsx     # [新建] 时间线式面试卡片组件
│   ├── GreetingForm.tsx          # [新建] 招呼语表单组件
│   ├── GreetingPreview.tsx       # [新建] 招呼语预览组件
│   ├── QuestionList.tsx          # [新建] 问题列表组件
│   └── QuestionDetail.tsx        # [新建] 问题详情+分析组件
```

---

## Task 1: 创建 InterviewTimeline 组件

**Files:**
- Create: `src/components/InterviewTimeline.tsx`

**Reference:** 现有 `src/components/InterviewCard.tsx` 样式参考

- [ ] **Step 1: 创建 InterviewTimeline.tsx 组件文件**

```tsx
// src/components/InterviewTimeline.tsx
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

interface Props {
  interview: Interview
  isLast?: boolean
}

export default function InterviewTimeline({ interview, isLast = false }: Props) {
  const isVideo = interview.interviewType === 'VIDEO'

  return (
    <div className="flex gap-4">
      {/* 左侧时间线 */}
      <div className="flex flex-col items-center">
        <div className={`w-3 h-3 rounded-full ${isVideo ? 'bg-blue-500' : 'bg-green-500'}`}></div>
        {!isLast && <div className="w-0.5 flex-1 bg-gray-200 mt-1"></div>}
      </div>
      {/* 右侧内容 */}
      <div className="flex-1 pb-6">
        <div className="text-sm text-gray-500 font-medium">{interview.startTime}</div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mt-1">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-gray-800">{interview.company}</h3>
              <p className="text-gray-500 text-sm">{interview.position}</p>
            </div>
            <span className={`text-xs px-2 py-1 rounded-full ${isVideo ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>
              {isVideo ? '视频' : '现场'}
            </span>
          </div>
          <div className="mt-3 text-sm text-gray-500">
            <p>🕐 {interview.startTime} - {interview.endTime}</p>
            {isVideo && interview.meetingUrl && (
              <a href={interview.meetingUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline mt-1 block">
                🔗 加入视频会议
              </a>
            )}
          </div>
          <div className="mt-3 flex gap-3">
            <a href={`/interviews/${interview.id}`} className="text-sm text-blue-600 hover:underline">查看详情</a>
            <a href={`/interviews/${interview.id}/edit`} className="text-sm text-gray-500 hover:text-gray-700">编辑</a>
          </div>
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: 提交**

```bash
git add src/components/InterviewTimeline.tsx
git commit -m "feat: add InterviewTimeline component with timeline layout

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

## Task 2: 重构首页 — 面试列表时间线化

**Files:**
- Modify: `src/app/page.tsx:1-59`

- [ ] **Step 1: 阅读现有 page.tsx**

确认当前代码结构，特别是 `getInterviews` 和数据分组逻辑。

- [ ] **Step 2: 替换 InterviewCard 导入为 InterviewTimeline**

```tsx
import InterviewTimeline from '@/components/InterviewTimeline'
// 移除: import InterviewCard from '@/components/InterviewCard'
```

- [ ] **Step 3: 修改面试卡片渲染部分**

将原来的：
```tsx
{grouped[date].map((interview: any) => (
  <InterviewCard key={interview.id} interview={interview} />
))}
```

替换为：
```tsx
{grouped[date].map((interview: any, index: number) => (
  <InterviewTimeline 
    key={interview.id} 
    interview={interview}
    isLast={index === grouped[date].length - 1}
  />
))}
```

- [ ] **Step 4: 运行开发服务器验证**

```bash
npm run dev
```

访问 http://localhost:3000 确认面试列表显示正常，时间线布局生效。

- [ ] **Step 5: 提交**

```bash
git add src/app/page.tsx
git commit -m "refactor: convert interview list to timeline layout

- Replace InterviewCard with InterviewTimeline component
- Add vertical timeline with dot indicators
- Style cards with rounded-xl, shadow-sm, border

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

## Task 3: 创建招呼语表单组件 GreetingForm

**Files:**
- Create: `src/components/GreetingForm.tsx`

- [ ] **Step 1: 创建 GreetingForm.tsx**

```tsx
'use client'

import { useState } from 'react'

export default function GreetingForm() {
  const [resume, setResume] = useState('')
  const [jd, setJd] = useState('')

  const handleGenerate = () => {
    // 目前仅样式，无实际功能
    alert('仅样式展示，点击无实际效果')
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          📄 简历内容
        </label>
        <textarea
          className="w-full rounded-xl border border-gray-200 p-4 text-sm bg-gray-50 h-40 resize-none"
          placeholder="粘贴你的简历内容..."
          value={resume}
          onChange={(e) => setResume(e.target.value)}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          💼 职位 JD
        </label>
        <textarea
          className="w-full rounded-xl border border-gray-200 p-4 text-sm bg-gray-50 h-40 resize-none"
          placeholder="粘贴目标岗位的职位描述..."
          value={jd}
          onChange={(e) => setJd(e.target.value)}
        />
      </div>
      <button
        onClick={handleGenerate}
        className="w-full bg-blue-500 text-white rounded-xl py-3 font-medium hover:bg-blue-600 transition-colors"
      >
        ✨ 生成招呼语
      </button>
    </div>
  )
}
```

- [ ] **Step 2: 提交**

```bash
git add src/components/GreetingForm.tsx
git commit -m "feat: add GreetingForm component

- Resume and JD textareas
- Generate button (placeholder functionality)

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

## Task 4: 创建招呼语预览组件 GreetingPreview

**Files:**
- Create: `src/components/GreetingPreview.tsx`

- [ ] **Step 1: 创建 GreetingPreview.tsx**

```tsx
export default function GreetingPreview() {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        📝 生成结果预览
      </label>
      <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl border-2 border-dashed border-gray-200 p-6 h-[340px] flex items-center justify-center">
        <div className="text-center text-gray-400">
          <div className="text-4xl mb-2">📋</div>
          <p>生成结果将显示在这里</p>
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: 提交**

```bash
git add src/components/GreetingPreview.tsx
git commit -m "feat: add GreetingPreview component

- Dashed border placeholder for generated greeting

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

## Task 5: 创建招呼语生成页面 /greeting

**Files:**
- Create: `src/app/greeting/page.tsx`

- [ ] **Step 1: 创建招呼语页面目录和文件**

```tsx
import GreetingForm from '@/components/GreetingForm'
import GreetingPreview from '@/components/GreetingPreview'

export const metadata = {
  title: '招呼语生成 - 面试管理器',
  description: '根据简历和JD生成个性化招呼语',
}

export default function GreetingPage() {
  return (
    <main className="max-w-5xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <span className="text-2xl">💬</span>
          AI 招呼语生成
        </h1>
        <div className="grid md:grid-cols-2 gap-6">
          <GreetingForm />
          <GreetingPreview />
        </div>
      </div>
    </main>
  )
}
```

- [ ] **Step 2: 运行开发服务器验证**

```bash
npm run dev
```

访问 http://localhost:3000/greeting 确认页面正常显示。

- [ ] **Step 3: 提交**

```bash
git add src/app/greeting/page.tsx
git commit -m "feat: add /greeting page for greeting generation

- Form-style layout with resume/JD input and preview
- Links from components: GreetingForm, GreetingPreview

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

## Task 6: 创建问题列表组件 QuestionList

**Files:**
- Create: `src/components/QuestionList.tsx`

- [ ] **Step 1: 创建 QuestionList.tsx**

```tsx
'use client'

interface Question {
  id: string
  content: string
  company: string
  position: string
  status: 'mastered' | 'pending' | 'not-reviewed'
}

interface Props {
  questions: Question[]
  selectedId?: string
  onSelect: (id: string) => void
}

const statusConfig = {
  mastered: { label: '已掌握', bg: 'bg-green-100', text: 'text-green-700' },
  pending: { label: '待完善', bg: 'bg-yellow-100', text: 'text-yellow-700' },
  'not-reviewed': { label: '未复习', bg: 'bg-gray-100', text: 'text-gray-600' },
}

export default function QuestionList({ questions, selectedId, onSelect }: Props) {
  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm font-medium text-gray-500">共 {questions.length} 个问题</span>
        <button className="text-blue-500 text-sm hover:underline">+ 添加问题</button>
      </div>

      {questions.map((q) => {
        const status = statusConfig[q.status]
        const isSelected = q.id === selectedId

        return (
          <div
            key={q.id}
            onClick={() => onSelect(q.id)}
            className={`rounded-xl p-4 border cursor-pointer transition-all ${
              isSelected
                ? 'bg-blue-50 border-2 border-blue-200'
                : 'bg-gray-50 border border-gray-100 hover:border-gray-200'
            }`}
          >
            <div className="flex justify-between items-start">
              <div>
                <div className="font-medium text-gray-800">{q.content}</div>
                <div className="text-xs text-gray-500 mt-1">{q.company} · {q.position}</div>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full ${status.bg} ${status.text}`}>
                {status.label}
              </span>
            </div>
          </div>
        )
      })}
    </div>
  )
}
```

- [ ] **Step 2: 提交**

```bash
git add src/components/QuestionList.tsx
git commit -m "feat: add QuestionList component

- Question list with status badges (mastered/pending/not-reviewed)
- Selected state styling

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

## Task 7: 创建问题详情组件 QuestionDetail

**Files:**
- Create: `src/components/QuestionDetail.tsx`

- [ ] **Step 1: 创建 QuestionDetail.tsx**

```tsx
interface Question {
  id: string
  content: string
  company: string
  position: string
  status: 'mastered' | 'pending' | 'not-reviewed'
}

interface Props {
  question: Question | null
}

export default function QuestionDetail({ question }: Props) {
  if (!question) {
    return (
      <div className="bg-gray-50 rounded-xl p-5 border border-gray-100 h-full flex items-center justify-center">
        <div className="text-center text-gray-400">
          <div className="text-4xl mb-2">📝</div>
          <p>选择一个问题查看详情</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">
          {question.content.charAt(0)}
        </div>
        <div>
          <div className="font-semibold text-gray-800">{question.content}</div>
          <div className="text-xs text-gray-500">{question.company} · {question.position}</div>
        </div>
      </div>

      <div className="mb-4">
        <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">问题描述</label>
        <p className="text-sm text-gray-700 mt-1">请详细介绍一个你最成功的项目，包括你承担的角色、遇到的挑战以及如何解决的。</p>
      </div>

      <div className="mb-4">
        <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">AI 分析建议</label>
        <div className="mt-2 p-4 bg-white rounded-lg border border-gray-100">
          <div className="text-sm text-gray-700 space-y-2">
            <p><span className="text-green-600">✓</span> 建议使用STAR法则回答</p>
            <p><span className="text-green-600">✓</span> 突出技术难点和创新点</p>
            <p><span className="text-yellow-600">⚠</span> 需要补充具体的性能优化数据</p>
          </div>
        </div>
      </div>

      <button className="w-full bg-blue-500 text-white rounded-lg py-2 text-sm font-medium hover:bg-blue-600 transition-colors">
        🧠 重新分析
      </button>
    </div>
  )
}
```

- [ ] **Step 2: 提交**

```bash
git add src/components/QuestionDetail.tsx
git commit -m "feat: add QuestionDetail component

- Question detail view with AI analysis placeholder
- Re-analyze button (placeholder)

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

## Task 8: 创建问题记录页面 /questions

**Files:**
- Create: `src/app/questions/page.tsx`

- [ ] **Step 1: 创建问题记录页面**

```tsx
'use client'

import { useState } from 'react'
import QuestionList from '@/components/QuestionList'
import QuestionDetail from '@/components/QuestionDetail'

interface Question {
  id: string
  content: string
  company: string
  position: string
  status: 'mastered' | 'pending' | 'not-reviewed'
}

// 模拟数据（实际从API获取）
const mockQuestions: Question[] = [
  { id: '1', content: '自我介绍', company: '字节跳动', position: '前端工程师', status: 'mastered' },
  { id: '2', content: '项目经历详解', company: '阿里巴巴', position: '全栈工程师', status: 'pending' },
  { id: '3', content: '浏览器原理', company: '美团', position: '前端工程师', status: 'not-reviewed' },
  { id: '4', content: 'HTTP缓存机制', company: '字节跳动', position: '前端工程师', status: 'not-reviewed' },
  { id: '5', content: '性能优化策略', company: '腾讯', position: '前端工程师', status: 'pending' },
  { id: '6', content: '设计模式', company: '字节跳动', position: '前端工程师', status: 'pending' },
]

export default function QuestionsPage() {
  const [selectedId, setSelectedId] = useState<string>('1')
  const selectedQuestion = mockQuestions.find((q) => q.id === selectedId) || null

  return (
    <main className="max-w-5xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <span className="text-2xl">📝</span>
          面试问题记录
        </h1>
        <div className="grid md:grid-cols-2 gap-6">
          <QuestionList
            questions={mockQuestions}
            selectedId={selectedId}
            onSelect={setSelectedId}
          />
          <QuestionDetail question={selectedQuestion} />
        </div>
      </div>
    </main>
  )
}
```

- [ ] **Step 2: 运行开发服务器验证**

访问 http://localhost:3000/questions 确认页面正常，点击问题列表项可切换右侧详情。

- [ ] **Step 3: 提交**

```bash
git add src/app/questions/page.tsx
git commit -m "feat: add /questions page for interview question tracking

- List-edit layout with question list and detail panel
- Mock data for demonstration

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

## Task 9: 更新导航 — 添加新页面入口

**Files:**
- Modify: `src/app/page.tsx:27-37`（导航部分）

- [ ] **Step 1: 在首页导航添加招呼语和问题记录入口**

在"设置"按钮后添加：

```tsx
<Link href="/greeting" className="text-gray-600 hover:text-gray-800 px-3 py-2 text-sm flex items-center gap-1">
  💬 招呼语
</Link>
<Link href="/questions" className="text-gray-600 hover:text-gray-800 px-3 py-2 text-sm flex items-center gap-1">
  📝 问题
</Link>
```

- [ ] **Step 2: 验证所有导航链接**

```bash
npm run dev
```

访问 http://localhost:3000 确认导航显示正常，点击可跳转各页面。

- [ ] **Step 3: 提交**

```bash
git add src/app/page.tsx
git commit -m "feat: add navigation links to new pages

- /greeting for greeting generation
- /questions for question tracking

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

## Task 10: 最终验证

**Files:**
- Check: 所有相关文件

- [ ] **Step 1: 运行构建检查**

```bash
npm run build
```

确认无 TypeScript 错误和构建失败。

- [ ] **Step 2: 检查所有页面**

- http://localhost:3000 — 首页面试列表时间线布局
- http://localhost:3000/greeting — 招呼语生成页面（表单式）
- http://localhost:3000/questions — 问题记录页面（列表编辑式）

- [ ] **Step 3: 验收标准核对**

- [x] 首页面试列表使用时间线垂直布局
- [x] /greeting 页面使用表单式左右分栏布局
- [x] /questions 页面使用列表编辑式左右分栏布局
- [x] 所有页面无过多留白，紧凑但不拥挤
- [x] 风格统一：圆角、阴影、边框、颜色系统一致
- [x] 导航可正常跳转新页面（仅有样式）

- [ ] **Step 4: 最终提交**

```bash
git add -A
git commit -m "feat: complete frontend redesign - timeline layout, greeting and questions pages

Modern minimalist style with:
- Timeline layout for interview list
- /greeting page with form-style layout
- /questions page with list-edit layout

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

## 执行选项

**Plan complete and saved to `docs/superpowers/plans/2026-04-15-frontend-redesign-plan.md`. Two execution options:**

**1. Subagent-Driven (recommended)** — I dispatch a fresh subagent per task, review between tasks, fast iteration

**2. Inline Execution** — Execute tasks in this session using executing-plans, batch execution with checkpoints

**Which approach?**
