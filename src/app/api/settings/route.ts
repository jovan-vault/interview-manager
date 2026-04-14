import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const settings = await prisma.settings.findFirst()
  return NextResponse.json({ email: settings?.email || null })
}

export async function POST(request: Request) {
  const body = await request.json()
  const { email } = body

  if (!email || !email.includes('@')) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
  }

  const settings = await prisma.settings.upsert({
    where: { id: 'default' },
    update: { email },
    create: { id: 'default', email },
  })

  return NextResponse.json({ email: settings.email })
}
