import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { verifyToken, getTokenFromRequest } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    console.log('🔍 Token verification request')

    const token = getTokenFromRequest(request)

    if (!token) {
      console.log('❌ No token provided')
      return NextResponse.json(
        { message: 'No token provided' },
        { status: 401 }
      )
    }

    console.log('🎫 Verifying token')
    const payload = verifyToken(token)
    if (!payload) {
      console.log('❌ Invalid token')
      return NextResponse.json(
        { message: 'Invalid token' },
        { status: 401 }
      )
    }

    // Find user
    console.log('👤 Finding user by ID:', payload.userId)
    const user = await db.getUserById(payload.userId)
    if (!user) {
      console.log('❌ User not found')
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      )
    }

    // Return user data (without password)
    const { password: _, ...userWithoutPassword } = user

    console.log('✅ Token verification successful for:', user.email)

    return NextResponse.json({
      user: userWithoutPassword,
      valid: true
    })
  } catch (error) {
    console.error('💥 Token verification error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
