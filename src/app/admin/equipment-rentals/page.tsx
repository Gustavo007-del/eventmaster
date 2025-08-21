"use client"

import { useState, useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'
import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { ArrowLeft, Calendar, User, DollarSign, Package, X } from 'lucide-react'
import Link from 'next/link'
import toast from 'react-hot-toast'

interface EquipmentRental {
  id: number
  customer_name: string
  customer_email: string
  customer_phone?: string
  start_date: string
  end_date: string
  total_days: number
  total_cost: number
  status: string
  special_requests?: string
  created_at: string
  items: Array<{
    equipment_name: string
    quantity: number
    unit_price: number
    total_price: number
  }>
}

export default function AdminEquipmentRentalsPage() {
  const { user } = useAuth()
  const [rentals, setRentals] = useState<EquipmentRental[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedRental, setSelectedRental] = useState<EquipmentRental | null>(null)

  useEffect(() => {
    const fetchRentals = async () => {
      try {
        const token = localStorage.getItem('eventmaster_token')
        if (!token) return

        const response = await fetch('/api/admin/equipment-rentals', {
          headers: { 'Authorization': `Bearer ${token}` }
        })
        
        if (response.ok) {
          const data = await response.json()
          setRentals(data.rentals)
        }
      } catch (error) {
        console.error('Error fetching rentals:', error)
        toast.error('Failed to fetch equipment rentals')
      } finally {
        setLoading(false)
      }
    }
    fetchRentals()
  }, [])

  const updateRentalStatus = async (rentalId: number, newStatus: string) => {
    try {
      const token = localStorage.getItem('eventmaster_token')
      const response = await fetch(`/api/admin/equipment-rentals/${rentalId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      })

      if (response.ok) {
        setRentals(rentals.map(rental => 
          rental.id === rentalId ? { ...rental, status: newStatus } : rental
        ))
        toast.success('Rental status updated')
      } else {
        throw new Error('Failed to update status')
      }
    } catch (error) {
      console.error('Error updating rental:', error)
      toast.error('Failed to update rental status')
    }
  }

  const deleteRental = async (rentalId: number) => {
    if (!confirm('Are you sure you want to delete this equipment rental?')) return

    try {
      const token = localStorage.getItem('eventmaster_token')
      const response = await fetch(`/api/admin/equipment-rentals/${rentalId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      })

      if (response.ok) {
        setRentals(rentals.filter(rental => rental.id !== rentalId))
        toast.success('Equipment rental deleted')
      } else {
        throw new Error('Failed to delete rental')
      }
    } catch (error) {
      console.error('Error deleting rental:', error)
      toast.error('Failed to delete equipment rental')
    }
  }

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
          <h1 className="text-4xl font-bold text-gray-900">Equipment Rentals</h1>
          <p className="text-gray-600">View and manage equipment rental bookings</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <h2 className="text-2xl font-bold">All Equipment Rentals ({rentals.length})</h2>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p>Loading equipment rentals...</p>
          ) : rentals.length === 0 ? (
            <p className="text-center py-8 text-gray-500">No equipment rentals yet</p>
          ) : (
            <div className="space-y-4">
              {rentals.map((rental) => (
                <div key={rental.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 md:w-12 md:h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <Package className="w-5 h-5 md:w-6 md:h-6 text-green-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900 truncate">
                            Equipment Rental #{rental.id}
                          </h3>
                          
                          <div className="flex flex-col gap-1 md:flex-row md:items-center md:gap-4 text-sm text-gray-600 mt-1">
                            <span className="flex items-center gap-1">
                              <User className="w-4 h-4 flex-shrink-0" />
                              <span className="truncate">{rental.customer_name}</span>
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4 flex-shrink-0" />
                              <span>{new Date(rental.start_date).toLocaleDateString()} - {new Date(rental.end_date).toLocaleDateString()}</span>
                            </span>
                            <span className="flex items-center gap-1">
                              <DollarSign className="w-4 h-4 flex-shrink-0" />
                              <span>₹{rental.total_cost.toLocaleString()}</span>
                            </span>
                          </div>
                          
                          <p className="text-xs md:text-sm text-gray-500 mt-1">
                            Duration: {rental.total_days} days • Items: {rental.items.length} • Created: {new Date(rental.created_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 mt-2 md:mt-0">
                      <select
                        value={rental.status}
                        onChange={(e) => updateRentalStatus(rental.id, e.target.value)}
                        className="text-xs md:text-sm border border-gray-300 rounded px-2 py-1"
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                      
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => setSelectedRental(rental)}
                        className="text-xs md:text-sm whitespace-nowrap"
                      >
                        View Details
                      </Button>
                      
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => deleteRental(rental.id)}
                        className="text-xs md:text-sm bg-red-50 border-red-200 text-red-600 hover:bg-red-100"
                        >
                        Delete
                        </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Modal for rental details */}
      {selectedRental && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-4 md:p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl md:text-2xl font-bold">Equipment Rental Details</h2>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setSelectedRental(null)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-lg">Rental #{selectedRental.id}</h3>
                <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                  selectedRental.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                  selectedRental.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                  selectedRental.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {selectedRental.status}
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-3 bg-gray-50 rounded">
                  <p className="text-sm text-gray-500">Customer Name</p>
                  <p className="font-medium">{selectedRental.customer_name}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded">
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium break-words">{selectedRental.customer_email}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded">
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-medium">{selectedRental.customer_phone || 'Not provided'}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded">
                  <p className="text-sm text-gray-500">Rental Period</p>
                  <p className="font-medium">
                    {new Date(selectedRental.start_date).toLocaleDateString()} - {new Date(selectedRental.end_date).toLocaleDateString()}
                  </p>
                </div>
                <div className="p-3 bg-gray-50 rounded">
                  <p className="text-sm text-gray-500">Total Days</p>
                  <p className="font-medium">{selectedRental.total_days}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded">
                  <p className="text-sm text-gray-500">Total Cost</p>
                  <p className="font-medium text-green-600">₹{selectedRental.total_cost.toLocaleString()}</p>
                </div>
              </div>

              {/* Equipment Items */}
              <div>
                <h4 className="font-semibold mb-3">Equipment Items</h4>
                <div className="overflow-x-auto">
                  <table className="w-full border border-gray-200 rounded">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left">Equipment</th>
                        <th className="px-4 py-2 text-left">Quantity</th>
                        <th className="px-4 py-2 text-left">Rate/Day</th>
                        <th className="px-4 py-2 text-left">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedRental.items.map((item, index) => (
                        <tr key={index} className="border-t">
                          <td className="px-4 py-2">{item.equipment_name}</td>
                          <td className="px-4 py-2">{item.quantity}</td>
                          <td className="px-4 py-2">₹{item.unit_price.toLocaleString()}</td>
                          <td className="px-4 py-2">₹{item.total_price.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              
              {selectedRental.special_requests && (
                <div>
                  <p className="text-sm text-gray-500 mb-2">Special Requests</p>
                  <div className="bg-gray-50 p-3 rounded">
                    <p className="break-words">{selectedRental.special_requests}</p>
                  </div>
                </div>
              )}
              
              <div className="p-3 bg-gray-50 rounded">
                <p className="text-sm text-gray-500">Booking Created</p>
                <p className="font-medium">{new Date(selectedRental.created_at).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
