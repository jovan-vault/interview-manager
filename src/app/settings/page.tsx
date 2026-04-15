'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function SettingsPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    fetch('/api/settings')
      .then(res => res.json())
      .then(data => {
        if (data.email) setEmail(data.email)
      })
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const res = await fetch('/api/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    })

    if (res.ok) {
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    }
    setLoading(false)
  }

  return (
    <main className="max-w-xl mx-auto p-4 bg-black min-h-screen">
      <div className="mb-6">
        <Link href="/" className="text-[#b3b3b3] hover:text-[#1ed760]">← 返回列表</Link>
      </div>

      <div className="bg-[#181818] rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-2 text-white">⚙️ 设置</h1>
        <p className="text-[#b3b3b3] mb-6">设置你的提醒接收邮箱</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#b3b3b3] mb-1">
              提醒邮箱
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="w-full rounded-md bg-[#1f1f1f] border-[#4d4d4d] text-white px-3 py-2 focus:border-[#1ed760] focus:outline-none"
            />
            <p className="text-xs text-[#b3b3b3] mt-1">
              面试提醒邮件将发送到此邮箱
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#1ed760] text-black py-2 px-4 rounded-full hover:bg-[#1db954] disabled:opacity-50"
          >
            {loading ? '保存中...' : saved ? '✓ 已保存' : '保存设置'}
          </button>
        </form>
      </div>

      <div className="mt-6 bg-[#252525] border-[#4d4d4d] rounded-lg p-4">
        <h2 className="font-medium text-white mb-2">💡 提醒</h2>
        <ul className="text-sm text-[#b3b3b3] space-y-1">
          <li>• 提醒邮件会在面试前指定时间发送</li>
          <li>• 每条面试可以设置不同的提醒时间</li>
          <li>• 确保邮箱地址填写正确，以免错过提醒</li>
        </ul>
      </div>
    </main>
  )
}
