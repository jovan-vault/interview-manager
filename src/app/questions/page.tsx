'use client'

import { useState } from 'react'
import QuestionList from '@/components/QuestionList'
import QuestionDetail from '@/components/QuestionDetail'
import Link from 'next/link'

interface Question {
  id: string
  content: string
  company: string
  position: string
  status: 'mastered' | 'pending' | 'not-reviewed'
}

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

  const masteredCount = mockQuestions.filter(q => q.status === 'mastered').length
  const pendingCount = mockQuestions.filter(q => q.status === 'pending').length
  const notReviewedCount = mockQuestions.filter(q => q.status === 'not-reviewed').length

  return (
    <div className="page-container animate-fade-in">
      <div className="page-header-simple">
        <Link href="/" className="back-link">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"/>
            <polyline points="12 19 5 12 12 5"/>
          </svg>
          返回日程
        </Link>
      </div>

      <div className="questions-layout animate-fade-in stagger-1">
        <div className="page-section-header">
          <div className="section-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 11l3 3L22 4"/>
              <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
            </svg>
          </div>
          <div>
            <h1 className="section-title">面试问题记录</h1>
            <p className="section-desc">管理和练习你的面试问题</p>
          </div>
        </div>

        {/* Stats */}
        <div className="questions-stats animate-fade-in stagger-2">
          <div className="qstat-card">
            <div className="qstat-icon qstat-icon-total">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                <line x1="12" y1="17" x2="12.01" y2="17"/>
              </svg>
            </div>
            <div>
              <div className="qstat-value">{mockQuestions.length}</div>
              <div className="qstat-label">总问题数</div>
            </div>
          </div>
          <div className="qstat-card">
            <div className="qstat-icon qstat-icon-mastered">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </div>
            <div>
              <div className="qstat-value">{masteredCount}</div>
              <div className="qstat-label">已掌握</div>
            </div>
          </div>
          <div className="qstat-card">
            <div className="qstat-icon qstat-icon-pending">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 6 12 12 16 14"/>
              </svg>
            </div>
            <div>
              <div className="qstat-value">{pendingCount}</div>
              <div className="qstat-label">练习中</div>
            </div>
          </div>
          <div className="qstat-card">
            <div className="qstat-icon qstat-icon-new">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="16"/>
                <line x1="8" y1="12" x2="16" y2="12"/>
              </svg>
            </div>
            <div>
              <div className="qstat-value">{notReviewedCount}</div>
              <div className="qstat-label">待复习</div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="questions-main animate-fade-in stagger-3">
          <QuestionList
            questions={mockQuestions}
            selectedId={selectedId}
            onSelect={setSelectedId}
          />
          <QuestionDetail question={selectedQuestion} />
        </div>
      </div>
    </div>
  )
}
