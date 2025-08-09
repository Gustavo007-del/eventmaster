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

    // Find user (this returns DatabaseUser with password)
    console.log('🔍 Looking for user in database')
    const dbUser = await db.getUserByEmail(emailNormalized)
    console.log('👤 User found:', dbUser ? { id: dbUser.id, email: dbUser.email, role: dbUser.role } : 'null')

    if (!dbUser) {
      console.log('❌ No user found with that email')
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Verify password using the database user (which has password field)
    console.log('🔑 Verifying password')
    const isValid = await comparePassword(password, dbUser.password)
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
      userId: dbUser.id.toString(),
      email: dbUser.email,
      role: dbUser.role,
    })

    console.log('🎉 Login successful for:', dbUser.email)

    // Return user data without password (convert to public User type)
    const publicUser = {
      id: dbUser.id,
      name: dbUser.name,
      email: dbUser.email,
      role: dbUser.role,
      created_at: dbUser.created_at,
      updated_at: dbUser.updated_at
    }

    return NextResponse.json({
      user: publicUser,
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
