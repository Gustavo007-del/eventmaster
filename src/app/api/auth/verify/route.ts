import { NextResponse } from 'next/server'
import { db, testConnection } from '@/lib/db'

export async function GET() {
  try {
    console.log('🧪 Testing database connection')
    
    // Test basic connection
    const connected = await testConnection()
    if (!connected) {
      return NextResponse.json({ 
        success: false, 
        error: 'Database connection failed' 
      }, { status: 500 })
    }

    // Test user operations
    const userCount = await db.getUserCount()
    const users = await db.getAllUsers()
    
    console.log('✅ Database test successful')
    
    return NextResponse.json({ 
      success: true, 
      message: 'Database connection working perfectly',
      userCount: userCount,
      users: users.map(u => ({ id: u.id, name: u.name, email: u.email, role: u.role }))
    })
  } catch (error) {
    console.error('💥 Database test error:', error)
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    }, { status: 500 })
  }
}
