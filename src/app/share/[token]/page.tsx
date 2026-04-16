import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'

export default async function SharePage({ params }: { params: { token: string } }) {
  const interview = await prisma.interview.findUnique({ where: { shareToken: params.token } })
  if (!interview) notFound()

  const date = new Date(interview.date).toLocaleDateString('zh-CN', { weekday: 'long', month: 'long', day: 'numeric' })
  const isVideo = interview.interviewType === 'VIDEO'
  const accentColor = isVideo ? 'var(--accent-video)' : 'var(--accent-success)'
  const accentDim = isVideo ? 'var(--accent-video-dim)' : 'var(--accent-success-dim)'

  return (
    <div className="share-page animate-fade-in">
      <div className="share-container animate-scale-in">
        {/* Header */}
        <div className="share-header">
          <div className="share-logo">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <rect x="2" y="3" width="20" height="20" rx="4" stroke="#818cf8" strokeWidth="1.8"/>
              <line x1="2" y1="9" x2="22" y2="9" stroke="#818cf8" strokeWidth="1.8"/>
              <line x1="8" y1="2" x2="8" y2="6" stroke="#818cf8" strokeWidth="1.8" strokeLinecap="round"/>
              <line x1="16" y1="2" x2="16" y2="6" stroke="#818cf8" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
            <span>面试邀请</span>
          </div>
          <p className="share-source">来自面试时间管理器</p>
        </div>

        {/* Main Card */}
        <div className="share-card animate-fade-in stagger-1">
          {/* Company */}
          <div className="share-company">{interview.company}</div>
          <div className="share-position">{interview.position}</div>

          {/* Type Badge */}
          <div className="share-type-wrap">
            <span className="badge" style={{ background: accentDim, color: accentColor, fontSize: '13px', padding: '6px 16px' }}>
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

          {/* Date & Time */}
          <div className="share-datetime animate-fade-in stagger-2">
            <div className="datetime-row">
              <div className="datetime-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/>
                  <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
              </div>
              <span className="datetime-text">{date}</span>
            </div>
            <div className="datetime-row">
              <div className="datetime-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
              </div>
              <span className="datetime-text">{interview.startTime} — {interview.endTime}</span>
            </div>
          </div>

          {/* CTA */}
          {isVideo && interview.meetingUrl && (
            <a href={interview.meetingUrl} target="_blank" rel="noopener noreferrer" className="share-cta animate-fade-in stagger-3" style={{ background: accentColor }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="23 7 16 12 23 17 23 7"/>
                <rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
              </svg>
              加入视频会议
            </a>
          )}

          {/* Links */}
          {interview.positionUrl && (
            <a href={interview.positionUrl} target="_blank" rel="noopener noreferrer" className="share-link animate-fade-in stagger-3">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                <polyline points="15 3 21 3 21 9"/>
                <line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
              查看职位详情
            </a>
          )}

          {/* Notes */}
          {interview.notes && (
            <div className="share-notes animate-fade-in stagger-4">
              <div className="notes-label">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                </svg>
                备注
              </div>
              <p className="notes-text">{interview.notes}</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="share-footer animate-fade-in stagger-5">
          <span>由</span>
          <span className="share-footer-brand gradient-text">Interview Manager</span>
          <span>整理</span>
        </div>
      </div>
    </div>
  )
}
