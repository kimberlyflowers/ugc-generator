# ComfyUI Backend Setup for Sarah Rodriguez Studio

This guide will help you deploy a ComfyUI backend for generating Sarah's UGC content at production scale.

## Architecture Overview

```
Next.js Frontend (Vercel)
         ↓
    API Routes
         ↓
ComfyUI Backend (RunPod/Vast.ai)
         ↓
    Workflows:
    - Sarah_TalkingHead (lip-sync videos)
    - Sarah_Lifestyle (casual scenes)
    - Sarah_Product (product showcases)
    - Sarah_Still (Instagram images)
```

## Cost Comparison

| Provider | Cost per Video | Notes |
|----------|---------------|-------|
| **HeyGen** | $5-10 | Limited customization |
| **ComfyUI (RunPod)** | $0.10-0.50 | **10-20x cheaper!** Full control |
| **ComfyUI (Vast.ai)** | $0.05-0.30 | **20-40x cheaper!** Spot instances |

## Prerequisites

1. **Training Images**: 15-20 high-quality images of Sarah Rodriguez
2. **RunPod or Vast.ai account**
3. **Replicate account** (for LoRA training)
4. **ElevenLabs account** (for voice/lip-sync)

## Step 1: Train Sarah's LoRA

### 1.1 Prepare Training Images

Requirements:
- **15-20 images minimum**
- High resolution (1024x1024 or higher)
- Various angles, expressions, lighting
- Consistent character (same person)
- Clear face visibility
- Diverse outfits and backgrounds

### 1.2 Train on Replicate

```bash
# Install Replicate CLI
npm install -g replicate

# Login
replicate login

# Upload images to a zip file
zip sarah_training_images.zip img1.jpg img2.jpg ... img20.jpg

# Start training
replicate trainings create \
  ostris/flux-dev-lora-trainer:e440909d \
  --destination your-username/sarah-rodriguez-lora \
  --input input_images=@sarah_training_images.zip \
  --input trigger_word="sarah_rodriguez" \
  --input steps=1000 \
  --input learning_rate=0.0004
```

Training takes **30-60 minutes** and costs **$5**.

### 1.3 Download Trained LoRA

Once complete, download the `.safetensors` file:

```bash
replicate models get your-username/sarah-rodriguez-lora
# Download the output .safetensors file
```

## Step 2: Deploy ComfyUI on RunPod

### 2.1 Create RunPod Instance

1. Go to [RunPod](https://runpod.io)
2. Click **Deploy** → **Templates**
3. Search for "ComfyUI" template
4. Recommended specs:
   - **GPU**: RTX 4090 (best value) or A100
   - **VRAM**: 24GB minimum
   - **Storage**: 100GB+
   - **Template**: `runpod/pytorch:2.1.0-py3.10-cuda11.8.0-devel-ubuntu22.04`

### 2.2 Install ComfyUI

SSH into your RunPod instance:

```bash
# Clone ComfyUI
git clone https://github.com/comfyanonymous/ComfyUI.git
cd ComfyUI

# Install dependencies
pip install -r requirements.txt

# Install custom nodes
cd custom_nodes

# AnimateDiff
git clone https://github.com/Kosinkadink/ComfyUI-AnimateDiff-Evolved.git
cd ComfyUI-AnimateDiff-Evolved && pip install -r requirements.txt && cd ..

# Wav2Lip (lip sync)
git clone https://github.com/kijai/ComfyUI-Wav2Lip.git
cd ComfyUI-Wav2Lip && pip install -r requirements.txt && cd ..

# LivePortrait (facial animation)
git clone https://github.com/kijai/ComfyUI-LivePortraitKJ.git
cd ComfyUI-LivePortraitKJ && pip install -r requirements.txt && cd ..

# Video Helpers
git clone https://github.com/Kosinkadink/ComfyUI-VideoHelperSuite.git
cd ComfyUI-VideoHelperSuite && pip install -r requirements.txt && cd ..

cd ../..
```

### 2.3 Download Required Models

```bash
cd ComfyUI/models

# Flux Dev (base model)
cd checkpoints
wget https://huggingface.co/black-forest-labs/FLUX.1-dev/resolve/main/flux1-dev.safetensors
cd ..

# AnimateDiff motion modules
cd animatediff_models
wget https://huggingface.co/guoyww/animatediff/resolve/main/mm_sd_v15_v2.ckpt
cd ..

# VAE
cd vae
wget https://huggingface.co/stabilityai/sd-vae-ft-mse-original/resolve/main/vae-ft-mse-840000-ema-pruned.safetensors
cd ..

# Upload Sarah's LoRA
cd loras
# Upload sarah_rodriguez.safetensors here
cd ..
```

### 2.4 Start ComfyUI

```bash
cd ComfyUI
python main.py --listen 0.0.0.0 --port 8188
```

### 2.5 Expose API

RunPod will give you a public URL like:
```
https://xxxxx-8188.proxy.runpod.net
```

Use this as your `COMFYUI_API_URL`.

## Step 3: Alternative - Deploy on Vast.ai (Cheaper!)

Vast.ai can be **50% cheaper** than RunPod:

1. Go to [Vast.ai](https://vast.ai)
2. Search for instances with:
   - RTX 4090 or A100
   - CUDA 11.8+
   - 24GB+ VRAM
3. Rent instance (as low as **$0.30/hour**)
4. Follow same installation steps as RunPod

## Step 4: Create ComfyUI Workflows

### 4.1 Workflow: Sarah_TalkingHead

This workflow creates videos of Sarah speaking to camera with perfect lip sync.

**Nodes needed:**
1. Load Flux Dev checkpoint
2. Load Sarah LoRA
3. Generate base image with text prompt
4. Generate audio from script (ElevenLabs)
5. Animate face with LivePortrait
6. Sync lips with Wav2Lip
7. Add motion with AnimateDiff
8. Export video

**Example workflow JSON** is in `/workflows/talking_head.json`

### 4.2 Workflow: Sarah_Lifestyle

Casual lifestyle scenes with natural movement.

**Nodes:**
- Flux Dev + Sarah LoRA
- Stable Video Diffusion
- AnimateDiff for smooth motion
- ControlNet for pose guidance

### 4.3 Workflow: Sarah_Product

Product showcase videos.

**Nodes:**
- Flux Dev + Sarah LoRA
- Product image compositing
- ControlNet for hand positioning
- AnimateDiff for natural motion

### 4.4 Workflow: Sarah_Still

High-quality still images for Instagram.

**Nodes:**
- Flux Dev + Sarah LoRA
- Upscaling (optional)
- Face restoration (optional)

## Step 5: Configure ElevenLabs

For realistic voice and lip sync:

1. Go to [ElevenLabs](https://elevenlabs.io)
2. Create "Sarah Rodriguez" voice:
   - Upload 1-2 minutes of voice samples
   - Or use Voice Design to generate
3. Copy Voice ID to `.env`
4. Generate audio for scripts:

```bash
curl -X POST "https://api.elevenlabs.io/v1/text-to-speech/{voice_id}" \
  -H "xi-api-key: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Hey everyone! Check out this amazing product!",
    "model_id": "eleven_monolingual_v1",
    "voice_settings": {
      "stability": 0.5,
      "similarity_boost": 0.75
    }
  }' \
  --output sarah_audio.mp3
```

## Step 6: Batch Generation

For overnight batch jobs (10-20 videos):

```bash
# In your Next.js app
POST /api/studio/batch-generate
{
  "workflow": "talking_head",
  "variations": [
    { "script": "Script 1", "outfit": "casual" },
    { "script": "Script 2", "outfit": "professional" },
    ...
  ]
}
```

The system will:
1. Queue all jobs to ComfyUI
2. Process in parallel (if multiple GPUs)
3. Save outputs to Vercel Blob
4. Send notification when complete

## Step 7: Production Optimization

### Auto-scaling

Use RunPod's serverless option:
- Spins up GPU only when needed
- Pay per second of compute
- Scales to 0 when idle

### Cost Tracking

```typescript
// The system automatically tracks:
- ComfyUI compute time
- ElevenLabs audio generation
- Storage costs
- Total per video/image
```

### Workflow Optimization

- **Cache base images** - Reuse Sarah renders
- **Batch processing** - Queue 10-20 jobs overnight
- **Lower quality for drafts** - Use fewer steps/lower resolution for previews

## Troubleshooting

### ComfyUI won't start
```bash
# Check CUDA
nvidia-smi

# Reinstall dependencies
pip install -r requirements.txt --force-reinstall
```

### Out of memory
- Reduce image resolution
- Lower batch size
- Use model offloading
- Upgrade to larger GPU

### Slow generation
- Use Flux Schnell instead of Dev
- Reduce steps (20 instead of 30)
- Lower CFG scale
- Enable xformers

## Cost Estimates

Based on RunPod RTX 4090 at **$0.40/hour**:

| Content Type | Generation Time | Cost | HeyGen Equivalent |
|--------------|----------------|------|-------------------|
| Still Image | 30 sec | $0.003 | N/A |
| 15s Video | 2 min | $0.013 | $3-5 |
| 30s Video (talking head) | 4 min | $0.027 | $5-10 |
| 60s Video (lifestyle) | 8 min | $0.053 | $10-15 |

**Monthly costs for 100 videos/day**:
- ComfyUI: **$80-150/month**
- HeyGen: **$15,000-30,000/month**

**Savings: 99%!**

## Support

For issues:
1. Check ComfyUI logs: `tail -f ComfyUI/comfyui.log`
2. Test workflows in ComfyUI UI first
3. Verify all models are downloaded
4. Check GPU memory usage

---

**Ready to generate!** Your ComfyUI backend is now configured for production-scale Sarah Rodriguez content creation.
