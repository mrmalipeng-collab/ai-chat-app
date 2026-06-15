import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export default function CTASection() {
  return (
    <section className="py-24 bg-[#1e293b] border-t border-[#334155]">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <h2 className="text-3xl lg:text-4xl font-bold text-[#f8fafc] mb-4">
          准备好提升你的效率了吗？
        </h2>
        <p className="text-[#94a3b8] text-lg mb-10">
          立即免费注册，开始你的第一次 AI 对话
        </p>
        <Link
          href="/register"
          className={cn(
            buttonVariants(),
            'bg-[#7c3aed] hover:bg-[#6d28d9] px-10 py-4 text-base h-auto'
          )}
        >
          免费开始 →
        </Link>
        <p className="text-[#475569] text-sm mt-4">无需信用卡 · 永久免费使用</p>
      </div>
    </section>
  )
}
