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
  mastered: { label: '已掌握', bg: 'bg-green-100', text: 'text-green-700' },
  pending: { label: '待完善', bg: 'bg-yellow-100', text: 'text-yellow-700' },
  'not-reviewed': { label: '未复习', bg: 'bg-gray-100', text: 'text-gray-600' },
}

export default function QuestionList({ questions, selectedId, onSelect }: Props) {
  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm font-medium text-gray-500">共 {questions.length} 个问题</span>
        <button className="text-blue-500 text-sm hover:underline">+ 添加问题</button>
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
                ? 'bg-blue-50 border-2 border-blue-200'
                : 'bg-gray-50 border border-gray-100 hover:border-gray-200'
            }`}
          >
            <div className="flex justify-between items-start">
              <div>
                <div className="font-medium text-gray-800">{q.content}</div>
                <div className="text-xs text-gray-500 mt-1">{q.company} · {q.position}</div>
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
