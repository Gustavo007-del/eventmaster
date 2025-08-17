"use client"

import { useState, useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'
import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { ArrowLeft, Calendar, User, DollarSign, X } from 'lucide-react'
import Link from 'next/link'

interface Booking {
  id: number
  user_name?: string
  user_email?: string
  service_name: string
  total_amount?: number
  status: string
  created_at: string
  event_date: string
  guests: number
  message?: string
}

export default function AdminBookingsPage() {
  const { user } = useAuth()
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null) // Add this

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem('eventmaster_token')
        if (!token) return

        const response = await fetch('/api/admin/bookings', {
          headers: { 'Authorization': `Bearer ${token}` }
        })
        
        if (response.ok) {
          const data = await response.json()
          setBookings(data.bookings)
        }
      } catch (error) {
        console.error('Error fetching bookings:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchBookings()
  }, [])

  if (user?.role !== 'admin') {
    return <div className="text-center py-8">Access Denied</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center gap-4">
        <Link href="/admin">
          <Button variant="outline" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </Link>
        <div>
          <h1 className="text-4xl font-bold text-gray-900">All Bookings</h1>
          <p className="text-gray-600">View and manage all customer bookings</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <h2 className="text-2xl font-bold">Recent Bookings ({bookings.length})</h2>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p>Loading bookings...</p>
          ) : (
            <div className="space-y-4">
              {bookings.map((booking) => (
                <div key={booking.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <Calendar className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{booking.service_name}</h3>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            {booking.user_name || booking.user_email || 'Unknown User'}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(booking.event_date).toLocaleDateString()}
                          </span>
                          <span className="flex items-center gap-1">
                            <DollarSign className="w-4 h-4" />
                            ₹{(booking.total_amount || 0).toLocaleString()}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">
                          Guests: {booking.guests} • Created: {new Date(booking.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                        booking.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                        booking.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {booking.status}
                      </span>
                      {/* Fix: Add onClick to show modal */}
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => setSelectedBooking(booking)}
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Modal for booking details */}
      {selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Booking Details</h2>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setSelectedBooking(null)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg">{selectedBooking.service_name}</h3>
                <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                  selectedBooking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                  selectedBooking.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                  selectedBooking.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {selectedBooking.status}
                </span>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Customer</p>
                  <p className="font-medium">{selectedBooking.user_name || selectedBooking.user_email || 'Unknown User'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Event Date</p>
                  <p className="font-medium">{new Date(selectedBooking.event_date).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Guests</p>
                  <p className="font-medium">{selectedBooking.guests}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Amount</p>
                  <p className="font-medium">₹{(selectedBooking.total_amount || 0).toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Booking Created</p>
                  <p className="font-medium">{new Date(selectedBooking.created_at).toLocaleDateString()}</p>
                </div>
              </div>
              
              {selectedBooking.message && (
                <div>
                  <p className="text-sm text-gray-500 mb-2">Additional Details</p>
                  <div className="bg-gray-50 p-3 rounded">
                    <p>{selectedBooking.message}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
