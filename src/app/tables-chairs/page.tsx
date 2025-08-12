import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

const furnitureItems = [
  {
    id: 1,
    name: "Premium Banquet Tables",
    description: "Round tables perfect for wedding receptions (seats 8)",
    price: 500,
    priceUnit: "per table/day",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600"
  },
  {
    id: 2,
    name: "Chiavari Chairs",
    description: "Elegant gold chiavari chairs for luxury events",
    price: 200,
    priceUnit: "per chair/day",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400"
  },
  {
    id: 3,
    name: "Cocktail Tables",
    description: "High-top cocktail tables for standing events",
    price: 300,
    priceUnit: "per table/day",
    image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7086?w=600"
  },
  {
    id: 4,
    name: "Conference Seating",
    description: "Professional chairs for corporate meetings",
    price: 150,
    priceUnit: "per chair/day",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600"
  }
]

export default function TablesChairsPage() {
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Tables & Chairs</h1>
          <p className="text-xl text-gray-600">
            Quality furniture rentals for comfortable seating
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {furnitureItems.map((item) => (
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
                  ₹{item.price.toLocaleString()} {item.priceUnit}
                </p>
              </CardHeader>
              
              <CardContent>
                <Link href={`/booking?service=${encodeURIComponent(item.name)}`}>
                  <Button className="w-full">
                    Rent This Item
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
