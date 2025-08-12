import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

const cateringItems = [
  {
    id: 1,
    name: "Wedding Feast Menu",
    description: "Traditional Indian wedding feast with multiple cuisines",
    price: 800,
    priceUnit: "per person",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600"
  },
  {
    id: 2,
    name: "Corporate Lunch",
    description: "Professional lunch setup for business meetings",
    price: 300,
    priceUnit: "per person", 
    image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600"
  },
  {
    id: 3,
    name: "Birthday Party Snacks",
    description: "Fun snacks and treats perfect for birthday celebrations",
    price: 200,
    priceUnit: "per person",
    image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=600"
  },
  {
    id: 4,
    name: "Cocktail Party Setup",
    description: "Elegant appetizers and drinks for cocktail events",
    price: 500,
    priceUnit: "per person",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600"
  }
]

export default function CateringPage() {
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Catering</h1>
          <p className="text-xl text-gray-600">
            Delicious food options for every type of event
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cateringItems.map((item) => (
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
                    Book This Catering
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
