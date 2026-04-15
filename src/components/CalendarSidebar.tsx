'use client'
import { useState, useMemo } from 'react'

interface Interview {
  date: string
  startTime: string
  endTime: string
  company: string
  position: string
  interviewType: 'VIDEO' | 'ONSITE'
}

interface CalendarSidebarProps {
  interviews: Interview[]
}

export default function CalendarSidebar({ interviews }: CalendarSidebarProps) {
  const MAX_UPCOMING_SHOWN = 5

  const [currentMonth, setCurrentMonth] = useState(() => {
    const now = new Date()
    return new Date(now.getFullYear(), now.getMonth(), 1)
  })

  const today = new Date()
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`

  const interviewCountByDate = interviews.reduce<Record<string, number>>((acc, i) => {
    const key = new Date(i.date).toISOString().split('T')[0]
    acc[key] = (acc[key] || 0) + 1
    return acc
  }, {})

  const calendarDays = useMemo(() => {
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    let startPadding = firstDay.getDay() || 7
    startPadding -= 1 // Monday=0
    const days: Array<{ date: number | null; fullDate: string | null }> = []
    for (let i = 0; i < startPadding; i++) days.push({ date: null, fullDate: null })
    for (let d = 1; d <= lastDay.getDate(); d++) {
      const fullDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`
      days.push({ date: d, fullDate })
    }
    return days
  }, [currentMonth])

  const monthLabel = currentMonth.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long' })

  return (
    <aside className="calendar-sidebar">
      <div className="calendar-nav">
        <button
          className="calendar-nav-btn"
          onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))}
        >
          &lt;
        </button>
        <span className="calendar-month-title">{monthLabel}</span>
        <button
          className="calendar-nav-btn"
          onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))}
        >
          &gt;
        </button>
      </div>

      <div className="calendar-weekdays">
        {['一', '二', '三', '四', '五', '六', '日'].map((d) => (
          <div key={d} className="calendar-weekday">{d}</div>
        ))}
      </div>

      <div className="calendar-grid">
        {calendarDays.map((day, idx) => {
          if (!day.fullDate) return <div key={`pad-${idx}`} className="calendar-day empty" />
          const count = interviewCountByDate[day.fullDate] || 0
          const isToday = day.fullDate === todayStr
          const hasInterviews = count > 0
          return (
            <div
              key={day.fullDate}
              className={`calendar-day ${hasInterviews ? 'has-interviews' : ''} ${isToday ? 'today' : ''}`}
              title={hasInterviews ? `${count} 场面试` : ''}
            >
              <span className="day-number">{day.date}</span>
              {hasInterviews && <span className="interview-badge">{count}</span>}
            </div>
          )
        })}
      </div>

      {Object.keys(interviewCountByDate).length > 0 && (
        <div className="calendar-upcoming">
          <div className="upcoming-label">即将到来</div>
          {Object.entries(interviewCountByDate)
            .sort(([a], [b]) => a.localeCompare(b))
            .slice(0, MAX_UPCOMING_SHOWN)
            .map(([date, count]) => {
              const d = new Date(date + 'T00:00:00')
              const label = d.toLocaleDateString('zh-CN', { month: 'long', day: 'numeric' })
              return (
                <div
                  key={date}
                  className="upcoming-item"
                  onClick={() => {
                    const params = new URLSearchParams(window.location.search)
                    params.set('scroll', date)
                    window.history.pushState({}, '', `?${params.toString()}`)
                  }}
                >
                  <span className="upcoming-dot" />
                  <span className="upcoming-date">{label}</span>
                  <span className="upcoming-count">{count} 场</span>
                </div>
              )
            })}
        </div>
      )}
    </aside>
  )
}
