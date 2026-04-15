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
      {/* Timeline left */}
      <div className="flex flex-col items-center">
        <div className={`w-3 h-3 rounded-full ${isVideo ? 'bg-[#539df5]' : 'bg-[#1ed760]'}`}></div>
        {!isLast && <div className="w-0.5 flex-1 bg-[#4d4d4d] mt-1"></div>}
      </div>
      {/* Content right */}
      <div className="flex-1 pb-6">
        <div className="text-sm text-[#b3b3b3] font-medium">{interview.startTime}</div>
        <div className="bg-[#181818] rounded-lg p-4 mt-1 shadow-lg">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-white">{interview.company}</h3>
              <p className="text-[#b3b3b3] text-sm">{interview.position}</p>
            </div>
            <span className={`text-xs px-3 py-1 rounded-full ${
              isVideo ? 'bg-[#539df5]/20 text-[#539df5]' : 'bg-[#1ed760]/20 text-[#1ed760]'
            }`}>
              {isVideo ? '视频' : '现场'}
            </span>
          </div>
          <div className="mt-3 text-sm text-[#b3b3b3]">
            <p>🕐 {interview.startTime} - {interview.endTime}</p>
            {isVideo && interview.meetingUrl && (
              <a href={interview.meetingUrl} target="_blank" rel="noopener noreferrer"
                 className="text-[#1ed760] hover:underline mt-1 block">
                🔗 加入视频会议
              </a>
            )}
          </div>
          <div className="mt-3 flex gap-3">
            <a href={`/interviews/${interview.id}`} className="text-sm text-[#1ed760] hover:underline">查看详情</a>
            <a href={`/interviews/${interview.id}/edit`} className="text-sm text-[#b3b3b3] hover:text-white">编辑</a>
          </div>
        </div>
      </div>
    </div>
  )
}