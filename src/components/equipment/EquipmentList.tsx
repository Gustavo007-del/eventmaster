import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { formatPrice } from '@/lib/utils'

const equipment = [
  {
    id: 1,
    name: "Premium Chiavari Chairs",
    description: "Elegant premium chairs perfect for luxury events",
    price: 200,
    category: "Furniture",
    available: true,
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400"
  },
  {
    id: 2,
    name: "Professional Sound System",
    description: "High-end audio equipment for crystal-clear sound",
    price: 8000,
    category: "Audio",
    available: true,
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400"
  },
  {
    id: 3,
    name: "LED Stage Lighting",
    description: "Professional RGB LED lighting with DMX control",
    price: 12000,
    category: "Lighting",
    available: true,
    image: "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=400"
  },
  {
    id: 4,
    name: "Silent Generator",
    description: "Ultra-quiet power generator for premium events",
    price: 6000,
    category: "Power",
    available: false,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400"
  },
  {
    id: 5,
    name: "Round Tables",
    description: "Elegant round tables for dining and gatherings",
    price: 300,
    category: "Furniture",
    available: true,
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400"
  },
  {
    id: 6,
    name: "Wedding Mandap",
    description: "Beautiful traditional mandap for Hindu weddings",
    price: 25000,
    category: "Decor",
    available: true,
    image: "https://images.unsplash.com/photo-1603123853880-a92fafb7809f?w=400"
  }
]

export function EquipmentList() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {equipment.map((item) => (
        <Card key={item.id} hover className="relative">
          <div className="relative overflow-hidden">
            <img 
              src={item.image} 
              alt={item.name}
              className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
            />
            <div className="absolute top-4 left-4">
              <Badge variant="info">{item.category}</Badge>
            </div>
            <div className="absolute top-4 right-4">
              <Badge variant={item.available ? "success" : "danger"}>
                {item.available ? "Available" : "Unavailable"}
              </Badge>
            </div>
            {!item.available && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <span className="text-white font-bold text-lg">Not Available</span>
              </div>
            )}
          </div>

          <CardHeader>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{item.name}</h3>
            <p className="text-gray-600 mb-4">{item.description}</p>
            <p className="text-xl font-bold text-blue-600">
              {formatPrice(item.price)}/day
            </p>
          </CardHeader>

          <CardContent>
            <Button 
              className="w-full"
              variant={item.available ? "primary" : "secondary"}
              disabled={!item.available}
            >
              {item.available ? "Rent Now" : "Unavailable"}
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
