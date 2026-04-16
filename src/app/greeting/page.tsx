import GreetingForm from '@/components/GreetingForm'
import GreetingPreview from '@/components/GreetingPreview'
import Link from 'next/link'

export const metadata = {
  title: '招呼语生成 - 面试管理器',
  description: '根据简历和JD生成个性化招呼语',
}

export default function GreetingPage() {
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

      <div className="greeting-layout animate-fade-in stagger-1">
        <div className="page-section-header">
          <div className="section-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
          </div>
          <div>
            <h1 className="section-title">AI 招呼语生成</h1>
            <p className="section-desc">粘贴简历和职位描述，生成个性化的面试招呼语</p>
          </div>
        </div>

        <div className="greeting-grid">
          <div className="greeting-form-card animate-fade-in stagger-2">
            <GreetingForm />
          </div>
          <div className="greeting-preview-card animate-fade-in stagger-3">
            <GreetingPreview />
          </div>
        </div>
      </div>
    </div>
  )
}
