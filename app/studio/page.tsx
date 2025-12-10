'use client'

import { useState } from 'react'
import { Play, Loader2, AlertCircle } from 'lucide-react'
import StudioLayout from '@/components/StudioLayout'
import SceneBuilder from '@/components/SceneBuilder'
import ScriptEditor from '@/components/ScriptEditor'
import OutputPresets from '@/components/OutputPresets'
import { useStudioStore } from '@/lib/store'
import type { Scene, OutputFormat, VideoGenerationRequest } from '@/types/studio'

export default function StudioPage() {
  const { activeTab, avatarTraining, addVideoGeneration } = useStudioStore()

  // Video Studio State
  const [scene, setScene] = useState<Scene>({
    outfit: '',
    product: '',
    background: '',
    emotion: '',
  })
  const [script, setScript] = useState('')
  const [outputFormat, setOutputFormat] = useState<OutputFormat>('tiktok')
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const canGenerate = scene.outfit && scene.background && scene.emotion && script && avatarTraining?.avatarId

  const handleGenerate = async () => {
    if (!canGenerate || !avatarTraining?.avatarId) return

    setIsGenerating(true)
    setError(null)

    const request: VideoGenerationRequest = {
      avatarId: avatarTraining.avatarId,
      script,
      scene,
      outputFormat,
    }

    try {
      const response = await fetch('/api/studio/generate-video', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request),
      })

      const data = await response.json()

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to generate video')
      }

      // Add to store
      addVideoGeneration(data.data)

    } catch (err) {
      console.error('Generation error:', err)
      setError(err instanceof Error ? err.message : 'Failed to generate video')
    } finally {
      setIsGenerating(false)
    }
  }

  if (activeTab !== 'video') {
    return (
      <StudioLayout>
        <div className="text-center py-12">
          <p className="text-gray-600">Switch to Video Studio tab to create videos</p>
        </div>
      </StudioLayout>
    )
  }

  return (
    <StudioLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Video Studio</h2>
          <p className="text-gray-600">Create professional UGC videos with Sarah Rodriguez</p>
        </div>

        {/* Avatar Check */}
        {!avatarTraining?.avatarId && (
          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-yellow-900 mb-1">Avatar Not Trained</h4>
                <p className="text-sm text-yellow-700">
                  Please train Sarah's custom avatar in Settings before generating videos.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Scene Builder */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <SceneBuilder scene={scene} onChange={setScene} />
            </div>

            {/* Output Presets */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <OutputPresets selected={outputFormat} onChange={setOutputFormat} />
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Script Editor */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <ScriptEditor script={script} onChange={setScript} />
            </div>

            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              disabled={!canGenerate || isGenerating}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-gray-400 disabled:to-gray-400 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-3 disabled:cursor-not-allowed"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin" />
                  Generating Video...
                </>
              ) : (
                <>
                  <Play className="w-6 h-6" />
                  Generate UGC Video
                </>
              )}
            </button>

            {error && (
              <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-red-900 mb-1">Error</h4>
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </StudioLayout>
  )
}
