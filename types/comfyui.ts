// ComfyUI Workflow Types
export type WorkflowType = 'talking_head' | 'lifestyle' | 'product' | 'still_image'

export interface ComfyUIWorkflowParams {
  workflow: WorkflowType
  prompt: string
  script?: string
  outfit: string
  background: string
  product?: string
  emotion: string
  aspectRatio: '1:1' | '9:16' | '16:9' | '4:5'
  seed?: number
  steps?: number
}

export interface ComfyUIJobRequest {
  client_id: string
  prompt: Record<string, any> // ComfyUI workflow JSON
}

export interface ComfyUIJobResponse {
  prompt_id: string
  number: number
  node_errors?: Record<string, any>
}

export interface ComfyUIHistoryItem {
  prompt: any[]
  outputs: Record<string, {
    images?: Array<{
      filename: string
      subfolder: string
      type: string
    }>
    videos?: Array<{
      filename: string
      subfolder: string
      type: string
    }>
  }>
  status: {
    status_str: 'success' | 'error'
    completed: boolean
    messages?: any[]
  }
}

export interface ComfyUIHistory {
  [prompt_id: string]: ComfyUIHistoryItem
}

// Workflow Templates
export interface WorkflowTemplate {
  id: WorkflowType
  name: string
  description: string
  estimatedDuration: number // seconds
  costPerGeneration: number // USD
  models: string[]
  nodes: string[]
}

export const WORKFLOW_TEMPLATES: WorkflowTemplate[] = [
  {
    id: 'talking_head',
    name: 'Talking Head',
    description: 'Sarah speaking to camera with lip sync',
    estimatedDuration: 30,
    costPerGeneration: 0.15,
    models: ['Flux Dev', 'Sarah LoRA', 'AnimateDiff', 'Wav2Lip', 'LivePortrait'],
    nodes: ['LoadImage', 'FluxLoRA', 'AnimateDiff', 'Wav2Lip', 'VideoOutput'],
  },
  {
    id: 'lifestyle',
    name: 'Lifestyle',
    description: 'Casual scenes with natural movement',
    estimatedDuration: 45,
    costPerGeneration: 0.30,
    models: ['Flux Dev', 'Sarah LoRA', 'Stable Video Diffusion', 'AnimateDiff'],
    nodes: ['LoadImage', 'FluxLoRA', 'SVD', 'VideoOutput'],
  },
  {
    id: 'product',
    name: 'Product Showcase',
    description: 'Sarah holding and presenting products',
    estimatedDuration: 35,
    costPerGeneration: 0.20,
    models: ['Flux Dev', 'Sarah LoRA', 'ControlNet', 'AnimateDiff'],
    nodes: ['LoadImage', 'FluxLoRA', 'ControlNet', 'ProductComposite', 'VideoOutput'],
  },
  {
    id: 'still_image',
    name: 'Still Image',
    description: 'High-quality images for Instagram',
    estimatedDuration: 15,
    costPerGeneration: 0.05,
    models: ['Flux Dev', 'Sarah LoRA'],
    nodes: ['LoadImage', 'FluxLoRA', 'ImageOutput'],
  },
]

// ElevenLabs Integration
export interface ElevenLabsVoiceRequest {
  text: string
  voice_id: string
  model_id?: string
  voice_settings?: {
    stability: number
    similarity_boost: number
  }
}

export interface ElevenLabsVoiceResponse {
  audio_url: string
  duration: number
}
