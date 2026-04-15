'use client'

import { useState } from 'react'

export default function GreetingForm() {
  const [resume, setResume] = useState('')
  const [jd, setJd] = useState('')

  const handleGenerate = () => {
    // 目前仅样式，无实际功能
    alert('仅样式展示，点击无实际效果')
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          📄 简历内容
        </label>
        <textarea
          className="w-full rounded-xl border border-gray-200 p-4 text-sm bg-gray-50 h-40 resize-none"
          placeholder="粘贴你的简历内容..."
          value={resume}
          onChange={(e) => setResume(e.target.value)}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          💼 职位 JD
        </label>
        <textarea
          className="w-full rounded-xl border border-gray-200 p-4 text-sm bg-gray-50 h-40 resize-none"
          placeholder="粘贴目标岗位的职位描述..."
          value={jd}
          onChange={(e) => setJd(e.target.value)}
        />
      </div>
      <button
        onClick={handleGenerate}
        className="w-full bg-blue-500 text-white rounded-xl py-3 font-medium hover:bg-blue-600 transition-colors"
      >
        ✨ 生成招呼语
      </button>
    </div>
  )
}
