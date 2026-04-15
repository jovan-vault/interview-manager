'use client'

interface Question {
  id: string
  content: string
  company: string
  position: string
  status: 'mastered' | 'pending' | 'not-reviewed'
}

interface Props {
  questions: Question[]
  selectedId?: string
  onSelect: (id: string) => void
}

const statusConfig = {
  mastered: { label: '已掌握', bg: 'bg-[#1ed760]/20', text: 'text-[#1ed760]' },
  pending: { label: '待完善', bg: 'bg-[#ffa42b]/20', text: 'text-[#ffa42b]' },
  'not-reviewed': { label: '未复习', bg: 'bg-[#539df5]/20', text: 'text-[#539df5]' },
}

export default function QuestionList({ questions, selectedId, onSelect }: Props) {
  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm font-medium text-[#b3b3b3]">共 {questions.length} 个问题</span>
        <button className="text-[#1ed760] text-sm hover:underline">+ 添加问题</button>
      </div>

      {questions.map((q) => {
        const status = statusConfig[q.status]
        const isSelected = q.id === selectedId

        return (
          <div
            key={q.id}
            onClick={() => onSelect(q.id)}
            className={`rounded-xl p-4 border cursor-pointer transition-all ${
              isSelected
                ? 'bg-[#1ed760]/10 border-2 border-[#1ed760]'
                : 'bg-[#1f1f1f] border border-[#4d4d4d] hover:border-[#b3b3b3]'
            }`}
          >
            <div className="flex justify-between items-start">
              <div>
                <div className="font-medium text-white">{q.content}</div>
                <div className="text-xs text-[#b3b3b3] mt-1">{q.company} · {q.position}</div>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full ${status.bg} ${status.text}`}>
                {status.label}
              </span>
            </div>
          </div>
        )
      })}
    </div>
  )
}
