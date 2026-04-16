'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface FormData {
  date: string
  startTime: string
  endTime: string
  company: string
  position: string
  positionUrl: string
  interviewType: 'VIDEO' | 'ONSITE'
  meetingUrl: string
  notes: string
  reminderMinutes: number
  reminderEnabled: boolean
}

interface Props {
  initialData?: Partial<FormData>
  mode: 'create' | 'edit'
  id?: string
}

export default function InterviewForm({ initialData, mode, id }: Props) {
  const router = useRouter()
  const [form, setForm] = useState<FormData>({
    date: initialData?.date || '',
    startTime: initialData?.startTime || '',
    endTime: initialData?.endTime || '',
    company: initialData?.company || '',
    position: initialData?.position || '',
    positionUrl: initialData?.positionUrl || '',
    interviewType: initialData?.interviewType || 'VIDEO',
    meetingUrl: initialData?.meetingUrl || '',
    notes: initialData?.notes || '',
    reminderMinutes: initialData?.reminderMinutes ?? 60,
    reminderEnabled: initialData?.reminderEnabled ?? true,
  })
  const [loading, setLoading] = useState(false)
  const [savedEmail, setSavedEmail] = useState('')

  useEffect(() => {
    fetch('/api/settings')
      .then(res => res.json())
      .then(data => setSavedEmail(data.email || ''))
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const url = mode === 'create' ? '/api/interviews' : `/api/interviews/${id}`
    const method = mode === 'create' ? 'POST' : 'PUT'

    const submitData = {
      ...form,
      reminderMinutes: form.reminderEnabled ? form.reminderMinutes : 0,
    }

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(submitData),
    })

    if (res.ok) {
      router.push('/')
      router.refresh()
    } else {
      alert('保存失败')
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="form-body">
      {/* Basic Info */}
      <div className="form-section">
        <div className="form-section-label">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="12"/>
            <line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
          基本信息
        </div>
        <div className="form-grid">
          <div className="form-field">
            <label className="form-label">公司名称</label>
            <input type="text" value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} required
              placeholder="例如：字节跳动" className="input-field" />
          </div>
          <div className="form-field">
            <label className="form-label">岗位名称</label>
            <input type="text" value={form.position} onChange={e => setForm({ ...form, position: e.target.value })} required
              placeholder="例如：前端工程师" className="input-field" />
          </div>
        </div>
        <div className="form-field">
          <label className="form-label">职位链接 <span className="label-optional">(可选)</span></label>
          <input type="url" value={form.positionUrl} onChange={e => setForm({ ...form, positionUrl: e.target.value })}
            placeholder="https://..." className="input-field" />
        </div>
      </div>

      {/* Date & Time */}
      <div className="form-section">
        <div className="form-section-label">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <polyline points="12 6 12 12 16 14"/>
          </svg>
          日期与时间
        </div>
        <div className="form-grid">
          <div className="form-field">
            <label className="form-label">日期</label>
            <input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} required
              className="input-field" />
          </div>
          <div className="form-field form-grid-2">
            <div>
              <label className="form-label">开始时间</label>
              <input type="time" value={form.startTime} onChange={e => setForm({ ...form, startTime: e.target.value })} required
                className="input-field" />
            </div>
            <div>
              <label className="form-label">结束时间</label>
              <input type="time" value={form.endTime} onChange={e => setForm({ ...form, endTime: e.target.value })} required
                className="input-field" />
            </div>
          </div>
        </div>
      </div>

      {/* Interview Type */}
      <div className="form-section">
        <div className="form-section-label">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="23 7 16 12 23 17 23 7"/>
            <rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
          </svg>
          面试形式
        </div>
        <div className="type-selector">
          <button type="button"
            className={`type-option ${form.interviewType === 'VIDEO' ? 'type-option-active type-option-video' : 'type-option-inactive'}`}
            onClick={() => setForm({ ...form, interviewType: 'VIDEO', meetingUrl: form.meetingUrl })}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="23 7 16 12 23 17 23 7"/>
              <rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
            </svg>
            视频面试
          </button>
          <button type="button"
            className={`type-option ${form.interviewType === 'ONSITE' ? 'type-option-active type-option-onsite' : 'type-option-inactive'}`}
            onClick={() => setForm({ ...form, interviewType: 'ONSITE' })}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
            现场面试
          </button>
        </div>

        {form.interviewType === 'VIDEO' && (
          <div className="form-field animate-fade-in">
            <label className="form-label">会议链接 <span className="label-optional">(可选)</span></label>
            <input type="text" value={form.meetingUrl} onChange={e => setForm({ ...form, meetingUrl: e.target.value })}
              placeholder="飞书 / 腾讯会议链接" className="input-field" />
          </div>
        )}
      </div>

      {/* Reminder */}
      <div className="form-section">
        <div className="form-section-label">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
            <polyline points="22,6 12,13 2,6"/>
          </svg>
          邮件提醒
        </div>

        <div className="reminder-email-card">
          <div className="reminder-email-icon">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
          </div>
          <div className="reminder-email-info">
            <span className="reminder-email-label">发送至</span>
            <span className="reminder-email-value">{savedEmail || '未设置邮箱'}</span>
          </div>
          {!savedEmail && (
            <Link href="/settings" className="reminder-settings-link">去设置 →</Link>
          )}
        </div>

        <div className="reminder-toggle">
          <label className="toggle-label">
            <div className={`toggle-switch ${form.reminderEnabled ? 'toggle-on' : 'toggle-off'}`}>
              <div className="toggle-thumb" />
            </div>
            <input type="checkbox" checked={form.reminderEnabled}
              onChange={e => setForm({ ...form, reminderEnabled: e.target.checked })}
              className="sr-only" />
            <span className="toggle-text">启用邮件提醒</span>
          </label>
        </div>

        {form.reminderEnabled && (
          <div className="reminder-minutes animate-fade-in">
            <div className="form-field">
              <label className="form-label">提前提醒时间</label>
              <div className="minutes-input-wrap">
                <input
                  type="number" min="10" max="1440"
                  value={form.reminderMinutes}
                  onChange={e => setForm({ ...form, reminderMinutes: parseInt(e.target.value) || 60 })}
                  required
                  className="input-field minutes-input" />
                <span className="minutes-suffix">分钟前</span>
              </div>
            </div>
            <p className="form-hint">面试前多久发送提醒邮件（10-1440分钟）</p>
          </div>
        )}
      </div>

      {/* Notes */}
      <div className="form-section">
        <div className="form-section-label">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14 2 14 8 20 8"/>
          </svg>
          备注
          <span className="label-optional">(可选)</span>
        </div>
        <div className="form-field">
          <textarea value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} rows={3}
            placeholder="面试官姓名、注意事项等..."
            className="input-field textarea-field" />
        </div>
      </div>

      {/* Submit */}
      <div className="form-actions">
        <button type="submit" disabled={loading} className="btn-primary flex-1 justify-center">
          {loading ? (
            <>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="spin">
                <line x1="12" y1="2" x2="12" y2="6"/>
                <line x1="12" y1="18" x2="12" y2="22"/>
                <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/>
                <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/>
                <line x1="2" y1="12" x2="6" y2="12"/>
                <line x1="18" y1="12" x2="22" y2="12"/>
                <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"/>
                <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"/>
              </svg>
              保存中...
            </>
          ) : (
            <>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
                <polyline points="17 21 17 13 7 13 7 21"/>
                <polyline points="7 3 7 8 15 8"/>
              </svg>
              {mode === 'create' ? '添加面试' : '保存修改'}
            </>
          )}
        </button>
        <button type="button" onClick={() => router.back()} className="btn-secondary">
          取消
        </button>
      </div>

      <style jsx>{`
        .form-body {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .form-section {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .form-section-label {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          font-weight: 700;
          color: var(--text-tertiary);
          text-transform: uppercase;
          letter-spacing: 0.07em;
          padding-bottom: 8px;
          border-bottom: 1px solid var(--border);
        }

        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        .form-grid-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        .form-field {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .form-label {
          font-size: 13px;
          font-weight: 600;
          color: var(--text-secondary);
        }

        .label-optional {
          font-size: 11px;
          font-weight: 400;
          color: var(--text-tertiary);
        }

        .form-hint {
          font-size: 12px;
          color: var(--text-tertiary);
          margin-top: 4px;
        }

        /* Type Selector */
        .type-selector {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }

        .type-option {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 12px;
          border-radius: var(--radius-md);
          font-size: 14px;
          font-weight: 600;
          font-family: inherit;
          cursor: pointer;
          transition: all 0.2s;
          border: 1px solid;
        }

        .type-option-active.type-option-video {
          background: var(--accent-video-dim);
          border-color: rgba(96, 165, 250, 0.3);
          color: var(--accent-video);
        }

        .type-option-active.type-option-onsite {
          background: var(--accent-success-dim);
          border-color: rgba(52, 211, 153, 0.3);
          color: var(--accent-success);
        }

        .type-option-inactive {
          background: var(--bg-input);
          border-color: var(--border);
          color: var(--text-tertiary);
        }

        .type-option-inactive:hover {
          border-color: var(--border-hover);
          color: var(--text-secondary);
        }

        /* Reminder */
        .reminder-email-card {
          display: flex;
          align-items: center;
          gap: 12px;
          background: var(--bg-input);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          padding: 12px 14px;
        }

        .reminder-email-icon {
          width: 32px;
          height: 32px;
          background: var(--accent-primary-dim);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--accent-primary);
          flex-shrink: 0;
        }

        .reminder-email-info {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .reminder-email-label {
          font-size: 11px;
          color: var(--text-tertiary);
        }

        .reminder-email-value {
          font-size: 13px;
          font-weight: 600;
          color: var(--text-primary);
          font-family: var(--font-mono), monospace;
        }

        .reminder-settings-link {
          font-size: 13px;
          color: var(--accent-primary);
          text-decoration: none;
          font-weight: 500;
        }

        .reminder-settings-link:hover {
          text-decoration: underline;
        }

        .reminder-toggle {
          margin-top: 4px;
        }

        .toggle-label {
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
        }

        .toggle-switch {
          width: 40px;
          height: 22px;
          border-radius: 11px;
          position: relative;
          transition: background 0.2s;
          flex-shrink: 0;
        }

        .toggle-on {
          background: var(--accent-primary);
        }

        .toggle-off {
          background: var(--border);
        }

        .toggle-thumb {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: white;
          position: absolute;
          top: 3px;
          left: 3px;
          transition: left 0.2s;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
        }

        .toggle-on .toggle-thumb {
          left: 21px;
        }

        .toggle-text {
          font-size: 14px;
          color: var(--text-secondary);
          font-weight: 500;
        }

        .reminder-minutes {
          margin-top: 4px;
        }

        .minutes-input-wrap {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .minutes-input {
          max-width: 140px;
        }

        .minutes-suffix {
          font-size: 13px;
          color: var(--text-secondary);
        }

        .textarea-field {
          resize: vertical;
          min-height: 80px;
        }

        /* Actions */
        .form-actions {
          display: flex;
          gap: 10px;
          padding-top: 8px;
        }

        .flex-1 {
          flex: 1;
        }

        .justify-center {
          justify-content: center;
        }

        .btn-secondary {
          background: var(--bg-input);
          border: 1px solid var(--border);
          color: var(--text-secondary);
          font-weight: 600;
          padding: 12px 24px;
          border-radius: 10px;
          font-size: 14px;
          font-family: inherit;
          cursor: pointer;
          transition: all 0.2s;
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }

        .btn-secondary:hover {
          border-color: var(--border-hover);
          color: var(--text-primary);
          background: var(--bg-card);
        }

        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }

        .spin {
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @media (max-width: 600px) {
          .form-grid {
            grid-template-columns: 1fr;
          }

          .form-grid-2 {
            grid-template-columns: 1fr 1fr;
          }
        }
      `}</style>
    </form>
  )
}
