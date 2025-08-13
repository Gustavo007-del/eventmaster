"use client"

import { useState, useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'
import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import { Calendar, User, Star, Settings } from 'lucide-react'

// Add proper TypeScript interfaces
interface UserStats {
  totalBookings: number
  activeEvents: number
  accountStatus: string
}

interface RecentBooking {
  id: number
  service_name: string
  event_date: string
  status: string
  total_amount?: number
  guests: number
}

export function UserDashboard() {
  const { user } = useAuth()
  
  // Properly type the state
  const [stats, setStats] = useState<UserStats>({
    totalBookings: 0,
    activeEvents: 0,
    accountStatus: 'Loading...'
  })
  const [recentBookings, setRecentBookings] = useState<RecentBooking[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('eventmaster_token')
        if (!token) return

        const response = await fetch('/api/user/stats', {
          headers: { 'Authorization': `Bearer ${token}` }
        })
        
        if (response.ok) {
          const data = await response.json()
          setStats({
            totalBookings: data.totalBookings,
            activeEvents: data.activeEvents,
            accountStatus: data.accountStatus
          })
          setRecentBookings(data.recentBookings || [])
        }
      } catch (error) {
        console.error('Error fetching stats:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchStats()
  }, [])

  // Use real data instead of static array
  const statsDisplay = [
    { label: 'Total Bookings', value: stats.totalBookings.toString(), icon: Calendar },
    { label: 'Active Events', value: stats.activeEvents.toString(), icon: Star },
    { label: 'Account Status', value: stats.accountStatus, icon: User }
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Welcome back, {user?.name}!
        </h1>
        <p className="text-xl text-gray-600">
          Here's an overview of your events and bookings
        </p>
      </div>

      {/* Stats Grid - Now using real data */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {statsDisplay.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mr-4">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Recent Bookings - Now using real data */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Recent Bookings</h2>
              <Link href="/booking">
                <Button>New Booking</Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {loading ? (
                  <p>Loading...</p>
                ) : recentBookings.length === 0 ? (
                  <p>No recent bookings</p>
                ) : (
                  recentBookings.map((booking) => (
                    <div key={booking.id} className="border border-gray-200 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-gray-900">{booking.service_name}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                          booking.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {booking.status}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600">
                        <p>Date: {new Date(booking.event_date).toLocaleDateString()}</p>
                        <p>Amount: ₹{(booking.total_amount || 0).toLocaleString()}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions - Keep exactly as is */}
        <div>
          <Card>
            <CardHeader>
              <h3 className="text-xl font-bold text-gray-900">Quick Actions</h3>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link href="/booking">
                <Button className="w-full justify-start">
                  <Calendar className="w-4 h-4 mr-2" />
                  New Booking
                </Button>
              </Link>
              <Link href="/services">
                <Button variant="outline" className="w-full justify-start">
                  Browse Services
                </Button>
              </Link>
              <Link href="/equipment">
                <Button variant="outline" className="w-full justify-start">
                  Rent Equipment
                </Button>
              </Link>
              <Link href="/profile">
                <Button variant="ghost" className="w-full justify-start">
                  <Settings className="w-4 h-4 mr-2" />
                  Profile Settings
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
