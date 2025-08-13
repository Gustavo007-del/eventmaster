import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { verifyTokenFromHeader } from '@/lib/auth'

export async function GET(req: NextRequest) {
  try {
    const token = req.headers.get('Authorization')?.replace('Bearer ', '')
    if (!token) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })

    const payload = verifyTokenFromHeader(token)
    if (!payload || payload.role !== 'admin') {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 })
    }

    const users = await db.getAllUsers()
    const allBookings = await db.getAllBookings()
    
    return NextResponse.json({
      totalUsers: users.length,
      totalBookings: allBookings.length,
      revenue: allBookings.reduce((sum, booking) => sum + (booking.total_amount || 0), 0),
      growth: 15.2,
      recentBookings: allBookings.slice(0, 10)
    })
  } catch (err) {
    console.error('Admin stats error:', err)
    return NextResponse.json({ error: (err as Error).message }, { status: 500 })
  }
}
