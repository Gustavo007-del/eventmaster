"use client"

import { useState, useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import toast from 'react-hot-toast'

export function BookingForm() {
  const { user } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()

  const serviceFromUrl = searchParams.get('service') || ''

  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    serviceName: serviceFromUrl,
    eventDate: '',
    guests: '',
    message: '',
    budget: ''
  })

  useEffect(() => {
    if (serviceFromUrl) {
      setFormData(prev => ({ ...prev, serviceName: serviceFromUrl }))
    }
  }, [serviceFromUrl])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!user) {
      router.push('/login')
      toast.error('Please login to book an event')
      return
    }

    setIsLoading(true)

    try {
      const res = await fetch('/api/bookings', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('eventmaster_token')}`  // ← This line fixes it!
      },
      body: JSON.stringify({
        serviceName: formData.serviceName,
        eventDate: formData.eventDate,
        guests: parseInt(formData.guests, 10),
        message: formData.message,
        budget: formData.budget
      })
    })


      if (!res.ok) throw new Error('Failed to submit booking')

      toast.success('Booking request submitted successfully!')
      router.push('/dashboard')
      setFormData({
        serviceName: '',
        eventDate: '',
        guests: '',
        message: '',
        budget: ''
      })
    } catch (error) {
      toast.error((error as Error).message || 'Failed to submit booking')
    } finally {
      setIsLoading(false)
    }
  }

  if (!user) {
    return (
      <Card>
        <CardContent className="text-center py-12">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Login Required</h3>
          <p className="text-gray-600 mb-6">Please login to book an event</p>
          <Button onClick={() => router.push('/login')}>Login to Continue</Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <h2 className="text-2xl font-bold text-gray-900">Book Your Event</h2>
        <p className="text-gray-600">Fill out the form below and we'll get back to you soon</p>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Service
            </label>
            <select
              name="serviceName"
              value={formData.serviceName}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select a service</option>
              <option value="Luxury Wedding Package">Luxury Wedding Package</option>
              <option value="Corporate Events">Corporate Events</option>
              <option value="Birthday Celebrations">Birthday Celebrations</option>
              <option value="Anniversary Celebrations">Anniversary Celebrations</option>
              <option value="Cultural Events">Cultural Events</option>
              <option value="Product Launches">Product Launches</option>
              <option value="Decorations">Decorations</option>
              <option value="Catering">Catering</option>
              <option value="Tables & Chairs">Tables & Chairs</option>
            </select>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Input
              label="Event Date"
              type="date"
              name="eventDate"
              value={formData.eventDate}
              onChange={handleChange}
              required
            />

            <Input
              label="Number of Guests"
              type="number"
              name="guests"
              value={formData.guests}
              onChange={handleChange}
              placeholder="Expected number of guests"
              min="1"
              required
            />
          </div>

          <Input
            label="Budget Range"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            placeholder="e.g., ₹1,00,000 - ₹5,00,000"
          />

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Additional Details</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Tell us about your event..."
            />
          </div>

          <Button type="submit" loading={isLoading} size="lg" className="w-full">
            {isLoading ? 'Submitting...' : 'Submit Booking Request'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
