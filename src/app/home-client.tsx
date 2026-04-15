'use client'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import InterviewTimeline from '@/components/InterviewTimeline'
import CalendarSidebar from '@/components/CalendarSidebar'
import { formatDateHeader, getTodayDate } from '@/lib/date-utils'

interface Interview {
  id: string
  date: string
  startTime: string
  endTime: string
  company: string
  position: string
  interviewType: 'VIDEO' | 'ONSITE'
  meetingUrl?: string | null
  positionUrl?: string | null
  notes?: string | null
  reminderMinutes?: number
  reminderSent?: boolean
  reminderEnabled?: boolean
}

export default function HomeClient({ interviews }: { interviews: Interview[] }) {
  const searchParams = useSearchParams()
  const selectedDate = searchParams.get('scroll')

  useEffect(() => {
    if (selectedDate) {
      const el = document.getElementById(`date-${selectedDate}`)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        el.classList.add('date-group-highlighted')
        const timer = setTimeout(() => el.classList.remove('date-group-highlighted'), 3000)
        return () => clearTimeout(timer)
      }
    }
  }, [selectedDate])

  const grouped = interviews.reduce((acc: Record<string, Interview[]>, item: Interview) => {
    const dateKey = item.date.toISOString().split('T')[0]
    if (!acc[dateKey]) acc[dateKey] = []
    acc[dateKey].push(item)
    return acc
  }, {})

  const sortedDates = Object.keys(grouped).sort()
  const today = getTodayDate()
  const upcomingCount = interviews.filter((i: Interview) => i.date >= today).length
  const videoCount = interviews.filter((i: Interview) => i.interviewType === 'VIDEO').length
  const onsiteCount = interviews.filter((i: Interview) => i.interviewType === 'ONSITE').length

  return (
    <div className="page-container">
      {/* Page Header */}
      <div className="page-header">
        <div className="page-header-text">
          <h1 className="page-title gradient-text">面试日程</h1>
          <p className="page-subtitle">
            {upcomingCount > 0
              ? `你有 ${upcomingCount} 场即将到来的面试`
              : '暂无即将到来的面试'}
          </p>
        </div>
        <div className="page-header-actions">
          <Link href="/greeting" className="btn-ghost">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
            招呼语
          </Link>
          <Link href="/questions" className="btn-ghost">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 11l3 3L22 4"/>
              <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
            </svg>
            问题库
          </Link>
          <Link href="/interviews/new" className="btn-primary">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="12" y1="5" x2="12" y2="19"/>
              <line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            添加面试
          </Link>
        </div>
      </div>

      {/* Stats Row */}
      {interviews.length > 0 && (
        <div className="stats-row">
          <div className="stat-card">
            <div className="stat-icon stat-icon-total">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
            </div>
            <div>
              <div className="stat-value">{interviews.length}</div>
              <div className="stat-label">全部面试</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon stat-icon-video">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="23 7 16 12 23 17 23 7"/>
                <rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
              </svg>
            </div>
            <div>
              <div className="stat-value">{videoCount}</div>
              <div className="stat-label">视频面试</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon stat-icon-onsite">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                <polyline points="9 22 9 12 15 12 15 22"/>
              </svg>
            </div>
            <div>
              <div className="stat-value">{onsiteCount}</div>
              <div className="stat-label">现场面试</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon stat-icon-upcoming">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 6 12 12 16 14"/>
              </svg>
            </div>
            <div>
              <div className="stat-value">{upcomingCount}</div>
              <div className="stat-label">即将到来</div>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {sortedDates.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
              <line x1="16" y1="2" x2="16" y2="6"/>
              <line x1="8" y1="2" x2="8" y2="6"/>
              <line x1="3" y1="10" x2="21" y2="10"/>
              <line x1="8" y1="14" x2="16" y2="14"/>
              <line x1="8" y1="18" x2="12" y2="18"/>
            </svg>
          </div>
          <h2 className="empty-title">暂无面试安排</h2>
          <p className="empty-desc">开始规划你的面试日程，不再错过任何机会</p>
          <Link href="/interviews/new" className="btn-primary empty-cta">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="12" y1="5" x2="12" y2="19"/>
              <line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            添加第一个面试
          </Link>
        </div>
      ) : (
        <div className="timeline-with-calendar">
          <div className="timeline-main">
            <div className="timeline-section">
              {sortedDates.map((date) => (
                <div key={date} id={`date-${date}`} className="date-group">
                  <div className="date-header">
                    <span className="date-label">{formatDateHeader(date)}</span>
                    <span className="date-count">{grouped[date].length} 场</span>
                  </div>
                  <div className="timeline-cards">
                    {grouped[date].map((interview: Interview, index: number) => (
                      <InterviewTimeline
                        key={interview.id}
                        interview={interview}
                        isLast={index === grouped[date].length - 1}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <CalendarSidebar interviews={interviews} />
        </div>
      )}
    </div>
  )
}
