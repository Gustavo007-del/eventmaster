"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { ArrowLeft, ShoppingCart, Calendar, Plus, Minus } from 'lucide-react'
import Link from 'next/link'
import toast from 'react-hot-toast'

interface Equipment {
  id: number
  name: string
  description: string
  daily_rate: number
  category: string
  in_stock: number
  image_url: string
}

interface CartItem extends Equipment {
  quantity: number
}

export default function EquipmentRentPage() {
  const [equipments, setEquipments] = useState<Equipment[]>([])
  const [cart, setCart] = useState<CartItem[]>([])
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  
  // Customer details
  const [customer, setCustomer] = useState({
    name: '',
    email: '',
    phone: ''
  })
  const [specialRequests, setSpecialRequests] = useState('')

  useEffect(() => {
    const fetchEquipments = async () => {
      try {
        console.log('Fetching equipments...')
        const response = await fetch('/api/equipments')
        console.log('Response status:', response.status)
        
        if (response.ok) {
          const data = await response.json()
          console.log('Fetched equipments:', data)
          setEquipments(data.equipments || [])
        } else {
          console.error('Failed to fetch equipments:', response.statusText)
          toast.error('Failed to load equipments')
        }
      } catch (error) {
        console.error('Error fetching equipments:', error)
        toast.error('Failed to load equipments')
      } finally {
        setLoading(false)
      }
    }
    fetchEquipments()
  }, [])

  const calculateDays = () => {
    if (!startDate || !endDate) return 0
    const start = new Date(startDate)
    const end = new Date(endDate)
    const diffTime = Math.abs(end.getTime() - start.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays > 0 ? diffDays : 0
  }

  const totalDays = calculateDays()
  const totalCost = cart.reduce((sum, item) => 
    sum + (item.daily_rate * item.quantity * totalDays), 0
  )

  const addToCart = (equipment: Equipment) => {
    console.log('Adding to cart:', equipment)
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === equipment.id)
      if (existingItem) {
        const newCart = prevCart.map(item =>
          item.id === equipment.id 
            ? { ...item, quantity: Math.min(item.quantity + 1, equipment.in_stock) }
            : item
        )
        console.log('Updated cart:', newCart)
        return newCart
      }
      const newCart = [...prevCart, { ...equipment, quantity: 1 }]
      console.log('New cart:', newCart)
      return newCart
    })
    toast.success(`${equipment.name} added to cart`)
  }

  const updateQuantity = (equipmentId: number, newQuantity: number) => {
    if (newQuantity === 0) {
      setCart(cart.filter(item => item.id !== equipmentId))
      toast.success('Item removed from cart')
    } else {
      setCart(cart.map(item =>
        item.id === equipmentId ? { ...item, quantity: newQuantity } : item
      ))
    }
  }

  const handleSubmit = async () => {
    if (!customer.name || !customer.email || !startDate || !endDate || cart.length === 0) {
      toast.error('Please fill all required fields and add items to cart')
      return
    }

    if (totalDays <= 0) {
      toast.error('Please select valid dates')
      return
    }

    setSubmitting(true)
    try {
      const requestData = {
        customer,
        cart,
        startDate,
        endDate,
        totalDays,
        totalCost,
        specialRequests
      }
      
      console.log('Submitting rental:', requestData)
      
      const response = await fetch('/api/equipment-rentals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestData)
      })

      console.log('Submission response status:', response.status)
      
      if (response.ok) {
        const result = await response.json()
        console.log('Submission result:', result)
        toast.success('Equipment rental booked successfully!')
        setCart([])
        setCustomer({ name: '', email: '', phone: '' })
        setStartDate('')
        setEndDate('')
        setSpecialRequests('')
      } else {
        const error = await response.json()
        console.error('Submission error:', error)
        throw new Error(error.error || 'Failed to book rental')
      }
    } catch (error) {
      console.error('Error booking rental:', error)
      toast.error('Failed to book equipment rental')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p>Loading equipments...</p>
        </div>
      </div>
    )
  }

  if (equipments.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center gap-4">
          <Link href="/">
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Equipment Rental</h1>
            <p className="text-gray-600">Rent professional equipment for your events</p>
          </div>
        </div>
        <div className="text-center py-8">
          <p className="text-gray-500">No equipment available at the moment.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center gap-4">
        <Link href="/">
          <Button variant="outline" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </Link>
        <div>
          <h1 className="text-4xl font-bold text-gray-900">Equipment Rental</h1>
          <p className="text-gray-600">Rent professional equipment for your events</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Equipment List */}
        <div className="lg:col-span-2">
          {/* Date Selection */}
          <Card className="mb-6">
            <CardHeader>
              <h2 className="text-xl font-bold">Select Rental Period</h2>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Start Date
                    </label>
                    <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                    End Date
                    </label>
                    <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    min={startDate || new Date().toISOString().split('T')[0]}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                </div>

              {totalDays > 0 && (
                <p className="mt-2 text-sm text-gray-600">
                  Total days: {totalDays}
                </p>
              )}
            </CardContent>
          </Card>

          {/* Equipment Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {equipments.map(equipment => (
              <Card key={equipment.id}>
                <div className="relative">
                  <img 
                    src={equipment.image_url} 
                    alt={equipment.name}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded text-sm">
                    {equipment.category}
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-2">{equipment.name}</h3>
                  <p className="text-gray-600 text-sm mb-3">{equipment.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-lg text-blue-600">
                      ₹{equipment.daily_rate}/day
                    </span>
                    <Button
                      size="sm"
                      onClick={() => addToCart(equipment)}
                      disabled={!totalDays || equipment.in_stock === 0}
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Add to Cart
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    In stock: {equipment.in_stock}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Cart & Checkout */}
        <div>
          <Card>
            <CardHeader>
              <h2 className="text-xl font-bold flex items-center gap-2">
                <ShoppingCart className="w-5 h-5" />
                Cart ({cart.length})
              </h2>
            </CardHeader>
            <CardContent>
              {cart.length === 0 ? (
                <p className="text-gray-500 text-center py-4">Your cart is empty</p>
              ) : (
                <div className="space-y-4">
                  {cart.map(item => (
                    <div key={item.id} className="border-b pb-3">
                      <h4 className="font-medium">{item.name}</h4>
                      <p className="text-sm text-gray-600">₹{item.daily_rate}/day</p>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="w-3 h-3" />
                          </Button>
                          <span>{item.quantity}</span>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            disabled={item.quantity >= item.in_stock}
                          >
                            <Plus className="w-3 h-3" />
                          </Button>
                        </div>
                        <span className="font-medium">
                          ₹{(item.daily_rate * item.quantity * totalDays).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  ))}
                  
                  <div className="pt-3 border-t">
                    <div className="flex justify-between items-center font-bold text-lg">
                      <span>Total:</span>
                      <span>₹{totalCost.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Customer Details */}
          {cart.length > 0 && totalDays > 0 && (
            <Card className="mt-6">
              <CardHeader>
                <h2 className="text-xl font-bold">Customer Details</h2>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  label="Name *"
                  value={customer.name}
                  onChange={(e) => setCustomer({...customer, name: e.target.value})}
                  placeholder="Your full name"
                />
                <Input
                  label="Email *"
                  type="email"
                  value={customer.email}
                  onChange={(e) => setCustomer({...customer, email: e.target.value})}
                  placeholder="your@email.com"
                />
                <Input
                  label="Phone"
                  type="tel"
                  value={customer.phone}
                  onChange={(e) => setCustomer({...customer, phone: e.target.value})}
                  placeholder="+91 98000 80000"
                />
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Special Requests
                  </label>
                  <textarea
                    rows={3}
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Any special requirements or delivery instructions..."
                  />
                </div>
                
                <Button
                  className="w-full"
                  size="lg"
                  onClick={handleSubmit}
                  loading={submitting}
                  disabled={!customer.name || !customer.email}
                >
                  {submitting ? 'Booking...' : `Book Rental - ₹${totalCost.toLocaleString()}`}
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
