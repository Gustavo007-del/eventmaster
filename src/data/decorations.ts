export interface DecorationItem {
  id: number
  title: string
  image: string
  description: string
  price: string
  features: string[]
  category: string
}

export const decorationsData: DecorationItem[] = [
  {
    id: 1,
    title: "Wedding Decorations",
    image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    description: "Elegant floral arrangements and romantic lighting",
    price: "₹25,000 - ₹1,50,000",
    features: ["Floral arrangements", "Lighting setup", "Table decorations", "Backdrop design"],
    category: "wedding"
  },
  {
    id: 2,
    title: "Birthday Party Setup",
    image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    description: "Colorful balloons and themed decorations",
    price: "₹5,000 - ₹25,000",
    features: ["Balloon arrangements", "Theme decorations", "Photo booth", "Party props"],
    category: "birthday"
  },
  {
    id: 3,
    title: "Corporate Events",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    description: "Professional and sophisticated styling",
    price: "₹15,000 - ₹75,000",
    features: ["Professional setup", "Branded decorations", "Stage design", "Audio-visual setup"],
    category: "corporate"
  },
  {
    id: 4,
    title: "Cultural Celebrations",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    description: "Traditional and festive decorations",
    price: "₹10,000 - ₹50,000",
    features: ["Traditional themes", "Cultural elements", "Festive lighting", "Custom arrangements"],
    category: "cultural"
  },
  {
    id: 5,
    title: "Anniversary Celebrations",
    image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    description: "Romantic and memorable setups",
    price: "₹8,000 - ₹40,000",
    features: ["Romantic lighting", "Photo displays", "Floral arrangements", "Memory wall"],
    category: "anniversary"
  },
  {
    id: 6,
    title: "Product Launch Events",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    description: "Modern and branded event styling",
    price: "₹20,000 - ₹1,00,000",
    features: ["Brand integration", "Modern styling", "Product displays", "Interactive zones"],
    category: "launch"
  }
]
