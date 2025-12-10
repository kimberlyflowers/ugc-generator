export interface Avatar {
  id: string
  name: string
  image: string
  description: string
}

export interface ScriptTemplate {
  id: string
  name: string
  description: string
  template: string
  category: string
}

export interface VideoGenerationRequest {
  productImageUrl: string
  avatarId: string
  scriptTemplateId: string
  customScript?: string
}

export interface VideoGenerationResponse {
  success: boolean
  videoUrl?: string
  error?: string
  jobId?: string
}

export interface UploadResponse {
  success: boolean
  url?: string
  error?: string
}
