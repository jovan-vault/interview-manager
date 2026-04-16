interface Question {
  id: string
  content: string
  company: string
  position: string
  status: 'mastered' | 'pending' | 'not-reviewed'
}

interface Props {
  question: Question | null
}

const statusConfig = {
  mastered: { label: '已掌握', color: 'var(--accent-success)', bg: 'var(--accent-success-dim)' },
  pending: { label: '练习中', color: 'var(--accent-warning)', bg: 'rgba(251, 191, 36, 0.12)' },
  'not-reviewed': { label: '待复习', color: 'var(--accent-video)', bg: 'var(--accent-video-dim)' },
}

export default function QuestionDetail({ question }: Props) {
  if (!question) {
    return (
      <div className="qd-container qd-empty">
        <div className="qd-empty-icon">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
            <line x1="12" y1="17" x2="12.01" y2="17"/>
          </svg>
        </div>
        <p className="qd-empty-title">选择一个问题</p>
        <p className="qd-empty-desc">点击左侧列表查看详情</p>
      </div>
    )
  }

  const status = statusConfig[question.status]

  return (
    <div className="qd-container">
      {/* Header */}
      <div className="qd-header">
        <div className="qd-avatar" style={{ background: status.bg, color: status.color }}>
          {question.content.charAt(0)}
        </div>
        <div className="qd-header-info">
          <div className="qd-question-title">{question.content}</div>
          <div className="qd-meta">{question.company} · {question.position}</div>
        </div>
        <span className="qd-status-badge" style={{ background: status.bg, color: status.color }}>
          {status.label}
        </span>
      </div>

      {/* Description */}
      <div className="qd-section">
        <div className="qd-section-label">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="16" x2="12" y2="12"/>
            <line x1="12" y1="8" x2="12.01" y2="8"/>
          </svg>
          问题描述
        </div>
        <p className="qd-section-text">请详细介绍一个你最成功的项目，包括你承担的角色、遇到的挑战以及如何解决的。建议使用 STAR 法则组织答案，并突出技术难点和量化成果。</p>
      </div>

      {/* AI Analysis */}
      <div className="qd-section">
        <div className="qd-section-label">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
          </svg>
          AI 分析建议
        </div>
        <div className="qd-analysis-card">
          <div className="analysis-item">
            <div className="analysis-icon analysis-icon-good">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </div>
            <span>建议使用 STAR 法则回答</span>
          </div>
          <div className="analysis-item">
            <div className="analysis-icon analysis-icon-good">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </div>
            <span>突出技术难点和创新点</span>
          </div>
          <div className="analysis-item">
            <div className="analysis-icon analysis-icon-warn">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                <line x1="12" y1="9" x2="12" y2="13"/>
                <line x1="12" y1="17" x2="12.01" y2="17"/>
              </svg>
            </div>
            <span>需要补充具体的性能优化数据</span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <button className="btn-primary qd-action-btn">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
        </svg>
        重新分析
      </button>

      <style jsx>{`
        .qd-container {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-xl);
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .qd-empty {
          align-items: center;
          justify-content: center;
          min-height: 300px;
          text-align: center;
        }

        .qd-empty-icon {
          width: 64px;
          height: 64px;
          background: var(--bg-input);
          border: 1px solid var(--border);
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-tertiary);
          margin-bottom: 16px;
        }

        .qd-empty-title {
          font-size: 16px;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 4px;
        }

        .qd-empty-desc {
          font-size: 13px;
          color: var(--text-tertiary);
        }

        .qd-header {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .qd-avatar {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          font-weight: 800;
          flex-shrink: 0;
        }

        .qd-header-info {
          flex: 1;
          min-width: 0;
        }

        .qd-question-title {
          font-size: 16px;
          font-weight: 700;
          color: var(--text-primary);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .qd-meta {
          font-size: 12px;
          color: var(--text-tertiary);
          margin-top: 2px;
        }

        .qd-status-badge {
          padding: 4px 12px;
          border-radius: 100px;
          font-size: 12px;
          font-weight: 600;
          flex-shrink: 0;
        }

        .qd-section {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .qd-section-label {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          font-weight: 700;
          color: var(--text-tertiary);
          text-transform: uppercase;
          letter-spacing: 0.07em;
        }

        .qd-section-text {
          font-size: 14px;
          color: var(--text-secondary);
          line-height: 1.7;
        }

        .qd-analysis-card {
          background: var(--bg-input);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          padding: 14px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .analysis-item {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 13px;
          color: var(--text-secondary);
        }

        .analysis-icon {
          width: 20px;
          height: 20px;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .analysis-icon-good {
          background: var(--accent-success-dim);
          color: var(--accent-success);
        }

        .analysis-icon-warn {
          background: rgba(251, 191, 36, 0.12);
          color: var(--accent-warning);
        }

        .qd-action-btn {
          width: 100%;
          justify-content: center;
        }
      `}</style>
    </div>
  )
}
