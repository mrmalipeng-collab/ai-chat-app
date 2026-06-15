'use client'
import { useEffect, useRef } from 'react'
import { ScrollArea } from '@/components/ui/scroll-area'
import MessageItem from './MessageItem'
import type { UIMessage } from 'ai'

interface MessageListProps {
  messages: UIMessage[]
  isLoading: boolean
}

export default function MessageList({ messages, isLoading }: MessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  return (
    <ScrollArea className="flex-1 px-4 py-6">
      {messages.length === 0 && (
        <div className="h-[60vh] flex flex-col items-center justify-center text-[#94a3b8]">
          <p className="text-5xl mb-4">✦</p>
          <p className="text-lg font-medium text-[#f8fafc]">有什么我可以帮你的？</p>
          <p className="text-sm mt-1">输入任何问题开始对话</p>
        </div>
      )}
      <div className="max-w-4xl mx-auto">
        {messages.map((msg) => {
          // Extract text content from parts
          const textContent = msg.parts
            .filter((p) => p.type === 'text')
            .map((p) => (p as { type: 'text'; text: string }).text)
            .join('')
          if (!textContent) return null
          return (
            <MessageItem
              key={msg.id}
              role={msg.role as 'user' | 'assistant'}
              content={textContent}
            />
          )
        })}
        {isLoading && (
          <div className="flex gap-3 mb-6">
            <div className="w-8 h-8 rounded-full bg-[#334155] flex items-center justify-center text-xs text-[#94a3b8]">
              AI
            </div>
            <div className="bg-[#1e293b] border border-[#334155] px-4 py-3 rounded-2xl rounded-tl-sm">
              <div className="flex gap-1 items-center">
                <span
                  className="w-2 h-2 bg-[#7c3aed] rounded-full animate-bounce"
                  style={{ animationDelay: '0ms' }}
                />
                <span
                  className="w-2 h-2 bg-[#7c3aed] rounded-full animate-bounce"
                  style={{ animationDelay: '150ms' }}
                />
                <span
                  className="w-2 h-2 bg-[#7c3aed] rounded-full animate-bounce"
                  style={{ animationDelay: '300ms' }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
      <div ref={bottomRef} />
    </ScrollArea>
  )
}
