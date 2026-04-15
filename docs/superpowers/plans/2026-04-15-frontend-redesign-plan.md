# Frontend Redesign Implementation Plan - Spotify Dark Theme

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform all frontend pages from light Tailwind theme to Spotify-inspired dark theme (#121212 background, #1ed760 accent, pill-shaped buttons)

**Architecture:** Global CSS variables for colors, component-level Tailwind class updates. No structural changes - only visual styling.

**Tech Stack:** Next.js 14, Tailwind CSS, existing globals.css

---

## Color Tokens Reference

```css
--bg-primary: #121212;      /* Page background */
--bg-card: #181818;        /* Card/container background */
--bg-interactive: #1f1f1f;  /* Button/input background */
--bg-elevated: #252525;     /* Elevated surfaces */
--text-primary: #ffffff;    /* Primary text */
--text-secondary: #b3b3b3;  /* Secondary/muted text */
--accent-green: #1ed760;     /* Spotify Green - CTA only */
--accent-red: #f3727f;      /* Negative/error */
--accent-orange: #ffa42b;   /* Warning/pending */
--accent-blue: #539df5;     /* Info/video */
--border: #4d4d4d;          /* Borders */
```

---

## Task 1: Global Styles

**Files:**
- Modify: `src/app/globals.css`

- [ ] **Step 1: Update globals.css with Spotify dark theme**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --bg-primary: #121212;
  --bg-card: #181818;
  --bg-interactive: #1f1f1f;
  --bg-elevated: #252525;
  --text-primary: #ffffff;
  --text-secondary: #b3b3b3;
  --accent-green: #1ed760;
  --accent-red: #f3727f;
  --accent-orange: #ffa42b;
  --accent-blue: #539df5;
  --border: #4d4d4d;
}

body {
  background-color: var(--bg-primary);
  color: var(--text-primary);
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/globals.css
git commit -m "feat: add Spotify dark theme CSS variables"
```

---

## Task 2: Root Layout

**Files:**
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Update body class**

```tsx
<body className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary)' }}>
```

- [ ] **Step 2: Commit**

```bash
git add src/app/layout.tsx
git commit -m "feat: apply dark theme to root layout"
```

---

## Task 3: InterviewTimeline Component

**Files:**
- Modify: `src/components/InterviewTimeline.tsx`

- [ ] **Step 1: Rewrite with dark theme classes**

```tsx
export default function InterviewTimeline({ interview, isLast = false }: Props) {
  const isVideo = interview.interviewType === 'VIDEO'

  return (
    <div className="flex gap-4">
      {/* Timeline left */}
      <div className="flex flex-col items-center">
        <div className={`w-3 h-3 rounded-full ${isVideo ? 'bg-[#539df5]' : 'bg-[#1ed760]'}`}></div>
        {!isLast && <div className="w-0.5 flex-1 bg-[#4d4d4d] mt-1"></div>}
      </div>
      {/* Content right */}
      <div className="flex-1 pb-6">
        <div className="text-sm text-[#b3b3b3] font-medium">{interview.startTime}</div>
        <div className="bg-[#181818] rounded-lg p-4 mt-1 shadow-lg">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-white">{interview.company}</h3>
              <p className="text-[#b3b3b3] text-sm">{interview.position}</p>
            </div>
            <span className={`text-xs px-3 py-1 rounded-full ${
              isVideo ? 'bg-[#539df5]/20 text-[#539df5]' : 'bg-[#1ed760]/20 text-[#1ed760]'
            }`}>
              {isVideo ? '视频' : '现场'}
            </span>
          </div>
          <div className="mt-3 text-sm text-[#b3b3b3]">
            <p>🕐 {interview.startTime} - {interview.endTime}</p>
            {isVideo && interview.meetingUrl && (
              <a href={interview.meetingUrl} target="_blank" rel="noopener noreferrer" 
                 className="text-[#1ed760] hover:underline mt-1 block">
                🔗 加入视频会议
              </a>
            )}
          </div>
          <div className="mt-3 flex gap-3">
            <a href={`/interviews/${interview.id}`} className="text-sm text-[#1ed760] hover:underline">查看详情</a>
            <a href={`/interviews/${interview.id}/edit`} className="text-sm text-[#b3b3b3] hover:text-white">编辑</a>
          </div>
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/InterviewTimeline.tsx
git commit -m "feat: apply dark theme to InterviewTimeline"
```

---

## Task 4: InterviewForm Component

**Files:**
- Modify: `src/components/InterviewForm.tsx`

- [ ] **Step 1: Add wrapper and update form styling**

Wrap the existing form content with:
```tsx
<div className="bg-[#181818] rounded-lg p-6">
```

Update input class:
```tsx
className="mt-1 block w-full rounded-lg bg-[#1f1f1f] border border-[#4d4d4d] px-3 py-2 text-white focus:border-[#1ed760] focus:outline-none"
```

Update label class:
```tsx
className="block text-sm font-medium text-[#b3b3b3] mb-1"
```

Update submit button:
```tsx
className="flex-1 bg-[#1ed760] text-black py-3 px-6 rounded-full font-semibold hover:opacity-90 disabled:opacity-50"
```

Update cancel button:
```tsx
className="flex-1 bg-[#1f1f1f] text-white py-3 px-6 rounded-full font-semibold hover:bg-[#252525]"
```

Update reminder box:
```tsx
className="bg-[#252525] border border-[#4d4d4d] rounded p-3 text-sm"
```

- [ ] **Step 2: Commit**

```bash
git add src/components/InterviewForm.tsx
git commit -m "feat: apply dark theme to InterviewForm"
```

---

## Task 5: ShareButton & DeleteButton

**Files:**
- Modify: `src/components/ShareButton.tsx`
- Modify: `src/components/DeleteButton.tsx`

- [ ] **Step 1: Update ShareButton**

```tsx
<button onClick={handleCopy}
  className="bg-[#1f1f1f] text-white py-2 px-5 rounded-full hover:bg-[#252525] transition flex items-center gap-2 border border-[#4d4d4d]">
  {copied ? '✓ 已复制' : '🔗 复制分享链接'}
</button>
```

- [ ] **Step 2: Update DeleteButton**

```tsx
<button onClick={handleDelete} disabled={loading}
  className="bg-[#f3727f] text-white py-2 px-5 rounded-full hover:opacity-90 disabled:opacity-50">
  {loading ? '删除中...' : '🗑️ 删除'}
</button>
```

- [ ] **Step 3: Commit**

```bash
git add src/components/ShareButton.tsx src/components/DeleteButton.tsx
git commit -m "feat: apply dark pill style to action buttons"
```

---

## Task 6: Home Page

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Update main container and navigation**

```tsx
<main className="max-w-2xl mx-auto p-4" style={{ backgroundColor: 'var(--bg-primary)', minHeight: '100vh' }}>
  <div className="flex justify-between items-center mb-6">
    <h1 className="text-2xl font-bold text-white">📅 面试日程</h1>
    <div className="flex gap-3">
      <Link href="/greeting" 
        className="text-[#b3b3b3] hover:text-white px-3 py-2 text-sm flex items-center gap-1 rounded-full hover:bg-[#1f1f1f]">
        💬 招呼语
      </Link>
      <Link href="/questions" 
        className="text-[#b3b3b3] hover:text-white px-3 py-2 text-sm flex items-center gap-1 rounded-full hover:bg-[#1f1f1f]">
        📝 问题
      </Link>
      <a href="/interviews/new" 
        className="bg-[#1ed760] text-black px-5 py-2 rounded-full hover:opacity-90 transition font-semibold text-sm">
        + 添加面试
      </a>
    </div>
  </div>
```

Date header: `text-lg font-semibold text-[#b3b3b3] mb-3`

Empty state: `text-center py-12 text-[#b3b3b3]`

- [ ] **Step 2: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: apply dark theme to home page"
```

---

## Task 7: Interview Detail Page

**Files:**
- Modify: `src/app/interviews/[id]/page.tsx`

- [ ] **Step 1: Update styling**

```tsx
<main className="max-w-2xl mx-auto p-4" style={{ backgroundColor: 'var(--bg-primary)', minHeight: '100vh' }}>
  <div className="mb-6">
    <Link href="/" className="text-[#b3b3b3] hover:text-[#1ed760]">← 返回列表</Link>
  </div>

  <div className="bg-[#181818] rounded-lg p-6">
    <h1 className="text-2xl font-bold text-white">{interview.company}</h1>
    <p className="text-[#b3b3b3] text-lg">{interview.position}</p>
    {/* ... */}
  </div>
</main>
```

- [ ] **Step 2: Commit**

```bash
git add src/app/interviews/[id]/page.tsx
git commit -m "feat: apply dark theme to interview detail"
```

---

## Task 8: Interview Edit & New Pages

**Files:**
- Modify: `src/app/interviews/[id]/edit/page.tsx`
- Modify: `src/app/interviews/new/page.tsx`

- [ ] **Step 1: Update both pages**

Add wrapper with dark background:
```tsx
<main className="max-w-2xl mx-auto p-4" style={{ backgroundColor: 'var(--bg-primary)', minHeight: '100vh' }}>
```

Title: `className="text-2xl font-bold text-white mb-6"`

- [ ] **Step 2: Commit**

```bash
git add src/app/interviews/[id]/edit/page.tsx src/app/interviews/new/page.tsx
git commit -m "feat: apply dark theme to interview form pages"
```

---

## Task 9: Greeting Components

**Files:**
- Modify: `src/app/greeting/page.tsx`
- Modify: `src/components/GreetingForm.tsx`
- Modify: `src/components/GreetingPreview.tsx`

- [ ] **Step 1: Update greeting/page.tsx**

```tsx
<main className="max-w-5xl mx-auto p-6" style={{ backgroundColor: 'var(--bg-primary)', minHeight: '100vh' }}>
  <div className="bg-[#181818] rounded-lg p-6">
    <h1 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
```

- [ ] **Step 2: Update GreetingForm**

- Textarea: `bg-[#1f1f1f] border-[#4d4d4d] text-white rounded-lg`
- Label: `text-[#b3b3b3]`
- Button: `bg-[#1ed760] text-black rounded-full w-full`

- [ ] **Step 3: Update GreetingPreview**

- Container: `bg-[#1f1f1f] border border-[#4d4d4d] rounded-lg`
- Placeholder text: `text-[#b3b3b3]`

- [ ] **Step 4: Commit**

```bash
git add src/app/greeting/page.tsx src/components/GreetingForm.tsx src/components/GreetingPreview.tsx
git commit -m "feat: apply dark theme to greeting page"
```

---

## Task 10: Questions Components

**Files:**
- Modify: `src/app/questions/page.tsx`
- Modify: `src/components/QuestionList.tsx`
- Modify: `src/components/QuestionDetail.tsx`

- [ ] **Step 1: Update questions/page.tsx**

```tsx
<main className="max-w-5xl mx-auto p-6" style={{ backgroundColor: 'var(--bg-primary)', minHeight: '100vh' }}>
  <div className="bg-[#181818] rounded-lg p-6">
    <h1 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
```

- [ ] **Step 2: Update QuestionList**

- Item selected: `bg-[#1ed760]/10 border-[#1ed760]`
- Item normal: `bg-[#1f1f1f] border-[#4d4d4d] hover:border-[#b3b3b3]`
- Text: `text-white` / `text-[#b3b3b3]`
- Add button: `text-[#1ed760] hover:underline`

Status badges:
```tsx
const statusConfig = {
  mastered: { label: '已掌握', bg: 'bg-[#1ed760]/20', text: 'text-[#1ed760]' },
  pending: { label: '待完善', bg: 'bg-[#ffa42b]/20', text: 'text-[#ffa42b]' },
  'not-reviewed': { label: '未复习', bg: 'bg-[#539df5]/20', text: 'text-[#539df5]' },
}
```

- [ ] **Step 3: Update QuestionDetail**

- Container: `bg-[#1f1f1f] border border-[#4d4d4d]`
- Avatar: `bg-[#1ed760] text-black`
- Section labels: `text-[#b3b3b3] uppercase tracking-wider`
- AI suggestion box: `bg-[#252525] border border-[#4d4d4d]`
- Buttons: `bg-[#1ed760] text-black rounded-full`

- [ ] **Step 4: Commit**

```bash
git add src/app/questions/page.tsx src/components/QuestionList.tsx src/components/QuestionDetail.tsx
git commit -m "feat: apply dark theme to questions page"
```

---

## Task 11: Settings Page

**Files:**
- Modify: `src/app/settings/page.tsx`

- [ ] **Step 1: Update styling**

```tsx
<main className="max-w-xl mx-auto p-4" style={{ backgroundColor: 'var(--bg-primary)', minHeight: '100vh' }}>
  <div className="mb-6">
    <Link href="/" className="text-[#b3b3b3] hover:text-[#1ed760]">← 返回列表</Link>
  </div>

  <div className="bg-[#181818] rounded-lg p-6">
    <h1 className="text-2xl font-bold text-white mb-2">⚙️ 设置</h1>
    <p className="text-[#b3b3b3] mb-6">设置你的提醒接收邮箱</p>
    {/* form inputs with dark styling */}
    <button className="w-full bg-[#1ed760] text-black py-3 px-4 rounded-full font-semibold hover:opacity-90">
      保存设置
    </button>
  </div>

  <div className="mt-6 bg-[#252525] border border-[#4d4d4d] rounded-lg p-4">
```

- [ ] **Step 2: Commit**

```bash
git add src/app/settings/page.tsx
git commit -m "feat: apply dark theme to settings page"
```

---

## Final Verification

- [ ] Run `npm run build` to verify no errors
- [ ] Run `npm run lint` to check linting
- [ ] Start dev server and visually verify all pages:
  1. Home page (/) - dark background, green CTA
  2. Add interview (/interviews/new) - dark form
  3. Interview detail (/interviews/[id]) - dark card
  4. Greeting (/greeting) - dark layout
  5. Questions (/questions) - dark with semantic badges
  6. Settings (/settings) - dark form

---

## Spec Coverage Check

| Spec Section | Task |
|--------------|------|
| Global styles | Task 1 |
| Layout | Task 2 |
| Homepage | Task 6 |
| InterviewTimeline | Task 3 |
| InterviewForm | Task 4 |
| ShareButton/DeleteButton | Task 5 |
| Interview detail | Task 7 |
| Edit/New pages | Task 8 |
| Greeting page | Task 9 |
| Questions page | Task 10 |
| Settings page | Task 11 |

---

## 执行选项

**Plan complete and saved to `docs/superpowers/plans/2026-04-15-frontend-redesign-plan.md`. Two execution options:**

**1. Subagent-Driven (recommended)** — I dispatch a fresh subagent per task, review between tasks, fast iteration

**2. Inline Execution** — Execute tasks in this session using executing-plans, batch execution with checkpoints

**Which approach?**
