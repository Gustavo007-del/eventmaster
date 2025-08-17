"use client"

import { useState, useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'
import { Card, CardHeader, CardContent } from '@/components/ui/Card'

interface Contact {
  id: number
  first_name: string
  last_name: string
  email: string
  phone: string
  subject: string
  message: string
  created_at: string
}

export default function AdminContactsPage() {
  const { user } = useAuth()
  const [contacts, setContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchContacts = async () => {
      const res = await fetch('/api/admin/contacts', {
        headers: { Authorization: `Bearer ${localStorage.getItem('eventmaster_token')}` }
      })
      if (res.ok) {
        const data = await res.json()
        setContacts(data.contacts)
      }
      setLoading(false)
    }
    fetchContacts()
  }, [])

  if (user?.role !== 'admin') {
    return <div className="text-center py-8">Access Denied</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Contact Enquiries</h1>
      {loading ? (
        <p>Loading…</p>
      ) : contacts.length === 0 ? (
        <p>No enquiries yet.</p>
      ) : (
        <div className="space-y-4">
          {contacts.map(c => (
            <Card key={c.id}>
              <CardHeader>
                <div className="flex justify-between">
                  <span>{c.first_name} {c.last_name}</span>
                  <span className="text-sm text-gray-500">{new Date(c.created_at).toLocaleString()}</span>
                </div>
                <div className="text-sm text-gray-600">{c.email} • {c.phone}</div>
                <h3 className="mt-2 font-semibold">{c.subject}</h3>
              </CardHeader>
              <CardContent>
                <p>{c.message}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
