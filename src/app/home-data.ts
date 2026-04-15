import { prisma } from '@/lib/prisma'

export async function getInterviewsData() {
  return prisma.interview.findMany({ orderBy: { date: 'asc' } })
}
