"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Users, Calendar, DollarSign, TrendingUp, Settings, Mail, Package } from 'lucide-react'
import Link from 'next/link'

// Add proper TypeScript interfaces
interface AdminStats {
  totalUsers: number
  totalBookings: number
  revenue: number
  growth: number
}

interface RecentBooking {
  id: number
  user_name?: string
  user_email?: string
  service_name: string
  total_amount?: number
  status: string
  created_at: string
  event_date: string
  guests: number
}

export function AdminDashboard() {
  const { user } = useAuth()
  const router = useRouter()
  
  // Properly type the state
  const [stats, setStats] = useState<AdminStats>({
    totalUsers: 0,
    totalBookings: 0,
    revenue: 0,
    growth: 0
  })
  const [recentBookings, setRecentBookings] = useState<RecentBooking[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAdminStats = async () => {
      try {
        const token = localStorage.getItem('eventmaster_token')
        if (!token) return

        const response = await fetch('/api/admin/stats', {
          headers: { 'Authorization': `Bearer ${token}` }
        })
        
        if (response.ok) {
          const data = await response.json()
          setStats({
            totalUsers: data.totalUsers,
            totalBookings: data.totalBookings,
            revenue: data.revenue,
            growth: data.growth
          })
          setRecentBookings(data.recentBookings || [])
        }
      } catch (error) {
        console.error('Error fetching admin stats:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchAdminStats()
  }, [])

  // Add click handlers for navigation
  const handleManageUsers = () => router.push('/admin/users')
  const handleViewBookings = () => router.push('/admin/bookings')
  const handleSystemSettings = () => router.push('/admin/settings')
  const handleViewAllBookings = () => router.push('/admin/bookings')
  const handleContactEnquiries = () => router.push('/admin/contacts')
  const handleEquipmentRentals = () => router.push('/admin/equipment-rentals') // NEW

  // Use real data instead of static array
  const statsDisplay = [
    { label: 'Total Users', value: stats.totalUsers.toString(), change: '+12%', icon: Users, color: 'blue' },
    { label: 'Total Bookings', value: stats.totalBookings.toString(), change: '+8%', icon: Calendar, color: 'purple' },
    { label: 'Revenue', value: `₹${(stats.revenue / 100000).toFixed(1)}L`, change: '+15%', icon: DollarSign, color: 'green' },
    { label: 'Growth', value: `${stats.growth}%`, change: '+3%', icon: TrendingUp, color: 'yellow' }
  ]

  if (user?.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
          <p className="text-gray-600">You don't have permission to access this page.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Admin Dashboard
        </h1>
        <p className="text-xl text-gray-600">
          Welcome back, {user?.name}. Here's what's happening with your business.
        </p>
      </div>

      {/* Stats Grid - Now using real data */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statsDisplay.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 bg-${stat.color}-100 rounded-xl flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 text-${stat.color}-600`} />
                  </div>
                  <span className="text-green-600 text-sm font-semibold">{stat.change}</span>
                </div>
                <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Recent Bookings - Fixed mobile layout */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Recent Bookings</h2>
              <Button onClick={handleViewAllBookings}>View All</Button>
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
                      {/* Fixed: Mobile responsive layout */}
                      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                        <div className="min-w-0 flex-1">
                          <h3 className="font-semibold text-gray-900 truncate">{booking.user_name || 'Unknown User'}</h3>
                          <p className="text-sm text-gray-600 truncate">{booking.service_name} • ₹{(booking.total_amount || 0).toLocaleString()}</p>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold self-start md:self-center ${
                          booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                          booking.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {booking.status}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions - Added Equipment Rentals */}
        <div>
          <Card>
            <CardHeader>
              <h3 className="text-xl font-bold text-gray-900">Quick Actions</h3>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button onClick={handleManageUsers} className="w-full justify-start">
                <Users className="w-4 h-4 mr-2" />
                Manage Users
              </Button>
              
              <Button onClick={handleViewBookings} variant="outline" className="w-full justify-start">
                <Calendar className="w-4 h-4 mr-2" />
                View Bookings
              </Button>

              <Button onClick={handleContactEnquiries} variant="outline" className="w-full justify-start">
                <Mail className="w-4 h-4 mr-2" />
                Contact Enquiries
              </Button>

              {/* NEW: Equipment Rentals Button */}
              <Button onClick={handleEquipmentRentals} variant="outline" className="w-full justify-start">
                <Package className="w-4 h-4 mr-2" />
                Equipment Rentals
              </Button>
              
              <Button onClick={handleSystemSettings} variant="outline" className="w-full justify-start">
                <Settings className="w-4 h-4 mr-2" />
                System Settings
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
