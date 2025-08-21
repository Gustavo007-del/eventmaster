import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const category = searchParams.get('category')

    let equipments
    if (category) {
      // Filter by category
      const result = await db.query(
        `SELECT id, name, description, daily_rate, category, in_stock, image_url
         FROM equipments
         WHERE category = $1
         ORDER BY name`,
        [category]
      )
      equipments = result.rows
    } else {
      // No filter—return all
      equipments = await db.getAllEquipments()
    }

    return NextResponse.json({ equipments })
  } catch (error) {
    console.error('Equipment fetch error:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
