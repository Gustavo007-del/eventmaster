import Link from 'next/link'
import { Button } from '@/components/ui/Button'

export function DecorationsPreview() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Decorations</h2>
          <p className="text-xl text-gray-600">
            Beautiful event decorations to match your style
          </p>
        </div>
        <div className="text-center">
          <Link href="/decorations">
            <Button size="lg">Explore Decorations</Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
