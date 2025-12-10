'use client'

import { useState } from 'react'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import { AVATARS } from '@/lib/constants'
import type { Avatar } from '@/types'

interface AvatarSelectorProps {
  selectedAvatarId: string | null
  onSelect: (avatarId: string) => void
}

export default function AvatarSelector({ selectedAvatarId, onSelect }: AvatarSelectorProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Choose Avatar</h3>
        <span className="text-sm text-gray-500">
          {AVATARS.length} available
        </span>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {AVATARS.map((avatar) => (
          <button
            key={avatar.id}
            onClick={() => onSelect(avatar.id)}
            className={cn(
              'relative flex items-center gap-4 p-4 rounded-xl border-2 transition-all duration-200 text-left',
              selectedAvatarId === avatar.id
                ? 'border-blue-500 bg-blue-50 shadow-md'
                : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
            )}
          >
            <div className="relative flex-shrink-0">
              <div
                className={cn(
                  'w-16 h-16 rounded-full overflow-hidden border-2 transition-colors',
                  selectedAvatarId === avatar.id ? 'border-blue-500' : 'border-gray-200'
                )}
              >
                <img
                  src={avatar.image}
                  alt={avatar.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {selectedAvatarId === avatar.id && (
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
                  <Check className="w-4 h-4 text-white" />
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-gray-900 mb-1">{avatar.name}</h4>
              <p className="text-sm text-gray-600">{avatar.description}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
