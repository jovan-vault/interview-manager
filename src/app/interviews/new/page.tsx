import InterviewForm from '@/components/InterviewForm'
import Link from 'next/link'

export default function NewInterview() {
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
      <div className="form-layout">
        <div className="form-header">
          <div className="form-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="16"/>
              <line x1="8" y1="12" x2="16" y2="12"/>
            </svg>
          </div>
          <div>
            <h1 className="form-title">添加面试</h1>
            <p className="form-subtitle">填写面试基本信息，我们会发送邮件提醒</p>
          </div>
        </div>
        <InterviewForm mode="create" />
      </div>
    </div>
  )
}
