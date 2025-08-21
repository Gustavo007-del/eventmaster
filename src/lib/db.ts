import { Pool } from 'pg'
import { User, Booking, DatabaseUser } from '@/types'
console.log("DATABASE_URL =", process.env.DATABASE_URL);

// PostgreSQL connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
})

// Test database connection
export async function testConnection() {
  try {
    const client = await pool.connect()
    const result = await client.query('SELECT NOW()')
    client.release()
    console.log('✅ Database connected successfully at:', result.rows[0].now)
    return true
  } catch (error) {
    console.error('❌ Database connection failed:', error)
    return false
  }
}

// User database operations
export const db = {
  // Get user by email (returns DatabaseUser with password)
  async getUserByEmail(email: string): Promise<DatabaseUser | null> {
    try {
      const result = await pool.query('SELECT * FROM users WHERE email = $1', [email])
      return result.rows[0] || null
    } catch (error) {
      console.error('Error getting user by email:', error)
      throw error
    }
  },

  // Get user by ID (returns public User without password)
  async getUserById(id: string | number): Promise<User | null> {
    try {
      const result = await pool.query(
        'SELECT id, name, email, role, created_at, updated_at FROM users WHERE id = $1', 
        [id]
      )
      return result.rows[0] || null
    } catch (error) {
      console.error('Error getting user by ID:', error)
      throw error
    }
  },

  // Create new user (returns public User without password)
  async createUser(userData: { name: string; email: string; password: string; role?: string }): Promise<User> {
    try {
      const { name, email, password, role = 'user' } = userData
      const result = await pool.query(
        'INSERT INTO users (name, email, password, role, created_at, updated_at) VALUES ($1, $2, $3, $4, NOW(), NOW()) RETURNING id, name, email, role, created_at, updated_at',
        [name, email, password, role]
      )
      return result.rows[0]
    } catch (error) {
      console.error('Error creating user:', error)
      throw error
    }
  },

  // Update user (returns public User without password)
  async updateUser(id: string | number, userData: Partial<Omit<User, 'id'>>): Promise<User | null> {
    try {
      const fields = []
      const values = []
      let paramCount = 1

      Object.entries(userData).forEach(([key, value]) => {
        if (key !== 'id' && value !== undefined) {
          fields.push(`${key} = $${paramCount}`)
          values.push(value)
          paramCount++
        }
      })

      if (fields.length === 0) return null

      fields.push(`updated_at = NOW()`)
      values.push(id)

      const query = `UPDATE users SET ${fields.join(', ')} WHERE id = $${paramCount} RETURNING id, name, email, role, created_at, updated_at`
      const result = await pool.query(query, values)
      return result.rows[0] || null
    } catch (error) {
      console.error('Error updating user:', error)
      throw error
    }
  },

  // Get all users (returns public Users without passwords)
  async getAllUsers(): Promise<User[]> {
    try {
      const result = await pool.query('SELECT id, name, email, role, created_at, updated_at FROM users ORDER BY created_at DESC')
      return result.rows
    } catch (error) {
      console.error('Error getting all users:', error)
      throw error
    }
  },

  // Get user count
  async getUserCount(): Promise<number> {
    try {
      const result = await pool.query('SELECT COUNT(*) as count FROM users')
      return parseInt(result.rows[0].count)
    } catch (error) {
      console.error('Error getting user count:', error)
      throw error
    }
  },

  // Booking operations
  async createBooking(bookingData: Omit<Booking, 'id' | 'created_at' | 'updated_at'>): Promise<Booking> {
    try {
      const {
        user_id,
        service_name,
        event_date,
        status = 'pending',
        total_amount,
        event_type,
        guests,
        message
      } = bookingData

      const result = await pool.query(
        'INSERT INTO bookings (user_id, service_name, event_date, status, total_amount, event_type, guests, message, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW(), NOW()) RETURNING *',
        [user_id, service_name, event_date, status, total_amount, event_type, guests, message]
      )
      return result.rows[0]
    } catch (error) {
      console.error('Error creating booking:', error)
      throw error
    }
  },

  // Get bookings by user
  async getBookingsByUser(userId: string | number): Promise<Booking[]> {
    try {
      const result = await pool.query(
        'SELECT * FROM bookings WHERE user_id = $1 AND (deleted = FALSE OR deleted IS NULL) ORDER BY created_at DESC', 
        [userId]
      )
      return result.rows
    } catch (error) {
      console.error('Error getting bookings by user:', error)
      throw error
    }
  },

  // Get all bookings (admin) - Updated to exclude deleted bookings
  async getAllBookings(): Promise<Booking[]> {
    try {
      const result = await pool.query(`
        SELECT b.*, u.name AS user_name, u.email AS user_email 
        FROM bookings b 
        LEFT JOIN users u ON b.user_id = u.id 
        WHERE b.deleted = FALSE OR b.deleted IS NULL
        ORDER BY b.created_at DESC
      `)
      return result.rows
    } catch (error) {
      console.error('Error getting all bookings:', error)
      throw error
    }
  },

  // Update booking status - Updated version
  async updateBookingStatus(bookingId: number, status: string): Promise<Booking | null> {
    try {
      const result = await pool.query(
        'UPDATE bookings SET status = $1, updated_at = NOW() WHERE id = $2 AND (deleted = FALSE OR deleted IS NULL) RETURNING *',
        [status, bookingId]
      )
      return result.rows[0] || null
    } catch (error) {
      console.error('Error updating booking status:', error)
      throw error
    }
  },

  // Delete booking (soft delete) - New method
  async deleteBooking(bookingId: number): Promise<Booking | null> {
    try {
      const result = await pool.query(
        'UPDATE bookings SET deleted = TRUE, updated_at = NOW() WHERE id = $1 RETURNING *',
        [bookingId]
      )
      return result.rows[0] || null
    } catch (error) {
      console.error('Error deleting booking:', error)
      throw error
    }
  },

  // Equipment methods - New methods
  async getAllEquipments() {
    try {
      const result = await pool.query(`
        SELECT id, name, description, daily_rate, category, in_stock, image_url
        FROM equipments
        ORDER BY category, name
      `)
      return result.rows
    } catch (error) {
      console.error('Error getting all equipments:', error)
      throw error
    }
  },

  async createEquipmentRental(rental: {
    customer_name: string
    customer_email: string
    customer_phone?: string
    start_date: string
    end_date: string
    total_days: number
    total_cost: number
    special_requests?: string
  }) {
    try {
      const result = await pool.query(`
        INSERT INTO equipment_rentals 
          (customer_name, customer_email, customer_phone, start_date, end_date, total_days, total_cost, special_requests)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING *
      `, [
        rental.customer_name,
        rental.customer_email,
        rental.customer_phone || '',
        rental.start_date,
        rental.end_date,
        rental.total_days,
        rental.total_cost,
        rental.special_requests || ''
      ])
      return result.rows[0]
    } catch (error) {
      console.error('Error creating equipment rental:', error)
      throw error
    }
  },

  async addEquipmentRentalItem(item: {
    rental_id: number
    equipment_id: number
    quantity: number
    unit_price: number
    total_price: number
  }) {
    try {
      const result = await pool.query(`
        INSERT INTO equipment_rental_items (rental_id, equipment_id, quantity, unit_price, total_price)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *
      `, [item.rental_id, item.equipment_id, item.quantity, item.unit_price, item.total_price])
      return result.rows[0]
    } catch (error) {
      console.error('Error adding equipment rental item:', error)
      throw error
    }
  },

  async getAllEquipmentRentals() {
    try {
      const result = await pool.query(`
        SELECT 
          er.id, er.customer_name, er.customer_email, er.customer_phone,
          er.start_date, er.end_date, er.total_days, er.total_cost,
          er.status, er.special_requests, er.created_at,
          COALESCE(
            json_agg(
              CASE WHEN e.id IS NOT NULL THEN
                json_build_object(
                  'equipment_name', e.name,
                  'quantity', eri.quantity,
                  'unit_price', eri.unit_price,
                  'total_price', eri.total_price
                )
              END
            ) FILTER (WHERE e.id IS NOT NULL), 
            '[]'::json
          ) as items
        FROM equipment_rentals er
        LEFT JOIN equipment_rental_items eri ON er.id = eri.rental_id
        LEFT JOIN equipments e ON eri.equipment_id = e.id
        WHERE er.deleted = FALSE OR er.deleted IS NULL
        GROUP BY er.id, er.customer_name, er.customer_email, er.customer_phone,
                 er.start_date, er.end_date, er.total_days, er.total_cost,
                 er.status, er.special_requests, er.created_at
        ORDER BY er.created_at DESC
      `)
      return result.rows
    } catch (error) {
      console.error('Error getting all equipment rentals:', error)
      throw error
    }
  },

  async updateEquipmentRentalStatus(rentalId: number, status: string) {
    try {
      const result = await pool.query(
        'UPDATE equipment_rentals SET status = $1, updated_at = NOW() WHERE id = $2 AND (deleted = FALSE OR deleted IS NULL) RETURNING *',
        [status, rentalId]
      )
      return result.rows[0] || null
    } catch (error) {
      console.error('Error updating equipment rental status:', error)
      throw error
    }
  },

  async deleteEquipmentRental(rentalId: number) {
    try {
      const result = await pool.query(
        'UPDATE equipment_rentals SET deleted = TRUE, updated_at = NOW() WHERE id = $1 RETURNING *',
        [rentalId]
      )
      return result.rows[0] || null
    } catch (error) {
      console.error('Error deleting equipment rental:', error)
      throw error
    }
  },

  // Contact operations - Your existing methods
  async createContact(data: {
    first_name: string
    last_name: string
    email: string
    phone: string
    subject: string
    message: string
  }) {
    try {
      const { first_name, last_name, email, phone, subject, message } = data
      const result = await pool.query(
        `INSERT INTO contacts
         (first_name, last_name, email, phone, subject, message, created_at)
         VALUES ($1,$2,$3,$4,$5,$6,NOW())
         RETURNING *`,
        [first_name, last_name, email, phone, subject, message]
      )
      return result.rows[0]
    } catch (error) {
      console.error('Error creating contact:', error)
      throw error
    }
  },

  // Fetch all contacts (for admin)
  async getAllContacts() {
    try {
      const result = await pool.query(
        `SELECT id, first_name, last_name, email, phone, subject, message, created_at
         FROM contacts
         ORDER BY created_at DESC`
      )
      return result.rows
    } catch (error) {
      console.error('Error getting all contacts:', error)
      throw error
    }
  },

  // Utility method for custom queries
  async query(text: string, params?: any[]) {
    return pool.query(text, params)
  }
}

export default pool
