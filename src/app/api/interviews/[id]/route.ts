import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const interview = await prisma.interview.findUnique({ where: { id: params.id } })
  if (!interview) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(interview)
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const body = await request.json()
  const { date, startTime, endTime, company, position, positionUrl, interviewType, meetingUrl, notes } = body

  const interview = await prisma.interview.update({
    where: { id: params.id },
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

  return NextResponse.json(interview)
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  await prisma.interview.delete({ where: { id: params.id } })
  return NextResponse.json({ success: true })
}
