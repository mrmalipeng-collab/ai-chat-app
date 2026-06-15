'use client'
import { useState } from 'react'
import { useChat } from '@ai-sdk/react'
import { DefaultChatTransport } from 'ai'
import type { UIMessage } from 'ai'
import MessageList from './MessageList'
import InputBar from './InputBar'

interface ChatInterfaceProps {
  conversationId: string
  initialMessages?: UIMessage[]
}

export default function ChatInterface({
  conversationId,
  initialMessages = [],
}: ChatInterfaceProps) {
  const [input, setInput] = useState('')
  const { messages, sendMessage, status } = useChat({
    messages: initialMessages,
    transport: new DefaultChatTransport({
      api: '/api/chat',
      body: { conversationId },
    }),
  })

  const isLoading = status === 'submitted' || status === 'streaming'

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!input.trim() || isLoading) return
    sendMessage({ role: 'user', parts: [{ type: 'text', text: input }] })
    setInput('')
  }

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <MessageList messages={messages} isLoading={isLoading} />
      <InputBar
        input={input}
        onChange={setInput}
        onSubmit={handleSubmit}
        isLoading={isLoading}
      />
    </div>
  )
}
