"use client"

import { useAuth } from '@/context/AuthContext'
import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import { Calendar, User, Star, Settings } from 'lucide-react'

export function UserDashboard() {
  const { user } = useAuth()

  const stats = [
    { label: 'Total Bookings', value: '3', icon: Calendar },
    { label: 'Active Events', value: '1', icon: Star },
    { label: 'Account Status', value: 'Active', icon: User }
  ]

  const recentBookings = [
    {
      id: 1,
      service: 'Birthday Celebration',
      date: '2024-03-15',
      status: 'confirmed',
      amount: 25000
    },
    {
      id: 2,
      service: 'Anniversary Party',
      date: '2024-02-20',
      status: 'completed',
      amount: 35000
    }
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

      {/* Stats Grid */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, index) => {
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
        {/* Recent Bookings */}
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
                {recentBookings.map((booking) => (
                  <div key={booking.id} className="border border-gray-200 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-900">{booking.service}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                        booking.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {booking.status}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600">
                      <p>Date: {new Date(booking.date).toLocaleDateString()}</p>
                      <p>Amount: ₹{booking.amount.toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
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
