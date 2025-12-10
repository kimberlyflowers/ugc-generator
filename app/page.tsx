'use client'

import { useState } from 'react'
import { Sparkles, Video, AlertCircle } from 'lucide-react'
import DragDropUploader from '@/components/DragDropUploader'
import AvatarSelector from '@/components/AvatarSelector'
import ScriptTemplates from '@/components/ScriptTemplates'
import VideoPlayer from '@/components/VideoPlayer'
import type { VideoGenerationRequest, VideoGenerationResponse } from '@/types'

export default function Home() {
  const [productImageUrl, setProductImageUrl] = useState<string | null>(null)
  const [selectedAvatarId, setSelectedAvatarId] = useState<string | null>('sarah-rodriguez')
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null)
  const [generatedVideoUrl, setGeneratedVideoUrl] = useState<string | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const canGenerate = productImageUrl && selectedAvatarId && selectedTemplateId

  const handleGenerateVideo = async () => {
    if (!canGenerate) return

    setIsGenerating(true)
    setError(null)
    setGeneratedVideoUrl(null)

    const request: VideoGenerationRequest = {
      productImageUrl: productImageUrl,
      avatarId: selectedAvatarId,
      scriptTemplateId: selectedTemplateId,
    }

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      })

      const data: VideoGenerationResponse = await response.json()

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to generate video')
      }

      if (data.videoUrl) {
        setGeneratedVideoUrl(data.videoUrl)
      }
    } catch (err) {
      console.error('Generation error:', err)
      setError(err instanceof Error ? err.message : 'Failed to generate video')
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
              <Video className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">UGC Video Generator</h1>
              <p className="text-sm text-gray-600">Create authentic UGC videos with AI avatars</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Inputs */}
          <div className="space-y-6">
            {/* Step 1: Upload */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                  1
                </div>
                <h2 className="text-xl font-semibold text-gray-900">Upload Product Image</h2>
              </div>
              <DragDropUploader
                onUploadComplete={setProductImageUrl}
                onUploadError={setError}
              />
            </div>

            {/* Step 2: Avatar */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                  2
                </div>
                <h2 className="text-xl font-semibold text-gray-900">Select Avatar</h2>
              </div>
              <AvatarSelector
                selectedAvatarId={selectedAvatarId}
                onSelect={setSelectedAvatarId}
              />
            </div>

            {/* Step 3: Script */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                  3
                </div>
                <h2 className="text-xl font-semibold text-gray-900">Choose Script Template</h2>
              </div>
              <ScriptTemplates
                selectedTemplateId={selectedTemplateId}
                onSelect={setSelectedTemplateId}
              />
            </div>

            {/* Generate Button */}
            <button
              onClick={handleGenerateVideo}
              disabled={!canGenerate || isGenerating}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-400 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-3 disabled:cursor-not-allowed"
            >
              <Sparkles className="w-6 h-6" />
              {isGenerating ? 'Generating Video...' : 'Generate UGC Video'}
            </button>

            {error && (
              <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-red-900 mb-1">Error</h4>
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Video Preview */}
          <div className="lg:sticky lg:top-8 h-fit">
            <div className="bg-white rounded-2xl shadow-md p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                  4
                </div>
                <h2 className="text-xl font-semibold text-gray-900">Generated Video</h2>
              </div>
              <VideoPlayer videoUrl={generatedVideoUrl} isGenerating={isGenerating} />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-16 py-8 border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-gray-600">
          <p>Powered by NanoBanana AI • Create authentic UGC videos in minutes</p>
        </div>
      </footer>
    </div>
  )
}
