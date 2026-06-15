'use client'
import { useEffect, useState, useCallback, useMemo } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Plus, MessageSquare, LogOut } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Conversation } from '@/lib/types'

export default function Sidebar() {
  const [conversations, setConversations] = useState<Conversation[]>([])
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentId = searchParams.get('id')
  const supabase = useMemo(() => createClient(), [])

  useEffect(() => {
    let isMounted = true
    async function load() {
      const { data } = await supabase
        .from('conversations')
        .select('*')
        .order('updated_at', { ascending: false })
        .limit(50)
      if (isMounted && data) setConversations(data as Conversation[])
    }
    load()
    return () => { isMounted = false }
  }, [supabase])

  async function createNewConversation() {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) return

    const { data } = await supabase
      .from('conversations')
      .insert({ user_id: user.id, title: '新对话' })
      .select()
      .single()

    if (data) {
      const { data: list } = await supabase
        .from('conversations')
        .select('*')
        .order('updated_at', { ascending: false })
        .limit(50)
      if (list) setConversations(list as Conversation[])
      router.push(`/chat?id=${data.id}`)
    }
  }

  async function handleSignOut() {
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  return (
    <aside className="w-60 h-full bg-[#1e293b] border-r border-[#334155] flex flex-col shrink-0">
      {/* Header */}
      <div className="p-4 border-b border-[#334155]">
        <Link
          href="/"
          className="text-lg font-bold text-white flex items-center gap-2 mb-3"
        >
          <span className="text-[#7c3aed]">✦</span> AiChat
        </Link>
        <Button
          onClick={createNewConversation}
          className="w-full bg-[#7c3aed] hover:bg-[#6d28d9] gap-2 text-sm"
          size="sm"
        >
          <Plus className="w-3.5 h-3.5" />
          新对话
        </Button>
      </div>

      {/* Conversation List */}
      <ScrollArea className="flex-1 p-2">
        {conversations.length === 0 && (
          <p className="text-[#475569] text-xs text-center mt-4">
            暂无对话记录
          </p>
        )}
        {conversations.map((conv) => (
          <Link
            key={conv.id}
            href={`/chat?id=${conv.id}`}
            className={cn(
              'flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors mb-1 truncate',
              currentId === conv.id
                ? 'bg-[#334155] text-white'
                : 'text-[#94a3b8] hover:bg-[#334155]/60 hover:text-white'
            )}
          >
            <MessageSquare className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">{conv.title}</span>
          </Link>
        ))}
      </ScrollArea>

      {/* Footer: Sign Out */}
      <div className="p-3 border-t border-[#334155]">
        <button
          onClick={handleSignOut}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-[#94a3b8] hover:text-white hover:bg-[#334155] text-sm transition-colors"
        >
          <LogOut className="w-3.5 h-3.5" />
          退出登录
        </button>
      </div>
    </aside>
  )
}
