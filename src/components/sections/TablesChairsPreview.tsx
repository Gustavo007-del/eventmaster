import Link from 'next/link'
import { Button } from '@/components/ui/Button'

export function TablesChairsPreview() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Tables & Chairs</h2>
          <p className="text-xl text-gray-600">
            Comfortable and stylish furniture rentals
          </p>
        </div>
        <div className="text-center">
          <Link href="/tables-chairs">
            <Button size="lg">View Furniture</Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
