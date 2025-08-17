export interface ServiceItem {
  id: number
  name: string
  description: string
  price: number
  category: string
  features: string[]
  popular: boolean
  image: string
}

export const servicesData: ServiceItem[] = [
  {
    id: 1,
    name: "Luxury Wedding Package",
    description: "Complete luxury wedding planning with premium decorations",
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
