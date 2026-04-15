# 前端重构设计方案

**日期**: 2026-04-15
**状态**: 已批准

## 1. 设计风格

**现代简约风格** — 垂直时间线布局

### 视觉特点
- 大面积留白，极细边框卡片（border border-gray-100）
- 垂直时间线布局：左侧圆点（w-3 h-3 rounded-full）+ 连接线（w-0.5 bg-gray-200）
- 柔和灰色调，背景使用 bg-gray-50
- 卡片圆角使用 rounded-xl 或 rounded-2xl
- 无太多留白，紧凑但不拥挤

### 颜色系统
- 背景色: bg-gray-50
- 卡片色: bg-white
- 主色调: blue-500
- 成功色: green-500
- 警告色: yellow-400 / yellow-100
- 文字色: gray-800 (标题), gray-600 (正文), gray-400 (辅助)

### 字体
- 使用 Inter 字体（已有）
- 标题: font-bold text-gray-800
- 正文: text-sm text-gray-600
- 辅助: text-xs text-gray-400

---

## 2. 首页重构 — 面试列表时间线

### 布局结构
- 最大宽度 max-w-2xl（保持现有）
- 内边距 p-4
- 顶部导航保留：标题 + 设置按钮 + 添加面试按钮
- 日期分组使用垂直时间线展示

### 时间线样式
```jsx
<div class="flex gap-4">
  {/* 左侧时间线 */}
  <div class="flex flex-col items-center">
    <div class="w-3 h-3 rounded-full bg-blue-500"></div>
    <div class="w-0.5 h-full bg-gray-200"></div>
  </div>
  {/* 右侧内容 */}
  <div class="flex-1 pb-6">
    <div class="text-sm text-gray-500">10:00</div>
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
      {/* 面试卡片内容 */}
    </div>
  </div>
</div>
```

### 面试卡片样式
- 背景: bg-white
- 圆角: rounded-xl
- 阴影: shadow-sm
- 边框: border border-gray-100
- 内边距: p-4
- 状态标签: rounded-full 小药丸形状
- 视频/现场: bg-blue-100/bg-green-100 + text-blue-700/text-green-700

---

## 3. 新页面1 — 招呼语生成 `/greeting`

### 路由
- `/greeting` — 招呼语生成页面

### 页面布局
采用**表单式**布局，左右分栏：

```
+--------------------------------------------------+
|  💬 AI 招呼语生成                                 |
+--------------------------------------------------+
|  左侧输入区 (50%)     |    右侧预览区 (50%)       |
|                       |                          |
|  [📄 简历内容]        |    [生成结果预览]         |
|  [textarea]           |    [虚线边框占位]         |
|                       |                          |
|  [💼 职位 JD]         |                          |
|  [textarea]           |                          |
|                       |                          |
|  [✨ 生成招呼语]       |                          |
+--------------------------------------------------+
```

### 组件样式
- 页面容器: max-w-5xl mx-auto bg-white rounded-2xl shadow-sm border
- 输入标签: text-sm font-medium text-gray-700 mb-2
- 输入框: rounded-xl border border-gray-200 p-4 text-sm bg-gray-50
- 按钮: bg-blue-500 text-white rounded-xl py-3 font-medium
- 预览区: bg-gradient-to-br from-gray-50 to-white border-2 border-dashed border-gray-200 rounded-xl

### 交互
- 输入简历和JD后点击"生成招呼语"按钮
- 右侧预览区显示生成的招呼语结果（目前仅样式，无实际功能）

---

## 4. 新页面2 — 问题记录 `/questions`

### 路由
- `/questions` — 问题记录页面

### 页面布局
采用**列表编辑式**布局，左右分栏：

```
+--------------------------------------------------+
|  📝 面试问题记录                    [+ 添加问题] |
+--------------------------------------------------+
|  左侧问题列表 (45%)      |    右侧详情分析 (55%) |
|                           |                       |
|  [共 6 个问题]             |    [问题标题]          |
|                           |    [问题描述]          |
|  [问题1 - 已掌握]          |                       |
|  [问题2 - 待完善]          |    [AI 分析建议]       |
|  [问题3 - 未复习]          |    [✓] 建议1          |
|                           |    [✓] 建议2          |
|                           |    [⚠] 建议3          |
|                           |                       |
|                           |    [🧠 重新分析]       |
+--------------------------------------------------+
```

### 左侧问题列表样式
- 列表项: bg-gray-50 rounded-xl p-4 border border-gray-100
- 选中项: bg-blue-50 border-2 border-blue-200
- 状态标签: rounded-full 小药丸
  - 已掌握: bg-green-100 text-green-700
  - 待完善: bg-yellow-100 text-yellow-700
  - 未复习: bg-gray-100 text-gray-600

### 右侧详情分析样式
- 容器: bg-gray-50 rounded-xl p-5 border border-gray-100
- 问题标题区: 头像圆形 + 公司/岗位信息
- 分析建议: 白色背景 rounded-lg border
- 按钮: bg-blue-500 text-white rounded-lg py-2

### 交互
- 点击左侧问题列表项，右侧显示详情和AI分析建议
- "添加问题"按钮打开添加表单（目前仅样式）
- "智能分析"按钮触发分析（目前仅样式）

---

## 5. 导航更新

### 新增导航入口
在首页顶部导航添加两个新入口：

```tsx
<Link href="/greeting" className="text-gray-600 hover:text-gray-800 px-3 py-2 text-sm">
  💬 招呼语
</Link>
<Link href="/questions" className="text-gray-600 hover:text-gray-800 px-3 py-2 text-sm">
  📝 问题记录
</Link>
```

---

## 6. 技术实现

### 文件结构
```
src/
├── app/
│   ├── greeting/
│   │   └── page.tsx        # 招呼语生成页面
│   ├── questions/
│   │   └── page.tsx        # 问题记录页面
│   ├── page.tsx            # 首页（面试列表）
│   └── layout.tsx           # 布局
├── components/
│   ├── InterviewTimeline.tsx    # 时间线式面试卡片
│   ├── GreetingForm.tsx         # 招呼语表单
│   ├── GreetingPreview.tsx      # 招呼语预览
│   ├── QuestionList.tsx         # 问题列表
│   └── QuestionDetail.tsx       # 问题详情+分析
```

### 组件依赖
- 现有 InterviewCard 可作为参考，样式迁移到 InterviewTimeline
- 所有新组件均为纯展示组件（目前无需实际功能）

---

## 7. 实施计划

由于是样式重构，实施顺序：

1. **首页重构** — 将现有面试列表改为时间线布局
2. **创建招呼语页面** — /greeting 页面及组件
3. **创建问题记录页面** — /questions 页面及组件
4. **更新导航** — 添加新页面入口

---

## 8. 验收标准

- [ ] 首页面试列表使用时间线垂直布局
- [ ] /greeting 页面使用表单式左右分栏布局
- [ ] /questions 页面使用列表编辑式左右分栏布局
- [ ] 所有页面无过多留白，紧凑但不拥挤
- [ ] 风格统一：圆角、阴影、边框、颜色系统一致
- [ ] 导航可正常跳转新页面（仅有样式）
