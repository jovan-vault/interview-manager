# 日历侧边栏实现计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans (recommended) or superpowers:subagent-driven-development to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 在面试日程首页右侧添加日历侧边栏，显示有面试的日期并支持点击跳转到对应位置。

**Architecture:**
- `CalendarSidebar` 为 `'use client'` 组件，封装月历 UI 和交互状态
- 父组件 `page.tsx` 通过 URL search param (`?scroll=2026-04-07`) 传递选中日期
- 日期组通过 `id` 属性 + `scrollIntoView()` 实现滚动定位
- CSS 高亮通过动态 class 切换实现，3秒后自动清除

**Tech Stack:** Next.js 14 App Router, TypeScript, Prisma

---

## 文件结构

```
src/
├── components/
│   └── CalendarSidebar.tsx   # 新建：日历侧边栏（Client Component）
├── app/
│   ├── page.tsx              # 修改：集成日历 + 滚动逻辑
│   └── globals.css           # 修改：添加日历样式
```

---

## Task 1: 创建 CalendarSidebar.tsx

**Files:**
- Create: `src/components/CalendarSidebar.tsx`

- [ ] **Step 1: 创建 CalendarSidebar 组件基础结构**

```tsx
'use client'

import { useState } from 'react'

interface Interview {
  date: string
  startTime: string
  endTime: string
  company: string
  position: string
  interviewType: 'VIDEO' | 'ONSITE'
}

interface CalendarSidebarProps {
  interviews: Interview[]
}

export default function CalendarSidebar({ interviews }: CalendarSidebarProps) {
  const [currentMonth, setCurrentMonth] = useState(() => {
    const now = new Date()
    return new Date(now.getFullYear(), now.getMonth(), 1)
  })

  return (
    <aside className="calendar-sidebar">
      {/* 月份导航 */}
      <div className="calendar-nav">
        <span className="calendar-title">
          {currentMonth.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long' })}
        </span>
        <div className="calendar-nav-btns">
          <button onClick={() => setCurrentMonth(m => new Date(m.getFullYear(), m.getMonth() - 1, 1))}>
            ‹
          </button>
          <button onClick={() => setCurrentMonth(m => new Date(m.getFullYear(), m.getMonth() + 1, 1))}>
            ›
          </button>
        </div>
      </div>

      {/* 周表头 */}
      <div className="calendar-weekdays">
        {['一', '二', '三', '四', '五', '六', '日'].map(d => (
          <div key={d} className="weekday">{d}</div>
        ))}
      </div>

      {/* 日期网格 */}
      <div className="calendar-grid" ref={gridRef}>
        {/* 由下方代码渲染 */}
      </div>

      {/* 即将到来列表 */}
      {/* 由下方代码渲染 */}
    </aside>
  )
}
```

- [ ] **Step 2: 添加日期网格渲染逻辑**

在组件内添加以下函数和状态：

```tsx
// 计算有面试的日期及数量
const interviewCountByDate = interviews.reduce<Record<string, number>>((acc, i) => {
  const key = new Date(i.date).toISOString().split('T')[0]
  acc[key] = (acc[key] || 0) + 1
  return acc
}, {})

// 计算当月日历格子
const getCalendarDays = () => {
  const year = currentMonth.getFullYear()
  const month = currentMonth.getMonth()
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)

  // 周一=0，所以 getDay() 周日=0 映射到 6
  let startPadding = firstDay.getDay() || 7
  startPadding -= 1 // 调整为周一=0

  const days: Array<{ date: number | null; fullDate: string | null }> = []
  for (let i = 0; i < startPadding; i++) {
    days.push({ date: null, fullDate: null })
  }
  for (let d = 1; d <= lastDay.getDate(); d++) {
    const fullDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`
    days.push({ date: d, fullDate })
  }
  return days
}
```

- [ ] **Step 3: 替换日期网格 JSX**

将 `{/* 由下方代码渲染 */}` 替换为：

```tsx
<div className="calendar-grid">
  {getCalendarDays().map((day, idx) => {
    if (!day.fullDate) {
      return <div key={`pad-${idx}`} className="calendar-day empty" />
    }
    const count = interviewCountByDate[day.fullDate] || 0
    const isToday = day.fullDate === todayStr
    const hasInterviews = count > 0
    return (
      <div
        key={day.fullDate}
        className={`calendar-day ${hasInterviews ? 'has-interviews' : ''} ${isToday ? 'today' : ''}`}
        title={hasInterviews ? `${count} 场面试` : ''}
      >
        <span className="day-number">{day.date}</span>
        {hasInterviews && (
          <span className="interview-badge">{count}</span>
        )}
      </div>
    )
  })}
</div>
```

在组件顶部添加：
```tsx
const today = new Date()
const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`
```

- [ ] **Step 4: 添加即将到来列表**

在日历网格后添加：

```tsx
{Object.keys(interviewCountByDate).length > 0 && (
  <div className="calendar-upcoming">
    <div className="upcoming-label">即将到来</div>
    {Object.entries(interviewCountByDate)
      .sort(([a], [b]) => a.localeCompare(b))
      .slice(0, 5)
      .map(([date, count]) => {
        const d = new Date(date + 'T00:00:00')
        const label = d.toLocaleDateString('zh-CN', { month: 'long', day: 'numeric' })
        return (
          <div
            key={date}
            className="upcoming-item"
            onClick={() => {
              const params = new URLSearchParams(window.location.search)
              params.set('scroll', date)
              window.history.pushState({}, '', `?${params.toString()}`)
              document.getElementById(`date-${date}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }}
          >
            <span className="upcoming-dot" />
            <span className="upcoming-date">{label}</span>
            <span className="upcoming-count">{count} 场</span>
          </div>
        )
      })}
  </div>
)}
```

- [ ] **Step 5: Commit**

```bash
git add src/components/CalendarSidebar.tsx
git commit -m "feat: create CalendarSidebar client component"
```

---

## Task 2: 修改 page.tsx 集成日历

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: 创建共享工具函数**

创建 `src/lib/date-utils.ts`，将日期格式化逻辑提取为共享函数：

```tsx
// src/lib/date-utils.ts
export function getTodayDate() {
  const now = new Date()
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`
}

export function formatDateHeader(dateStr: string) {
  const date = new Date(dateStr + 'T00:00:00')
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const target = new Date(date)
  target.setHours(0, 0, 0, 0)

  const diff = Math.round((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
  const base = date.toLocaleDateString('zh-CN', { month: 'long', day: 'numeric', weekday: 'long' })

  if (diff === 0) return `今天 · ${base}`
  if (diff === 1) return `明天 · ${base}`
  if (diff === -1) return `昨天 · ${base}`
  if (diff > 1 && diff <= 7) return `本周 ${date.toLocaleDateString('zh-CN', { weekday: 'long' })} · ${date.toLocaleDateString('zh-CN', { month: 'long', day: 'numeric' })}`
  return base
}
```

- [ ] **Step 2: 提取数据获取逻辑为服务端函数，创建中间层组件**

为了保持服务端数据获取能力，在 `src/app/page.tsx` 同目录下创建一个 `src/app/home-data.ts` 服务端文件：

```tsx
import { prisma } from '@/lib/prisma'

export async function getInterviewsData() {
  return prisma.interview.findMany({
    orderBy: { date: 'asc' },
  })
}
```

将 `src/app/page.tsx` 改回服务端组件，仅作为数据容器：

```tsx
import { getInterviewsData } from './home-data'
import HomeClient from './home-client'

export default async function Home() {
  const interviews = await getInterviewsData()
  return <HomeClient interviews={interviews} />
}
```

- [ ] **Step 3: 创建 home-client.tsx（真正的客户端逻辑）**

创建 `src/app/home-client.tsx`，将原来 `page.tsx` 中的客户端交互代码（`useSearchParams`、`useEffect` 滚动逻辑）移入，同时集成日历侧边栏：

```tsx
'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import InterviewTimeline from '@/components/InterviewTimeline'
import CalendarSidebar from '@/components/CalendarSidebar'

export default function HomeClient({ interviews }: { interviews: any[] }) {
  const searchParams = useSearchParams()
  const selectedDate = searchParams.get('scroll')

  useEffect(() => {
    if (selectedDate) {
      const el = document.getElementById(`date-${selectedDate}`)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        el.classList.add('date-group-highlighted')
        const timer = setTimeout(() => el.classList.remove('date-group-highlighted'), 3000)
        return () => clearTimeout(timer)
      }
    }
  }, [selectedDate])

  // 数据分组逻辑（同原 page.tsx）
  const grouped = interviews.reduce((acc, item) => {
    const dateKey = new Date(item.date).toISOString().split('T')[0]
    if (!acc[dateKey]) acc[dateKey] = []
    acc[dateKey].push(item)
    return acc
  }, {})
  const sortedDates = Object.keys(grouped).sort()

  const today = `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}-${String(new Date().getDate()).padStart(2, '0')}`
  const upcomingCount = interviews.filter((i: any) => i.date >= today).length
  const videoCount = interviews.filter((i: any) => i.interviewType === 'VIDEO').length
  const onsiteCount = interviews.filter((i: any) => i.interviewType === 'ONSITE').length

  return (
    <div className="page-container">
      {/* Page Header（同原 page.tsx） */}
      {/* Stats Row（同原 page.tsx） */}
      {/* Timeline Section（同原 page.tsx，但添加 id） */}
      <div className="timeline-with-calendar">
        <div className="timeline-main">
          {/* ... 保留现有内容 ... */}
          {sortedDates.length === 0 ? (
            /* Empty State */
          ) : (
            <div className="timeline-section">
              {sortedDates.map((date) => (
                <div key={date} id={`date-${date}`} className="date-group">
                  <div className="date-header">
                    <span className="date-label">{formatDateHeader(date)}</span>
                    <span className="date-count">{grouped[date].length} 场</span>
                  </div>
                  {/* ... timeline cards ... */}
                </div>
              ))}
            </div>
          )}
        </div>
        <CalendarSidebar interviews={interviews} />
      </div>
    </div>
  )
}
```

- [ ] **Step 4: Commit**

```bash
git add src/app/page.tsx src/app/home-client.tsx
git commit -m "feat: refactor page.tsx to client component with calendar integration"
```

---

## Task 3: 添加 CSS 样式

**Files:**
- Modify: `src/app/globals.css`

- [ ] **Step 1: 添加日历侧边栏基础样式**

在 `globals.css` 末尾添加：

```css
/* ===== Calendar Sidebar ===== */
.calendar-sidebar {
  width: var(--calendar-width, 280px);
  flex-shrink: 0;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 18px;
  box-shadow: var(--shadow-sm);
  position: sticky;
  top: 24px;
  max-height: calc(100vh - 48px);
  overflow-y: auto;
}

/* 导航 */
.calendar-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
}

.calendar-title {
  font-size: 14px;
  font-weight: 700;
  color: var(--text-primary);
}

.calendar-nav-btns {
  display: flex;
  gap: 4px;
}

.calendar-nav-btns button {
  width: 26px;
  height: 26px;
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  border-radius: 6px;
  cursor: pointer;
  color: var(--text-secondary);
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s;
}

.calendar-nav-btns button:hover {
  background: var(--border);
  color: var(--text-primary);
}

/* 周表头 */
.calendar-weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  margin-bottom: 4px;
}

.weekday {
  text-align: center;
  font-size: 10px;
  font-weight: 600;
  color: var(--text-tertiary);
  padding: 4px 0;
}

/* 日期网格 */
.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1px;
}

.calendar-day {
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  color: var(--text-secondary);
  position: relative;
  border-radius: 50%;
  transition: all 0.15s;
}

.calendar-day.empty {
  background: transparent;
}

.calendar-day.today .day-number {
  border: 2px solid var(--accent-primary);
  border-radius: 50%;
  width: 26px;
  height: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-primary);
}

.calendar-day.has-interviews {
  cursor: pointer;
}

.calendar-day.has-interviews .day-number {
  background: var(--accent-primary);
  color: #fff;
  border-radius: 50%;
  width: 26px;
  height: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.4);
}

.calendar-day.has-interviews:hover .day-number {
  opacity: 0.85;
}

/* 面试数量 badge */
.interview-badge {
  position: absolute;
  top: 0;
  right: 2px;
  background: #ef4444;
  color: #fff;
  font-size: 8px;
  font-weight: 700;
  padding: 1px 3px;
  border-radius: 6px;
  line-height: 1.2;
  pointer-events: none;
}

/* 即将到来列表 */
.calendar-upcoming {
  margin-top: 14px;
  padding-top: 14px;
  border-top: 1px solid var(--border);
}

.upcoming-label {
  font-size: 10px;
  font-weight: 700;
  color: var(--text-tertiary);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin-bottom: 8px;
}

.upcoming-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 10px;
  background: var(--bg-secondary);
  border-radius: var(--radius-sm);
  cursor: pointer;
  margin-bottom: 4px;
  transition: all 0.15s;
}

.upcoming-item:hover {
  background: var(--border);
  transform: translateX(2px);
}

.upcoming-dot {
  width: 6px;
  height: 6px;
  background: var(--accent-primary);
  border-radius: 50%;
  flex-shrink: 0;
}

.upcoming-date {
  font-size: 12px;
  color: var(--text-primary);
  font-weight: 500;
  flex: 1;
}

.upcoming-count {
  font-size: 11px;
  color: var(--accent-primary);
  font-weight: 600;
}

/* 日历 CSS 变量 */
:root {
  --calendar-width: 280px;
}

/* 页面布局调整 - 主内容区 */
.timeline-with-calendar {
  display: flex;
  gap: 24px;
  align-items: flex-start;
}

.timeline-main {
  flex: 1;
  min-width: 0;
}

/* 日期组高亮 */
.date-group-highlighted {
  outline: 2px solid var(--accent-primary);
  outline-offset: 8px;
  border-radius: var(--radius-md);
  animation: highlight-fade 3s ease-out forwards;
}

@keyframes highlight-fade {
  0% { outline-color: var(--accent-primary); }
  70% { outline-color: var(--accent-primary); }
  100% { outline-color: transparent; }
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/globals.css
git commit -m "feat: add calendar sidebar styles"
```

---

## Task 4: 集成测试

- [ ] **Step 1: 启动开发服务器验证**

```bash
npm run dev
```

- [ ] **Step 2: 验证清单**

1. 打开 `http://localhost:3000`，右侧应显示日历侧边栏
2. 确认有面试的日期（如 4 月 7 日）显示紫色圆点 + 红色 badge 数量
3. 确认今日日期有紫色边框
4. 点击日历中有面试的日期，确认主界面滚动 + 高亮，3秒后高亮消失
5. 点击日历左右箭头，确认月份切换正常
6. 确认"即将到来"列表正确显示
7. 确认新增面试后日历数据实时更新
