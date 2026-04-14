import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import InterviewForm from '@/components/InterviewForm'

export default async function EditInterview({ params }: { params: { id: string } }) {
  const interview = await prisma.interview.findUnique({ where: { id: params.id } })
  if (!interview) notFound()

  const initialData = {
    date: interview.date.toISOString().split('T')[0],
    startTime: interview.startTime,
    endTime: interview.endTime,
    company: interview.company,
    position: interview.position,
    positionUrl: interview.positionUrl || '',
    interviewType: interview.interviewType,
    meetingUrl: interview.meetingUrl || '',
    notes: interview.notes || '',
    reminderMinutes: interview.reminderMinutes,
    reminderEnabled: interview.reminderEnabled,
  }

  return (
    <main className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">编辑面试</h1>
      <InterviewForm mode="edit" id={interview.id} initialData={initialData} />
    </main>
  )
}
