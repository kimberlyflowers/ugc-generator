'use client'

import { useState, useCallback } from 'react'
import { Upload, X, Image as ImageIcon, Loader2 } from 'lucide-react'
import { cn, formatFileSize } from '@/lib/utils'
import { MAX_FILE_SIZE, ACCEPTED_IMAGE_TYPES } from '@/lib/constants'

interface DragDropUploaderProps {
  onUploadComplete: (url: string) => void
  onUploadStart?: () => void
  onUploadError?: (error: string) => void
}

export default function DragDropUploader({
  onUploadComplete,
  onUploadStart,
  onUploadError,
}: DragDropUploaderProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [preview, setPreview] = useState<string | null>(null)

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const validateFile = (file: File): string | null => {
    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
      return 'Please upload a valid image file (JPEG, PNG, or WebP)'
    }
    if (file.size > MAX_FILE_SIZE) {
      return `File size must be less than ${formatFileSize(MAX_FILE_SIZE)}`
    }
    return null
  }

  const uploadFile = async (file: File) => {
    const validationError = validateFile(file)
    if (validationError) {
      onUploadError?.(validationError)
      return
    }

    setUploading(true)
    onUploadStart?.()

    // Create preview
    const reader = new FileReader()
    reader.onloadend = () => {
      setPreview(reader.result as string)
    }
    reader.readAsDataURL(file)

    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Upload failed')
      }

      setUploadedImage(data.url)
      onUploadComplete(data.url)
    } catch (error) {
      console.error('Upload error:', error)
      const errorMessage = error instanceof Error ? error.message : 'Failed to upload image'
      onUploadError?.(errorMessage)
      setPreview(null)
    } finally {
      setUploading(false)
    }
  }

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragging(false)

      const files = Array.from(e.dataTransfer.files)
      if (files.length > 0) {
        uploadFile(files[0])
      }
    },
    [onUploadComplete, onUploadError, onUploadStart]
  )

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files
      if (files && files.length > 0) {
        uploadFile(files[0])
      }
    },
    [onUploadComplete, onUploadError, onUploadStart]
  )

  const handleRemove = () => {
    setUploadedImage(null)
    setPreview(null)
  }

  if (preview || uploadedImage) {
    return (
      <div className="relative">
        <div className="relative rounded-2xl overflow-hidden border-2 border-gray-200 bg-white shadow-sm">
          <img
            src={preview || uploadedImage || ''}
            alt="Uploaded product"
            className="w-full h-64 object-cover"
          />
          {uploading && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <div className="text-center">
                <Loader2 className="w-8 h-8 text-white animate-spin mx-auto mb-2" />
                <p className="text-white text-sm font-medium">Uploading...</p>
              </div>
            </div>
          )}
        </div>
        {!uploading && (
          <button
            onClick={handleRemove}
            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600 transition-colors shadow-lg"
            aria-label="Remove image"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    )
  }

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={cn(
        'relative border-2 border-dashed rounded-2xl p-12 transition-all duration-200',
        isDragging
          ? 'border-blue-500 bg-blue-50'
          : 'border-gray-300 bg-gray-50 hover:border-gray-400 hover:bg-gray-100'
      )}
    >
      <input
        type="file"
        id="file-upload"
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        accept={ACCEPTED_IMAGE_TYPES.join(',')}
        onChange={handleFileInput}
        disabled={uploading}
      />
      <div className="flex flex-col items-center justify-center text-center">
        <div
          className={cn(
            'w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-colors',
            isDragging ? 'bg-blue-100' : 'bg-gray-200'
          )}
        >
          {uploading ? (
            <Loader2 className="w-8 h-8 text-gray-600 animate-spin" />
          ) : (
            <Upload className={cn('w-8 h-8', isDragging ? 'text-blue-600' : 'text-gray-600')} />
          )}
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {isDragging ? 'Drop your image here' : 'Upload product image'}
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          Drag and drop or click to browse
        </p>
        <p className="text-xs text-gray-500">
          Supports: JPG, PNG, WebP (max {formatFileSize(MAX_FILE_SIZE)})
        </p>
      </div>
    </div>
  )
}
