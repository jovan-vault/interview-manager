interface Question {
  id: string
  content: string
  company: string
  position: string
  status: 'mastered' | 'pending' | 'not-reviewed'
}

interface Props {
  question: Question | null
}

export default function QuestionDetail({ question }: Props) {
  if (!question) {
    return (
      <div className="bg-[#1f1f1f] rounded-xl p-5 border border-[#4d4d4d] h-full flex items-center justify-center">
        <div className="text-center text-[#b3b3b3]">
          <div className="text-4xl mb-2">📝</div>
          <p>选择一个问题查看详情</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-[#1f1f1f] rounded-xl p-5 border border-[#4d4d4d]">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-[#1ed760] text-black flex items-center justify-center font-bold">
          {question.content.charAt(0)}
        </div>
        <div>
          <div className="font-semibold text-white">{question.content}</div>
          <div className="text-xs text-[#b3b3b3]">{question.company} · {question.position}</div>
        </div>
      </div>

      <div className="mb-4">
        <label className="text-xs font-medium text-[#b3b3b3] uppercase tracking-wider">问题描述</label>
        <p className="text-sm text-white mt-1">请详细介绍一个你最成功的项目，包括你承担的角色、遇到的挑战以及如何解决的。</p>
      </div>

      <div className="mb-4">
        <label className="text-xs font-medium text-[#b3b3b3] uppercase tracking-wider">AI 分析建议</label>
        <div className="mt-2 p-4 bg-[#252525] rounded-lg border border-[#4d4d4d]">
          <div className="text-sm text-white space-y-2">
            <p><span className="text-[#1ed760]">✓</span> 建议使用STAR法则回答</p>
            <p><span className="text-[#1ed760]">✓</span> 突出技术难点和创新点</p>
            <p><span className="text-[#ffa42b]">⚠</span> 需要补充具体的性能优化数据</p>
          </div>
        </div>
      </div>

      <button className="w-full bg-[#1ed760] text-black rounded-full py-2 text-sm font-medium hover:bg-[#1ed760]/90 transition-colors">
        🧠 重新分析
      </button>
    </div>
  )
}
