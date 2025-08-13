// src/app/api/bookings/route.ts

import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { verifyTokenFromHeader } from '@/lib/auth'

export async function GET(req: NextRequest) {
  /* ... your GET logic ... */
}

export async function POST(req: NextRequest) {
  try {
    console.log('POST /api/bookings body:', await req.clone().json())
    console.log('Auth header:', req.headers.get('Authorization'))

    const token = req.headers.get('Authorization')?.replace('Bearer ', '')
    if (!token) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })

    const payload = verifyTokenFromHeader(token)
    if (!payload) return NextResponse.json({ error: 'Invalid token' }, { status: 401 })

    const data = await req.json()
    const { serviceName, eventDate, guests, message, budget } = data
    if (!serviceName || !eventDate || !guests) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const booking = await db.createBooking({
      user_id: parseInt(payload.userId, 10),
      service_name: serviceName,
      event_date: eventDate,
      total_amount: budget,
      status: 'pending',
      event_type: '',
      guests: parseInt(guests, 10),
      message: message || ''
    })

    return NextResponse.json({ booking })
  } catch (err) {
    console.error('POST /api/bookings error', err)
    return NextResponse.json(
      { error: (err as Error).message || 'Unexpected error' },
      { status: 500 }
    )
  }
}
