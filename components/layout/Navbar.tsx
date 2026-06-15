import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 border-b border-[#334155] bg-[#0f172a]/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-white flex items-center gap-2">
          <span className="text-[#7c3aed]">✦</span> AiChat
        </Link>
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className={cn(buttonVariants({ variant: 'ghost' }), 'text-[#94a3b8] hover:text-white')}
          >
            登录
          </Link>
          <Link
            href="/register"
            className={cn(buttonVariants(), 'bg-[#7c3aed] hover:bg-[#6d28d9]')}
          >
            免费开始
          </Link>
        </div>
      </div>
    </nav>
  )
}
