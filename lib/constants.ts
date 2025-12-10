import { Avatar, ScriptTemplate } from '@/types'

export const AVATARS: Avatar[] = [
  {
    id: 'sarah-rodriguez',
    name: 'Sarah Rodriguez',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    description: 'Authentic lifestyle content creator',
  },
]

export const SCRIPT_TEMPLATES: ScriptTemplate[] = [
  {
    id: 'product-review',
    name: 'Product Review',
    description: 'Honest review highlighting key features',
    category: 'Review',
    template: "Hey everyone! I just got my hands on this amazing product and I had to share it with you. Let me show you why I'm absolutely loving it. [Product features]. The quality is incredible and it's been a game-changer for me. Definitely recommend checking it out!",
  },
  {
    id: 'unboxing',
    name: 'Unboxing Experience',
    description: 'Exciting first impressions unboxing',
    category: 'Unboxing',
    template: "Okay, so this just arrived and I'm so excited to unbox it with you! Look at this packaging - already impressed. Let's see what's inside... Wow! This looks even better in person. The attention to detail is amazing. Can't wait to try this out!",
  },
  {
    id: 'before-after',
    name: 'Before & After',
    description: 'Transformation story format',
    category: 'Testimonial',
    template: "I wish I had found this sooner! Before using this, I was struggling with [problem]. But after trying this product, everything changed. It's so easy to use and the results speak for themselves. If you're dealing with the same issue, you need to try this!",
  },
  {
    id: 'quick-tip',
    name: 'Quick Tip',
    description: 'Fast-paced product tip',
    category: 'Tutorial',
    template: "Quick tip! If you want to [achieve result], you need this product. Here's how I use it: [steps]. It's that simple! This has saved me so much time and effort. Trust me, you'll thank me later!",
  },
  {
    id: 'daily-routine',
    name: 'Daily Routine',
    description: 'Incorporate product into daily life',
    category: 'Lifestyle',
    template: "Let me show you how I incorporate this into my daily routine. Every morning, I [use product]. It's become such an essential part of my day. The convenience and quality make it a no-brainer. If you're looking to upgrade your routine, start here!",
  },
]

export const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB
export const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
