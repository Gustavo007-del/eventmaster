import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { verifyTokenFromHeader } from '@/lib/auth'

export async function GET(req: NextRequest) {
  try {
    const token = req.headers.get('Authorization')?.replace('Bearer ', '')
    if (!token) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })

    const payload = verifyTokenFromHeader(token)
    if (!payload) return NextResponse.json({ error: 'Invalid token' }, { status: 401 })

    const userId = parseInt(payload.userId, 10)
    const bookings = await db.getBookingsByUser(userId)
    
    return NextResponse.json({
      totalBookings: bookings.length,
      activeEvents: bookings.filter(b => b.status === 'confirmed').length,
      accountStatus: 'Active',
      recentBookings: bookings.slice(0, 5)
    })
  } catch (err) {
    console.error('User stats error:', err)
    return NextResponse.json({ error: (err as Error).message }, { status: 500 })
  }
}
