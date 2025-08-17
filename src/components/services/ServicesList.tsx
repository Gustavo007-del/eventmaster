import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { formatPrice } from '@/lib/utils'
import { servicesData } from '@/data/services'
import Link from 'next/link'

export function ServicesList() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {servicesData.map((service) => (
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

            <Link href={`/booking?service=${encodeURIComponent(service.name)}`}>
              <Button size="sm" className="w-full">Book This Service</Button>
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
