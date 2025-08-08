import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { comparePassword, generateToken, normalizeEmail } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    console.log('🔐 Login request received')

    const { email, password } = await request.json()

    console.log('Login attempt with email:', email)

    if (!email || !password) {
      console.log('❌ Missing email or password')
      return NextResponse.json(
        { message: 'Email and password are required' },
        { status: 400 }
      )
    }

    const emailNormalized = normalizeEmail(email)
    console.log('📧 Normalized email:', emailNormalized)

    // Find user
    console.log('🔍 Looking for user in database')
    const user = await db.getUserByEmail(emailNormalized)
    console.log('👤 User found:', user ? { id: user.id, email: user.email, role: user.role } : 'null')

    if (!user) {
      console.log('❌ No user found with that email')
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Verify password
    console.log('🔑 Verifying password')
    const isValid = await comparePassword(password, user.password)
    console.log('✅ Password validation result:', isValid)

    if (!isValid) {
      console.log('❌ Invalid password provided')
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Generate token
    console.log('🎫 Generating JWT token')
    const token = generateToken({
      userId: user.id.toString(),
      email: user.email,
      role: user.role,
    })

    console.log('🎉 Login successful for:', user.email)

    // Return user data (without password)
    const { password: _, ...userWithoutPassword } = user

    return NextResponse.json({
      user: userWithoutPassword,
      token,
      message: 'Login successful'
    })
  } catch (error) {
    console.error('💥 Login error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
