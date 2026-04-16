import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import ShareButton from '@/components/ShareButton'
import DeleteButton from '@/components/DeleteButton'

export default async function InterviewDetail({ params }: { params: { id: string } }) {
  const interview = await prisma.interview.findUnique({ where: { id: params.id } })
  if (!interview) notFound()

  const date = new Date(interview.date).toLocaleDateString('zh-CN', { weekday: 'long', month: 'long', day: 'numeric' })
  const isVideo = interview.interviewType === 'VIDEO'
  const accentColor = isVideo ? 'var(--accent-video)' : 'var(--accent-success)'
  const accentDim = isVideo ? 'var(--accent-video-dim)' : 'var(--accent-success-dim)'

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

      <div className="detail-layout">
        {/* Header Card */}
        <div className="detail-hero animate-fade-in stagger-1">
          <div className="hero-badges">
            <span className="badge" style={{ background: accentDim, color: accentColor, fontSize: '13px', padding: '6px 14px' }}>
              {isVideo ? (
                <>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="23 7 16 12 23 17 23 7"/>
                    <rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
                  </svg>
                  视频面试
                </>
              ) : (
                <>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                    <polyline points="9 22 9 12 15 12 15 22"/>
                  </svg>
                  现场面试
                </>
              )}
            </span>
          </div>
          <h1 className="hero-company">{interview.company}</h1>
          <p className="hero-position">{interview.position}</p>

          <div className="hero-meta">
            <div className="hero-meta-item">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
              <span>{date}</span>
            </div>
            <div className="hero-meta-item">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 6 12 12 16 14"/>
              </svg>
              <span>{interview.startTime} — {interview.endTime}</span>
            </div>
          </div>
        </div>

        {/* Info Cards */}
        <div className="info-cards animate-fade-in stagger-2">
          {isVideo && interview.meetingUrl && (
            <a href={interview.meetingUrl} target="_blank" rel="noopener noreferrer" className="info-card info-card-action" style={{ borderColor: `${accentColor}33` }}>
              <div className="info-card-icon" style={{ background: accentDim, color: accentColor }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="23 7 16 12 23 17 23 7"/>
                  <rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
                </svg>
              </div>
              <div className="info-card-content">
                <div className="info-card-label">会议链接</div>
                <div className="info-card-value">加入视频会议</div>
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: accentColor, flexShrink: 0 }}>
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </a>
          )}

          {interview.positionUrl && (
            <a href={interview.positionUrl} target="_blank" rel="noopener noreferrer" className="info-card info-card-action">
              <div className="info-card-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                  <polyline points="15 3 21 3 21 9"/>
                  <line x1="10" y1="14" x2="21" y2="3"/>
                </svg>
              </div>
              <div className="info-card-content">
                <div className="info-card-label">职位链接</div>
                <div className="info-card-value">查看职位详情</div>
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--text-tertiary)', flexShrink: 0 }}>
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </a>
          )}

          <div className="info-card">
            <div className="info-card-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
            </div>
            <div className="info-card-content">
              <div className="info-card-label">邮件提醒</div>
              <div className="info-card-value">
                {interview.reminderEnabled
                  ? `面试前 ${interview.reminderMinutes} 分钟`
                  : '已禁用'}
              </div>
            </div>
          </div>
        </div>

        {/* Notes */}
        {interview.notes && (
          <div className="notes-card animate-fade-in stagger-3">
            <div className="notes-label">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
              </svg>
              备注
            </div>
            <p className="notes-text">{interview.notes}</p>
          </div>
        )}

        {/* Actions */}
        <div className="detail-actions animate-fade-in stagger-4">
          <Link href={`/interviews/${interview.id}/edit`} className="btn-primary">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
            </svg>
            编辑面试
          </Link>
          <ShareButton shareToken={interview.shareToken || ''} />
          <DeleteButton interviewId={interview.id} />
        </div>
      </div>
    </div>
  )
}
