import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/context/AuthContext'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'EventMaster - Professional Event Management',
  description: 'Transform your events into unforgettable experiences with professional equipment rental and event management services.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          {children}
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                borderRadius: '12px',
                background: '#ffffff',
                color: '#1f2937',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                border: '1px solid #e5e7eb',
              },
              success: {
                style: {
                  border: '1px solid #10b981',
                },
              },
              error: {
                style: {
                  border: '1px solid #ef4444',
                },
              },
            }}
          />
        </AuthProvider>
      </body>
    </html>
  )
}
