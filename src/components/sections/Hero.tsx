"use client"

import Link from 'next/link'
import { ArrowRight, Play } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900"></div>
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1920"
          alt="Professional event setup"
          className="w-full h-full object-cover opacity-20"
        />
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fadeIn">
            Creating Magical
            <span className="block gradient-text">Moments</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 animate-slideUp">
            Transform your events into unforgettable experiences
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link href="/services">
              <Button size="lg" className="group">
                Explore Packages
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
          <div className="flex flex-col sm:flex-row gap-1 justify-center mb-16">
            <Link href="/contact">
              <Button
                variant="outline"
                className="text-white border-white/70 hover:border-white hover:bg-white/10 focus:bg-white/10 transition duration-300 backdrop-blur-sm"
              >
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
