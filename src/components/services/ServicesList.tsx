import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { formatPrice } from '@/lib/utils'

const services = [
  {
    id: 1,
    name: "Luxury Wedding Package",
    description: "Complete luxury wedding planning with premium decorations and world-class entertainment",
    price: 500000,
    category: "Wedding",
    features: ["Premium venue decoration", "5-star catering", "Professional photography", "Live entertainment"],
    popular: true,
    image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600"
  },
  {
    id: 2,
    name: "Corporate Events",
    description: "Professional corporate event management with cutting-edge technology",
    price: 150000,
    category: "Corporate",
    features: ["Modern AV setup", "Registration systems", "Professional catering", "Live streaming"],
    popular: false,
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=600"
  },
  {
    id: 3,
    name: "Birthday Celebrations",
    description: "Magical birthday celebrations with custom themes and entertainment",
    price: 25000,
    category: "Birthday",
    features: ["Custom themes", "Entertainment", "Interactive games", "Photo booths"],
    popular: false,
    image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600"
  },
  {
    id: 4,
    name: "Anniversary Celebrations",
    description: "Romantic anniversary setups with elegant decorations and intimate ambiance",
    price: 35000,
    category: "Anniversary",
    features: ["Romantic lighting", "Floral arrangements", "Live music", "Private dining"],
    popular: false,
    image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600"
  },
  {
    id: 5,
    name: "Cultural Events",
    description: "Traditional cultural celebrations with authentic decorations and performances",
    price: 75000,
    category: "Cultural",
    features: ["Traditional decor", "Cultural performances", "Authentic cuisine", "Religious ceremonies"],
    popular: false,
    image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=600"
  },
  {
    id: 6,
    name: "Product Launches",
    description: "Professional product launch events with modern staging and media coverage",
    price: 100000,
    category: "Corporate",
    features: ["Modern staging", "Media management", "Interactive displays", "Networking spaces"],
    popular: false,
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600"
  }
]

export function ServicesList() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {services.map((service) => (
        <Card key={service.id} hover className="relative">
          {service.popular && (
            <div className="absolute -top-3 left-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold z-10">
              Most Popular
            </div>
          )}

          <div className="relative overflow-hidden">
            <img 
              src={service.image} 
              alt={service.name}
              className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
            />
            <div className="absolute top-4 right-4">
              <Badge variant="info">{service.category}</Badge>
            </div>
          </div>

          <CardHeader>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{service.name}</h3>
            <p className="text-gray-600 mb-4">{service.description}</p>
            <p className="text-2xl font-bold text-blue-600 mb-4">
              Starting from {formatPrice(service.price)}
            </p>
          </CardHeader>

          <CardContent>
            <ul className="space-y-2 mb-6">
              {service.features.map((feature, idx) => (
                <li key={idx} className="flex items-center text-gray-600">
                  <span className="text-green-500 mr-2 text-sm">✓</span>
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>

            <Button className="w-full">
              Book This Service
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
