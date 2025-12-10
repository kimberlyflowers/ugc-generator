# UGC Video Generator

Generate authentic User-Generated Content (UGC) videos with AI avatars powered by NanoBanana API.

![UGC Generator](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-blue?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css)

## Features

- 🎬 **AI-Powered Video Generation** - Create UGC videos using NanoBanana AI
- 📸 **Product Image Upload** - Drag & drop interface with Vercel Blob storage
- 👤 **Avatar Selection** - Choose from authentic AI avatars (Sarah Rodriguez)
- 📝 **Script Templates** - Pre-built templates for various UGC styles
- 💾 **Video Download** - Download generated videos instantly
- 🎨 **Modern UI** - Clean, professional design inspired by Arcads and Speel

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Storage**: Vercel Blob
- **AI**: NanoBanana API
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ installed
- A Vercel account (for Blob storage)
- NanoBanana API key

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/ugc-generator.git
cd ugc-generator
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

Copy the example environment file:

```bash
cp .env.example .env
```

Edit `.env` and add your credentials:

```env
# Vercel Blob Storage Token
BLOB_READ_WRITE_TOKEN=your_vercel_blob_token_here

# NanoBanana API Key
NANOBANANA_API_KEY=your_nanobanana_api_key_here
```

#### Getting Vercel Blob Token

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project (or create a new one)
3. Navigate to **Storage** → **Blob**
4. Click **Create Database**
5. Copy the `BLOB_READ_WRITE_TOKEN` from the `.env.local` tab

#### Getting NanoBanana API Key

1. Visit [NanoBanana](https://nanobanana.ai)
2. Sign up or log in to your account
3. Navigate to API settings
4. Generate a new API key
5. Copy the API key to your `.env` file

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
npm start
```

## How to Use

1. **Upload Product Image**: Drag and drop or click to upload your product image (JPEG, PNG, or WebP)
2. **Select Avatar**: Choose Sarah Rodriguez (more avatars coming soon!)
3. **Choose Script Template**: Select from templates like Product Review, Unboxing, Before & After, etc.
4. **Generate Video**: Click "Generate UGC Video" and wait for the AI to create your video
5. **Download**: Once complete, download your video and use it in your marketing campaigns

## Project Structure

```
ugc-generator/
├── app/
│   ├── api/
│   │   ├── upload/          # Vercel Blob upload endpoint
│   │   └── generate/        # NanoBanana video generation endpoint
│   ├── globals.css          # Global styles with Tailwind
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Main application page
├── components/
│   ├── DragDropUploader.tsx # Image upload component
│   ├── AvatarSelector.tsx   # Avatar selection component
│   ├── ScriptTemplates.tsx  # Script template selector
│   └── VideoPlayer.tsx      # Video player with download
├── lib/
│   ├── constants.ts         # App constants (avatars, templates)
│   └── utils.ts             # Utility functions
├── types/
│   └── index.ts             # TypeScript type definitions
└── public/                  # Static assets
```

## API Routes

### POST /api/upload

Upload product images to Vercel Blob storage.

**Request**: `multipart/form-data` with file
**Response**:
```json
{
  "success": true,
  "url": "https://..."
}
```

### POST /api/generate

Generate UGC video using NanoBanana API.

**Request**:
```json
{
  "productImageUrl": "https://...",
  "avatarId": "sarah-rodriguez",
  "scriptTemplateId": "product-review"
}
```

**Response**:
```json
{
  "success": true,
  "videoUrl": "https://..."
}
```

## Configuration

### Adding More Avatars

Edit `lib/constants.ts`:

```typescript
export const AVATARS: Avatar[] = [
  {
    id: 'sarah-rodriguez',
    name: 'Sarah Rodriguez',
    image: 'https://...',
    description: 'Authentic lifestyle content creator',
  },
  // Add more avatars here
]
```

### Adding More Script Templates

Edit `lib/constants.ts`:

```typescript
export const SCRIPT_TEMPLATES: ScriptTemplate[] = [
  // Add your custom templates
  {
    id: 'custom-template',
    name: 'Custom Template',
    description: 'Your description',
    category: 'Custom',
    template: 'Your script template here...',
  },
]
```

## Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Add environment variables in Vercel project settings
4. Deploy!

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/ugc-generator)

## Troubleshooting

### Upload fails with 500 error

- Ensure `BLOB_READ_WRITE_TOKEN` is set in your environment variables
- Check that your Vercel Blob storage is properly configured
- Verify the image is under 10MB and is a valid format (JPEG, PNG, WebP)

### Video generation fails

- Verify `NANOBANANA_API_KEY` is correctly set
- Check the NanoBanana API documentation for rate limits
- Ensure you have sufficient API credits
- Check the browser console and server logs for detailed error messages

### Tailwind styles not working

- Ensure you've run `npm install`
- Check that `tailwind.config.ts` includes all necessary content paths
- Restart the development server

## License

MIT License - feel free to use this project for your own purposes!

## Support

For issues and questions:
- Open an issue on GitHub
- Check the [Next.js documentation](https://nextjs.org/docs)
- Review [Vercel Blob documentation](https://vercel.com/docs/storage/vercel-blob)

---

Built with ❤️ using Next.js, Tailwind CSS, and NanoBanana AI