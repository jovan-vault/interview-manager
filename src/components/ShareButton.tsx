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
      className="bg-[#1f1f1f] text-white py-2 px-5 rounded-full hover:bg-[#252525] transition flex items-center gap-2 border border-[#4d4d4d]">
      {copied ? '✓ 已复制' : '🔗 复制分享链接'}
    </button>
  )
}
