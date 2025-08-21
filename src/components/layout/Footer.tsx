"use client"
import Link from 'next/link'
import {
  Sparkles,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
  Youtube
} from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-16 relative overflow-hidden">
      {/* Animated Music Equalizer Bar */}
      <div className="w-full flex justify-center space-x-1 mb-8 px-4">
        {[...Array(15)].map((_, i) => (
          <span
            key={i}
            className="inline-block w-1.5 rounded bg-indigo-400 animate-pulse-fast"
            style={{
              animationDelay: `${(i % 5) * 150}ms`,
              height: `${8 + (i % 5) * 8}px`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Branding & Description */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-6 h-6 text-indigo-400" />
            <h3 className="text-2xl font-extrabold text-white">Krishna Pro Events</h3>
          </div>
          <p>
            We craft unforgettable experiences for weddings, corporate events, and special celebrations.
            Let us bring your vision to life with our expert planning and premium equipment rentals.
          </p>
          <div className="flex space-x-4">
            <Link href="https://facebook.com" aria-label="Facebook" className="hover:text-white">
              <Facebook className="w-5 h-5" />
            </Link>
            <Link href="https://instagram.com" aria-label="Instagram" className="hover:text-white">
              <Instagram className="w-5 h-5" />
            </Link>
            <Link href="https://twitter.com" aria-label="Twitter" className="hover:text-white">
              <Twitter className="w-5 h-5" />
            </Link>
            <Link href="https://youtube.com" aria-label="YouTube" className="hover:text-white">
              <Youtube className="w-5 h-5" />
            </Link>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-xl font-semibold text-white mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li>
              <Link href="/" className="hover:text-white">Home</Link>
            </li>
            <li>
              <Link href="/" className="hover:text-white">About Us</Link>
            </li>
            <li>
              <Link href="/equipment-rental" className="hover:text-white">Equipment Rentals</Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-white">Contact</Link>
            </li>
            <li>
              <Link href="/gallery" className="hover:text-white">Gallery</Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-xl font-semibold text-white mb-4">Contact Us</h4>
          <ul className="space-y-4">
            <li className="flex items-center space-x-2">
              <MapPin className="w-5 h-5 text-indigo-400" />
              <span>vengeri, kerala, India</span>
            </li>
            <li className="flex items-center space-x-2">
              <Phone className="w-5 h-5 text-indigo-400" />
              <Link href="tel:+919800080000" className="hover:text-white">+91 70348 02125</Link>
            </li>
            <li className="flex items-center space-x-2">
              <Mail className="w-5 h-5 text-indigo-400" />
              <Link href="mailto:hello@krishnaproevents.com" className="hover:text-white">abinavmoothadikal@gmail.com</Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-12 pt-6 text-center text-sm text-gray-500">
        © 2025 Krishna Pro Events. All rights reserved.
      </div>

      <style jsx>{`
        .animate-pulse-fast {
          animation: pulseHeight 1s ease-in-out infinite;
        }
        @keyframes pulseHeight {
          0%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(2); }
        }
      `}</style>
    </footer>
  )
}
