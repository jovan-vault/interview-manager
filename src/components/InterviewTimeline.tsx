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

interface Props {
  interview: Interview
  isLast?: boolean
}

export default function InterviewTimeline({ interview, isLast = false }: Props) {
  const isVideo = interview.interviewType === 'VIDEO'

  return (
    <div className="flex gap-4">
      {/* 左侧时间线 */}
      <div className="flex flex-col items-center">
        <div className={`w-3 h-3 rounded-full ${isVideo ? 'bg-blue-500' : 'bg-green-500'}`}></div>
        {!isLast && <div className="w-0.5 flex-1 bg-gray-200 mt-1"></div>}
      </div>
      {/* 右侧内容 */}
      <div className="flex-1 pb-6">
        <div className="text-sm text-gray-500 font-medium">{interview.startTime}</div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mt-1">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-gray-800">{interview.company}</h3>
              <p className="text-gray-500 text-sm">{interview.position}</p>
            </div>
            <span className={`text-xs px-2 py-1 rounded-full ${isVideo ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>
              {isVideo ? '视频' : '现场'}
            </span>
          </div>
          <div className="mt-3 text-sm text-gray-500">
            <p>🕐 {interview.startTime} - {interview.endTime}</p>
            {isVideo && interview.meetingUrl && (
              <a href={interview.meetingUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline mt-1 block">
                🔗 加入视频会议
              </a>
            )}
          </div>
          <div className="mt-3 flex gap-3">
            <a href={`/interviews/${interview.id}`} className="text-sm text-blue-600 hover:underline">查看详情</a>
            <a href={`/interviews/${interview.id}/edit`} className="text-sm text-gray-500 hover:text-gray-700">编辑</a>
          </div>
        </div>
      </div>
    </div>
  )
}
