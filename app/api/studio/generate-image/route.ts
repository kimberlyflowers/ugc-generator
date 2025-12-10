import { NextRequest, NextResponse } from 'next/server'
import Replicate from 'replicate'
import type { ImageGenerationRequest, ImageGeneration } from '@/types/studio'
import { COSTS } from '@/lib/studio-constants'

export async function POST(request: NextRequest) {
  try {
    const body: ImageGenerationRequest = await request.json()

    // Validate request
    if (!body.prompt || !body.loraModelId || !body.aspectRatio) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Check if Replicate API token is configured
    if (!process.env.REPLICATE_API_TOKEN) {
      return NextResponse.json(
        {
          success: false,
          error: 'Replicate API is not configured. Please set REPLICATE_API_TOKEN environment variable.'
        },
        { status: 500 }
      )
    }

    const replicate = new Replicate({
      auth: process.env.REPLICATE_API_TOKEN,
    })

    // Build the full prompt with scene description and LoRA trigger
    const scenePrompt = body.scene
      ? `${body.scene.outfit || ''} ${body.scene.product || ''} ${body.scene.background || ''} ${body.scene.emotion || ''}`.trim()
      : ''

    const fullPrompt = `${body.prompt} ${scenePrompt}, professional photography, high quality, 4K, detailed`.trim()

    // Map aspect ratio to dimensions
    const dimensionsMap: Record<string, { width: number; height: number }> = {
      '1:1': { width: 1024, height: 1024 },
      '9:16': { width: 768, height: 1344 },
      '16:9': { width: 1344, height: 768 },
      '4:5': { width: 896, height: 1120 },
    }

    const dimensions = dimensionsMap[body.aspectRatio] || dimensionsMap['1:1']

    /**
     * Flux Pro API via Replicate
     * Documentation: https://replicate.com/black-forest-labs/flux-pro
     *
     * Using custom LoRA for Sarah Rodriguez face consistency
     */
    const output = await replicate.run(
      "black-forest-labs/flux-pro" as any,
      {
        input: {
          prompt: fullPrompt,
          // If you have a trained LoRA model, specify it here
          // lora: body.loraModelId,
          width: dimensions.width,
          height: dimensions.height,
          num_outputs: 1,
          guidance_scale: 7.5,
          num_inference_steps: 50,
          aspect_ratio: body.aspectRatio,
        },
      }
    )

    // Extract image URL from output
    const imageUrl = Array.isArray(output) ? output[0] : output

    if (!imageUrl) {
      return NextResponse.json(
        { success: false, error: 'No image URL in response' },
        { status: 500 }
      )
    }

    // Calculate cost
    const cost = COSTS.REPLICATE.IMAGE_GENERATION * COSTS.REPLICATE.FLUX_PRO_MULTIPLIER

    // Create image generation record
    const imageGeneration: ImageGeneration = {
      id: `img_${Date.now()}`,
      status: 'completed',
      request: body,
      imageUrl: imageUrl as string,
      cost,
      createdAt: new Date(),
      completedAt: new Date(),
    }

    // In production, you would save this to your database

    return NextResponse.json({
      success: true,
      data: imageGeneration,
    })

  } catch (error) {
    console.error('Image generation error:', error)

    const errorMessage = error instanceof Error ? error.message : 'Image generation failed'

    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    )
  }
}

/**
 * LoRA Training Endpoint
 * Train custom Flux LoRA on Sarah's face for character consistency
 */
export async function PUT(request: NextRequest) {
  try {
    const { trainingImages, triggerWord } = await request.json()

    if (!trainingImages || trainingImages.length < 10) {
      return NextResponse.json(
        { success: false, error: 'Need at least 10 training images' },
        { status: 400 }
      )
    }

    if (!process.env.REPLICATE_API_TOKEN) {
      return NextResponse.json(
        { success: false, error: 'Replicate API not configured' },
        { status: 500 }
      )
    }

    const replicate = new Replicate({
      auth: process.env.REPLICATE_API_TOKEN,
    })

    /**
     * Train Flux LoRA
     * Documentation: https://replicate.com/ostris/flux-dev-lora-trainer
     */
    const training = await replicate.trainings.create(
      "ostris",
      "flux-dev-lora-trainer",
      "e440909d3512c31646ee2e0c7d6f6f4923224863a6a10c494606e79fb5844497",
      {
        destination: `${process.env.REPLICATE_USERNAME || 'your-username'}/sarah-rodriguez-lora`,
        input: {
          input_images: trainingImages.join('|'),
          trigger_word: triggerWord || 'sarah_rodriguez',
          steps: 1000,
          learning_rate: 0.0004,
        },
      }
    )

    const loraTraining = {
      id: training.id,
      status: training.status,
      createdAt: new Date(),
      cost: COSTS.REPLICATE.LORA_TRAINING,
    }

    return NextResponse.json({
      success: true,
      data: loraTraining,
    })

  } catch (error) {
    console.error('LoRA training error:', error)

    return NextResponse.json(
      { success: false, error: 'Failed to start LoRA training' },
      { status: 500 }
    )
  }
}
