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
        <label className="block text-sm font-medium text-[#b3b3b3] mb-2">
          📄 简历内容
        </label>
        <textarea
          className="w-full rounded-lg border border-[#4d4d4d] p-4 text-sm bg-[#1f1f1f] text-white h-40 resize-none"
          placeholder="粘贴你的简历内容..."
          value={resume}
          onChange={(e) => setResume(e.target.value)}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-[#b3b3b3] mb-2">
          💼 职位 JD
        </label>
        <textarea
          className="w-full rounded-lg border border-[#4d4d4d] p-4 text-sm bg-[#1f1f1f] text-white h-40 resize-none"
          placeholder="粘贴目标岗位的职位描述..."
          value={jd}
          onChange={(e) => setJd(e.target.value)}
        />
      </div>
      <button
        onClick={handleGenerate}
        className="w-full bg-[#1ed760] text-black rounded-full py-3 font-medium hover:bg-[#1ed760]/90 transition-colors"
      >
        ✨ 生成招呼语
      </button>
    </div>
  )
}
