# Sarah Rodriguez Studio

**Professional AI Influencer Content Creation Platform**

Generate authentic UGC videos and images for your AI influencer at production scale with ComfyUI backend - **99% cheaper than HeyGen!**

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-blue?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css)
![ComfyUI](https://img.shields.io/badge/ComfyUI-Backend-green?style=for-the-badge)

## 🚀 Why ComfyUI Backend?

| Feature | HeyGen | **Sarah Studio (ComfyUI)** |
|---------|--------|----------------------------|
| Cost per video | $5-10 | **$0.10-0.50** ⚡ |
| Character consistency | Limited | **Perfect (custom LoRA)** ✨ |
| Customization | Basic | **Full control** 🎨 |
| Batch generation | Limited | **Unlimited** 🔥 |
| **Monthly (100 videos/day)** | **$15,000-30,000** | **$80-150** 💰 |

**Savings: 99%!**

## ✨ Features

### Video Studio
- 🎬 **Talking Head Videos** - Perfect lip-sync with ElevenLabs voice
- 🌟 **Lifestyle Content** - Natural movement with AnimateDiff
- 📦 **Product Showcases** - Sarah holding/presenting products
- 🎥 **Multi-Platform** - TikTok (9:16), Reels, Shorts, Instagram Feed (1:1)

### Image Studio
- 📸 **High-Quality Images** - Instagram posts, stories, carousels
- 🎨 **Product Photography** - Professional product shots with Sarah
- 🖼️ **Perfect Consistency** - Custom LoRA trained on Sarah's face
- 🔄 **Batch Generation** - Create 10-20 variations overnight

### Professional Features
- 📚 **Media Library** - Organized content with metadata
- 💰 **Cost Tracking** - Per-generation and monthly analytics
- ⚡ **Scene Builder** - Outfit, background, emotion, product controls
- 📝 **BLOOM Script Templates** - Pre-built messaging for brand
- 🎯 **Batch Jobs** - Queue 10-20 videos for overnight processing

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────┐
│  Next.js Frontend (Vercel)                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐ │
│  │ Video Studio │  │ Image Studio │  │   Library    │ │
│  └──────────────┘  └──────────────┘  └──────────────┘ │
└──────────────────────┬──────────────────────────────────┘
                       │ API Routes
┌──────────────────────┴──────────────────────────────────┐
│  ComfyUI Backend (RunPod/Vast.ai)                       │
│  ┌─────────────────────────────────────────────────┐   │
│  │  Workflows                                       │   │
│  │  • Sarah_TalkingHead  (Lip-sync with Wav2Lip)  │   │
│  │  • Sarah_Lifestyle    (AnimateDiff motion)      │   │
│  │  • Sarah_Product      (ControlNet + product)    │   │
│  │  • Sarah_Still        (Flux + LoRA images)      │   │
│  └─────────────────────────────────────────────────┘   │
│                                                          │
│  Models: Flux Dev + Sarah LoRA + AnimateDiff + Wav2Lip  │
└──────────────────────────────────────────────────────────┘
```

## 📦 Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State**: Zustand
- **Storage**: Vercel Blob

### Backend
- **ComfyUI**: Production workflow engine
- **Flux Dev**: Base image generation model
- **Custom LoRA**: Sarah Rodriguez face consistency
- **AnimateDiff**: Video motion
- **Wav2Lip**: Lip synchronization
- **LivePortrait**: Facial animation
- **ElevenLabs**: Voice generation

### Infrastructure
- **RunPod or Vast.ai**: GPU compute ($0.30-0.50/hour)
- **Replicate**: LoRA training ($5 one-time)

## 🚀 Quick Start

### 1. Clone & Install

```bash
git clone https://github.com/yourusername/sarah-rodriguez-studio.git
cd sarah-rodriguez-studio
npm install
```

### 2. Set Up Environment Variables

```bash
cp .env.example .env
```

Edit `.env`:

```env
# Vercel Blob Storage
BLOB_READ_WRITE_TOKEN=vercel_blob_xxx

# ComfyUI Backend (your RunPod/Vast.ai instance)
COMFYUI_API_URL=https://xxxxx-8188.proxy.runpod.net

# Replicate (for LoRA training)
REPLICATE_API_TOKEN=r8_xxx
REPLICATE_USERNAME=your-username

# ElevenLabs (for voice)
ELEVENLABS_API_KEY=sk_xxx
ELEVENLABS_VOICE_ID=sarah_voice_id
```

### 3. Train Sarah's LoRA

**Upload 15-20 images of Sarah Rodriguez** to train her custom LoRA for perfect character consistency.

See [docs/COMFYUI_SETUP.md](docs/COMFYUI_SETUP.md#step-1-train-sarahs-lora) for detailed instructions.

```bash
# Using Replicate
replicate trainings create \
  ostris/flux-dev-lora-trainer:e440909d \
  --destination your-username/sarah-rodriguez-lora \
  --input input_images=@sarah_training_images.zip \
  --input trigger_word="sarah_rodriguez"
```

**Cost**: $5 one-time | **Time**: 30-60 minutes

### 4. Deploy ComfyUI Backend

See [docs/COMFYUI_SETUP.md](docs/COMFYUI_SETUP.md#step-2-deploy-comfyui-on-runpod) for full deployment guide.

**Option A: RunPod (Recommended)**
- RTX 4090: $0.40/hour
- Reliable, easy setup
- Auto-scaling available

**Option B: Vast.ai (Cheapest)**
- RTX 4090: $0.20-0.30/hour
- 50% cheaper
- Spot instances

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000/studio](http://localhost:3000/studio)

## 📖 Documentation

- **[ComfyUI Setup Guide](docs/COMFYUI_SETUP.md)** - Complete deployment instructions
- **[Workflow Documentation](docs/WORKFLOWS.md)** - Custom workflow details
- **[API Reference](docs/API.md)** - API endpoints and usage

## 💰 Cost Breakdown

### Per Generation

| Type | ComfyUI | HeyGen | Savings |
|------|---------|--------|---------|
| Still Image | $0.003 | N/A | - |
| 15s Video | $0.013 | $3-5 | **99.7%** |
| 30s Talking Head | $0.027 | $5-10 | **99.5%** |
| 60s Lifestyle | $0.053 | $10-15 | **99.6%** |

### Monthly (100 videos/day)

- **ComfyUI**: $80-150/month
- **HeyGen**: $15,000-30,000/month
- **Total Savings**: **$14,850-29,850/month**

## 🎬 Workflows

### 1. Sarah_TalkingHead

Perfect for product reviews, testimonials, BLOOM brand content.

**Features**:
- Lip-sync with Wav2Lip
- Natural facial expressions with LivePortrait
- ElevenLabs voice integration
- Customizable emotions

**Time**: ~2-4 minutes | **Cost**: $0.02-0.03

### 2. Sarah_Lifestyle

Casual scenes, morning routines, day-in-the-life content.

**Features**:
- Smooth motion with AnimateDiff
- Natural body movement
- Scene transitions

**Time**: ~4-8 minutes | **Cost**: $0.03-0.05

### 3. Sarah_Product

Product showcases, unboxings, how-to videos.

**Features**:
- Product image compositing
- Natural hand positioning with ControlNet
- Multiple camera angles

**Time**: ~3-6 minutes | **Cost**: $0.02-0.04

### 4. Sarah_Still

High-quality images for Instagram, website, ads.

**Features**:
- Multiple aspect ratios (1:1, 9:16, 4:5)
- Perfect face consistency
- Professional photography quality

**Time**: ~30 seconds | **Cost**: $0.003-0.005

## 🔄 Batch Generation

Generate 10-20 videos overnight:

```typescript
POST /api/studio/batch-generate
{
  "workflow": "talking_head",
  "variations": [
    {
      "script": "BLOOM serum review script 1",
      "outfit": "white robe",
      "background": "modern bathroom"
    },
    // ... 19 more variations
  ]
}
```

The system will:
1. Queue all jobs to ComfyUI
2. Process in parallel
3. Save to Media Library
4. Send notification when complete

**Cost for 20 videos**: ~$0.50 | **HeyGen equivalent**: $100-200

## 📊 Media Library

All generated content automatically saved with:
- Thumbnail previews
- Metadata (outfit, scene, script)
- Cost tracking
- Download/export options
- Tagging system

## 🔧 Development

### Project Structure

```
sarah-rodriguez-studio/
├── app/
│   ├── studio/page.tsx           # Main studio interface
│   └── api/
│       └── studio/
│           ├── comfyui-generate/ # ComfyUI integration
│           ├── generate-video/   # Video generation
│           └── generate-image/   # Image generation
├── components/
│   ├── StudioLayout.tsx          # Main layout
│   ├── SceneBuilder.tsx          # Scene configuration
│   ├── ScriptEditor.tsx          # Script templates
│   └── OutputPresets.tsx         # Platform presets
├── lib/
│   ├── comfyui-client.ts         # ComfyUI API client
│   ├── store.ts                  # Zustand state management
│   └── studio-constants.ts       # Templates & presets
├── types/
│   ├── studio.ts                 # Studio types
│   └── comfyui.ts                # ComfyUI types
└── docs/
    └── COMFYUI_SETUP.md          # Deployment guide
```

### Adding Custom Workflows

1. Create workflow JSON in ComfyUI
2. Export workflow
3. Add to `lib/comfyui-client.ts`
4. Update types in `types/comfyui.ts`

## 🚀 Deployment

### Frontend (Vercel)

```bash
# Push to GitHub
git push origin main

# Deploy on Vercel
# - Import repository
# - Add environment variables
# - Deploy
```

### Backend (RunPod/Vast.ai)

See [docs/COMFYUI_SETUP.md](docs/COMFYUI_SETUP.md) for complete deployment guide.

## 🐛 Troubleshooting

### ComfyUI connection fails
```bash
# Check if ComfyUI is running
curl $COMFYUI_API_URL/system_stats

# Verify API URL is correct (must include :8188)
```

### LoRA not loading
```bash
# Verify LoRA file is in ComfyUI/models/loras/
# Filename must match: sarah_rodriguez.safetensors
```

### Out of memory
- Reduce image resolution in workflow
- Lower batch size
- Use Flux Schnell instead of Dev
- Upgrade to larger GPU

## 📈 Roadmap

- [ ] Live streaming integration
- [ ] Voice cloning from samples
- [ ] Multi-language support
- [ ] A/B testing framework
- [ ] Analytics dashboard
- [ ] Mobile app

## 🤝 Contributing

This is a production platform for Sarah Rodriguez AI influencer business. Internal use only.

## 📄 License

Proprietary - All rights reserved

---

**Built for production AI influencer business** | Powered by ComfyUI, Flux Dev, and ElevenLabs
