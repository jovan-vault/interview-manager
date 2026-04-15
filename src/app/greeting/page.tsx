import GreetingForm from '@/components/GreetingForm'
import GreetingPreview from '@/components/GreetingPreview'

export const metadata = {
  title: '招呼语生成 - 面试管理器',
  description: '根据简历和JD生成个性化招呼语',
}

export default function GreetingPage() {
  return (
    <main className="max-w-5xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <span className="text-2xl">💬</span>
          AI 招呼语生成
        </h1>
        <div className="grid md:grid-cols-2 gap-6">
          <GreetingForm />
          <GreetingPreview />
        </div>
      </div>
    </main>
  )
}
