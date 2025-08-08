-- EventMaster Database Setup Script
-- Run this script in your PostgreSQL database

-- Create the database (run this as postgres user first)
-- CREATE DATABASE eventmasterdb;

-- Connect to the database
-- \c eventmasterdb;

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'user',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);

-- Insert default admin user (password: admin123)
-- Using a properly hashed bcrypt password
INSERT INTO users (name, email, password, role, created_at, updated_at) 
VALUES (
    'Admin User', 
    'admin@eventmaster.com', 
    '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewYmN7/A2HqC4ZX6', 
    'admin', 
    NOW(), 
    NOW()
) ON CONFLICT (email) DO NOTHING;

-- Create services table
CREATE TABLE IF NOT EXISTS services (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price_from INTEGER NOT NULL,
    category VARCHAR(100),
    features JSONB,
    image_url VARCHAR(500),
    popular BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create equipment table
CREATE TABLE IF NOT EXISTS equipment (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price_per_day INTEGER NOT NULL,
    category VARCHAR(100),
    image_url VARCHAR(500),
    available BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create bookings table
CREATE TABLE IF NOT EXISTS bookings (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    service_name VARCHAR(255),
    event_date DATE,
    status VARCHAR(50) DEFAULT 'pending',
    total_amount INTEGER,
    event_type VARCHAR(100),
    guests INTEGER,
    message TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for bookings
CREATE INDEX IF NOT EXISTS idx_bookings_user_id ON bookings(user_id);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_bookings_event_date ON bookings(event_date);

-- Create reviews table
CREATE TABLE IF NOT EXISTS reviews (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    booking_id INTEGER REFERENCES bookings(id),
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    approved BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert sample services
INSERT INTO services (name, description, price_from, category, features, popular) VALUES
('Luxury Wedding Package', 'Complete luxury wedding planning with premium decorations and world-class entertainment', 500000, 'wedding', '["Premium venue decoration", "5-star catering", "Professional photography", "Live entertainment"]', true),
('Corporate Events', 'Professional corporate event management with cutting-edge technology', 150000, 'corporate', '["Modern AV setup", "Registration systems", "Professional catering", "Live streaming"]', false),
('Birthday Celebrations', 'Magical birthday celebrations with custom themes and entertainment', 25000, 'birthday', '["Custom themes", "Entertainment", "Interactive games", "Photo booths"]', false),
('Anniversary Celebrations', 'Romantic anniversary setups with elegant decorations and intimate ambiance', 35000, 'anniversary', '["Romantic lighting", "Floral arrangements", "Live music", "Private dining"]', false),
('Cultural Events', 'Traditional cultural celebrations with authentic decorations and performances', 75000, 'cultural', '["Traditional decor", "Cultural performances", "Authentic cuisine", "Religious ceremonies"]', false),
('Product Launches', 'Professional product launch events with modern staging and media coverage', 100000, 'corporate', '["Modern staging", "Media management", "Interactive displays", "Networking spaces"]', false)
ON CONFLICT DO NOTHING;

-- Insert sample equipment
INSERT INTO equipment (name, description, price_per_day, category, available) VALUES
('Premium Chiavari Chairs', 'Elegant premium chairs perfect for luxury events', 200, 'furniture', true),
('Professional Sound System', 'High-end audio equipment for crystal-clear sound', 8000, 'audio', true),
('LED Stage Lighting', 'Professional RGB LED lighting with DMX control', 12000, 'lighting', true),
('Silent Generator', 'Ultra-quiet power generator for premium events', 6000, 'power', true),
('Round Tables', 'Elegant round tables for dining and gatherings', 300, 'furniture', true),
('Wedding Mandap', 'Beautiful traditional mandap for Hindu weddings', 25000, 'decor', true),
('Catering Equipment', 'Complete catering setup with utensils and serving items', 5000, 'catering', true),
('Photo Booth Setup', 'Interactive photo booth with props and backdrop', 3500, 'entertainment', true)
ON CONFLICT DO NOTHING;

-- Verify setup
SELECT 'Database setup completed successfully!' as message;

-- Show table counts
SELECT 
    'users' as table_name, COUNT(*) as count FROM users
UNION ALL
SELECT 
    'services' as table_name, COUNT(*) as count FROM services
UNION ALL
SELECT 
    'equipment' as table_name, COUNT(*) as count FROM equipment
UNION ALL
SELECT 
    'bookings' as table_name, COUNT(*) as count FROM bookings;

-- Show admin user
SELECT name, email, role FROM users WHERE role = 'admin';
