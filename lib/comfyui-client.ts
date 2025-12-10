import type {
  ComfyUIWorkflowParams,
  ComfyUIJobRequest,
  ComfyUIJobResponse,
  ComfyUIHistory,
  WorkflowType,
} from '@/types/comfyui'

/**
 * ComfyUI Client
 * Handles communication with ComfyUI backend on RunPod/Vast.ai
 */
export class ComfyUIClient {
  private baseUrl: string
  private clientId: string

  constructor(baseUrl?: string) {
    this.baseUrl = baseUrl || process.env.COMFYUI_API_URL || 'http://localhost:8188'
    this.clientId = `sarah_studio_${Date.now()}`
  }

  /**
   * Queue a workflow prompt
   */
  async queuePrompt(workflow: Record<string, any>): Promise<ComfyUIJobResponse> {
    const request: ComfyUIJobRequest = {
      client_id: this.clientId,
      prompt: workflow,
    }

    const response = await fetch(`${this.baseUrl}/prompt`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    })

    if (!response.ok) {
      throw new Error(`ComfyUI queue failed: ${response.statusText}`)
    }

    return response.json()
  }

  /**
   * Get job history and outputs
   */
  async getHistory(promptId: string): Promise<ComfyUIHistory> {
    const response = await fetch(`${this.baseUrl}/history/${promptId}`)

    if (!response.ok) {
      throw new Error(`Failed to get history: ${response.statusText}`)
    }

    return response.json()
  }

  /**
   * Check if job is complete
   */
  async isJobComplete(promptId: string): Promise<boolean> {
    const history = await this.getHistory(promptId)
    const job = history[promptId]

    return job?.status?.completed || false
  }

  /**
   * Get output files from completed job
   */
  async getOutputs(promptId: string): Promise<string[]> {
    const history = await this.getHistory(promptId)
    const job = history[promptId]

    if (!job || !job.outputs) {
      return []
    }

    const outputs: string[] = []

    for (const nodeId in job.outputs) {
      const output = job.outputs[nodeId]

      // Get images
      if (output.images) {
        for (const image of output.images) {
          const url = `${this.baseUrl}/view?filename=${encodeURIComponent(image.filename)}&subfolder=${encodeURIComponent(image.subfolder || '')}&type=${image.type}`
          outputs.push(url)
        }
      }

      // Get videos
      if (output.videos) {
        for (const video of output.videos) {
          const url = `${this.baseUrl}/view?filename=${encodeURIComponent(video.filename)}&subfolder=${encodeURIComponent(video.subfolder || '')}&type=${video.type}`
          outputs.push(url)
        }
      }
    }

    return outputs
  }

  /**
   * Upload image to ComfyUI
   */
  async uploadImage(file: File | Blob, filename?: string): Promise<string> {
    const formData = new FormData()
    formData.append('image', file, filename || 'upload.png')

    const response = await fetch(`${this.baseUrl}/upload/image`, {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) {
      throw new Error(`Upload failed: ${response.statusText}`)
    }

    const data = await response.json()
    return data.name
  }

  /**
   * Generate workflow JSON for different types
   */
  generateWorkflow(params: ComfyUIWorkflowParams): Record<string, any> {
    switch (params.workflow) {
      case 'talking_head':
        return this.buildTalkingHeadWorkflow(params)
      case 'lifestyle':
        return this.buildLifestyleWorkflow(params)
      case 'product':
        return this.buildProductWorkflow(params)
      case 'still_image':
        return this.buildStillImageWorkflow(params)
      default:
        throw new Error(`Unknown workflow type: ${params.workflow}`)
    }
  }

  /**
   * Build Talking Head workflow (with lip sync)
   */
  private buildTalkingHeadWorkflow(params: ComfyUIWorkflowParams): Record<string, any> {
    const prompt = `${params.prompt}, Sarah Rodriguez wearing ${params.outfit}, ${params.background}, ${params.emotion}, professional video, high quality`

    return {
      "1": {
        "inputs": {
          "text": prompt,
          "clip": ["4", 0]
        },
        "class_type": "CLIPTextEncode"
      },
      "2": {
        "inputs": {
          "seed": params.seed || Math.floor(Math.random() * 1000000),
          "steps": params.steps || 30,
          "cfg": 7.5,
          "sampler_name": "euler_ancestral",
          "scheduler": "normal",
          "denoise": 1,
          "model": ["4", 0],
          "positive": ["1", 0],
          "negative": ["3", 0],
          "latent_image": ["5", 0]
        },
        "class_type": "KSampler"
      },
      "3": {
        "inputs": {
          "text": "ugly, deformed, noisy, blurry, low quality",
          "clip": ["4", 0]
        },
        "class_type": "CLIPTextEncode"
      },
      "4": {
        "inputs": {
          "lora_name": "sarah_rodriguez.safetensors",
          "strength_model": 1.0,
          "strength_clip": 1.0,
          "model": ["10", 0],
          "clip": ["10", 1]
        },
        "class_type": "LoraLoader"
      },
      "5": {
        "inputs": {
          "width": params.aspectRatio === '9:16' ? 768 : 1024,
          "height": params.aspectRatio === '9:16' ? 1344 : 1024,
          "batch_size": 1
        },
        "class_type": "EmptyLatentImage"
      },
      "10": {
        "inputs": {
          "ckpt_name": "flux_dev.safetensors"
        },
        "class_type": "CheckpointLoaderSimple"
      },
      // Add AnimateDiff, Wav2Lip, and LivePortrait nodes here
      // This is a simplified version - full workflow would include:
      // - Audio generation (ElevenLabs)
      // - Facial animation (LivePortrait)
      // - Lip sync (Wav2Lip)
      // - Motion (AnimateDiff)
    }
  }

  /**
   * Build Lifestyle workflow
   */
  private buildLifestyleWorkflow(params: ComfyUIWorkflowParams): Record<string, any> {
    // Similar structure with SVD and motion nodes
    return this.buildStillImageWorkflow(params) // Placeholder
  }

  /**
   * Build Product workflow
   */
  private buildProductWorkflow(params: ComfyUIWorkflowParams): Record<string, any> {
    const prompt = `${params.prompt}, Sarah Rodriguez wearing ${params.outfit}, holding ${params.product}, ${params.background}, ${params.emotion}, product photography, professional`

    return this.buildStillImageWorkflow({ ...params, prompt })
  }

  /**
   * Build Still Image workflow
   */
  private buildStillImageWorkflow(params: ComfyUIWorkflowParams): Record<string, any> {
    const prompt = `${params.prompt}, Sarah Rodriguez wearing ${params.outfit}, ${params.background}, ${params.emotion}, professional photography, high quality, 4K`

    return {
      "1": {
        "inputs": {
          "text": prompt,
          "clip": ["4", 0]
        },
        "class_type": "CLIPTextEncode"
      },
      "2": {
        "inputs": {
          "seed": params.seed || Math.floor(Math.random() * 1000000),
          "steps": params.steps || 30,
          "cfg": 7.5,
          "sampler_name": "euler_ancestral",
          "scheduler": "normal",
          "denoise": 1,
          "model": ["4", 0],
          "positive": ["1", 0],
          "negative": ["3", 0],
          "latent_image": ["5", 0]
        },
        "class_type": "KSampler"
      },
      "3": {
        "inputs": {
          "text": "ugly, deformed, noisy, blurry, low quality, watermark, text",
          "clip": ["4", 0]
        },
        "class_type": "CLIPTextEncode"
      },
      "4": {
        "inputs": {
          "lora_name": "sarah_rodriguez.safetensors",
          "strength_model": 1.0,
          "strength_clip": 1.0,
          "model": ["10", 0],
          "clip": ["10", 1]
        },
        "class_type": "LoraLoader"
      },
      "5": {
        "inputs": {
          "width": params.aspectRatio === '9:16' ? 768 : params.aspectRatio === '16:9' ? 1344 : 1024,
          "height": params.aspectRatio === '9:16' ? 1344 : params.aspectRatio === '16:9' ? 768 : 1024,
          "batch_size": 1
        },
        "class_type": "EmptyLatentImage"
      },
      "6": {
        "inputs": {
          "samples": ["2", 0],
          "vae": ["10", 2]
        },
        "class_type": "VAEDecode"
      },
      "7": {
        "inputs": {
          "filename_prefix": "sarah_studio",
          "images": ["6", 0]
        },
        "class_type": "SaveImage"
      },
      "10": {
        "inputs": {
          "ckpt_name": "flux_dev.safetensors"
        },
        "class_type": "CheckpointLoaderSimple"
      }
    }
  }
}

/**
 * Poll job until complete with timeout
 */
export async function pollJobUntilComplete(
  client: ComfyUIClient,
  promptId: string,
  maxWaitMs: number = 300000, // 5 minutes default
  pollIntervalMs: number = 2000
): Promise<string[]> {
  const startTime = Date.now()

  while (Date.now() - startTime < maxWaitMs) {
    const isComplete = await client.isJobComplete(promptId)

    if (isComplete) {
      return await client.getOutputs(promptId)
    }

    await new Promise(resolve => setTimeout(resolve, pollIntervalMs))
  }

  throw new Error('Job timeout')
}
