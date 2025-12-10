'use client'

import { useState } from 'react'
import { Download, Loader2, Play, CheckCircle2 } from 'lucide-react'
import { downloadVideo } from '@/lib/utils'

interface VideoPlayerProps {
  videoUrl: string | null
  isGenerating: boolean
}

export default function VideoPlayer({ videoUrl, isGenerating }: VideoPlayerProps) {
  const [downloading, setDownloading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleDownload = async () => {
    if (!videoUrl) return

    setDownloading(true)
    setError(null)

    try {
      const filename = `ugc-video-${Date.now()}.mp4`
      await downloadVideo(videoUrl, filename)
    } catch (err) {
      setError('Failed to download video')
      console.error('Download error:', err)
    } finally {
      setDownloading(false)
    }
  }

  if (isGenerating) {
    return (
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border-2 border-blue-200 p-12">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-6">
            <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Generating your video...
          </h3>
          <p className="text-gray-600">
            This may take a few moments. Please wait.
          </p>
        </div>
      </div>
    )
  }

  if (!videoUrl) {
    return (
      <div className="bg-gray-50 rounded-2xl border-2 border-dashed border-gray-300 p-12">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mb-6">
            <Play className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No video yet
          </h3>
          <p className="text-gray-600">
            Your generated video will appear here
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="relative rounded-2xl overflow-hidden border-2 border-gray-200 bg-black shadow-lg">
        <video
          src={videoUrl}
          controls
          className="w-full h-auto"
          style={{ maxHeight: '500px' }}
        >
          Your browser does not support the video tag.
        </video>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={handleDownload}
          disabled={downloading}
          className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-6 rounded-xl transition-colors shadow-md hover:shadow-lg"
        >
          {downloading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Downloading...
            </>
          ) : (
            <>
              <Download className="w-5 h-5" />
              Download Video
            </>
          )}
        </button>

        {!downloading && !error && (
          <div className="flex items-center gap-2 text-green-600 px-4">
            <CheckCircle2 className="w-5 h-5" />
            <span className="text-sm font-medium">Ready</span>
          </div>
        )}
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}
    </div>
  )
}
