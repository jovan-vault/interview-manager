import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const token = searchParams.get('token')

  if (token) {
    const interview = await prisma.interview.findUnique({ where: { shareToken: token } })
    if (!interview) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(interview)
  }

  const interviews = await prisma.interview.findMany({ orderBy: { date: 'asc' } })
  return NextResponse.json(interviews)
}

export async function POST(request: Request) {
  const body = await request.json()
  const { date, startTime, endTime, company, position, positionUrl, interviewType, meetingUrl, notes } = body

  const interview = await prisma.interview.create({
    data: {
      date: new Date(date),
      startTime,
      endTime,
      company,
      position,
      positionUrl: positionUrl || null,
      interviewType,
      meetingUrl: meetingUrl || null,
      notes: notes || null,
      reminderMinutes: body.reminderMinutes ?? 60,
      reminderEnabled: body.reminderEnabled ?? true,
    },
  })

  return NextResponse.json(interview, { status: 201 })
}
