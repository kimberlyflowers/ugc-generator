'use client'

import { useState } from 'react'
import { Palette, User, MapPin, Smile, Lightbulb, RotateCcw } from 'lucide-react'
import { cn } from '@/lib/utils'
import { SCENE_PRESETS, OUTFITS, BACKGROUNDS, EMOTIONS, PRODUCT_POSITIONS } from '@/lib/studio-constants'
import type { Scene } from '@/types/studio'

interface SceneBuilderProps {
  scene: Scene
  onChange: (scene: Scene) => void
}

export default function SceneBuilder({ scene, onChange }: SceneBuilderProps) {
  const [showPresets, setShowPresets] = useState(true)

  const handlePresetSelect = (presetScene: Scene) => {
    onChange(presetScene)
    setShowPresets(false)
  }

  const handleReset = () => {
    onChange({
      outfit: '',
      product: '',
      background: '',
      emotion: '',
    })
    setShowPresets(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Scene Builder</h3>
          <p className="text-sm text-gray-600">Design the perfect scene for Sarah</p>
        </div>
        <button
          onClick={handleReset}
          className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          Reset
        </button>
      </div>

      {/* Scene Presets */}
      {showPresets && (
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-gray-700">Quick Start Presets</h4>
          <div className="grid grid-cols-2 gap-3">
            {SCENE_PRESETS.map((preset) => (
              <button
                key={preset.id}
                onClick={() => handlePresetSelect(preset.scene)}
                className="p-4 text-left bg-white border-2 border-gray-200 hover:border-purple-500 rounded-xl transition-all duration-200 hover:shadow-md group"
              >
                <h5 className="font-semibold text-gray-900 mb-1 group-hover:text-purple-600">
                  {preset.name}
                </h5>
                <p className="text-xs text-gray-600">{preset.description}</p>
              </button>
            ))}
          </div>
          <div className="text-center pt-2">
            <button
              onClick={() => setShowPresets(false)}
              className="text-sm text-purple-600 hover:text-purple-700 font-medium"
            >
              or build custom scene →
            </button>
          </div>
        </div>
      )}

      {/* Custom Scene Builder */}
      {!showPresets && (
        <div className="space-y-4">
          {/* Outfit */}
          <div className="bg-white rounded-xl border-2 border-gray-200 p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                <User className="w-4 h-4 text-purple-600" />
              </div>
              <label className="font-semibold text-gray-900">Outfit</label>
            </div>
            <select
              value={scene.outfit}
              onChange={(e) => onChange({ ...scene, outfit: e.target.value })}
              className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition-colors"
            >
              <option value="">Select outfit...</option>
              {OUTFITS.map((outfit) => (
                <option key={outfit} value={outfit}>
                  {outfit}
                </option>
              ))}
            </select>
          </div>

          {/* Product Position */}
          <div className="bg-white rounded-xl border-2 border-gray-200 p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-pink-100 rounded-lg flex items-center justify-center">
                <Palette className="w-4 h-4 text-pink-600" />
              </div>
              <label className="font-semibold text-gray-900">Product Position</label>
            </div>
            <select
              value={scene.product}
              onChange={(e) => onChange({ ...scene, product: e.target.value })}
              className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:border-pink-500 focus:outline-none transition-colors"
            >
              <option value="">Select product position...</option>
              {PRODUCT_POSITIONS.map((position) => (
                <option key={position} value={position}>
                  {position}
                </option>
              ))}
            </select>
          </div>

          {/* Background */}
          <div className="bg-white rounded-xl border-2 border-gray-200 p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <MapPin className="w-4 h-4 text-blue-600" />
              </div>
              <label className="font-semibold text-gray-900">Background</label>
            </div>
            <select
              value={scene.background}
              onChange={(e) => onChange({ ...scene, background: e.target.value })}
              className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
            >
              <option value="">Select background...</option>
              {BACKGROUNDS.map((bg) => (
                <option key={bg} value={bg}>
                  {bg}
                </option>
              ))}
            </select>
          </div>

          {/* Emotion */}
          <div className="bg-white rounded-xl border-2 border-gray-200 p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Smile className="w-4 h-4 text-yellow-600" />
              </div>
              <label className="font-semibold text-gray-900">Emotion</label>
            </div>
            <select
              value={scene.emotion}
              onChange={(e) => onChange({ ...scene, emotion: e.target.value })}
              className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:border-yellow-500 focus:outline-none transition-colors"
            >
              <option value="">Select emotion...</option>
              {EMOTIONS.map((emotion) => (
                <option key={emotion} value={emotion}>
                  {emotion}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* Scene Preview */}
      {!showPresets && scene.outfit && scene.background && scene.emotion && (
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border-2 border-purple-200 p-4">
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb className="w-5 h-5 text-purple-600" />
            <h4 className="font-semibold text-gray-900">Scene Preview</h4>
          </div>
          <p className="text-sm text-gray-700 leading-relaxed italic">
            "Sarah Rodriguez wearing {scene.outfit}, {scene.product || 'with product'},
            in {scene.background}, looking {scene.emotion},
            professional photography, high quality, 4K"
          </p>
        </div>
      )}
    </div>
  )
}
