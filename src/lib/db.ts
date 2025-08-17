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
      const result = await pool.query('SELECT * FROM bookings WHERE user_id = $1 ORDER BY created_at DESC', [userId])
      return result.rows
    } catch (error) {
      console.error('Error getting bookings by user:', error)
      throw error
    }
  },

  // Get all bookings (admin)
  async getAllBookings(): Promise<Booking[]> {
    try {
      const result = await pool.query('SELECT b.*, u.name    AS user_name, u.email   AS user_email FROM bookings b LEFT JOIN users u ON b.user_id = u.id ORDER BY b.created_at DESC')
      return result.rows
    } catch (error) {
      console.error('Error getting all bookings:', error)
      throw error
    }
  },
  

  // Update booking status
  async updateBookingStatus(id: string | number, status: string): Promise<Booking | null> {
    try {
      const result = await pool.query(
        'UPDATE bookings SET status = $1, updated_at = NOW() WHERE id = $2 RETURNING *',
        [status, id]
      )
      return result.rows[0] || null
    } catch (error) {
      console.error('Error updating booking status:', error)
      throw error
    }
  },
  // Create a new contact entry
  async createContact(data: {
    first_name: string
    last_name: string
    email: string
    phone: string
    subject: string
    message: string
  }) {
    const { first_name, last_name, email, phone, subject, message } = data
    const result = await pool.query(
      `INSERT INTO contacts
       (first_name, last_name, email, phone, subject, message, created_at)
       VALUES ($1,$2,$3,$4,$5,$6,NOW())
       RETURNING *`,
      [first_name, last_name, email, phone, subject, message]
    )
    return result.rows[0]
  },
  // Fetch all contacts (for admin)
  async getAllContacts() {
    const result = await pool.query(
      `SELECT id, first_name, last_name, email, phone, subject, message, created_at
       FROM contacts
       ORDER BY created_at DESC`
    )
    return result.rows
  }
}

export default pool
