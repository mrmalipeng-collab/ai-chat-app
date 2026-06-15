import { streamText } from 'ai'
import { anthropic } from '@ai-sdk/anthropic'
import { createClient } from '@/lib/supabase/server'

export async function POST(req: Request) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return new Response('Unauthorized', { status: 401 })
  }

  const { messages, conversationId } = await req.json()

  if (!messages || !conversationId) {
    return new Response('Bad Request: missing messages or conversationId', {
      status: 400,
    })
  }

  const lastUserMessage = messages[messages.length - 1]

  // 持久化用户消息
  await supabase.from('messages').insert({
    conversation_id: conversationId,
    role: 'user',
    content: lastUserMessage.content,
  })

  const result = streamText({
    model: anthropic('claude-sonnet-4-6'),
    system:
      '你是一个专业的 AI 助手，用中文回答问题，回答简洁准确，适当使用 Markdown 格式。',
    messages,
    async onFinish({ text }) {
      // 持久化 AI 回复
      await supabase.from('messages').insert({
        conversation_id: conversationId,
        role: 'assistant',
        content: text,
      })

      // 第一条消息时自动设置对话标题
      if (messages.length === 1) {
        const title = lastUserMessage.content.slice(0, 20)
        await supabase
          .from('conversations')
          .update({ title })
          .eq('id', conversationId)
      }
    },
  })

  return result.toTextStreamResponse()
}
