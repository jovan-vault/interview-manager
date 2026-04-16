import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { sendReminderEmail } from '@/lib/resend'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  // 获取设置中的邮箱
  const settings = await prisma.settings.findFirst()
  if (!settings?.email) {
    return NextResponse.json({ error: 'No email configured' }, { status: 400 })
  }

  // 查找第一条未发送的面试
  const interview = await prisma.interview.findFirst({
    where: {
      reminderSent: false,
      reminderEnabled: true,
    },
  })

  if (!interview) {
    return NextResponse.json({ error: 'No interview found' }, { status: 404 })
  }

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

    return NextResponse.json({
      success: true,
      message: 'Test email sent!',
      interviewId: interview.id,
    })
  } catch (error) {
    console.error('Failed to send test email:', error)
    return NextResponse.json({
      error: 'Failed to send email',
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 })
  }
}
