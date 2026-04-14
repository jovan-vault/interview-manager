interface Interview {
  id: string
  date: string
  startTime: string
  endTime: string
  company: string
  position: string
  interviewType: string
  meetingUrl?: string | null
}

interface Props { interview: Interview }

export default function InterviewCard({ interview }: Props) {
  const date = new Date(interview.date)
  const dateStr = date.toLocaleDateString('zh-CN', { weekday: 'long', month: 'long', day: 'numeric' })
  const isVideo = interview.interviewType === 'VIDEO'

  return (
    <div className="bg-white rounded-lg shadow p-4 mb-3 border border-gray-100">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-lg">{interview.company}</h3>
          <p className="text-gray-600">{interview.position}</p>
        </div>
        <span className={`text-xs px-2 py-1 rounded ${isVideo ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>
          {isVideo ? '视频' : '现场'}
        </span>
      </div>
      <div className="mt-3 text-sm text-gray-500">
        <p>📅 {dateStr}</p>
        <p>🕐 {interview.startTime} - {interview.endTime}</p>
        {isVideo && interview.meetingUrl && (
          <a href={interview.meetingUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline mt-1 block">
            🔗 加入视频会议
          </a>
        )}
      </div>
      <div className="mt-3 flex gap-2">
        <a href={`/interviews/${interview.id}`} className="text-sm text-blue-600 hover:underline">查看详情</a>
        <a href={`/interviews/${interview.id}/edit`} className="text-sm text-gray-600 hover:underline">编辑</a>
      </div>
    </div>
  )
}
