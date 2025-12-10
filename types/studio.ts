// Avatar & Training
export interface AvatarTraining {
  id: string
  status: 'pending' | 'training' | 'completed' | 'failed'
  trainingImages: string[]
  avatarId?: string
  createdAt: Date
  completedAt?: Date
}

// Scene Builder
export interface Scene {
  outfit: string
  product: string
  background: string
  emotion: string
  lighting?: string
  pose?: string
}

export interface ScenePreset {
  id: string
  name: string
  description: string
  scene: Scene
  thumbnail?: string
}

// Video Generation
export interface VideoGenerationRequest {
  avatarId: string
  script: string
  scene: Scene
  outputFormat: OutputFormat
  voiceId?: string
}

export interface VideoGeneration {
  id: string
  status: 'queued' | 'processing' | 'completed' | 'failed'
  request: VideoGenerationRequest
  videoUrl?: string
  thumbnailUrl?: string
  duration?: number
  cost: number
  createdAt: Date
  completedAt?: Date
  error?: string
}

// Image Generation
export interface ImageGenerationRequest {
  prompt: string
  loraModelId: string
  aspectRatio: '1:1' | '9:16' | '16:9' | '4:5'
  scene: Partial<Scene>
  style?: string
}

export interface ImageGeneration {
  id: string
  status: 'queued' | 'processing' | 'completed' | 'failed'
  request: ImageGenerationRequest
  imageUrl?: string
  cost: number
  createdAt: Date
  completedAt?: Date
  error?: string
}

// LoRA Training
export interface LoRATraining {
  id: string
  status: 'pending' | 'training' | 'completed' | 'failed'
  trainingImages: string[]
  loraModelId?: string
  triggerWord: string
  createdAt: Date
  completedAt?: Date
  cost: number
}

// Output Formats
export type OutputFormat = 'tiktok' | 'reels' | 'shorts' | 'feed' | 'story'

export interface OutputPreset {
  id: OutputFormat
  name: string
  aspectRatio: string
  resolution: string
  description: string
  icon: string
}

// Script Templates
export interface ScriptTemplate {
  id: string
  name: string
  category: 'bloom' | 'product-review' | 'tutorial' | 'lifestyle' | 'testimonial'
  template: string
  variables: string[]
  description: string
}

// Batch Generation
export interface BatchJob {
  id: string
  type: 'video' | 'image'
  status: 'pending' | 'running' | 'completed' | 'failed'
  total: number
  completed: number
  failed: number
  items: (VideoGeneration | ImageGeneration)[]
  createdAt: Date
  completedAt?: Date
  totalCost: number
}

// Media Library
export interface MediaItem {
  id: string
  type: 'video' | 'image'
  url: string
  thumbnailUrl?: string
  metadata: {
    format: OutputFormat | string
    scene?: Scene
    script?: string
    duration?: number
    dimensions?: { width: number; height: number }
  }
  tags: string[]
  cost: number
  createdAt: Date
}

// Cost Tracking
export interface CostRecord {
  id: string
  type: 'video' | 'image' | 'avatar-training' | 'lora-training'
  itemId: string
  amount: number
  provider: 'heygen' | 'replicate'
  createdAt: Date
}

export interface CostSummary {
  total: number
  byType: {
    video: number
    image: number
    training: number
  }
  byProvider: {
    heygen: number
    replicate: number
  }
  byMonth: { month: string; amount: number }[]
}

// API Responses
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

// HeyGen API Types
export interface HeyGenAvatarResponse {
  avatar_id: string
  avatar_name: string
  preview_image_url: string
  preview_video_url: string
}

export interface HeyGenVideoResponse {
  video_id: string
  status: string
  video_url?: string
  thumbnail_url?: string
  duration?: number
}

// Replicate API Types
export interface ReplicateLoRAResponse {
  id: string
  version: string
  status: 'starting' | 'processing' | 'succeeded' | 'failed'
  output?: string
}

export interface ReplicateImageResponse {
  id: string
  status: 'starting' | 'processing' | 'succeeded' | 'failed'
  output?: string[]
}
