# 面试提醒功能 - 设计文档

## 1. 项目概述

**功能名称**: 面试前邮件提醒
**核心功能**: 在面试开始前指定时间发送邮件提醒
**目标用户**: 求职者，需要在面试前收到提醒

## 2. 功能需求

### 2.1 数据模型变更

#### Interview 表新增字段

| 字段 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| reminderMinutes | Int | 60 | 提醒时间（分钟），范围 10-1440 |
| reminderSent | Boolean | false | 是否已发送提醒 |

#### 新增 Settings 表

| 字段 | 类型 | 说明 |
|------|------|------|
| id | String | 主键 |
| email | String | 提醒接收邮箱 |
| createdAt | DateTime | 创建时间 |
| updatedAt | DateTime | 更新时间 |

### 2.2 页面变更

#### 添加/编辑面试表单新增字段

- **提醒时间**: number input
  - 范围: 10-1440 分钟
  - 默认值: 60
  - 提示文字: "面试前多少分钟发送提醒（10-1440分钟）"

#### 新增设置页面 `/settings`

- 路径: `/settings`
- 功能: 设置接收提醒的邮箱
- 表单: 邮箱输入框 + 保存按钮
- 校验: 有效的邮箱格式

### 2.3 API 设计

#### GET /api/settings
- 返回: `{ email: string }` 或空
- 不存在时返回: `{ email: null }`

#### POST /api/settings
- 请求体: `{ email: string }`
- 校验: 有效的邮箱格式
- 返回: 更新后的设置

#### POST /api/cron/check-reminders (Vercel Cron 调用)
- 查询条件:
  - reminderSent = false
  - date + startTime - reminderMinutes <= 当前时间
- 发送邮件后更新 reminderSent = true
- 需要验证 cron secret 防止滥用

### 2.4 邮件发送

#### 使用 Resend API
- npm 包: resend
- 免费额度: 3000 封/天

#### 邮件内容

**主题**: 📅 面试提醒 - {公司名称} {岗位名称}

**正文**:
```
📅 面试提醒

公司: {公司名称}
岗位: {岗位名称}
时间: {日期} {开始时间} - {结束时间}
类型: {视频面试/现场面试}

{如果是视频面试且有会议链接:}
🎥 加入视频会议: {会议链接}

{如果有备注:}
📝 备注: {备注内容}

---
来自面试时间管理器
```

**按钮** (视频面试时): "加入视频会议" → 会议链接

### 2.5 Cron Job 配置

#### vercel.json 配置
```json
{
  "crons": [{
    "path": "/api/cron/check-reminders",
    "schedule": "* * * * *"
  }]
}
```

#### 安全措施
- Cron API 需要验证 Authorization header
- 使用环境变量 CRON_SECRET

## 3. 环境变量

```env
# Resend API Key
RESEND_API_KEY="re_xxxxx"

# Cron Job 验证密钥
CRON_SECRET="your-secret-key"
```

## 4. 技术实现

| 层级 | 技术 |
|------|------|
| 邮件服务 | Resend |
| 邮件模板 | React Email |
| 定时任务 | Vercel Cron (每分钟) |
| 样式 | Tailwind CSS + React Email 组件 |

## 5. 文件结构

```
src/
├── app/
│   ├── settings/
│   │   └── page.tsx           # 设置页面
│   ├── api/
│   │   ├── settings/
│   │   │   └── route.ts       # 设置 API
│   │   └── cron/
│   │       └── check-reminders/
│   │           └── route.ts   # Cron 检查 API
├── components/
│   └── EmailTemplate.tsx      # 邮件模板组件
├── lib/
│   └── resend.ts              # Resend 客户端
├── emails/
│   └── ReminderEmail.tsx      # React Email 邮件模板
prisma/
└── schema.prisma               # 数据库模型（含新字段）
vercel.json                     # Cron 配置
```

## 6. 部署后配置

1. 在 Vercel 项目中添加环境变量:
   - `RESEND_API_KEY`: Resend API Key
   - `CRON_SECRET`: 随机字符串

2. 在 Vercel 项目设置中启用 Cron:
   - 路径: Settings → Crons → 启用

3. 在 Resend 域名设置中验证发件域名（可选，使用默认域名测试）
