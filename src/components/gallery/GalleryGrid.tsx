import { useState } from 'react'
import { Badge } from '@/components/ui/Badge'

const galleryImages = [
  {
    id: 1,
    title: "Royal Palace Wedding",
    category: "Wedding",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=600",
  },
  {
    id: 2,
    title: "Corporate Gala",
    category: "Corporate",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=600",
  },
  {
    id: 3,
    title: "Birthday Celebration",
    category: "Birthday",
    image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600",
  },
  {
    id: 4,
    title: "Anniversary Party",
    category: "Anniversary",
    image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600",
  },
  {
    id: 5,
    title: "Cultural Festival",
    category: "Cultural",
    image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=600",
  },
  {
    id: 6,
    title: "Product Launch",
    category: "Corporate",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600",
  }
]

export function GalleryGrid() {
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = ['all', 'Wedding', 'Corporate', 'Birthday', 'Anniversary', 'Cultural']

  const filteredImages = selectedCategory === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory)

  return (
    <div>
      {/* Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-6 py-2 rounded-full font-medium transition-colors ${
              selectedCategory === category
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {category === 'all' ? 'All' : category}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredImages.map((image) => (
          <div 
            key={image.id}
            className="group relative overflow-hidden rounded-2xl hover-lift transition-all duration-300"
          >
            <img 
              src={image.image} 
              alt={image.title}
              className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-6 left-6 text-white">
                <Badge variant="info" className="mb-2">
                  {image.category}
                </Badge>
                <h3 className="text-xl font-bold">{image.title}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
