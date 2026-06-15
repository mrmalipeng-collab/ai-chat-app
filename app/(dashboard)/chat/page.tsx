import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import ChatInterface from '@/components/chat/ChatInterface'
import type { UIMessage } from 'ai'

interface ChatPageProps {
  searchParams: Promise<{ id?: string }>
}

export default async function ChatPage({ searchParams }: ChatPageProps) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const params = await searchParams
  let conversationId = params.id

  // 无 id 时自动创建新对话
  if (!conversationId) {
    // 先检查最近是否有空对话可以复用
    const { data: existing } = await supabase
      .from('conversations')
      .select('id')
      .eq('user_id', user.id)
      .eq('title', '新对话')
      .order('created_at', { ascending: false })
      .limit(1)
      .single()

    if (existing) {
      // 检查是否真的是空对话（无消息）
      const { count } = await supabase
        .from('messages')
        .select('id', { count: 'exact', head: true })
        .eq('conversation_id', existing.id)

      if (count === 0) {
        redirect(`/chat?id=${existing.id}`)
        return null
      }
    }

    // 无可复用的空对话，创建新的
    const { data } = await supabase
      .from('conversations')
      .insert({ user_id: user.id, title: '新对话' })
      .select()
      .single()
    if (data) redirect(`/chat?id=${data.id}`)
    return null
  }

  // 加载历史消息并转换为 UIMessage 格式（ai v6）
  const { data: dbMessages } = await supabase
    .from('messages')
    .select('*')
    .eq('conversation_id', conversationId)
    .order('created_at', { ascending: true })

  const initialMessages: UIMessage[] = (dbMessages || []).map((m) => ({
    id: m.id,
    role: m.role as 'user' | 'assistant',
    content: m.content,
    parts: [{ type: 'text' as const, text: m.content }],
  }))

  return (
    <ChatInterface
      conversationId={conversationId}
      initialMessages={initialMessages}
    />
  )
}
