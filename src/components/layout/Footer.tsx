import Link from 'next/link'
import { Sparkles } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Sparkles className="w-6 h-6" />
            <h3 className="text-xl font-bold">EventMaster</h3>
          </div>
          <p className="text-gray-400">© 2024 EventMaster. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
