'use client'

import { Check } from 'lucide-react'
import { OUTPUT_PRESETS } from '@/lib/studio-constants'
import { cn } from '@/lib/utils'
import type { OutputFormat } from '@/types/studio'

interface OutputPresetsProps {
  selected: OutputFormat
  onChange: (format: OutputFormat) => void
}

export default function OutputPresets({ selected, onChange }: OutputPresetsProps) {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-gray-900">Output Format</h3>
        <p className="text-sm text-gray-600">Choose platform and aspect ratio</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {OUTPUT_PRESETS.map((preset) => (
          <button
            key={preset.id}
            onClick={() => onChange(preset.id)}
            className={cn(
              'relative p-4 border-2 rounded-xl transition-all duration-200 text-left',
              selected === preset.id
                ? 'border-purple-500 bg-purple-50 shadow-lg'
                : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
            )}
          >
            {selected === preset.id && (
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center shadow-lg">
                <Check className="w-4 h-4 text-white" />
              </div>
            )}
            <div className="text-3xl mb-2">{preset.icon}</div>
            <h4 className="font-semibold text-gray-900 mb-1 text-sm">{preset.name}</h4>
            <p className="text-xs text-gray-600 mb-2">{preset.description}</p>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 text-xs font-medium bg-gray-100 text-gray-700 rounded">
                {preset.aspectRatio}
              </span>
              <span className="text-xs text-gray-500">{preset.resolution}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
