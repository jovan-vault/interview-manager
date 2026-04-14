import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="max-w-2xl mx-auto p-4 text-center py-20">
      <h1 className="text-6xl font-bold text-gray-300 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">页面不存在</h2>
      <p className="text-gray-500 mb-6">你访问的页面可能已被删除或不存在</p>
      <Link href="/" className="text-blue-600 hover:underline">返回首页</Link>
    </main>
  )
}
