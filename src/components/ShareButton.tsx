'use client'

import { useState } from 'react'

interface Props { shareToken: string }

export default function ShareButton({ shareToken }: Props) {
  const [copied, setCopied] = useState(false)
  const shareUrl = typeof window !== 'undefined' ? `${window.location.origin}/share/${shareToken}` : ''

  const handleCopy = async () => {
    await navigator.clipboard.writeText(shareUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button onClick={handleCopy} className="share-btn">
      {copied ? (
        <>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
          已复制
        </>
      ) : (
        <>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="18" cy="5" r="3"/>
            <circle cx="6" cy="12" r="3"/>
            <circle cx="18" cy="19" r="3"/>
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
          </svg>
          分享链接
        </>
      )}

      <style jsx>{`
        .share-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: var(--bg-input);
          border: 1px solid var(--border);
          color: var(--text-secondary);
          font-weight: 600;
          padding: 10px 20px;
          border-radius: 10px;
          font-size: 14px;
          font-family: inherit;
          cursor: pointer;
          transition: all 0.2s;
        }

        .share-btn:hover {
          border-color: var(--border-hover);
          color: var(--text-primary);
          background: var(--bg-card);
        }
      `}</style>
    </button>
  )
}
