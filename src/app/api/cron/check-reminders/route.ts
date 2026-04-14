import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { sendReminderEmail } from '@/lib/resend'

export async function GET(request: Request) {
  // 验证 CRON_SECRET
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // 获取设置中的邮箱
  const settings = await prisma.settings.findFirst()
  if (!settings?.email) {
    return NextResponse.json({ message: 'No reminder email configured' })
  }

  const now = new Date()

  // 查询需要发送提醒的面试
  // 条件: reminderSent = false 且 面试时间 - reminderMinutes <= now
  const interviews = await prisma.interview.findMany({
    where: {
      reminderSent: false,
      reminderEnabled: true,
    },
  })

  const toSend: string[] = []

  for (const interview of interviews) {
    const interviewDateTime = new Date(interview.date)
    const [hours, minutes] = interview.startTime.split(':').map(Number)
    interviewDateTime.setHours(hours, minutes, 0, 0)

    const reminderTime = new Date(interviewDateTime.getTime() - interview.reminderMinutes * 60 * 1000)

    if (reminderTime <= now) {
      try {
        await sendReminderEmail({
          to: settings.email,
          company: interview.company,
          position: interview.position,
          date: interview.date.toISOString(),
          startTime: interview.startTime,
          endTime: interview.endTime,
          interviewType: interview.interviewType,
          meetingUrl: interview.meetingUrl,
          notes: interview.notes,
        })

        await prisma.interview.update({
          where: { id: interview.id },
          data: { reminderSent: true },
        })

        toSend.push(interview.id)
      } catch (error) {
        console.error(`Failed to send reminder for interview ${interview.id}:`, error)
        // 即使发送失败也标记为已处理，避免无限重试
        await prisma.interview.update({
          where: { id: interview.id },
          data: { reminderSent: true },
        }).catch(() => {})
      }
    }
  }

  return NextResponse.json({
    success: true,
    sent: toSend.length,
    ids: toSend,
  })
}
