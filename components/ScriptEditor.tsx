'use client'

import { useState } from 'react'
import { FileText, Sparkles, Copy, Check } from 'lucide-react'
import { SCRIPT_TEMPLATES } from '@/lib/studio-constants'
import { cn } from '@/lib/utils'

interface ScriptEditorProps {
  script: string
  onChange: (script: string) => void
}

export default function ScriptEditor({ script, onChange }: ScriptEditorProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)
  const [showTemplates, setShowTemplates] = useState(true)
  const [copied, setCopied] = useState(false)

  const handleTemplateSelect = (templateId: string) => {
    const template = SCRIPT_TEMPLATES.find((t) => t.id === templateId)
    if (template) {
      onChange(template.template)
      setSelectedTemplate(templateId)
      setShowTemplates(false)
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(script)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const selectedTemplateData = SCRIPT_TEMPLATES.find((t) => t.id === selectedTemplate)
  const characterCount = script.length
  const wordCount = script.trim().split(/\s+/).length

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Script</h3>
          <p className="text-sm text-gray-600">Choose template or write custom script</p>
        </div>
        <button
          onClick={() => setShowTemplates(!showTemplates)}
          className="flex items-center gap-2 px-3 py-2 text-sm bg-purple-100 text-purple-700 hover:bg-purple-200 rounded-lg transition-colors"
        >
          <Sparkles className="w-4 h-4" />
          {showTemplates ? 'Hide' : 'Show'} Templates
        </button>
      </div>

      {/* Script Templates */}
      {showTemplates && (
        <div className="grid grid-cols-1 gap-2 max-h-[300px] overflow-y-auto pr-2">
          {SCRIPT_TEMPLATES.map((template) => (
            <button
              key={template.id}
              onClick={() => handleTemplateSelect(template.id)}
              className={cn(
                'p-3 text-left border-2 rounded-lg transition-all duration-200',
                selectedTemplate === template.id
                  ? 'border-purple-500 bg-purple-50'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              )}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-gray-900 text-sm">{template.name}</h4>
                    <span className="px-2 py-0.5 text-xs font-medium bg-purple-100 text-purple-700 rounded-full">
                      {template.category}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600">{template.description}</p>
                  {template.variables.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {template.variables.map((variable) => (
                        <span
                          key={variable}
                          className="px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded"
                        >
                          {variable}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Script Editor */}
      <div className="bg-white rounded-xl border-2 border-gray-200 overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2 bg-gray-50 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">
              {selectedTemplateData?.name || 'Custom Script'}
            </span>
          </div>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 px-2 py-1 text-xs text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-3 h-3" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-3 h-3" />
                Copy
              </>
            )}
          </button>
        </div>
        <textarea
          value={script}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Write your script here..."
          className="w-full px-4 py-3 resize-none focus:outline-none font-mono text-sm"
          rows={12}
        />
        <div className="flex items-center justify-between px-4 py-2 bg-gray-50 border-t border-gray-200">
          <div className="flex items-center gap-4 text-xs text-gray-600">
            <span>{wordCount} words</span>
            <span>{characterCount} characters</span>
          </div>
          <div className={cn(
            'text-xs font-medium',
            characterCount > 500 ? 'text-red-600' : 'text-gray-600'
          )}>
            {characterCount > 500 && '⚠️ '}{500 - characterCount} remaining
          </div>
        </div>
      </div>

      {/* Variable Helper */}
      {selectedTemplateData && selectedTemplateData.variables.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <div className="flex items-start gap-2">
            <Sparkles className="w-4 h-4 text-blue-600 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-blue-900 mb-1">Template Variables</p>
              <p className="text-xs text-blue-700">
                Replace these placeholders: {selectedTemplateData.variables.map(v => `{${v}}`).join(', ')}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
