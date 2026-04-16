'use client'

import Link from 'next/link'

interface Interview {
  id: string
  date: string
  startTime: string
  endTime: string
  company: string
  position: string
  interviewType: string
  meetingUrl?: string | null
  positionUrl?: string | null
  notes?: string | null
}

interface Props {
  interview: Interview
  isLast?: boolean
  showFullCard?: boolean
}

export default function InterviewTimeline({ interview, isLast = false, showFullCard = false }: Props) {
  const isVideo = interview.interviewType === 'VIDEO'

  const accentColor = isVideo ? 'var(--accent-video)' : 'var(--accent-success)'
  const accentDim = isVideo ? 'var(--accent-video-dim)' : 'var(--accent-success-dim)'

  if (showFullCard) {
    return (
      <div className="interview-full-card animate-fade-in">
        <div className="full-card-header">
          <div>
            <h3 className="full-card-company">{interview.company}</h3>
            <p className="full-card-position">{interview.position}</p>
          </div>
          <span className="badge" style={{ background: accentDim, color: accentColor }}>
            {isVideo ? (
              <>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="23 7 16 12 23 17 23 7"/>
                  <rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
                </svg>
                视频面试
              </>
            ) : (
              <>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                  <polyline points="9 22 9 12 15 12 15 22"/>
                </svg>
                现场面试
              </>
            )}
          </span>
        </div>

        <div className="full-card-meta">
          <div className="meta-item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
              <line x1="16" y1="2" x2="16" y2="6"/>
              <line x1="8" y1="2" x2="8" y2="6"/>
              <line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
            {new Date(interview.date + 'T00:00:00').toLocaleDateString('zh-CN', { weekday: 'long', month: 'long', day: 'numeric' })}
          </div>
          <div className="meta-item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12 6 12 12 16 14"/>
            </svg>
            {interview.startTime} — {interview.endTime}
          </div>
        </div>

        {(isVideo && interview.meetingUrl) && (
          <a href={interview.meetingUrl} target="_blank" rel="noopener noreferrer" className="full-card-link" style={{ color: accentColor }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="23 7 16 12 23 17 23 7"/>
              <rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
            </svg>
            加入视频会议
          </a>
        )}

        {interview.positionUrl && (
          <a href={interview.positionUrl} target="_blank" rel="noopener noreferrer" className="full-card-link">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
              <polyline points="15 3 21 3 21 9"/>
              <line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
            查看职位详情
          </a>
        )}

        {interview.notes && (
          <div className="full-card-notes">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
              <line x1="16" y1="13" x2="8" y2="13"/>
              <line x1="16" y1="17" x2="8" y2="17"/>
            </svg>
            {interview.notes}
          </div>
        )}

        <style jsx>{`
          .interview-full-card {
            background: var(--bg-card);
            border: 1px solid var(--border);
            border-radius: var(--radius-lg);
            padding: 20px;
          }

          .full-card-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 16px;
          }

          .full-card-company {
            font-size: 18px;
            font-weight: 700;
            color: var(--text-primary);
          }

          .full-card-position {
            font-size: 14px;
            color: var(--text-secondary);
            margin-top: 2px;
          }

          .full-card-meta {
            display: flex;
            flex-direction: column;
            gap: 8px;
            margin-bottom: 16px;
          }

          .meta-item {
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 14px;
            color: var(--text-secondary);
          }

          .full-card-link {
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 14px;
            text-decoration: none;
            margin-bottom: 8px;
            transition: opacity 0.15s;
          }

          .full-card-link:hover {
            opacity: 0.8;
          }

          .full-card-notes {
            display: flex;
            align-items: flex-start;
            gap: 8px;
            font-size: 13px;
            color: var(--text-secondary);
            background: var(--bg-input);
            padding: 10px 12px;
            border-radius: var(--radius-sm);
            margin-top: 12px;
            border: 1px solid var(--border);
          }
        `}</style>
      </div>
    )
  }

  return (
    <div className="timeline-row">
      <div className="timeline-track">
        <div className="timeline-dot-outer" style={{ borderColor: accentColor }}>
          <div className="timeline-dot-inner" style={{ background: accentColor }} />
        </div>
        {!isLast && <div className="timeline-line" />}
      </div>
      <div className="timeline-card animate-fade-in">
        <div className="card-top">
          <div className="card-left">
            <div className="card-time" style={{ color: accentColor }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 6 12 12 16 14"/>
              </svg>
              {interview.startTime}
              <span className="time-end">— {interview.endTime}</span>
            </div>
            <div className="card-company">{interview.company}</div>
            <div className="card-position">{interview.position}</div>
          </div>
          <div className="card-right">
            <span className="type-badge" style={{ background: accentDim, color: accentColor }}>
              {isVideo ? '视频' : '现场'}
            </span>
          </div>
        </div>

        <div className="card-actions">
          <Link href={`/interviews/${interview.id}`} className="action-link-secondary action-link-detail" style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline', flexShrink: 0 }}>
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            查看详情
          </Link>
          <Link href={`/interviews/${interview.id}/edit`} className="action-link-secondary action-link-edit" style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline', flexShrink: 0 }}>
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
            </svg>
            编辑
          </Link>
          {isVideo && interview.meetingUrl && (
            <a href={interview.meetingUrl} target="_blank" rel="noopener noreferrer" className="action-link-secondary action-link-meeting" style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline', flexShrink: 0 }}>
                <polygon points="23 7 16 12 23 17 23 7"/>
                <rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
              </svg>
              会议链接
            </a>
          )}
        </div>
      </div>

      <style jsx>{`
        .timeline-row {
          display: flex;
          gap: 20px;
          padding: 4px 0;
        }

        .timeline-track {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 18px;
          flex-shrink: 0;
          padding-top: 4px;
        }

        .timeline-dot-outer {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          border: 2px solid;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--bg-card);
          flex-shrink: 0;
        }

        .timeline-dot-inner {
          width: 6px;
          height: 6px;
          border-radius: 50%;
        }

        .timeline-line {
          width: 2px;
          flex: 1;
          min-height: 20px;
          background: linear-gradient(to bottom, var(--border) 0%, transparent 100%);
          margin-top: 4px;
        }

        .timeline-card {
          flex: 1;
          background: var(--bg-input);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 16px 18px;
          margin-bottom: 12px;
          transition: border-color 0.2s, box-shadow 0.2s, transform 0.2s;
          cursor: default;
        }

        .timeline-card:hover {
          border-color: var(--border-hover);
          box-shadow: var(--shadow-sm);
          transform: translateX(2px);
        }

        .card-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 12px;
        }

        .card-left {
          flex: 1;
          min-width: 0;
        }

        .card-time {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 12px;
          font-weight: 600;
          margin-bottom: 6px;
          font-variant-numeric: tabular-nums;
          letter-spacing: 0.01em;
        }

        .time-end {
          font-weight: 400;
          opacity: 0.7;
        }

        .card-company {
          font-size: 15px;
          font-weight: 700;
          color: var(--text-primary);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .card-position {
          font-size: 13px;
          color: var(--text-secondary);
          margin-top: 2px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .card-right {
          flex-shrink: 0;
        }

        .type-badge {
          display: inline-flex;
          align-items: center;
          padding: 4px 10px;
          border-radius: 100px;
          font-size: 11px;
          font-weight: 600;
          white-space: nowrap;
        }

        .card-actions {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 12px;
          padding-top: 12px;
          border-top: 1px solid var(--border);
        }

        .action-link {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 12px;
          font-weight: 600;
          text-decoration: none;
          padding: 6px 12px;
          border-radius: 20px;
          background: var(--accent-primary-dim);
          color: var(--accent-primary);
          transition: all 0.18s cubic-bezier(0.34, 1.56, 0.64, 1);
          letter-spacing: 0.01em;
        }

        .action-link:hover {
          background: var(--accent-primary);
          color: #fff;
          transform: scale(1.04);
          box-shadow: 0 2px 10px rgba(102, 126, 234, 0.3);
        }

        .action-link:active {
          transform: scale(0.97);
        }

        .action-link-secondary {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 12px;
          font-weight: 600;
          text-decoration: none;
          padding: 6px 12px;
          border-radius: 20px;
          background: var(--bg-secondary);
          color: var(--text-secondary);
          border: 1px solid var(--border);
          transition: all 0.18s cubic-bezier(0.34, 1.56, 0.64, 1);
          letter-spacing: 0.01em;
        }

        .action-link-secondary:hover {
          background: var(--bg-card-hover);
          border-color: var(--border-hover);
          color: var(--text-primary);
          transform: scale(1.04);
          box-shadow: 0 2px 8px rgba(60, 40, 10, 0.08);
        }

        .action-link-secondary:active {
          transform: scale(0.97);
        }

        .action-link-meeting {
          background: rgba(22, 163, 74, 0.1);
          color: var(--accent-success);
          border: 1px solid rgba(22, 163, 74, 0.2);
        }

        .action-link-meeting:hover {
          background: var(--accent-success);
          color: #fff;
          border-color: var(--accent-success);
          box-shadow: 0 2px 10px rgba(22, 163, 74, 0.3);
        }

        .action-link-detail {
          background: rgba(102, 126, 234, 0.1);
          color: var(--accent-primary);
          border: 1px solid rgba(102, 126, 234, 0.2);
        }

        .action-link-detail:hover {
          background: var(--accent-primary);
          color: #fff;
          border-color: var(--accent-primary);
          box-shadow: 0 2px 10px rgba(102, 126, 234, 0.3);
        }

        .action-link-edit {
          background: rgba(168, 162, 158, 0.1);
          color: var(--text-secondary);
          border: 1px solid rgba(168, 162, 158, 0.25);
        }

        .action-link-edit:hover {
          background: rgba(168, 162, 158, 0.2);
          color: var(--text-primary);
          border-color: var(--border-hover);
          box-shadow: 0 2px 8px rgba(60, 40, 10, 0.08);
        }
      `}</style>
    </div>
  )
}
