import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import ShareButton from '@/components/ShareButton'
import DeleteButton from '@/components/DeleteButton'

export default async function InterviewDetail({ params }: { params: { id: string } }) {
  const interview = await prisma.interview.findUnique({ where: { id: params.id } })
  if (!interview) notFound()

  const date = new Date(interview.date).toLocaleDateString('zh-CN', { weekday: 'long', month: 'long', day: 'numeric' })
  const isVideo = interview.interviewType === 'VIDEO'

  return (
    <main className="max-w-2xl mx-auto p-4">
      <div className="mb-6">
        <Link href="/" className="text-blue-600 hover:underline">← 返回列表</Link>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-2xl font-bold">{interview.company}</h1>
            <p className="text-gray-600 text-lg">{interview.position}</p>
          </div>
          <span className={`text-sm px-3 py-1 rounded ${isVideo ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>
            {isVideo ? '视频面试' : '现场面试'}
          </span>
        </div>

        <div className="space-y-3 text-gray-700">
          <p><span className="font-medium">📅 日期：</span>{date}</p>
          <p><span className="font-medium">🕐 时间：</span>{interview.startTime} - {interview.endTime}</p>

          {interview.positionUrl && (
            <p><span className="font-medium">🔗 职位链接：</span>
              <a href={interview.positionUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline ml-1">
                查看职位
              </a>
            </p>
          )}

          {isVideo && interview.meetingUrl && (
            <p><span className="font-medium">🎥 会议链接：</span>
              <a href={interview.meetingUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline ml-1">
                加入会议
              </a>
            </p>
          )}

          <p><span className="font-medium">⏰ 提醒：</span>
            {interview.reminderEnabled
              ? `面试前 ${interview.reminderMinutes} 分钟`
              : '已禁用'}
          </p>

          {interview.notes && (
            <p><span className="font-medium">📝 备注：</span>{interview.notes}</p>
          )}
        </div>

        <div className="mt-6 flex gap-3">
          <Link href={`/interviews/${interview.id}/edit`}
            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">
            编辑
          </Link>
          <ShareButton shareToken={interview.shareToken || ''} />
          <DeleteButton interviewId={interview.id} />
        </div>
      </div>
    </main>
  )
}
