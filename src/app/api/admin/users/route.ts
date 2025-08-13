import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { verifyTokenFromHeader } from '@/lib/auth'

export async function GET(req: NextRequest) {
  // 1. Authenticate & authorize admin…
  const users = await db.getAllUsers()
  // db.getAllUsers selects id, name, email, role, created_at, updated_at
  return NextResponse.json({ users })
}
