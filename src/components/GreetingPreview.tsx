export default function GreetingPreview() {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        📝 生成结果预览
      </label>
      <div className="bg-[#1f1f1f] border border-[#4d4d4d] rounded-lg p-6 h-[340px] flex items-center justify-center">
        <div className="text-center text-[#b3b3b3]">
          <div className="text-4xl mb-2">📋</div>
          <p>生成结果将显示在这里</p>
        </div>
      </div>
    </div>
  )
}
