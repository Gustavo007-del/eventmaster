import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { verifyTokenFromHeader } from '@/lib/auth'

async function verifyAdmin(req: NextRequest) {
  const token = req.headers.get('Authorization')?.replace('Bearer ', '')
  if (!token) throw new Error('No token')
  
  const payload = verifyTokenFromHeader(token)
  if (!payload || payload.role !== 'admin') {
    throw new Error('Not admin')
  }
  return payload
}

// Update booking status
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await verifyAdmin(req)
    const { status } = await req.json()
    
    if (!['pending', 'confirmed', 'completed', 'cancelled'].includes(status)) {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 })
    }

    const booking = await db.updateBookingStatus(parseInt(params.id), status)
    
    if (!booking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 })
    }

    return NextResponse.json({ success: true, booking })
  } catch (error) {
    console.error('Booking update error:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

// Delete booking (soft delete)
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await verifyAdmin(req)
    
    const booking = await db.deleteBooking(parseInt(params.id))
    
    if (!booking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Booking delete error:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
