"use client"

import React, { createContext, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { User, AuthContextType } from '@/types'

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  const isAdmin = user?.role === 'admin'

  useEffect(() => {
    checkAuthStatus()
  }, [])

  const checkAuthStatus = async () => {
    try {
      const token = localStorage.getItem('eventmaster_token')
      if (!token) {
        setLoading(false)
        return
      }

      console.log('🔍 Checking authentication status')

      const response = await fetch('/api/auth/verify', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        const data = await response.json()
        setUser(data.user)
        console.log('✅ Authentication valid for:', data.user.email)
      } else {
        localStorage.removeItem('eventmaster_token')
        console.log('❌ Authentication invalid, token removed')
      }
    } catch (error) {
      console.error('Auth check failed:', error)
      localStorage.removeItem('eventmaster_token')
    } finally {
      setLoading(false)
    }
  }

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      console.log('🔐 Attempting login for:', email)

      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (response.ok) {
        localStorage.setItem('eventmaster_token', data.token)
        setUser(data.user)
        toast.success(`Welcome back, ${data.user.name}!`)

        console.log('✅ Login successful for:', data.user.email)

        // Redirect based on role
        if (data.user.role === 'admin') {
          router.push('/admin')
        } else {
          router.push('/dashboard')
        }
        return true
      } else {
        console.log('❌ Login failed:', data.message)
        toast.error(data.message || 'Login failed')
        return false
      }
    } catch (error) {
      console.error('💥 Login error:', error)
      toast.error('Login failed. Please try again.')
      return false
    }
  }

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      console.log('📝 Attempting registration for:', email)

      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      })

      const data = await response.json()

      if (response.ok) {
        localStorage.setItem('eventmaster_token', data.token)
        setUser(data.user)
        toast.success(`Welcome to EventMaster, ${data.user.name}!`)

        console.log('✅ Registration successful for:', data.user.email)
        router.push('/dashboard')
        return true
      } else {
        console.log('❌ Registration failed:', data.message)
        toast.error(data.message || 'Registration failed')
        return false
      }
    } catch (error) {
      console.error('💥 Registration error:', error)
      toast.error('Registration failed. Please try again.')
      return false
    }
  }

  const logout = () => {
    localStorage.removeItem('eventmaster_token')
    setUser(null)
    toast.success('Logged out successfully')
    router.push('/')
    console.log('👋 User logged out')
  }

  return (
    <AuthContext.Provider value={{
      user,
      login,
      register,
      logout,
      loading,
      isAdmin
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
