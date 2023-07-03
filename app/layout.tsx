import './globals.css'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'

import { Providers } from '@/app/providers'
import { ThemeButton } from '@/components/ThemeToggle'

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
    <html className="light" style={{ colorScheme: 'light' }} lang="en-GB">
      <head />
      <body>
        <Providers>
          <main>{children}</main>
          <ThemeButton />
        </Providers>
      </body>
      <Analytics />
    </html>
  )
}
