export function getTodayDate() {
  const now = new Date()
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`
}

export function formatDateHeader(dateStr: string) {
  const date = new Date(dateStr + 'T00:00:00')
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const target = new Date(date)
  target.setHours(0, 0, 0, 0)
  const diff = Math.round((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
  const base = date.toLocaleDateString('zh-CN', { month: 'long', day: 'numeric', weekday: 'long' })
  if (diff === 0) return `今天 · ${base}`
  if (diff === 1) return `明天 · ${base}`
  if (diff === -1) return `昨天 · ${base}`
  if (diff > 1 && diff <= 7) return `本周 ${date.toLocaleDateString('zh-CN', { weekday: 'long' })} · ${date.toLocaleDateString('zh-CN', { month: 'long', day: 'numeric' })}`
  return base
}
