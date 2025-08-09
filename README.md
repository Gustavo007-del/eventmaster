# 🎉 EventMaster - Professional Event Management Platform

A complete, production-ready event management platform built with **Next.js 14**, **PostgreSQL**, and modern web technologies. Features separate pages for each functionality with proper authentication and admin controls.

## 🚀 Features

### 🔐 Complete Authentication System
- User registration and login with validation
- JWT-based authentication with secure token management
- Role-based access control (User/Admin)
- Protected routes with middleware
- Password hashing with bcrypt (12 salt rounds)

### 📄 Organized Page Structure
- **Authentication Pages**: Separate login and registration
- **Main Pages**: Services, Equipment, Booking, Gallery, Contact
- **Dashboard Pages**: User dashboard, Admin dashboard, Profile
- **Responsive Layout**: Mobile-first design approach

### 👤 User Features
- **Browse Services**: 6 professional service packages with pricing
- **Equipment Rental**: 8+ equipment items with availability status
- **Event Booking**: Complete booking form with validation
- **Gallery**: Beautiful showcase of past events
- **Profile Management**: Update personal information
- **Dashboard**: Personal booking history and statistics

### 🛡️ Admin Features
- **Admin Dashboard**: Business analytics and metrics
- **User Management**: View and manage all users
- **Booking Management**: Approve/reject bookings
- **Revenue Tracking**: Financial analytics and growth metrics
- **Content Management**: Update services and equipment

### 🎨 Professional Design
- **Modern UI**: Clean, professional interface
- **Component Library**: Reusable UI components
- **Smooth Animations**: Professional transitions and effects
- **Responsive Design**: Works perfectly on all devices
- **Accessibility**: Full keyboard navigation and screen reader support

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 with App Router & TypeScript
- **Database**: PostgreSQL with connection pooling
- **Authentication**: JWT tokens with bcrypt password hashing
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Custom component library
- **Icons**: Lucide React
- **Notifications**: React Hot Toast
- **Forms**: React Hook Form with validation
- **State Management**: React Context API

## 📋 Prerequisites

- **Node.js 18+** installed on your system
- **PostgreSQL** installed and running
- **Git** for version control (optional)

## 🚀 Quick Start Guide

### Step 1: Extract and Install Dependencies

```bash
# Extract the project files
unzip eventmaster-new.zip
cd eventmaster-new

# Install dependencies
npm install
```

### Step 2: Database Setup

1. **Create PostgreSQL Database**:
   ```bash
   # Connect to PostgreSQL
   psql -U postgres -h localhost -p 5432

   # Create database
   CREATE DATABASE eventmasterdb;

   # Exit psql
   \q
   ```
# Test commit to trigger Vercel deploy
# nwww
# nnnn
# mmmm
2. **Run Database Setup Script**:
   ```bash
   # Run the setup script
   psql -U postgres -d eventmasterdb -f database-setup.sql
   ```

   This will create:
   - `users` table with admin user
   - `services` table with sample services
   - `equipment` table with sample equipment
   - `bookings` table for user bookings
   - `reviews` table for customer reviews
   - All necessary indexes for performance

### Step 3: Environment Configuration

Your `.env.local` file is pre-configured:

```env
DATABASE_URL=postgresql://postgres:admin@localhost:5432/eventmasterdb
JWT_SECRET=eventmaster-super-secret-jwt-key-2024-production
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=eventmaster-nextauth-secret-key
NODE_ENV=development
```

### Step 4: Start Development Server

```bash
npm run dev
```

Your application will be available at **http://localhost:3000**

### Step 5: Test the Application

#### Demo Credentials:
- **Admin**: admin@eventmaster.com / admin123
- **User**: Create new account via registration

#### Test the Complete Flow:
1. **Homepage**: Browse services and equipment
2. **Register**: Create a new user account
3. **Login**: Access your dashboard
4. **Services**: View detailed service listings
5. **Equipment**: Browse equipment rental options
6. **Booking**: Create event bookings
7. **Gallery**: View event photos
8. **Contact**: Send inquiries
9. **Admin**: Login as admin to manage everything

## 📁 Project Structure

```
eventmaster-new/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (auth)/            # Authentication pages
│   │   │   ├── login/         # Login page
│   │   │   └── register/      # Registration page
│   │   ├── (dashboard)/       # Dashboard pages
│   │   │   ├── dashboard/     # User dashboard
│   │   │   ├── admin/         # Admin dashboard
│   │   │   └── profile/       # User profile
│   │   ├── (main)/            # Main application pages
│   │   │   ├── services/      # Services listing
│   │   │   ├── equipment/     # Equipment rental
│   │   │   ├── booking/       # Event booking
│   │   │   ├── gallery/       # Event gallery
│   │   │   └── contact/       # Contact page
│   │   ├── api/               # API routes
│   │   │   ├── auth/          # Authentication endpoints
│   │   │   ├── users/         # User management
│   │   │   └── bookings/      # Booking management
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Homepage
│   │   └── globals.css        # Global styles
│   ├── components/            # React components
│   │   ├── ui/                # Base UI components
│   │   ├── layout/            # Layout components
│   │   ├── forms/             # Form components
│   │   └── sections/          # Page sections
│   ├── context/               # React context
│   ├── hooks/                 # Custom React hooks
│   ├── lib/                   # Utilities and database
│   └── types/                 # TypeScript definitions
├── database-setup.sql         # Database setup script
├── package.json              # Dependencies
└── README.md                 # This file
```

## 🎯 Pages Overview

### Authentication Pages
- **`/login`** - User login with validation
- **`/register`** - User registration with password strength

### Main Application Pages
- **`/`** - Homepage with hero, stats, previews
- **`/services`** - Complete service listings with details
- **`/equipment`** - Equipment rental with categories
- **`/booking`** - Event booking form
- **`/gallery`** - Event photo showcase
- **`/contact`** - Contact form and information

### Dashboard Pages
- **`/dashboard`** - User dashboard with bookings
- **`/admin`** - Admin dashboard with analytics
- **`/profile`** - User profile management

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/verify` - Token verification

### User Management
- `GET /api/users` - Get all users (admin only)

### Bookings
- `GET /api/bookings` - Get user bookings
- `POST /api/bookings` - Create new booking

### Testing
- `GET /api/test-db` - Test database connection

## 📊 Database Schema

### Users Table
```sql
users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'user',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
)
```

### Services Table
```sql
services (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price_from INTEGER NOT NULL,
    category VARCHAR(100),
    features JSONB,
    popular BOOLEAN DEFAULT false
)
```

### Bookings Table
```sql
bookings (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    service_name VARCHAR(255),
    event_date DATE,
    status VARCHAR(50) DEFAULT 'pending',
    total_amount INTEGER,
    event_type VARCHAR(100),
    guests INTEGER,
    message TEXT
)
```

## 🔒 Security Features

- **Password Security**: bcrypt with 12 salt rounds
- **JWT Authentication**: Secure token-based system
- **Input Validation**: Server-side validation for all forms
- **SQL Injection Protection**: Parameterized queries
- **XSS Protection**: Input sanitization
- **CSRF Protection**: Same-origin policy
- **Role-based Access**: Admin/user permissions

## 📱 Responsive Design

- **Mobile-First**: Optimized for mobile devices (375px+)
- **Tablet Support**: Perfect for tablets (768px+)
- **Desktop Perfect**: Full-featured desktop interface (1024px+)
- **Touch Optimized**: Smooth touch interactions
- **Progressive Enhancement**: Works without JavaScript

## 🚀 Production Deployment

### Build for Production
```bash
npm run build
npm start
```

### Environment Variables for Production
```env
DATABASE_URL=your-production-database-url
NEXTAUTH_URL=https://yourdomain.com
JWT_SECRET=your-production-jwt-secret-128-chars-long
NEXTAUTH_SECRET=your-production-nextauth-secret
NODE_ENV=production
```

### Deployment Platforms
- **Vercel**: Perfect for Next.js (recommended)
- **Railway**: Database and application hosting
- **AWS/DigitalOcean**: Full server deployment
- **Netlify**: Static hosting with serverless functions

## 🎯 Key Improvements Over Previous Version

### Organization
- **Separate Pages**: Each feature has its own dedicated page
- **Route Groups**: Organized routes with (auth), (dashboard), (main)
- **Component Structure**: Logical component organization
- **Type Safety**: Complete TypeScript coverage

### Authentication
- **Working Login/Register**: Fully functional with detailed debugging
- **Token Management**: Proper JWT handling
- **Role-based Access**: Admin and user permissions
- **Security**: Production-ready security measures

### User Experience
- **Individual Pages**: Dedicated pages for each feature
- **Navigation**: Intuitive navigation between sections
- **Loading States**: Proper loading indicators
- **Error Handling**: Comprehensive error messages
- **Responsive Design**: Mobile-first approach

### Development Experience
- **Type Safety**: Full TypeScript support
- **Component Library**: Reusable UI components
- **Custom Hooks**: Optimized data fetching
- **Debugging**: Detailed console logging

## 🆘 Troubleshooting

### Common Issues

1. **Database Connection Failed**
   - Check PostgreSQL is running: `systemctl status postgresql`
   - Verify connection string in `.env.local`
   - Ensure database exists: `psql -U postgres -l`

2. **Login Issues**
   - Check admin user exists: `SELECT * FROM users WHERE role = 'admin';`
   - Verify password hash is correct
   - Check JWT secret is set in environment

3. **Permission Denied (Admin)**
   - Verify user role in database
   - Check JWT token contains correct role
   - Clear localStorage and login again

4. **Build Errors**
   - Run `npm install` to ensure all dependencies
   - Check TypeScript errors: `npx tsc --noEmit`
   - Clear Next.js cache: `rm -rf .next`

### Debug Mode
Enable detailed logging by checking your browser console and terminal output. The application includes comprehensive logging for troubleshooting.

## 📈 Future Enhancements

### Planned Features
- **Payment Integration**: Stripe/Razorpay for online payments
- **Email System**: Automated notifications and confirmations
- **Calendar Integration**: Event scheduling and reminders
- **File Uploads**: Image uploads for events and equipment
- **Advanced Analytics**: Detailed business insights
- **Multi-language**: Internationalization support

### Business Features
- **Invoice Generation**: Automated billing system
- **Customer Portal**: Enhanced customer experience
- **Staff Management**: Team member roles and permissions
- **Inventory Tracking**: Real-time equipment availability
- **Marketing Tools**: Email campaigns and promotions

## 📄 License

This project is created for commercial use. Feel free to modify and distribute for your business requirements.

---

**EventMaster** - Transform your events into unforgettable experiences! 🎉

Built with ❤️ using Next.js 14, PostgreSQL, and modern web technologies.

For support or questions, check the troubleshooting section or review the detailed console logs for debugging information.
