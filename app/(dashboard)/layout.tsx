import { Suspense } from 'react'
import Sidebar from '@/components/layout/Sidebar'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen bg-[#0f172a] text-[#f8fafc] overflow-hidden">
      <Suspense fallback={<div className="w-60 h-full bg-[#1e293b] border-r border-[#334155] shrink-0" />}>
        <Sidebar />
      </Suspense>
      <main className="flex-1 flex flex-col overflow-hidden min-w-0">
        {children}
      </main>
    </div>
  )
}
