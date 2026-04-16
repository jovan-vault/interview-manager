'use client'

interface Question {
  id: string
  content: string
  company: string
  position: string
  status: 'mastered' | 'pending' | 'not-reviewed'
}

interface Props {
  questions: Question[]
  selectedId?: string
  onSelect: (id: string) => void
}

const statusConfig = {
  mastered: {
    label: '已掌握',
    bg: 'var(--accent-success-dim)',
    color: 'var(--accent-success)',
    icon: (
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12"/>
      </svg>
    )
  },
  pending: {
    label: '练习中',
    bg: 'rgba(251, 191, 36, 0.12)',
    color: 'var(--accent-warning)',
    icon: (
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
    )
  },
  'not-reviewed': {
    label: '待复习',
    bg: 'var(--accent-video-dim)',
    color: 'var(--accent-video)',
    icon: (
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <line x1="12" y1="8" x2="12" y2="12"/>
        <line x1="12" y1="16" x2="12.01" y2="16"/>
      </svg>
    )
  },
}

export default function QuestionList({ questions, selectedId, onSelect }: Props) {
  return (
    <div className="ql-container">
      <div className="ql-header">
        <span className="ql-count">共 {questions.length} 个问题</span>
        <button className="ql-add-btn">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="12" y1="5" x2="12" y2="19"/>
            <line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          添加问题
        </button>
      </div>

      <div className="ql-list">
        {questions.map((q) => {
          const status = statusConfig[q.status]
          const isSelected = q.id === selectedId

          return (
            <div
              key={q.id}
              onClick={() => onSelect(q.id)}
              className={`ql-item ${isSelected ? 'ql-item-selected' : ''}`}
            >
              <div className="ql-item-content">
                <div className="ql-item-question">{q.content}</div>
                <div className="ql-item-meta">{q.company} · {q.position}</div>
              </div>
              <span className="ql-status-badge" style={{ background: status.bg, color: status.color }}>
                {status.icon}
                {status.label}
              </span>
            </div>
          )
        })}
      </div>

      <style jsx>{`
        .ql-container {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-xl);
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .ql-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .ql-count {
          font-size: 13px;
          color: var(--text-secondary);
          font-weight: 500;
        }

        .ql-add-btn {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 13px;
          color: var(--accent-primary);
          font-weight: 600;
          background: transparent;
          border: none;
          cursor: pointer;
          font-family: inherit;
          padding: 4px 8px;
          border-radius: 6px;
          transition: background 0.15s;
        }

        .ql-add-btn:hover {
          background: var(--accent-primary-dim);
        }

        .ql-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .ql-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          padding: 14px 16px;
          background: var(--bg-input);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          cursor: pointer;
          transition: all 0.15s;
        }

        .ql-item:hover {
          border-color: var(--border-hover);
          background: var(--bg-card-hover);
        }

        .ql-item-selected {
          border-color: var(--accent-primary);
          background: var(--accent-primary-dim);
        }

        .ql-item-content {
          flex: 1;
          min-width: 0;
        }

        .ql-item-question {
          font-size: 14px;
          font-weight: 600;
          color: var(--text-primary);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .ql-item-meta {
          font-size: 12px;
          color: var(--text-tertiary);
          margin-top: 2px;
        }

        .ql-status-badge {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          padding: 4px 10px;
          border-radius: 100px;
          font-size: 11px;
          font-weight: 600;
          flex-shrink: 0;
        }
      `}</style>
    </div>
  )
}
