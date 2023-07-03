import './globals.css'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'BroadridgeHub',
  description: 'For all your Broadridge hotelling needs',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html className="dark" lang="en-GB">
      <body>{children}</body>
      <Analytics />
    </html>
  )
}