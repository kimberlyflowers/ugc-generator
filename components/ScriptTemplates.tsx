'use client'

import { useState } from 'react'
import { Check, ChevronDown, ChevronUp } from 'lucide-react'
import { cn } from '@/lib/utils'
import { SCRIPT_TEMPLATES } from '@/lib/constants'
import type { ScriptTemplate } from '@/types'

interface ScriptTemplatesProps {
  selectedTemplateId: string | null
  onSelect: (templateId: string) => void
}

export default function ScriptTemplates({ selectedTemplateId, onSelect }: ScriptTemplatesProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const toggleExpand = (templateId: string) => {
    setExpandedId(expandedId === templateId ? null : templateId)
  }

  const categories = Array.from(new Set(SCRIPT_TEMPLATES.map((t) => t.category)))

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Script Templates</h3>
        <span className="text-sm text-gray-500">
          {SCRIPT_TEMPLATES.length} templates
        </span>
      </div>

      <div className="space-y-2">
        {SCRIPT_TEMPLATES.map((template) => (
          <div
            key={template.id}
            className={cn(
              'border-2 rounded-xl transition-all duration-200 overflow-hidden',
              selectedTemplateId === template.id
                ? 'border-blue-500 bg-blue-50 shadow-md'
                : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
            )}
          >
            <button
              onClick={() => onSelect(template.id)}
              className="w-full flex items-center justify-between p-4 text-left"
            >
              <div className="flex items-center gap-3 flex-1">
                <div
                  className={cn(
                    'w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors flex-shrink-0',
                    selectedTemplateId === template.id
                      ? 'border-blue-500 bg-blue-500'
                      : 'border-gray-300'
                  )}
                >
                  {selectedTemplateId === template.id && (
                    <Check className="w-3 h-3 text-white" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-gray-900">{template.name}</h4>
                    <span className="px-2 py-0.5 text-xs font-medium bg-gray-100 text-gray-600 rounded-full">
                      {template.category}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{template.description}</p>
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  toggleExpand(template.id)
                }}
                className="ml-2 p-1 hover:bg-gray-100 rounded-lg transition-colors"
              >
                {expandedId === template.id ? (
                  <ChevronUp className="w-5 h-5 text-gray-600" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-600" />
                )}
              </button>
            </button>

            {expandedId === template.id && (
              <div className="px-4 pb-4 pt-2 border-t border-gray-200">
                <p className="text-sm text-gray-700 leading-relaxed italic">
                  "{template.template}"
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
