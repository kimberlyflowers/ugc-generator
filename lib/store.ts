import { create } from 'zustand'
import type {
  MediaItem,
  VideoGeneration,
  ImageGeneration,
  BatchJob,
  AvatarTraining,
  LoRATraining,
  CostSummary,
} from '@/types/studio'

interface StudioStore {
  // Avatar & LoRA Training
  avatarTraining: AvatarTraining | null
  loraTraining: LoRATraining | null
  setAvatarTraining: (training: AvatarTraining | null) => void
  setLoraTraining: (training: LoRATraining | null) => void

  // Media Library
  mediaItems: MediaItem[]
  addMediaItem: (item: MediaItem) => void
  removeMediaItem: (id: string) => void

  // Active Jobs
  videoGenerations: VideoGeneration[]
  imageGenerations: ImageGeneration[]
  batchJobs: BatchJob[]
  addVideoGeneration: (video: VideoGeneration) => void
  updateVideoGeneration: (id: string, updates: Partial<VideoGeneration>) => void
  addImageGeneration: (image: ImageGeneration) => void
  updateImageGeneration: (id: string, updates: Partial<ImageGeneration>) => void
  addBatchJob: (job: BatchJob) => void
  updateBatchJob: (id: string, updates: Partial<BatchJob>) => void

  // Cost Tracking
  costSummary: CostSummary
  updateCostSummary: (summary: CostSummary) => void

  // UI State
  activeTab: 'video' | 'image' | 'library' | 'settings'
  setActiveTab: (tab: 'video' | 'image' | 'library' | 'settings') => void
}

export const useStudioStore = create<StudioStore>((set) => ({
  // Avatar & LoRA Training
  avatarTraining: null,
  loraTraining: null,
  setAvatarTraining: (training) => set({ avatarTraining: training }),
  setLoraTraining: (training) => set({ loraTraining: training }),

  // Media Library
  mediaItems: [],
  addMediaItem: (item) =>
    set((state) => ({ mediaItems: [item, ...state.mediaItems] })),
  removeMediaItem: (id) =>
    set((state) => ({
      mediaItems: state.mediaItems.filter((item) => item.id !== id),
    })),

  // Active Jobs
  videoGenerations: [],
  imageGenerations: [],
  batchJobs: [],
  addVideoGeneration: (video) =>
    set((state) => ({ videoGenerations: [video, ...state.videoGenerations] })),
  updateVideoGeneration: (id, updates) =>
    set((state) => ({
      videoGenerations: state.videoGenerations.map((v) =>
        v.id === id ? { ...v, ...updates } : v
      ),
    })),
  addImageGeneration: (image) =>
    set((state) => ({ imageGenerations: [image, ...state.imageGenerations] })),
  updateImageGeneration: (id, updates) =>
    set((state) => ({
      imageGenerations: state.imageGenerations.map((i) =>
        i.id === id ? { ...i, ...updates } : i
      ),
    })),
  addBatchJob: (job) =>
    set((state) => ({ batchJobs: [job, ...state.batchJobs] })),
  updateBatchJob: (id, updates) =>
    set((state) => ({
      batchJobs: state.batchJobs.map((j) =>
        j.id === id ? { ...j, ...updates } : j
      ),
    })),

  // Cost Tracking
  costSummary: {
    total: 0,
    byType: { video: 0, image: 0, training: 0 },
    byProvider: { heygen: 0, replicate: 0 },
    byMonth: [],
  },
  updateCostSummary: (summary) => set({ costSummary: summary }),

  // UI State
  activeTab: 'video',
  setActiveTab: (tab) => set({ activeTab: tab }),
}))
