# 浅色主题切换 — 实现计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将深色主题切换为浅色主题，仅更新 CSS 变量和内联样式中的颜色值，保留所有布局和组件结构。

**Architecture:** 整个主题系统通过 `globals.css` 中的 CSS 变量（`:root`）驱动。侧边栏内联样式和 SVG 图标使用硬编码颜色需同步更新。

**Tech Stack:** Next.js + Tailwind + CSS Variables + inline `<style jsx>`

---

## 文件清单

- 修改: `src/app/globals.css` — 更新 `:root` 中的 CSS 变量值
- 修改: `src/components/Sidebar.tsx` — 更新内联样式背景色/边框色 + SVG stroke 颜色
- 检查: `src/components/GreetingForm.tsx`、`GreetingPreview.tsx`、`QuestionDetail.tsx` — 无硬编码颜色，无需修改

---

## Task 1: 更新 globals.css CSS 变量

**文件:** `src/app/globals.css:8-46`

将 `:root` 中的所有 CSS 变量值替换为浅色主题值。

- [ ] **Step 1: 替换主色系变量**

将 `globals.css` 第 8-46 行的 `:root {` 代码块中的变量替换为以下内容：

```css
:root {
  --bg-primary: #faf8f5;
  --bg-secondary: #f5f0ea;
  --bg-card: #fffbf5;
  --bg-card-hover: #fff8f0;
  --bg-input: #faf5ee;
  --border: #e8ddd0;
  --border-hover: #d4c8b8;
  --border-focus: #667eea;

  --accent-primary: #667eea;
  --accent-primary-dim: rgba(102, 126, 234, 0.12);
  --accent-primary-hover: #5a6fd6;
  --accent-success: #16a34a;
  --accent-success-dim: rgba(22, 163, 74, 0.12);
  --accent-warning: #d97706;
  --accent-danger: #f87171;
  --accent-danger-dim: rgba(248, 113, 113, 0.12);
  --accent-video: #667eea;
  --accent-video-dim: rgba(102, 126, 234, 0.12);

  --text-primary: #1c1917;
  --text-secondary: #78716c;
  --text-tertiary: #a8a29e;
  --text-accent: #667eea;

  --shadow-sm: 0 1px 3px rgba(60, 40, 10, 0.06);
  --shadow-md: 0 4px 12px rgba(60, 40, 10, 0.08);
  --shadow-lg: 0 8px 32px rgba(60, 40, 10, 0.10);
  --shadow-glow: 0 0 16px rgba(102, 126, 234, 0.15);

  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 20px;

  --sidebar-width: 240px;
  --topbar-height: 0px;
}
```

- [ ] **Step 2: 更新滚动条颜色**

将 `::-webkit-scrollbar-thumb` 中的 `background: var(--border)` 保持不变（已通过变量更新为浅色边框）。

- [ ] **Step 3: 更新选中文本颜色**

将 `::selection` 块更新为：

```css
::selection {
  background: rgba(102, 126, 234, 0.15);
  color: #667eea;
}
```

- [ ] **Step 4: 更新 btn-primary 渐变背景**

找到 `.btn-primary` 中的 `background: var(--accent-primary)`，替换为：

```css
.btn-primary {
  background: linear-gradient(135deg, #667eea, #764ba2);
  /* 其他属性保持不变 */
}
```

同时更新 `.btn-primary:hover` 中的阴影色为 `rgba(102, 126, 234, 0.35)`。

- [ ] **Step 5: 更新 glass 效果背景色**

将 `.glass` 中的 `background: rgba(26, 29, 40, 0.7)` 替换为 `background: rgba(250, 248, 245, 0.85)`，以适配浅色背景。

- [ ] **Step 6: 更新 share-cta 文字颜色**

找到 `.share-cta` 中的 `color: #0c0e14`，替换为 `color: #ffffff`。

---

## Task 2: 更新 Sidebar.tsx 内联样式和 SVG 颜色

**文件:** `src/components/Sidebar.tsx`

侧边栏使用内联 `<style jsx>` 定义样式，其中有多处硬编码的深色背景色和 SVG stroke 颜色。

- [ ] **Step 1: 更新 `.sidebar` 背景色**

找到 `.sidebar` 中的 `background: var(--bg-secondary)`，确认 `globals.css` 中 `--bg-secondary` 已更新为 `#f5f0ea`。

- [ ] **Step 2: 更新 Logo 区域背景**

找到 `.logo-mark` 中的 `background: var(--accent-primary-dim)`，确认已更新为浅色（通过 CSS 变量）。

- [ ] **Step 3: 更新 SVG stroke 颜色**

将 `Sidebar.tsx` 中所有 `stroke="#818cf8"` 替换为 `stroke="#667eea"`，所有 `fill="#818cf8"` 替换为 `fill="#667eea"`。

需替换的位置：
- 第 74 行: `stroke="#818cf8"` → `stroke="#667eea"` (rect)
- 第 75 行: `stroke="#818cf8"` → `stroke="#667eea"` (line)
- 第 76 行: `stroke="#818cf8"` → `stroke="#667eea"` (line)
- 第 77 行: `stroke="#818cf8"` → `stroke="#667eea"` (line)
- 第 78 行: `fill="#818cf8"` → `fill="#667eea"` (circle)
- 第 79 行: `fill="#34d399"` → 保持不变（成功绿）
- 第 80 行: `fill="#818cf8"` → `fill="#667eea"` (circle)
- 第 116 行: `stroke="#818cf8"` → `stroke="#667eea"` (footer SVG)
- 第 134-137 行: Mobile topbar SVG，同上替换

- [ ] **Step 4: 更新 Mobile topbar Logo SVG**

将第 134-137 行的 SVG stroke 从 `#818cf8` 替换为 `#667eea`。

- [ ] **Step 5: 更新 mobile-add-btn 文字颜色**

将 `.mobile-add-btn` 中的 `color: #0c0e14` 替换为 `color: #ffffff`，确保白色文字在浅色按钮上清晰可见。

---

## Task 3: 验证并测试

- [ ] **Step 1: 启动开发服务器**

Run: `npm run dev`
Expected: 开发服务器在 `http://localhost:3000` 正常启动

- [ ] **Step 2: 验证首页（/）**

访问首页，确认：
- 侧边栏背景为米白色 `#f5f0ea`
- 主内容区背景为米白色 `#faf8f5`
- 统计卡片背景为微暖白 `#fffbf5`
- 按钮为紫蓝渐变 `#667eea → #764ba2`
- 文字颜色正确（深棕黑色）

- [ ] **Step 3: 验证其他页面**

依次访问并确认浅色主题正常：
- `/interviews/new` — 表单输入框背景
- `/interviews/[id]` — 详情页卡片
- `/greeting` — 表单 + 预览
- `/questions` — 列表 + 详情
- `/settings` — 设置卡片
- `/share/[token]` — 分享页

- [ ] **Step 4: 验证移动端响应式**

使用移动端视口宽度（375px）访问，确认布局正常。

- [ ] **Step 5: 验证交互状态**

- 卡片悬停：边框变为 `#d4c8b8`
- 输入框聚焦：边框变为 `#667eea`
- 按钮悬停：渐变阴影加深

---

## 验证清单

- [ ] 首页（`/`）— 侧边栏、统计卡片、时间线
- [ ] 添加面试页（`/interviews/new`）— 表单输入
- [ ] 面试详情页（`/interviews/[id]`）— 详情卡片
- [ ] 招呼语页（`/greeting`）— 表单 + 预览
- [ ] 问题页（`/questions`）— 列表 + 详情
- [ ] 设置页（`/settings`）— 设置卡片
- [ ] 分享页（`/share/[token]`）— 独立页面
- [ ] 移动端响应式布局
