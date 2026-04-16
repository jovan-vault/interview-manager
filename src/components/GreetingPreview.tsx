'use client'

export default function GreetingPreview() {
  return (
    <div className="preview-wrap">
      <div className="preview-header">
        <div className="preview-label">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
            <circle cx="12" cy="12" r="3"/>
          </svg>
          生成结果预览
        </div>
        <span className="preview-badge">AI</span>
      </div>

      <div className="preview-content">
        <div className="preview-placeholder">
          <div className="placeholder-icon">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
            </svg>
          </div>
          <p className="placeholder-title">等待生成</p>
          <p className="placeholder-desc">填写简历和 JD 后，点击「生成招呼语」按钮</p>
        </div>
      </div>

      <style jsx>{`
        .preview-wrap {
          display: flex;
          flex-direction: column;
          height: 100%;
          min-height: 400px;
        }

        .preview-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 16px;
        }

        .preview-label {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          font-weight: 600;
          color: var(--text-secondary);
        }

        .preview-badge {
          font-size: 10px;
          font-weight: 700;
          color: var(--accent-primary);
          background: var(--accent-primary-dim);
          padding: 3px 8px;
          border-radius: 100px;
          letter-spacing: 0.05em;
        }

        .preview-content {
          flex: 1;
          background: var(--bg-input);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 32px;
        }

        .preview-placeholder {
          text-align: center;
        }

        .placeholder-icon {
          width: 64px;
          height: 64px;
          background: var(--accent-primary-dim);
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--accent-primary);
          margin: 0 auto 16px;
        }

        .placeholder-title {
          font-size: 16px;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 6px;
        }

        .placeholder-desc {
          font-size: 13px;
          color: var(--text-tertiary);
          line-height: 1.6;
          max-width: 240px;
        }
      `}</style>
    </div>
  )
}
