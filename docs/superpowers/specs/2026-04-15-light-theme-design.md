# 浅色主题切换 — 设计文档

## 概述

将当前深色主题切换为浅色主题，保留现有布局结构和组件架构，仅更新色彩系统。

**设计选择：**
- 背景色调：米白/暖白（Notion 风）—— 温暖中性，护眼舒适
- 强调色：紫蓝渐变（苹果风）—— 与现有品牌色系一致

## 配色方案

### 主色系

| Token | 色值 | 用途 |
|-------|------|------|
| `--bg-primary` | `#faf8f5` | 页面主背景 |
| `--bg-secondary` | `#f5f0ea` | 侧边栏背景 |
| `--bg-card` | `#fffbf5` | 卡片背景 |
| `--bg-card-hover` | `#fff8f0` | 卡片悬停态 |
| `--bg-input` | `#faf5ee` | 输入框背景 |
| `--border` | `#e8ddd0` | 边框 |
| `--border-hover` | `#d4c8b8` | 边框悬停 |
| `--border-focus` | `#667eea` | 聚焦边框 |

### 强调色

| Token | 色值 | 用途 |
|-------|------|------|
| `--accent-primary` | `#667eea` | 主强调色（渐变起点） |
| `--accent-primary-end` | `#764ba2` | 渐变终点（用于背景渐变按钮） |
| `--accent-primary-hover` | `#5a6fd6` | 主强调色悬停 |
| `--accent-primary-dim` | `rgba(102,126,234,0.12)` | 主强调色透明背景 |
| `--accent-success` | `#16a34a` | 成功/现场面试 |
| `--accent-success-dim` | `rgba(22,163,74,0.12)` | 成功色透明背景 |
| `--accent-warning` | `#d97706` | 警告/今日 |
| `--accent-danger` | `#f87171` | 危险/删除 |
| `--accent-danger-dim` | `rgba(248,113,113,0.12)` | 危险色透明背景 |
| `--accent-video` | `#667eea` | 视频面试（同主强调色） |
| `--accent-video-dim` | `rgba(102,126,234,0.12)` | 视频色透明背景 |

### 文字色

| Token | 色值 | 用途 |
|-------|------|------|
| `--text-primary` | `#1c1917` | 主文字（深棕黑） |
| `--text-secondary` | `#78716c` | 次要文字（中棕） |
| `--text-tertiary` | `#a8a29e` | 辅助文字（浅棕） |
| `--text-accent` | `#667eea` | 强调文字 |

### 阴影

| Token | 值 | 用途 |
|-------|---|------|
| `--shadow-sm` | `0 1px 3px rgba(60,40,10,0.06)` | 小阴影 |
| `--shadow-md` | `0 4px 12px rgba(60,40,10,0.08)` | 中阴影 |
| `--shadow-lg` | `0 8px 32px rgba(60,40,10,0.10)` | 大阴影 |
| `--shadow-glow` | `0 0 16px rgba(102,126,234,0.15)` | 渐变光晕 |

## 实现范围

### 需修改的文件

1. **`src/app/globals.css`** — 更新所有 CSS 变量值（`:root` 部分）
2. **`src/components/Sidebar.tsx`** — 更新内联样式中的颜色值
3. **`src/components/GreetingForm.tsx`** — 检查是否有硬编码颜色
4. **`src/components/GreetingPreview.tsx`** — 检查是否有硬编码颜色
5. **`src/components/QuestionDetail.tsx`** — 检查是否有硬编码颜色

### 保持不变的部分

- 布局结构（侧边栏、主内容区）
- 组件结构
- 字体系统
- 动画和过渡效果
- 响应式断点

### 按钮渐变处理

主按钮（`.btn-primary`）使用紫蓝渐变背景，CSS 实现：
```css
background: linear-gradient(135deg, #667eea, #764ba2);
```

卡片和侧边栏 Logo 图标同样使用渐变背景，保持品牌一致性。

## 语义色保持不变

以下语义色与浅色背景搭配良好，无需修改：
- 成功绿 `#16a34a` — 现场面试
- 警告橙 `#d97706` — 今日统计
- 危险红 `#f87171` — 删除操作
- 视频蓝紫 `#667eea` — 视频面试（与主强调色一致）

## 特殊处理

### 滚动条
滚动条轨道和滑块颜色需适配浅色背景，调整为与米白色系协调的颜色。

### 选中文本
`::selection` 背景色改为 `rgba(102,126,234,0.15)`，文字色改为 `#667eea`。

### 聚焦样式
`:focus-visible` 轮廓色保持 `#667eea`，与浅色背景对比清晰。

## 实施步骤

1. 更新 `globals.css` 中的 `:root` CSS 变量
2. 更新 `Sidebar.tsx` 内联样式中的背景色和边框色
3. 检查并更新其他组件中的硬编码颜色（如有）
4. 验证所有页面在浅色主题下的显示效果
5. 测试交互状态（悬停、聚焦、激活）

## 验证清单

- [ ] 首页（`/`）— 侧边栏、统计卡片、时间线
- [ ] 添加面试页（`/interviews/new`）— 表单输入
- [ ] 面试详情页（`/interviews/[id]`）— 详情卡片
- [ ] 招呼语页（`/greeting`）— 表单 + 预览
- [ ] 问题页（`/questions`）— 列表 + 详情
- [ ] 设置页（`/settings`）— 设置卡片
- [ ] 分享页（`/share/[token]`）— 独立页面
- [ ] 移动端响应式布局
