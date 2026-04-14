import { Resend } from 'resend'

if (!process.env.RESEND_API_KEY) {
  throw new Error('RESEND_API_KEY is not configured')
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendReminderEmail({
  to,
  company,
  position,
  date,
  startTime,
  endTime,
  interviewType,
  meetingUrl,
  notes,
}: {
  to: string
  company: string
  position: string
  date: string
  startTime: string
  endTime: string
  interviewType: string
  meetingUrl?: string | null
  notes?: string | null
}) {
  const isVideo = interviewType === 'VIDEO'
  const dateStr = new Date(date).toLocaleDateString('zh-CN', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  })

  const html = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #1a1a1a;">📅 面试提醒</h1>

      <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h2 style="margin: 0 0 10px 0;">${escapeHtml(company)}</h2>
        <p style="margin: 0; color: #666;">${escapeHtml(position)}</p>
      </div>

      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #eee;"><strong>📅 日期</strong></td>
          <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${dateStr}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #eee;"><strong>🕐 时间</strong></td>
          <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${startTime} - ${endTime}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #eee;"><strong>📋 类型</strong></td>
          <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${isVideo ? '🎥 视频面试' : '🏢 现场面试'}</td>
        </tr>
      </table>

      ${isVideo && meetingUrl ? `
        <div style="margin: 20px 0; text-align: center;">
          <a href="${meetingUrl}" style="display: inline-block; background: #0066cc; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">
            🎥 加入视频会议
          </a>
        </div>
      ` : ''}

      ${notes ? `
        <div style="background: #fffbeb; border: 1px solid #fcd34d; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 0; color: #92400e;"><strong>📝 备注</strong></p>
          <p style="margin: 5px 0 0 0; color: #92400e;">${escapeHtml(notes)}</p>
        </div>
      ` : ''}

      <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;" />
      <p style="color: #999; font-size: 12px;">来自面试时间管理器</p>
    </div>
  `

  const text = `
📅 面试提醒

公司: ${company}
岗位: ${position}
时间: ${dateStr} ${startTime} - ${endTime}
类型: ${isVideo ? '视频面试' : '现场面试'}

${isVideo && meetingUrl ? `🎥 加入视频会议: ${meetingUrl}\n` : ''}
${notes ? `📝 备注: ${notes}\n` : ''}
---

来自面试时间管理器
  `.trim()

  const { data, error } = await resend.emails.send({
    from: '面试提醒 <onboarding@resend.dev>',
    to: [to],
    subject: `📅 面试提醒 - ${company} ${position}`,
    html,
    text,
  })

  if (error) {
    console.error('Resend error:', error)
    throw new Error(`Failed to send email: ${error.message}`)
  }

  return data
}
