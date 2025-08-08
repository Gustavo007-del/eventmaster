import Link from 'next/link'
import { Button } from '@/components/ui/Button'

export function ServicesPreview() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
          <p className="text-xl text-gray-600">Professional event management</p>
        </div>
        
        <div className="text-center">
          <Link href="/services">
            <Button size="lg">View All Services</Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
