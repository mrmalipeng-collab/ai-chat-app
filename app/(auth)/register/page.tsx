'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function RegisterPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/api/auth/callback`,
      },
    })
    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      setDone(true)
    }
  }

  if (done) {
    return (
      <div className="min-h-screen bg-[#0f172a] flex items-center justify-center px-4">
        <div className="w-full max-w-md p-8 rounded-2xl bg-[#1e293b] border border-[#334155] text-center">
          <div className="text-4xl mb-4">✉️</div>
          <h2 className="text-xl font-bold text-white mb-2">确认邮件已发送</h2>
          <p className="text-[#94a3b8] text-sm">
            请检查 <strong className="text-white">{email}</strong> 的收件箱，点击确认链接完成注册。
          </p>
          <Link href="/login" className="text-[#7c3aed] hover:underline text-sm mt-4 block">
            返回登录
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center px-4">
      <div className="w-full max-w-md p-8 rounded-2xl bg-[#1e293b] border border-[#334155]">
        <div className="text-center mb-8">
          <Link href="/" className="text-2xl font-bold text-white flex items-center justify-center gap-2">
            <span className="text-[#7c3aed]">✦</span> AiChat
          </Link>
          <p className="text-[#94a3b8] mt-2 text-sm">创建你的账号</p>
        </div>
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="text-[#94a3b8] text-sm mb-1.5 block">邮箱地址</label>
            <Input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="bg-[#0f172a] border-[#334155] text-white placeholder:text-[#475569] focus-visible:ring-[#7c3aed]"
            />
          </div>
          <div>
            <label className="text-[#94a3b8] text-sm mb-1.5 block">密码（至少 8 位）</label>
            <Input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              minLength={8}
              required
              className="bg-[#0f172a] border-[#334155] text-white placeholder:text-[#475569] focus-visible:ring-[#7c3aed]"
            />
          </div>
          {error && (
            <div className="text-red-400 text-sm bg-red-400/10 border border-red-400/20 px-3 py-2 rounded-lg">
              {error}
            </div>
          )}
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-[#7c3aed] hover:bg-[#6d28d9] mt-2"
          >
            {loading ? '注册中...' : '免费注册'}
          </Button>
        </form>
        <p className="text-[#94a3b8] text-sm text-center mt-6">
          已有账号？{' '}
          <Link href="/login" className="text-[#7c3aed] hover:underline">
            立即登录
          </Link>
        </p>
      </div>
    </div>
  )
}
