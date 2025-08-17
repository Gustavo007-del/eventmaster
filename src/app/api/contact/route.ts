import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(req: NextRequest) {
  try {
    const { firstName, lastName, email, phone, subject, message } = await req.json()

    // Basic validation
    if (!firstName || !lastName || !email || !phone || !subject || !message) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    }

    const contact = await db.createContact({
      first_name: firstName,
      last_name: lastName,
      email,
      phone,
      subject,
      message
    })

    return NextResponse.json({ success: true, contact })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
