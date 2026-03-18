import type { Metadata } from 'next'
import { Bebas_Neue, DM_Sans } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { MobileNav } from '@/components/layout/MobileNav'

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-display',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: 'FitGenie — Premium Fitness Platform',
  description: 'Professional workout programs, exercise library, AI-powered planning, and progress tracking.',
  keywords: ['fitness', 'workout', 'gym', 'exercise', 'training', 'muscle'],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${bebasNeue.variable} ${dmSans.variable}`}>
      <body className="bg-dark-900 text-white min-h-screen font-sans antialiased">
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 md:pb-8 pt-6">
          {children}
        </main>
        <MobileNav />
      </body>
    </html>
  )
}
