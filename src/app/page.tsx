import Link from 'next/link'
import InterviewTimeline from '@/components/InterviewTimeline'
import { prisma } from '@/lib/prisma'

async function getInterviews() {
  return prisma.interview.findMany({
    orderBy: { date: 'asc' },
  })
}

export default async function Home() {
  const interviews = await getInterviews()

  const grouped = interviews.reduce((acc: Record<string, typeof interviews>, item: any) => {
    const dateKey = new Date(item.date).toISOString().split('T')[0]
    if (!acc[dateKey]) acc[dateKey] = []
    acc[dateKey].push(item)
    return acc
  }, {})

  const sortedDates = Object.keys(grouped).sort()

  return (
    <main className="max-w-2xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">📅 面试日程</h1>
        <div className="flex gap-3">
          <Link href="/greeting" className="text-gray-600 hover:text-gray-800 px-3 py-2 text-sm flex items-center gap-1">
            💬 招呼语
          </Link>
          <Link href="/questions" className="text-gray-600 hover:text-gray-800 px-3 py-2 text-sm flex items-center gap-1">
            📝 问题
          </Link>
          <a href="/interviews/new" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
            + 添加面试
          </a>
        </div>
      </div>

      {sortedDates.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <p className="text-lg">暂无面试安排</p>
          <p className="mt-2">点击上方按钮添加你的第一个面试</p>
        </div>
      ) : (
        sortedDates.map(date => (
          <div key={date} className="mb-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-3">
              {new Date(date).toLocaleDateString('zh-CN', { month: 'long', day: 'numeric', weekday: 'long' })}
            </h2>
            {grouped[date].map((interview: any, index: number) => (
              <InterviewTimeline
                key={interview.id}
                interview={interview}
                isLast={index === grouped[date].length - 1}
              />
            ))}
          </div>
        ))
      )}
    </main>
  )
}
