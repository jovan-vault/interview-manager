'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const navItems: { href: string; label: string; icon: React.ReactElement; highlight?: boolean }[] = [
  {
    href: '/',
    label: '面试日程',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
        <line x1="16" y1="2" x2="16" y2="6"/>
        <line x1="8" y1="2" x2="8" y2="6"/>
        <line x1="3" y1="10" x2="21" y2="10"/>
      </svg>
    ),
  },
  {
    href: '/greeting',
    label: '招呼语生成',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    ),
  },
  {
    href: '/questions',
    label: '面试问题',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 11l3 3L22 4"/>
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
      </svg>
    ),
  },
  {
    href: '/settings',
    label: '设置',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3"/>
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
      </svg>
    ),
  },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-inner">
          {/* Logo */}
          <div className="sidebar-logo">
            <div className="logo-mark">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <rect x="2" y="3" width="20" height="20" rx="4" stroke="#667eea" strokeWidth="1.8"/>
                <line x1="2" y1="9" x2="22" y2="9" stroke="#667eea" strokeWidth="1.8"/>
                <line x1="8" y1="2" x2="8" y2="6" stroke="#667eea" strokeWidth="1.8" strokeLinecap="round"/>
                <line x1="16" y1="2" x2="16" y2="6" stroke="#667eea" strokeWidth="1.8" strokeLinecap="round"/>
                <circle cx="8" cy="14" r="1.5" fill="#667eea"/>
                <circle cx="12" cy="14" r="1.5" fill="#34d399"/>
                <circle cx="16" cy="14" r="1.5" fill="#667eea" opacity="0.5"/>
              </svg>
            </div>
            <div>
              <div className="logo-title">Interview</div>
              <div className="logo-subtitle">Manager</div>
            </div>
          </div>

          {/* Nav */}
          <nav className="sidebar-nav">
            <div className="nav-section-label">导航</div>
            {navItems.map(item => {
              const isActive = item.href === '/'
                ? pathname === '/'
                : pathname.startsWith(item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`nav-link ${isActive ? 'active' : ''} ${item.highlight ? 'nav-link-highlight' : ''}`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                  {item.highlight && (
                    <span className="nav-highlight-dot" />
                  )}
                </Link>
              )
            })}
          </nav>

          {/* Bottom */}
          <div className="sidebar-footer">
            <div className="sidebar-footer-card">
              <div className="footer-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#667eea" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12,6 12,12 16,14"/>
                </svg>
              </div>
              <div>
                <div className="footer-text-primary">邮件提醒</div>
                <div className="footer-text-secondary">自动发送面试提醒</div>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Top Bar */}
      <header className="mobile-topbar">
        <div className="mobile-topbar-logo">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <rect x="2" y="3" width="20" height="20" rx="4" stroke="#667eea" strokeWidth="1.8"/>
            <line x1="2" y1="9" x2="22" y2="9" stroke="#667eea" strokeWidth="1.8"/>
            <line x1="8" y1="2" x2="8" y2="6" stroke="#667eea" strokeWidth="1.8" strokeLinecap="round"/>
            <line x1="16" y1="2" x2="16" y2="6" stroke="#667eea" strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
          <span>面试管理器</span>
        </div>
        <Link href="/interviews/new" className="mobile-add-btn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="12" y1="5" x2="12" y2="19"/>
            <line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          添加面试
        </Link>
      </header>

      <style jsx>{`
        /* ===== Sidebar ===== */
        .sidebar {
          width: var(--sidebar-width);
          background: var(--bg-secondary);
          border-right: 1px solid var(--border);
          position: fixed;
          top: 0;
          left: 0;
          height: 100vh;
          z-index: 50;
          display: flex;
          flex-direction: column;
        }

        .sidebar-inner {
          display: flex;
          flex-direction: column;
          height: 100%;
          padding: 20px 12px;
          overflow-y: auto;
        }

        /* Logo */
        .sidebar-logo {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 8px 10px 24px;
        }

        .logo-mark {
          width: 38px;
          height: 38px;
          background: var(--accent-primary-dim);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .logo-title {
          font-size: 15px;
          font-weight: 700;
          color: var(--text-primary);
          letter-spacing: -0.02em;
          line-height: 1.2;
        }

        .logo-subtitle {
          font-size: 11px;
          color: var(--text-tertiary);
          font-weight: 500;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }

        /* Nav */
        .sidebar-nav {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .nav-section-label {
          font-size: 10px;
          font-weight: 700;
          color: var(--text-tertiary);
          text-transform: uppercase;
          letter-spacing: 0.08em;
          padding: 4px 14px 8px;
        }

        .nav-link-highlight {
          margin-top: 8px;
          background: var(--accent-primary-dim);
          color: var(--accent-primary);
          border: 1px solid rgba(129, 140, 248, 0.2);
        }

        .nav-link-highlight:hover {
          background: rgba(129, 140, 248, 0.2);
          color: var(--accent-primary);
        }

        .nav-highlight-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--accent-primary);
          margin-left: auto;
          box-shadow: 0 0 6px var(--accent-primary);
        }

        /* Footer */
        .sidebar-footer {
          padding-top: 16px;
          border-top: 1px solid var(--border);
        }

        .sidebar-footer-card {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px;
          background: var(--accent-primary-dim);
          border-radius: var(--radius-md);
          border: 1px solid rgba(129, 140, 248, 0.15);
        }

        .footer-icon {
          width: 32px;
          height: 32px;
          background: var(--bg-card);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .footer-text-primary {
          font-size: 12px;
          font-weight: 600;
          color: var(--text-primary);
        }

        .footer-text-secondary {
          font-size: 11px;
          color: var(--text-tertiary);
          margin-top: 1px;
        }

        /* ===== Mobile Topbar ===== */
        .mobile-topbar {
          display: none;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 56px;
          background: var(--bg-secondary);
          border-bottom: 1px solid var(--border);
          z-index: 50;
          padding: 0 16px;
          align-items: center;
          justify-content: space-between;
        }

        .mobile-topbar-logo {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 15px;
          font-weight: 700;
          color: var(--text-primary);
        }

        .mobile-add-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          background: var(--accent-primary);
          color: #ffffff;
          font-size: 13px;
          font-weight: 600;
          padding: 7px 14px;
          border-radius: 8px;
          text-decoration: none;
          transition: all 0.15s;
        }

        .mobile-add-btn:hover {
          opacity: 0.9;
        }

        /* ===== Responsive ===== */
        @media (max-width: 768px) {
          .sidebar {
            display: none;
          }

          .mobile-topbar {
            display: flex;
          }

          .app-main {
            padding-top: 56px;
          }
        }
      `}</style>
    </>
  )
}
