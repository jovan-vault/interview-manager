import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import Link from 'next/link'
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
    <div className="page-container animate-fade-in">
      <div className="page-header-simple">
        <Link href={`/interviews/${params.id}`} className="back-link">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"/>
            <polyline points="12 19 5 12 12 5"/>
          </svg>
          返回详情
        </Link>
      </div>
      <div className="form-layout">
        <div className="form-header">
          <div className="form-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
            </svg>
          </div>
          <div>
            <h1 className="form-title">编辑面试</h1>
            <p className="form-subtitle">修改 {interview.company} 的面试信息</p>
          </div>
        </div>
        <InterviewForm mode="edit" id={interview.id} initialData={initialData} />
      </div>
    </div>
  )
}
