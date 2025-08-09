import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { hashPassword, generateToken, isValidEmail, normalizeEmail } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    console.log('📝 Registration request received')

    const { name, email, password } = await request.json()

    console.log('Registration attempt:', { name, email })

    // Validate input
    if (!name || !email || !password) {
      console.log('❌ Missing required fields')
      return NextResponse.json(
        { message: 'Name, email, and password are required' },
        { status: 400 }
      )
    }

    if (name.length < 2) {
      console.log('❌ Name too short')
      return NextResponse.json(
        { message: 'Name must be at least 2 characters' },
        { status: 400 }
      )
    }

    if (!isValidEmail(email)) {
      console.log('❌ Invalid email format')
      return NextResponse.json(
        { message: 'Invalid email format' },
        { status: 400 }
      )
    }

    if (password.length < 6) {
      console.log('❌ Password too short')
      return NextResponse.json(
        { message: 'Password must be at least 6 characters' },
        { status: 400 }
      )
    }

    const emailNormalized = normalizeEmail(email)

    // Check if user already exists
    console.log('🔍 Checking if user exists:', emailNormalized)
    const existingUser = await db.getUserByEmail(emailNormalized)
    if (existingUser) {
      console.log('❌ User already exists')
      return NextResponse.json(
        { message: 'User already exists with this email' },
        { status: 409 }
      )
    }

    // Hash password
    console.log('🔒 Hashing password')
    const hashedPassword = await hashPassword(password)

    // Create user (this returns public User without password)
    console.log('👤 Creating user')
    const user = await db.createUser({
      name: name.trim(),
      email: emailNormalized,
      password: hashedPassword,
      role: 'user'
    })

    console.log('✅ User created successfully:', user.id)

    // Generate token
    const token = generateToken({
      userId: user.id.toString(),
      email: user.email,
      role: user.role,
    })

    return NextResponse.json({
      user: user,
      token,
      message: 'Registration successful'
    }, { status: 201 })
  } catch (error) {
    console.error('💥 Registration error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
