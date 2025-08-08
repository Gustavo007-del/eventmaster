import Link from 'next/link'
import { Button } from '@/components/ui/Button'

export function CTA() {
  return (
    <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-4">Ready to Plan Your Event?</h2>
        <p className="text-xl mb-8">Let's create something amazing together</p>
        <Link href="/contact">
          <Button size="lg" variant="secondary">Get Started</Button>
        </Link>
      </div>
    </section>
  )
}
