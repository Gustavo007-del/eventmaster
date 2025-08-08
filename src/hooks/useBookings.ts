import { useState, useEffect } from 'react'
import { Booking } from '@/types'
import { useAuth } from '@/context/AuthContext'

export function useBookings() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { user } = useAuth()

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem('eventmaster_token')
      if (!token || !user) return

      const response = await fetch('/api/bookings', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        const data = await response.json()
        setBookings(data.bookings)
      } else {
        throw new Error('Failed to fetch bookings')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
  }

  const createBooking = async (bookingData: Omit<Booking, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
    try {
      const token = localStorage.getItem('eventmaster_token')
      if (!token) throw new Error('No authentication token')

      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(bookingData)
      })

      if (response.ok) {
        const data = await response.json()
        setBookings(prev => [data.booking, ...prev])
        return data.booking
      } else {
        throw new Error('Failed to create booking')
      }
    } catch (err) {
      throw err
    }
  }

  useEffect(() => {
    if (user) {
      fetchBookings()
    }
  }, [user])

  return {
    bookings,
    loading,
    error,
    createBooking,
    refetch: fetchBookings
  }
}
