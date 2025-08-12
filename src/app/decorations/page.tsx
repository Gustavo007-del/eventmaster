import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

const decorationItems = [
  {
    id: 1,
    name: "Wedding Backdrop",
    description: "Elegant floral backdrop for wedding ceremonies",
    price: 15000,
    image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600"
  },
  {
    id: 2,
    name: "Party Balloons Setup",
    description: "Colorful balloon arrangements for birthday parties",
    price: 5000,
    image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600"
  },
  {
    id: 3,
    name: "Corporate Stage Decoration",
    description: "Professional stage setup for corporate events",
    price: 25000,
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=600"
  },
  {
    id: 4,
    name: "Table Centerpieces",
    description: "Beautiful floral centerpieces for dining tables",
    price: 3000,
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600"
  }
]

export default function DecorationsPage() {
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Decorations</h1>
          <p className="text-xl text-gray-600">
            Beautiful decorations to make your event memorable
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {decorationItems.map((item) => (
            <Card key={item.id} hover className="relative">
              <div className="relative overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              
              <CardHeader>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.name}</h3>
                <p className="text-gray-600 mb-4">{item.description}</p>
                <p className="text-2xl font-bold text-blue-600 mb-4">
                  ₹{item.price.toLocaleString()}
                </p>
              </CardHeader>
              
              <CardContent>
                <Link href={`/booking?service=${encodeURIComponent(item.name)}`}>
                  <Button className="w-full">
                    Book This Decoration
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
      <Footer />
    </>
  )
}
