import { NextRequest, NextResponse } from 'next/server'
import type { VideoGenerationRequest, VideoGeneration } from '@/types/studio'
import { COSTS } from '@/lib/studio-constants'

export async function POST(request: NextRequest) {
  try {
    const body: VideoGenerationRequest = await request.json()

    // Validate request
    if (!body.avatarId || !body.script || !body.scene || !body.outputFormat) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Check if HeyGen API key is configured
    if (!process.env.HEYGEN_API_KEY) {
      return NextResponse.json(
        {
          success: false,
          error: 'HeyGen API is not configured. Please set HEYGEN_API_KEY environment variable.'
        },
        { status: 500 }
      )
    }

    // Build prompt for HeyGen
    const sceneDescription = `${body.scene.outfit}, ${body.scene.product}, ${body.scene.background}, ${body.scene.emotion}`

    // Calculate estimated cost
    const estimatedDuration = Math.ceil(body.script.split(' ').length / 150) // ~150 words per minute
    const estimatedCost = COSTS.HEYGEN.VIDEO_BASE + (estimatedDuration * COSTS.HEYGEN.VIDEO_PER_MINUTE)

    // Get aspect ratio from output format
    const aspectRatioMap: Record<string, string> = {
      'tiktok': '9:16',
      'reels': '9:16',
      'shorts': '9:16',
      'feed': '1:1',
      'story': '9:16',
    }

    const aspectRatio = aspectRatioMap[body.outputFormat] || '9:16'

    /**
     * HeyGen API Integration
     * Documentation: https://docs.heygen.com/reference/create-an-avatar-video-v2
     *
     * Example Request:
     */
    const heygenResponse = await fetch('https://api.heygen.com/v2/video/generate', {
      method: 'POST',
      headers: {
        'X-Api-Key': process.env.HEYGEN_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        video_inputs: [
          {
            character: {
              type: 'avatar',
              avatar_id: body.avatarId,
              avatar_style: 'normal',
            },
            voice: {
              type: 'text',
              input_text: body.script,
              voice_id: body.voiceId || 'default', // Use custom voice ID if provided
            },
            background: {
              type: 'image',
              url: sceneDescription, // Or use actual background image URL
            },
          },
        ],
        dimension: {
          width: aspectRatio === '9:16' ? 1080 : 1080,
          height: aspectRatio === '9:16' ? 1920 : 1080,
        },
        aspect_ratio: aspectRatio,
        test: process.env.NODE_ENV !== 'production', // Use test mode in development
      }),
    })

    if (!heygenResponse.ok) {
      const errorData = await heygenResponse.json().catch(() => ({}))
      console.error('HeyGen API error:', errorData)

      return NextResponse.json(
        {
          success: false,
          error: errorData.message || `HeyGen API error: ${heygenResponse.status}`
        },
        { status: heygenResponse.status }
      )
    }

    const result = await heygenResponse.json()

    // Create video generation record
    const videoGeneration: VideoGeneration = {
      id: result.video_id || `vid_${Date.now()}`,
      status: 'processing',
      request: body,
      cost: estimatedCost,
      createdAt: new Date(),
    }

    // In production, you would:
    // 1. Save this to your database
    // 2. Set up a webhook to receive completion notification from HeyGen
    // 3. Poll the status endpoint if needed
    // 4. Update the record when video is complete

    // For now, return the initial generation record
    return NextResponse.json({
      success: true,
      data: videoGeneration,
      message: 'Video generation started. You will be notified when complete.',
    })

  } catch (error) {
    console.error('Video generation error:', error)

    const errorMessage = error instanceof Error ? error.message : 'Video generation failed'

    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    )
  }
}

/**
 * GET endpoint to check video status
 * Call HeyGen's status endpoint to check if video is ready
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const videoId = searchParams.get('videoId')

  if (!videoId) {
    return NextResponse.json(
      { success: false, error: 'Missing videoId parameter' },
      { status: 400 }
    )
  }

  if (!process.env.HEYGEN_API_KEY) {
    return NextResponse.json(
      { success: false, error: 'HeyGen API not configured' },
      { status: 500 }
    )
  }

  try {
    const response = await fetch(`https://api.heygen.com/v1/video_status.get?video_id=${videoId}`, {
      headers: {
        'X-Api-Key': process.env.HEYGEN_API_KEY,
      },
    })

    const data = await response.json()

    return NextResponse.json({
      success: true,
      data: {
        status: data.status,
        videoUrl: data.video_url,
        thumbnailUrl: data.thumbnail_url,
        duration: data.duration,
      },
    })

  } catch (error) {
    console.error('Status check error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to check video status' },
      { status: 500 }
    )
  }
}
