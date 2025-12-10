import { NextRequest, NextResponse } from 'next/server'
import { ComfyUIClient, pollJobUntilComplete } from '@/lib/comfyui-client'
import type { ComfyUIWorkflowParams, WorkflowType } from '@/types/comfyui'
import { WORKFLOW_TEMPLATES } from '@/types/comfyui'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const { workflow, prompt, script, scene, outputFormat } = body

    // Validate required fields
    if (!workflow || !prompt || !scene) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Check ComfyUI configuration
    if (!process.env.COMFYUI_API_URL) {
      return NextResponse.json(
        {
          success: false,
          error: 'ComfyUI backend not configured. Please set COMFYUI_API_URL environment variable.'
        },
        { status: 500 }
      )
    }

    // Map output format to aspect ratio
    const aspectRatioMap: Record<string, '1:1' | '9:16' | '16:9' | '4:5'> = {
      'tiktok': '9:16',
      'reels': '9:16',
      'shorts': '9:16',
      'feed': '1:1',
      'story': '9:16',
    }

    const params: ComfyUIWorkflowParams = {
      workflow: workflow as WorkflowType,
      prompt: prompt,
      script: script,
      outfit: scene.outfit || 'casual outfit',
      background: scene.background || 'modern interior',
      product: scene.product,
      emotion: scene.emotion || 'happy and confident',
      aspectRatio: aspectRatioMap[outputFormat] || '9:16',
    }

    // Initialize ComfyUI client
    const client = new ComfyUIClient(process.env.COMFYUI_API_URL)

    // Generate workflow JSON
    const workflowJson = client.generateWorkflow(params)

    // Queue the prompt
    const queueResponse = await client.queuePrompt(workflowJson)

    if (queueResponse.node_errors) {
      console.error('ComfyUI node errors:', queueResponse.node_errors)
      return NextResponse.json(
        {
          success: false,
          error: 'Workflow has errors',
          details: queueResponse.node_errors
        },
        { status: 500 }
      )
    }

    const promptId = queueResponse.prompt_id

    // For quick jobs (images), wait for completion
    // For longer jobs (videos), return promptId for polling
    const workflowTemplate = WORKFLOW_TEMPLATES.find(t => t.id === workflow)
    const shouldWait = workflowTemplate && workflowTemplate.estimatedDuration < 60

    if (shouldWait) {
      try {
        const outputs = await pollJobUntilComplete(client, promptId, 120000) // 2 min max for images

        return NextResponse.json({
          success: true,
          promptId,
          status: 'completed',
          outputs,
          cost: workflowTemplate?.costPerGeneration || 0.10,
        })
      } catch (error) {
        // If polling times out, return promptId for manual checking
        return NextResponse.json({
          success: true,
          promptId,
          status: 'processing',
          message: 'Generation in progress. Use /api/studio/comfyui-status to check status.',
        })
      }
    }

    // Return promptId for async jobs
    return NextResponse.json({
      success: true,
      promptId,
      status: 'queued',
      estimatedDuration: workflowTemplate?.estimatedDuration || 60,
      cost: workflowTemplate?.costPerGeneration || 0.15,
      message: 'Job queued. Use /api/studio/comfyui-status to check status.',
    })

  } catch (error) {
    console.error('ComfyUI generation error:', error)

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Generation failed'
      },
      { status: 500 }
    )
  }
}

/**
 * Check job status
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const promptId = searchParams.get('promptId')

  if (!promptId) {
    return NextResponse.json(
      { success: false, error: 'Missing promptId parameter' },
      { status: 400 }
    )
  }

  if (!process.env.COMFYUI_API_URL) {
    return NextResponse.json(
      { success: false, error: 'ComfyUI backend not configured' },
      { status: 500 }
    )
  }

  try {
    const client = new ComfyUIClient(process.env.COMFYUI_API_URL)

    const isComplete = await client.isJobComplete(promptId)

    if (isComplete) {
      const outputs = await client.getOutputs(promptId)

      return NextResponse.json({
        success: true,
        status: 'completed',
        outputs,
      })
    }

    return NextResponse.json({
      success: true,
      status: 'processing',
    })

  } catch (error) {
    console.error('Status check error:', error)

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Status check failed'
      },
      { status: 500 }
    )
  }
}
