import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'UGC Video Generator',
  description: 'Generate authentic UGC videos with AI avatars',
  icons: {
    icon: '/favicon.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
