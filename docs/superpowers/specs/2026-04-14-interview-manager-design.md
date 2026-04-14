# 面试时间管理器 - 设计文档

## 1. 项目概述

**项目名称**: Interview Manager
**项目类型**: 网页应用（云端存储）
**核心功能**: 管理面试时间、查看面试安排、分享面试信息
**目标用户**: 求职者，需要管理多个面试时间的人

## 2. 功能需求

### 2.1 核心功能 (MVP)

| 功能 | 说明 |
|------|------|
| 面试列表 | 展示所有面试，按日期分组排序 |
| 添加面试 | 表单录入面试信息 |
| 编辑面试 | 修改已有面试记录 |
| 删除面试 | 列表页删除功能 |
| 分享查看链接 | 生成唯一 URL，任何人可查看（只读） |

### 2.2 数据字段

| 字段 | 类型 | 说明 |
|------|------|------|
| id | UUID | 唯一标识 |
| date | Date | 面试日期 |
| startTime | String | 开始时间 (HH:mm) |
| endTime | String | 结束时间 (HH:mm) |
| company | String | 公司名称 |
| position | String | 岗位名称 |
| positionUrl | String (可选) | 招聘链接 |
| interviewType | Enum | 视频 / 现场 |
| meetingUrl | String (可选) | 视频会议链接（视频面试时填写） |
| notes | String (可选) | 备注 |
| shareToken | String | 分享链接 Token |
| createdAt | DateTime | 创建时间 |
| updatedAt | DateTime | 更新时间 |

### 2.3 页面结构

| 路由 | 说明 |
|------|------|
| / | 首页 - 面试列表（按日期分组） |
| /interviews/new | 添加面试 |
| /interviews/[id] | 查看面试详情 |
| /interviews/[id]/edit | 编辑面试 |
| /share/[token] | 分享页（只读，无需登录） |

## 3. 技术方案

| 层级 | 技术选型 |
|------|----------|
| 框架 | Next.js 14 (App Router) |
| 数据库 | PostgreSQL |
| ORM | Prisma |
| 样式 | Tailwind CSS |
| 部署平台 | Vercel |
| 数据存储 | 云端 PostgreSQL |

## 4. 扩展功能 (MVP 后)

- 面试提醒功能（浏览器通知/邮件）
- 日历导入（ICS/Google Calendar）
- 用户注册登录系统
