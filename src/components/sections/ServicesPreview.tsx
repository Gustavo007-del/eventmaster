"use client"

import { useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/Button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { servicesData } from '@/data/services'
import { formatPrice } from '@/lib/utils'

export function ServicesPreview() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [touchStartX, setTouchStartX] = useState<number | null>(null)
  const [touchEndX, setTouchEndX] = useState<number | null>(null)

  // Auto-slide every 4 seconds, paused on hover
  useEffect(() => {
    if (isHovered) return
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % servicesData.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [isHovered])

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % servicesData.length)
  }, [])

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + servicesData.length) % servicesData.length)
  }, [])

  // Touch handlers for swipe
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEndX(null)
    setTouchStartX(e.touches[0].clientX)
  }

  const onTouchMove = (e: React.TouchEvent) => {
  if (e.touches.length > 0) {
    setTouchEndX(e.touches[0].clientX)
  }
  }


  const onTouchEnd = () => {
    if (touchStartX === null || touchEndX === null) return
    const distance = touchStartX - touchEndX
    if (distance > 50) nextSlide()      // left swipe
    else if (distance < -50) prevSlide() // right swipe
  }

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Our Services
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Professional event management services tailored to your needs
          </p>
        </div>

        {/* Carousel */}
        <div
          className="relative h-96 rounded-2xl overflow-hidden shadow-2xl touch-pan-y"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {/* Slides Container */}
          <div
            className="flex h-full transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {servicesData.map((service) => (
              <div
                key={service.id}
                className="min-w-full h-full bg-cover bg-center relative select-none"
                style={{ backgroundImage: `url(${service.image})` }}
              >
                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
                
                {/* Popular Badge */}
                {service.popular && (
                  <div className="absolute top-8 left-8">
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}

                {/* Text Overlay */}
                <div className="absolute bottom-8 left-8 text-white max-w-md">
                  <h3 className="text-3xl font-bold mb-2">{service.name}</h3>
                  <p className="text-lg opacity-90 mb-2">{service.description}</p>
                  <p className="text-xl font-semibold text-yellow-400">
                    Starting from {formatPrice(service.price)}
                  </p>
                  <div className="mt-4">
                    <span className="inline-block bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
                      {service.category}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Transparent "Explore Services" Button */}
          <div className="absolute top-8 right-8">
            <Link href="/services">
              <Button
                variant="outline"
                className="text-white border-white/70 hover:border-white hover:bg-white/10 focus:bg-white/10 transition duration-300 backdrop-blur-sm"
              >
                Explore Services
              </Button>
            </Link>
          </div>

          {/* Navigation Arrows */}
          <button
            className="absolute left-6 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white p-2 hover:bg-white/20 rounded-full transition-colors"
            onClick={prevSlide}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            className="absolute right-6 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white p-2 hover:bg-white/20 rounded-full transition-colors"
            onClick={nextSlide}
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Pagination Dots */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-3">
            {servicesData.map((_, idx) => (
              <button
                key={idx}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  idx === currentSlide ? 'bg-white scale-110' : 'bg-white/50 hover:bg-white/70'
                }`}
                onClick={() => setCurrentSlide(idx)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
