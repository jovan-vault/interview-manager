'use client'

import { useState } from 'react'

export default function GreetingForm() {
  const [resume, setResume] = useState('')
  const [jd, setJd] = useState('')

  const handleGenerate = () => {
    alert('仅样式展示，点击无实际效果')
  }

  return (
    <div className="greeting-form-body">
      <div className="form-field">
        <label className="form-label">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14 2 14 8 20 8"/>
          </svg>
          简历内容
        </label>
        <textarea
          className="input-field textarea-field"
          placeholder="粘贴你的简历内容，包括教育背景、技能、工作经历等..."
          value={resume}
          onChange={(e) => setResume(e.target.value)}
        />
        <span className="char-count">{resume.length} 字符</span>
      </div>

      <div className="form-field">
        <label className="form-label">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
          </svg>
          职位描述 JD
        </label>
        <textarea
          className="input-field textarea-field"
          placeholder="粘贴目标岗位的职位描述（Job Description）..."
          value={jd}
          onChange={(e) => setJd(e.target.value)}
        />
        <span className="char-count">{jd.length} 字符</span>
      </div>

      <button onClick={handleGenerate} className="btn-primary w-full justify-center">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
        </svg>
        生成招呼语
      </button>

      <style jsx>{`
        .greeting-form-body {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .form-field {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .form-label {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          font-weight: 600;
          color: var(--text-secondary);
        }

        .textarea-field {
          resize: vertical;
          min-height: 120px;
          font-size: 13px;
          line-height: 1.6;
        }

        .char-count {
          font-size: 11px;
          color: var(--text-tertiary);
          text-align: right;
        }

        .w-full {
          width: 100%;
        }

        .justify-center {
          justify-content: center;
        }
      `}</style>
    </div>
  )
}
