import { Zap, Shield, History } from 'lucide-react'

const features = [
  {
    icon: Zap,
    title: '闪电响应',
    description: '毫秒级流式输出，思考过程实时可见，让等待成为过去式。',
  },
  {
    icon: Shield,
    title: '数据安全',
    description: '对话记录加密存储，隐私完全可控，你的数据只属于你。',
  },
  {
    icon: History,
    title: '历史回溯',
    description: '所有对话永久保存，随时检索回顾，上下文永不丢失。',
  },
]

export default function FeaturesSection() {
  return (
    <section className="py-24 bg-[#0f172a]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-[#f8fafc] mb-4">
            为什么选择 AiChat
          </h2>
          <p className="text-[#94a3b8] text-lg max-w-2xl mx-auto">
            专为效率而生，每一个功能都经过精心设计
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <div
                key={feature.title}
                className="bg-[#1e293b] border border-[#334155] rounded-2xl p-8 hover:-translate-y-1 transition-transform duration-200"
              >
                <div className="w-12 h-12 bg-[#7c3aed]/10 rounded-xl flex items-center justify-center mb-6">
                  <Icon className="w-6 h-6 text-[#7c3aed]" />
                </div>
                <h3 className="text-xl font-semibold text-[#f8fafc] mb-3">{feature.title}</h3>
                <p className="text-[#94a3b8] leading-relaxed">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
