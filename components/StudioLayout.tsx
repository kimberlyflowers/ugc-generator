'use client'

import { Video, Image as ImageIcon, Library, Settings, DollarSign, Sparkles } from 'lucide-react'
import { useStudioStore } from '@/lib/store'
import { cn } from '@/lib/utils'

interface StudioLayoutProps {
  children: React.ReactNode
}

export default function StudioLayout({ children }: StudioLayoutProps) {
  const { activeTab, setActiveTab, costSummary } = useStudioStore()

  const tabs = [
    { id: 'video' as const, name: 'Video Studio', icon: Video, description: 'Create UGC videos' },
    { id: 'image' as const, name: 'Image Studio', icon: ImageIcon, description: 'Generate images' },
    { id: 'library' as const, name: 'Media Library', icon: Library, description: 'View all content' },
    { id: 'settings' as const, name: 'Settings', icon: Settings, description: 'Avatar & LoRA' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
        <div className="max-w-[1920px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600 via-pink-600 to-rose-600 rounded-xl flex items-center justify-center shadow-lg">
                <Sparkles className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Sarah Rodriguez Studio
                </h1>
                <p className="text-sm text-gray-600">Professional AI Influencer Platform</p>
              </div>
            </div>

            {/* Cost Display */}
            <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg">
              <DollarSign className="w-5 h-5 text-green-600" />
              <div className="text-right">
                <div className="text-xs text-gray-600">Total Spend</div>
                <div className="text-lg font-bold text-green-700">
                  ${costSummary.total.toFixed(2)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-[1920px] mx-auto">
        <div className="flex">
          {/* Sidebar Navigation */}
          <aside className="w-64 bg-white border-r border-gray-200 min-h-[calc(100vh-73px)] p-4">
            <nav className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon
                const isActive = activeTab === tab.id

                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      'w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-left',
                      isActive
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                        : 'text-gray-700 hover:bg-gray-100'
                    )}
                  >
                    <Icon className="w-5 h-5" />
                    <div className="flex-1">
                      <div className="font-semibold">{tab.name}</div>
                      <div className={cn('text-xs', isActive ? 'text-purple-100' : 'text-gray-500')}>
                        {tab.description}
                      </div>
                    </div>
                  </button>
                )
              })}
            </nav>

            {/* Quick Stats */}
            <div className="mt-8 p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-200">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">This Month</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Videos</span>
                  <span className="font-semibold">${costSummary.byType.video.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Images</span>
                  <span className="font-semibold">${costSummary.byType.image.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Training</span>
                  <span className="font-semibold">${costSummary.byType.training.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 p-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}
