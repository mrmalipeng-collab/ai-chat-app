import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { cn } from '@/lib/utils'

interface MessageItemProps {
  role: 'user' | 'assistant'
  content: string
}

export default function MessageItem({ role, content }: MessageItemProps) {
  const isUser = role === 'user'

  return (
    <div className={cn('flex gap-3 mb-6', isUser && 'flex-row-reverse')}>
      <div
        className={cn(
          'w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0',
          isUser
            ? 'bg-[#7c3aed] text-white'
            : 'bg-[#334155] text-[#94a3b8]'
        )}
      >
        {isUser ? 'U' : 'AI'}
      </div>
      <div
        className={cn(
          'max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed',
          isUser
            ? 'bg-[#7c3aed] text-white rounded-tr-sm'
            : 'bg-[#1e293b] text-[#e2e8f0] border border-[#334155] rounded-tl-sm'
        )}
      >
        {isUser ? (
          <p className="whitespace-pre-wrap">{content}</p>
        ) : (
          <div className="prose prose-invert prose-sm max-w-none prose-p:my-1 prose-pre:bg-[#0f172a] prose-code:text-[#7c3aed]">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {content}
            </ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  )
}
