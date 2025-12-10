import type { OutputPreset, ScriptTemplate, ScenePreset } from '@/types/studio'

// Output Presets for different platforms
export const OUTPUT_PRESETS: OutputPreset[] = [
  {
    id: 'tiktok',
    name: 'TikTok',
    aspectRatio: '9:16',
    resolution: '1080x1920',
    description: 'Vertical video for TikTok',
    icon: '📱',
  },
  {
    id: 'reels',
    name: 'Instagram Reels',
    aspectRatio: '9:16',
    resolution: '1080x1920',
    description: 'Vertical video for Reels',
    icon: '📲',
  },
  {
    id: 'shorts',
    name: 'YouTube Shorts',
    aspectRatio: '9:16',
    resolution: '1080x1920',
    description: 'Vertical video for Shorts',
    icon: '▶️',
  },
  {
    id: 'feed',
    name: 'Instagram Feed',
    aspectRatio: '1:1',
    resolution: '1080x1080',
    description: 'Square video for feed',
    icon: '⬜',
  },
  {
    id: 'story',
    name: 'Instagram Story',
    aspectRatio: '9:16',
    resolution: '1080x1920',
    description: 'Vertical story format',
    icon: '💬',
  },
]

// BLOOM-specific Script Templates
export const SCRIPT_TEMPLATES: ScriptTemplate[] = [
  {
    id: 'bloom-intro',
    name: 'BLOOM Product Introduction',
    category: 'bloom',
    template: `Hey loves! 💕 Sarah here, and I'm absolutely obsessed with this new addition to my {product_category} routine!

BLOOM's {product_name} has been a total game-changer for me. {key_benefit} - and you know I'm all about that natural glow!

The best part? {unique_feature}. I've been using it every {usage_frequency} and the results are incredible.

Ready to bloom with me? Check out the link in my bio! 🌸

#BLOOM #NaturalBeauty #SarahApproved`,
    variables: ['product_category', 'product_name', 'key_benefit', 'unique_feature', 'usage_frequency'],
    description: 'Introduce BLOOM products with enthusiasm',
  },
  {
    id: 'bloom-tutorial',
    name: 'BLOOM How-To Tutorial',
    category: 'bloom',
    template: `Let me show you my favorite way to use BLOOM's {product_name}!

Step 1: {step_1}
Step 2: {step_2}
Step 3: {step_3}

Pro tip from me: {pro_tip}

This routine takes less than {time_duration} but the results last all day. Trust me, your skin will thank you! 💫

Get yours at BLOOM - link in bio!

#BLOOMBeauty #SkincareRoutine #Tutorial`,
    variables: ['product_name', 'step_1', 'step_2', 'step_3', 'pro_tip', 'time_duration'],
    description: 'Step-by-step BLOOM product tutorial',
  },
  {
    id: 'bloom-before-after',
    name: 'BLOOM Transformation Story',
    category: 'bloom',
    template: `Okay, real talk - I struggled with {skin_concern} for years. Nothing worked... until I found BLOOM.

This is me after {time_period} of using {product_name}. Look at that {visible_result}!

What made the difference? {key_ingredient} combined with {unique_formula}. BLOOM just gets it right.

If you're dealing with {skin_concern} too, you NEED to try this. Your future self will thank you!

Shop BLOOM - link in bio! 🌺

#BLOOMResults #BeforeAndAfter #RealResults`,
    variables: ['skin_concern', 'time_period', 'product_name', 'visible_result', 'key_ingredient', 'unique_formula'],
    description: 'Share transformation story with BLOOM',
  },
  {
    id: 'bloom-lifestyle',
    name: 'BLOOM in Daily Life',
    category: 'bloom',
    template: `Morning skincare with my bestie - BLOOM's {product_name}! ☀️

You know that feeling when you find a product that just *works*? This is it. I literally take it everywhere - {location_1}, {location_2}, you name it.

{lifestyle_benefit} while keeping my skin glowing? Yes please!

The formula is {texture_description} and smells like {scent_description}. Literally obsessed.

Join the BLOOM fam! Link in bio 💕

#BLOOMLifestyle #OnTheGo #SkincareEssentials`,
    variables: ['product_name', 'location_1', 'location_2', 'lifestyle_benefit', 'texture_description', 'scent_description'],
    description: 'Showcase BLOOM in everyday life',
  },
  {
    id: 'bloom-quick-tip',
    name: 'BLOOM Quick Tip',
    category: 'bloom',
    template: `⚡ QUICK TIP: Want {desired_result}?

Try this combo from BLOOM:
✨ {product_1}
✨ {product_2}
✨ {product_3}

Apply in that order, {application_tip}, and watch the magic happen!

Game. Changer.

Get the full routine at BLOOM!

#BLOOMTips #SkincareTips #BeautyHacks`,
    variables: ['desired_result', 'product_1', 'product_2', 'product_3', 'application_tip'],
    description: 'Quick skincare tip featuring BLOOM',
  },
  {
    id: 'product-unboxing',
    name: 'Product Unboxing',
    category: 'product-review',
    template: `Unboxing time! Look what just arrived! 📦

{product_name} - I've been dying to try this!

First impressions:
✨ {impression_1}
✨ {impression_2}
✨ {impression_3}

The packaging alone is *chef's kiss* 💋

Can't wait to test this out and share my full review. What do you want to know about it?

#Unboxing #ProductReview #FirstImpressions`,
    variables: ['product_name', 'impression_1', 'impression_2', 'impression_3'],
    description: 'Exciting product unboxing',
  },
  {
    id: 'honest-review',
    name: 'Honest Product Review',
    category: 'product-review',
    template: `Real talk - honest review of {product_name}

What I LOVED:
💚 {love_1}
💚 {love_2}

What could be better:
💭 {improve_1}

Overall rating: {rating}/10

Would I recommend it? {recommendation_verdict}

{final_thoughts}

Let me know if you have questions!

#HonestReview #ProductReview #RealTalk`,
    variables: ['product_name', 'love_1', 'love_2', 'improve_1', 'rating', 'recommendation_verdict', 'final_thoughts'],
    description: 'Authentic honest product review',
  },
]

// Scene Presets
export const SCENE_PRESETS: ScenePreset[] = [
  {
    id: 'bathroom-morning',
    name: 'Bathroom Morning Routine',
    description: 'Fresh morning vibes in modern bathroom',
    scene: {
      outfit: 'white robe',
      product: 'in hand',
      background: 'modern bathroom with marble countertop',
      emotion: 'happy, energetic',
      lighting: 'natural morning light',
      pose: 'applying product',
    },
  },
  {
    id: 'bedroom-nighttime',
    name: 'Bedroom Nighttime',
    description: 'Cozy evening skincare routine',
    scene: {
      outfit: 'silk pajamas',
      product: 'on vanity',
      background: 'cozy bedroom with soft lighting',
      emotion: 'calm, relaxed',
      lighting: 'warm ambient',
      pose: 'sitting at vanity',
    },
  },
  {
    id: 'outdoor-natural',
    name: 'Outdoor Natural Light',
    description: 'Fresh outdoor content',
    scene: {
      outfit: 'casual chic outfit',
      product: 'in hand',
      background: 'outdoor garden, natural setting',
      emotion: 'bright, cheerful',
      lighting: 'golden hour sunlight',
      pose: 'holding product naturally',
    },
  },
  {
    id: 'studio-professional',
    name: 'Studio Professional',
    description: 'Clean professional product showcase',
    scene: {
      outfit: 'elegant business casual',
      product: 'featured prominently',
      background: 'white studio backdrop',
      emotion: 'confident, professional',
      lighting: 'soft studio lighting',
      pose: 'presenting product',
    },
  },
  {
    id: 'cafe-lifestyle',
    name: 'Café Lifestyle',
    description: 'Casual lifestyle content',
    scene: {
      outfit: 'trendy casual wear',
      product: 'on café table',
      background: 'aesthetic café interior',
      emotion: 'friendly, approachable',
      lighting: 'natural café lighting',
      pose: 'chatting with camera',
    },
  },
]

// Emotion Options
export const EMOTIONS = [
  'happy and energetic',
  'calm and relaxed',
  'excited and enthusiastic',
  'confident and professional',
  'warm and friendly',
  'surprised and delighted',
  'serious and informative',
  'playful and fun',
]

// Outfit Options
export const OUTFITS = [
  'white robe',
  'silk pajamas',
  'casual chic outfit',
  'elegant dress',
  'business casual',
  'trendy streetwear',
  'workout gear',
  'cozy loungewear',
  'summer dress',
  'professional blazer',
]

// Background Options
export const BACKGROUNDS = [
  'modern bathroom with marble countertop',
  'cozy bedroom with soft lighting',
  'outdoor garden, natural setting',
  'white studio backdrop',
  'aesthetic café interior',
  'minimalist home office',
  'bright kitchen',
  'luxury spa setting',
  'urban rooftop',
  'beach sunset',
]

// Product Positioning
export const PRODUCT_POSITIONS = [
  'in hand, showing to camera',
  'on table/countertop',
  'applying to face',
  'holding casually',
  'featured prominently in frame',
  'using actively',
]

// Cost Configuration (in USD)
export const COSTS = {
  HEYGEN: {
    AVATAR_TRAINING: 50, // One-time avatar training
    VIDEO_PER_MINUTE: 0.5, // Cost per minute of video
    VIDEO_BASE: 0.3, // Base cost per video
  },
  REPLICATE: {
    LORA_TRAINING: 5, // One-time LoRA training
    IMAGE_GENERATION: 0.01, // Per image
    FLUX_PRO_MULTIPLIER: 1.5, // Flux Pro vs standard
  },
}

// API Limits
export const LIMITS = {
  MAX_TRAINING_IMAGES: 20,
  MIN_TRAINING_IMAGES: 10,
  MAX_BATCH_SIZE: 20,
  MAX_SCRIPT_LENGTH: 500,
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
}

// Supported file types
export const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
export const ACCEPTED_VIDEO_TYPES = ['video/mp4', 'video/mov', 'video/avi']
