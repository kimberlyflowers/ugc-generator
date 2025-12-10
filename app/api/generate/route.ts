import { NextRequest, NextResponse } from 'next/server'
import { SCRIPT_TEMPLATES } from '@/lib/constants'
import type { VideoGenerationRequest, VideoGenerationResponse } from '@/types'

export async function POST(request: NextRequest) {
  try {
    const body: VideoGenerationRequest = await request.json()

    // Validate request
    if (!body.productImageUrl || !body.avatarId || !body.scriptTemplateId) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Check if NanoBanana API key is configured
    if (!process.env.NANOBANANA_API_KEY) {
      return NextResponse.json(
        {
          success: false,
          error: 'NanoBanana API is not configured. Please set NANOBANANA_API_KEY environment variable.'
        },
        { status: 500 }
      )
    }

    // Get the script template
    const template = SCRIPT_TEMPLATES.find((t) => t.id === body.scriptTemplateId)
    if (!template) {
      return NextResponse.json(
        { success: false, error: 'Invalid script template' },
        { status: 400 }
      )
    }

    const script = body.customScript || template.template

    // Call NanoBanana API
    // Note: This is a generic implementation. Adjust based on actual NanoBanana API documentation
    const nanobananaResponse = await fetch('https://api.nanobanana.ai/v1/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.NANOBANANA_API_KEY}`,
      },
      body: JSON.stringify({
        avatar_id: body.avatarId,
        script: script,
        product_image_url: body.productImageUrl,
        // Add other NanoBanana-specific parameters as needed
      }),
    })

    if (!nanobananaResponse.ok) {
      const errorData = await nanobananaResponse.json().catch(() => ({}))
      console.error('NanoBanana API error:', errorData)

      return NextResponse.json(
        {
          success: false,
          error: errorData.message || `NanoBanana API error: ${nanobananaResponse.status}`
        },
        { status: nanobananaResponse.status }
      )
    }

    const result = await nanobananaResponse.json()

    // Extract video URL from response
    // Adjust this based on actual NanoBanana API response format
    const videoUrl = result.video_url || result.url || result.data?.video_url

    if (!videoUrl) {
      // If the API returns a job ID for async processing
      if (result.job_id) {
        return NextResponse.json({
          success: true,
          jobId: result.job_id,
          error: 'Video generation started. Job ID returned but polling not implemented yet.'
        })
      }

      return NextResponse.json(
        { success: false, error: 'No video URL in response' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      videoUrl: videoUrl,
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
