'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface Props { interviewId: string }

export default function DeleteButton({ interviewId }: Props) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    if (!confirm('确定删除这条面试记录？')) return
    setLoading(true)

    await fetch(`/api/interviews/${interviewId}`, { method: 'DELETE' })
    router.push('/')
    router.refresh()
  }

  return (
    <button onClick={handleDelete} disabled={loading}
      className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 disabled:opacity-50">
      {loading ? '删除中...' : '删除'}
    </button>
  )
}
