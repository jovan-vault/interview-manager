# 日历侧边栏设计

## 1. 概述与目标

在面试日程主页右侧添加日历侧边栏，帮助用户快速了解哪天有面试安排，并通过点击日期跳转到对应位置。

## 2. 设计决策

### 布局方案
- **方案 C - 月历 + 快速预览**：顶部完整月历，下方"即将到来"列表
- 日历侧边栏固定宽度 **280px**，位于主内容区右侧
- 主内容区保持现有宽度自适应

### 交互行为
- **点击日期 → 滚动定位 + 高亮**：点击有面试的日期，主界面自动向下滚动到该日期区块，并用紫色高亮边框（`--accent-primary`）标识，3秒后自动取消高亮
- URL 不变，不引入路由参数

### 样式
- 复用 `globals.css` 现有 CSS 变量
- 月历日期格：默认无背景，有面试日期用紫色圆点标识
- 面试数量 badge：红色圆角矩形（`#ef4444`），白色字体
- 今日：用紫色边框圆圈标识
- "即将到来"列表：每个条目左侧有紫色圆点，hover 有轻微放大效果

### 移动端
- 不考虑移动端，保持当前桌面端设计

## 3. 组件设计

### CalendarSidebar 组件

**文件**: `src/components/CalendarSidebar.tsx`

**Props**:
```typescript
interface CalendarSidebarProps {
  interviews: {
    date: string;
    startTime: string;
    endTime: string;
    company: string;
    position: string;
    interviewType: 'VIDEO' | 'ONSITE';
  }[];
  onDateClick: (date: string) => void; // 触发滚动
}
```

**内部状态**:
- `currentMonth: Date` — 当前显示的月份
- `highlightedDate: string | null` — 高亮日期（3秒后自动清除）

**UI 结构**:
1. 月份导航栏（标题 + 左右箭头）
2. 周一~周日表头
3. 日期网格（6行7列）
4. 分隔线
5. "即将到来"列表（有面试的日期，排序）

### 高亮日期的滚动行为
- 父组件（`page.tsx`）传入 `selectedDate` URL search param
- `date-group` div 根据 `id={date}` 设置
- 点击日历日期 → 更新 URL search param → 触发滚动 + 高亮

## 4. 页面集成

### page.tsx 改造
- 引入 `CalendarSidebar` 组件
- 传入 `grouped` 数据（按日期分组的面试列表）
- 新增 `selectedDate` search param 状态
- 当 `selectedDate` 变化时，调用 `scrollIntoView()` 并设置高亮

### 布局调整
- 现有 `.page-container` 改为左右分栏 flex 布局
- 左侧：现有内容（flex: 1）
- 右侧：`CalendarSidebar`（固定 280px）

## 5. 数据流

```
page.tsx (Server Component)
  ├── getInterviews() → 原始数据
  ├── grouped → 传给 CalendarSidebar
  └── onDateClick → 更新 search param → 触发客户端滚动

CalendarSidebar (Client Component)
  ├── 接收 grouped interviews
  ├── 计算：哪些日期有面试 + 数量
  ├── 月份导航（状态）
  └── onDateClick(date) → 父组件
```

## 6. 涉及文件

| 文件 | 操作 |
|------|------|
| `src/components/CalendarSidebar.tsx` | 新建 |
| `src/app/page.tsx` | 修改：集成日历 + 滚动逻辑 |
| `src/app/globals.css` | 修改：添加日历相关样式 |

## 7. 验证方式

1. 启动 `npm run dev`
2. 访问首页，确认右侧显示日历
3. 确认有面试的日期高亮 + badge 显示数量
4. 点击有面试的日期，确认主界面滚动 + 高亮
5. 点击左右箭头，确认月份切换正常
6. 确认"即将到来"列表排序正确（近期优先）
