# 前端样式重构设计方案

## 概述

将面试管理器前端从当前浅色 Tailwind 主题重构为 Spotify 风格的深色沉浸式主题。

## 设计风格

### 色彩系统

| 用途 | 颜色 | 说明 |
|------|------|------|
| 背景 | `#121212` | 最深层页面背景 |
| 卡片/容器 | `#181818` | 页面主要容器、卡片 |
| 交互面 | `#1f1f1f` | 按钮、输入框背景 |
| 主强调色 | `#1ed760` | Spotify Green - CTA、激活状态 |
| 主文字 | `#ffffff` | 白色文字 |
| 次要文字 | `#b3b3b3` | 未激活/次要信息 |
| 边框 | `#4d4d4d` | 按钮边框 |

### 语义色
- **Negative Red** (`#f3727f`): 错误/删除
- **Warning Orange** (`#ffa42b`): 警告/待处理
- **Announcement Blue** (`#539df5`): 信息/视频面试

### 圆角系统
- 药丸按钮: `500px-9999px`
- 圆形控件: `50%` (播放按钮、头像)
- 卡片: `6px-8px`

### 阴影
- 卡片悬浮: `rgba(0,0,0,0.3) 0px 8px 8px`
- 对话框/菜单: `rgba(0,0,0,0.5) 0px 8px 24px`

---

## 页面改造清单

### 1. 全局样式 (globals.css)
- 设置 CSS 变量 `--bg-primary`, `--bg-card`, `--bg-interactive`, `--text-primary`, `--text-secondary`, `--accent-green`
- 设置全局 `body` 背景色 `#121212`
- 保持 Tailwind 兼容，添加深色变量

### 2. 根布局 (layout.tsx)
- 更新 `body` class 为深色背景
- 可选：添加 Spotify 风格字体 (CircularSp 家族)

### 3. 主页 (page.tsx)
- 页面背景: `#121212`
- 标题: 白色 `#ffffff`
- 导航链接: `#b3b3b3` 未激活 / `#ffffff` 激活
- 添加面试按钮: Spotify Green `#1ed760` 药丸形
- 日期分组标题: `#b3b3b3`

### 4. 面试时间线组件 (InterviewTimeline.tsx)
- 卡片背景: `#181818`
- 卡片圆角: `8px`
- 卡片阴影: `rgba(0,0,0,0.3) 0px 8px 8px`
- 时间线圆点: 视频=`#539df5` / 现场=`#1ed760`
- 公司名称: `#ffffff` bold
- 职位: `#b3b3b3`
- 面试类型标签: 对应语义色背景
- 文字链接: 激活时 `#1ed760`

### 5. 面试表单 (InterviewForm.tsx)
- 表单容器: `#181818` 背景卡片
- 输入框: `#1f1f1f` 背景 + inset border
- 标签文字: `#b3b3b3`
- 提交按钮: `#1ed760` 药丸形，白色文字
- 取消按钮: `#1f1f1f` 药丸形
- 提醒提示框: `#252525` 背景

### 6. 面试详情页 (interviews/[id]/page.tsx)
- 返回链接: `#b3b3b3` → hover `#1ed760`
- 主卡片: `#181818` 背景
- 标签: 使用语义色
- 编辑按钮: `#1f1f1f` 药丸形

### 7. 招呼语页面 (greeting/page.tsx)
- 页面背景: `#121212`
- 主容器: `#181818` 卡片
- 标题: 白色

### 8. 问题页面 (questions/page.tsx)
- 同招呼语布局
- 状态徽章使用语义色:
  - mastered: `#1ed760` (绿色)
  - pending: `#ffa42b` (橙色)
  - not-reviewed: `#539df5` (蓝色)

### 9. 设置页面 (settings/page.tsx)
- 返回链接: 同面试详情
- 主卡片: `#181818`
- 保存按钮: `#1ed760` 药丸形
- 提示框: `#252525`

---

## 实施顺序

1. 更新 `globals.css` - 全局变量和 body 样式
2. 更新 `layout.tsx` - 根布局深色化
3. 更新 `InterviewTimeline.tsx` - 时间线组件
4. 更新 `InterviewForm.tsx` - 表单组件
5. 更新主页和其他页面
6. 更新 `ShareButton.tsx` 和 `DeleteButton.tsx` 等小组件

---

## 成功标准

- 所有页面背景为深色 `#121212`
- 按钮统一使用药丸形状
- 绿色 `#1ed760` 仅用于主要 CTA 和激活状态
- 次要文字使用 `#b3b3b3`
- 卡片有轻微阴影和圆角
- 无浅色背景残留
