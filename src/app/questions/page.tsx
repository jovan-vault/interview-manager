'use client'

import { useState } from 'react'
import QuestionList from '@/components/QuestionList'
import QuestionDetail from '@/components/QuestionDetail'

interface Question {
  id: string
  content: string
  company: string
  position: string
  status: 'mastered' | 'pending' | 'not-reviewed'
}

// 模拟数据（实际从API获取）
const mockQuestions: Question[] = [
  { id: '1', content: '自我介绍', company: '字节跳动', position: '前端工程师', status: 'mastered' },
  { id: '2', content: '项目经历详解', company: '阿里巴巴', position: '全栈工程师', status: 'pending' },
  { id: '3', content: '浏览器原理', company: '美团', position: '前端工程师', status: 'not-reviewed' },
  { id: '4', content: 'HTTP缓存机制', company: '字节跳动', position: '前端工程师', status: 'not-reviewed' },
  { id: '5', content: '性能优化策略', company: '腾讯', position: '前端工程师', status: 'pending' },
  { id: '6', content: '设计模式', company: '字节跳动', position: '前端工程师', status: 'pending' },
]

export default function QuestionsPage() {
  const [selectedId, setSelectedId] = useState<string>('1')
  const selectedQuestion = mockQuestions.find((q) => q.id === selectedId) || null

  return (
    <main className="max-w-5xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <span className="text-2xl">📝</span>
          面试问题记录
        </h1>
        <div className="grid md:grid-cols-2 gap-6">
          <QuestionList
            questions={mockQuestions}
            selectedId={selectedId}
            onSelect={setSelectedId}
          />
          <QuestionDetail question={selectedQuestion} />
        </div>
      </div>
    </main>
  )
}
