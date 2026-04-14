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
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto">
      <div>
        <label className="block text-sm font-medium text-gray-700">日期</label>
        <input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} required
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">开始时间</label>
          <input type="time" value={form.startTime} onChange={e => setForm({ ...form, startTime: e.target.value })} required
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">结束时间</label>
          <input type="time" value={form.endTime} onChange={e => setForm({ ...form, endTime: e.target.value })} required
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">公司名称</label>
        <input type="text" value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} required
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500" />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">岗位名称</label>
        <input type="text" value={form.position} onChange={e => setForm({ ...form, position: e.target.value })} required
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500" />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">职位链接 (可选)</label>
        <input type="url" value={form.positionUrl} onChange={e => setForm({ ...form, positionUrl: e.target.value })}
          placeholder="https://..."
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500" />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">面试形式</label>
        <select value={form.interviewType} onChange={e => setForm({ ...form, interviewType: e.target.value as 'VIDEO' | 'ONSITE' })}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500">
          <option value="VIDEO">视频面试</option>
          <option value="ONSITE">现场面试</option>
        </select>
      </div>

      {form.interviewType === 'VIDEO' && (
        <div>
          <label className="block text-sm font-medium text-gray-700">视频会议链接 (可选)</label>
          <input type="text" value={form.meetingUrl} onChange={e => setForm({ ...form, meetingUrl: e.target.value })}
            placeholder="飞书/腾讯会议等链接，或留空"
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500" />
        </div>
      )}

      <div className="bg-blue-50 border border-blue-200 rounded p-3 text-sm">
        <p className="text-blue-700">
          提醒将发送至: <span className="font-mono">{savedEmail || '未设置'}</span>
        </p>
        {!savedEmail && (
          <Link href="/settings" className="text-blue-600 hover:underline">
            去设置邮箱 →
          </Link>
        )}
      </div>

      <div>
        <div className="flex items-center gap-2 mb-2">
          <input
            type="checkbox"
            checked={form.reminderEnabled}
            onChange={e => setForm({ ...form, reminderEnabled: e.target.checked })}
            className="rounded border-gray-300"
          />
          <span className="text-sm font-medium text-gray-700">启用邮件提醒</span>
        </div>
        {form.reminderEnabled && (
          <>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="10"
                max="1440"
                value={form.reminderMinutes}
                onChange={e => setForm({ ...form, reminderMinutes: parseInt(e.target.value) || 60 })}
                required
                className="flex-1 rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
              />
              <span className="text-gray-500">分钟前</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              面试前多少分钟发送提醒（10-1440分钟）
            </p>
          </>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">备注 (可选)</label>
        <textarea value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} rows={3}
          placeholder="面试官姓名、注意事项等..."
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500" />
      </div>

      <div className="flex gap-3">
        <button type="submit" disabled={loading}
          className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50">
          {loading ? '保存中...' : '保存'}
        </button>
        <button type="button" onClick={() => router.back()}
          className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300">
          取消
        </button>
      </div>
    </form>
  )
}
