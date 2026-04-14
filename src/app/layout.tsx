import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '面试时间管理器',
  description: '管理你的面试时间，不再错过任何面试',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen bg-gray-50">{children}</body>
    </html>
  )
}
