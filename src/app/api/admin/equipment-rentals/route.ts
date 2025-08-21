import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { verifyTokenFromHeader } from '@/lib/auth'

export async function GET(req: NextRequest) {
  // 1. Check token
  const token = req.headers.get('Authorization')?.replace('Bearer ', '')
  if (!token) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }
  // 2. Verify admin
  const payload = verifyTokenFromHeader(token)
  if (!payload || payload.role !== 'admin') {
    return NextResponse.json({ error: 'Admin access required' }, { status: 403 })
  }
  // 3. Fetch rentals
  try {
    const rentals = await db.getAllEquipmentRentals()
    return NextResponse.json({ rentals })
  } catch (error) {
    console.error('Equipment rentals fetch error:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
