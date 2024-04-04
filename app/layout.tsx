import './globals.css'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next';

import { Providers } from '@/app/providers'
import ThemeButton from '@/components/ThemeToggle'
import ContentContainer from '@/components/ContentContainer'
import { SessionProvider } from 'next-auth/react';

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
    <html className="light antialiased" lang="en-GB" suppressHydrationWarning>
      <body className='bg-white dark:bg-zinc-900 overflow-hidden'>
        <SessionProvider>
          <Providers>
            <ContentContainer>
              {children}
              <SpeedInsights />
            </ContentContainer>
            <ThemeButton />
          </Providers>
        </SessionProvider>
      </body>
      <Analytics />
    </html>
  )
}
