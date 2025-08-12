import Link from 'next/link'
import { Button } from '@/components/ui/Button'

export function CateringPreview() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Catering</h2>
          <p className="text-xl text-gray-600">
            Delicious catering options for every taste
          </p>
        </div>
        <div className="text-center">
          <Link href="/catering">
            <Button size="lg">Explore Catering</Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
