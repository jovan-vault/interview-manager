import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'

export default async function SharePage({ params }: { params: { token: string } }) {
  const interview = await prisma.interview.findUnique({ where: { shareToken: params.token } })
  if (!interview) notFound()

  const date = new Date(interview.date).toLocaleDateString('zh-CN', { weekday: 'long', month: 'long', day: 'numeric' })
  const isVideo = interview.interviewType === 'VIDEO'

  return (
    <main className="max-w-2xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">📅 面试邀请</h1>
          <p className="text-gray-500 mt-1">来自面试时间管理器的分享</p>
        </div>

        <div className="space-y-4 border-t pt-6">
          <div className="text-center">
            <h2 className="text-xl font-semibold">{interview.company}</h2>
            <p className="text-gray-600">{interview.position}</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 space-y-2">
            <p className="text-center">
              <span className="text-2xl">📅</span> {date}
            </p>
            <p className="text-center text-gray-700 font-medium">
              🕐 {interview.startTime} - {interview.endTime}
            </p>
            <p className="text-center">
              <span className={`inline-block px-3 py-1 rounded text-sm ${isVideo ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>
                {isVideo ? '🎥 视频面试' : '🏢 现场面试'}
              </span>
            </p>
          </div>

          {isVideo && interview.meetingUrl && (
            <div className="text-center">
              <a href={interview.meetingUrl} target="_blank" rel="noopener noreferrer"
                className="inline-block bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition">
                🎥 加入视频会议
              </a>
            </div>
          )}

          {interview.positionUrl && (
            <p className="text-center text-sm text-gray-500">
              职位链接：<a href={interview.positionUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                点击查看
              </a>
            </p>
          )}

          {interview.notes && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
              <p className="text-sm font-medium text-yellow-800">📝 备注</p>
              <p className="text-yellow-700 mt-1">{interview.notes}</p>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}