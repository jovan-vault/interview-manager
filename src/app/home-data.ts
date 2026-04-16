import { prisma } from '@/lib/prisma'

export async function getInterviewsData() {
  const allInterviews = await prisma.interview.findMany({
    orderBy: { date: 'asc' }
  })

  // 在应用层过滤，避免时区问题
  const now = new Date()
  const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`

  return allInterviews
    .filter(interview => {
      const interviewDateStr = new Date(interview.date).toISOString().split('T')[0]
      return interviewDateStr >= todayStr
    })
    .map(interview => ({
      ...interview,
      date: interview.date.toISOString(),
      createdAt: interview.createdAt.toISOString(),
      updatedAt: interview.updatedAt.toISOString(),
    }))
}
