import InterviewForm from '@/components/InterviewForm'

export default function NewInterview() {
  return (
    <main className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">添加面试</h1>
      <InterviewForm mode="create" />
    </main>
  )
}
