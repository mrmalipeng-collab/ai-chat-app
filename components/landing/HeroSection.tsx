import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export default function HeroSection() {
  return (
    <section className="min-h-screen bg-[#0f172a] flex items-center pt-16">
      <div className="max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-6">
            <span className="bg-gradient-to-r from-[#7c3aed] to-[#2563eb] bg-clip-text text-transparent">
              与 AI 对话，
            </span>
            <br />
            <span className="text-[#f8fafc]">重新定义效率</span>
          </h1>
          <p className="text-[#94a3b8] text-lg mb-8 leading-relaxed">
            无论是写作、编程、分析，AI 都是你最强的思维伙伴。
            <br />对话历史永久保存，随时继续上次的思路。
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/register"
              className={cn(
                buttonVariants(),
                'bg-gradient-to-r from-[#7c3aed] to-[#2563eb] hover:opacity-90 px-8 py-3 text-base h-auto'
              )}
            >
              免费开始使用
            </Link>
            <Link
              href="/login"
              className={cn(
                buttonVariants({ variant: 'outline' }),
                'border-[#334155] text-[#94a3b8] hover:text-white hover:border-[#7c3aed] px-8 py-3 text-base h-auto bg-transparent'
              )}
            >
              已有账号？登录
            </Link>
          </div>
        </div>
        {/* Chat Mockup */}
        <div className="hidden lg:block">
          <div className="bg-[#1e293b] rounded-2xl border border-[#334155] p-6 shadow-2xl">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-red-500/60" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
              <div className="w-3 h-3 rounded-full bg-green-500/60" />
              <span className="ml-2 text-[#475569] text-xs">AiChat</span>
            </div>
            <div className="space-y-4">
              <div className="flex justify-end">
                <div className="bg-[#7c3aed] text-white px-4 py-2.5 rounded-2xl rounded-tr-sm text-sm max-w-[80%]">
                  帮我写一段 React 组件的单元测试
                </div>
              </div>
              <div className="flex justify-start">
                <div className="bg-[#0f172a] text-[#e2e8f0] px-4 py-2.5 rounded-2xl rounded-tl-sm text-sm max-w-[85%] border border-[#334155]">
                  好的！以下是一个使用 Vitest + Testing Library 的示例...
                  <br /><br />
                  <code className="text-[#7c3aed] text-xs">
                    {`import { render, screen } from '@testing-library/react'`}
                  </code>
                </div>
              </div>
              <div className="flex justify-end">
                <div className="bg-[#7c3aed] text-white px-4 py-2.5 rounded-2xl rounded-tr-sm text-sm max-w-[80%]">
                  能加上 mock 示例吗？
                </div>
              </div>
              <div className="flex items-center gap-2 bg-[#0f172a] rounded-xl px-4 py-3 border border-[#334155]">
                <span className="text-[#475569] text-sm flex-1">输入消息...</span>
                <div className="w-7 h-7 rounded-lg bg-[#7c3aed] flex items-center justify-center">
                  <span className="text-white text-xs">↑</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
