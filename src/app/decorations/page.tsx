import { decorationsData } from '@/data/decorations'
import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

export default function DecorationsPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Event Decorations
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose from our wide range of professional decoration services to make your event unforgettable
          </p>
        </div>

        {/* Decorations Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {decorationsData.map((decoration) => (
            <Card key={decoration.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-cover bg-center" style={{ backgroundImage: `url(${decoration.image})` }} />
              <CardHeader>
                <h3 className="text-2xl font-bold text-gray-900">{decoration.title}</h3>
                <p className="text-lg font-semibold text-blue-600">{decoration.price}</p>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{decoration.description}</p>
                <ul className="space-y-1 mb-6">
                  {decoration.features.map((feature, index) => (
                    <li key={index} className="text-sm text-gray-500 flex items-center">
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link href={`/booking?service=${encodeURIComponent(decoration.title)}`}>
                  <Button className="w-full">
                    Book This Service
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
