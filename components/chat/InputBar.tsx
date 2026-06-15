'use client'
import { useRef, type KeyboardEvent } from 'react'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { ArrowUp } from 'lucide-react'

interface InputBarProps {
  input: string
  onChange: (value: string) => void
  onSubmit: (e: React.FormEvent) => void
  isLoading: boolean
}

export default function InputBar({
  input,
  onChange,
  onSubmit,
  isLoading,
}: InputBarProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey && !isLoading) {
      e.preventDefault()
      onSubmit(e as unknown as React.FormEvent)
    }
  }

  return (
    <div className="px-4 py-4 border-t border-[#334155] bg-[#0f172a]">
      <form
        onSubmit={onSubmit}
        className="flex gap-3 max-w-4xl mx-auto items-end"
      >
        <Textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="输入消息... (Enter 发送，Shift+Enter 换行)"
          rows={1}
          className="resize-none bg-[#1e293b] border-[#334155] text-white placeholder:text-[#475569] focus-visible:ring-[#7c3aed] min-h-[44px] max-h-[160px] overflow-y-auto"
        />
        <Button
          type="submit"
          disabled={isLoading || !input.trim()}
          size="icon"
          className="bg-[#7c3aed] hover:bg-[#6d28d9] shrink-0 h-[44px] w-[44px] rounded-xl"
          aria-label="发送消息"
        >
          <ArrowUp className="w-4 h-4" />
        </Button>
      </form>
      <p className="text-xs text-[#475569] text-center mt-2">
        AI 生成内容仅供参考，请自行核实重要信息
      </p>
    </div>
  )
}
