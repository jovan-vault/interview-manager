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
    <button onClick={handleCopy}
      className="bg-gray-100 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-200 transition flex items-center gap-2">
      {copied ? '✓ 已复制' : '🔗 复制分享链接'}
    </button>
  )
}
