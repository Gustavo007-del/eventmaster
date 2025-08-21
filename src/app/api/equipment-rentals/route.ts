import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// Fetch equipment list
export async function GET() {
  try {
    const equipments = await db.getAllEquipments()
    return NextResponse.json({ equipments })
  } catch (error) {
    console.error('Error fetching equipments:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

// Handle rental booking
export async function POST(req: NextRequest) {
  try {
    const { customer, cart, startDate, endDate, totalDays, totalCost, specialRequests } = await req.json()

    // Validate
    if (!customer?.name || !customer?.email || !cart?.length || !startDate || !endDate) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Create rental record
    const rental = await db.createEquipmentRental({
      customer_name: customer.name,
      customer_email: customer.email,
      customer_phone: customer.phone || '',
      start_date: startDate,
      end_date: endDate,
      total_days: totalDays,
      total_cost: totalCost,
      special_requests: specialRequests || ''
    })

    // Add rental items
    for (const item of cart) {
      await db.addEquipmentRentalItem({
        rental_id: rental.id,
        equipment_id: item.id,
        quantity: item.quantity,
        unit_price: item.daily_rate,
        total_price: item.daily_rate * item.quantity * totalDays
      })
    }

    return NextResponse.json({ success: true, rentalId: rental.id })
  } catch (error) {
    console.error('Error creating equipment rental:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
