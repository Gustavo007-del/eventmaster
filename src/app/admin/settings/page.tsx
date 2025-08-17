"use client"

import { useAuth } from '@/context/AuthContext'
import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { ArrowLeft, Settings, Database, Users, Bell } from 'lucide-react'
import Link from 'next/link'


export default function AdminSettingsPage() {
  const { user } = useAuth()

  if (user?.role !== 'admin') {
    return <div className="text-center py-8">Access Denied</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center gap-4">
        <Link href="/admin">
          <Button variant="outline" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </Link>
        <div>
          <h1 className="text-4xl font-bold text-gray-900">System Settings</h1>
          <p className="text-gray-600">Configure your EventMaster system</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Database className="w-5 h-5" />
              Database Settings
            </h3>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600">Manage database connections and backup settings</p>
            <Button variant="outline" className="w-full">
              Configure Database
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Users className="w-5 h-5" />
              User Management
            </h3>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600">Configure user roles and permissions</p>
            <Button variant="outline" className="w-full">
              Manage Permissions
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Notifications
            </h3>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600">Configure email and system notifications</p>
            <Button variant="outline" className="w-full">
              Setup Notifications
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Settings className="w-5 h-5" />
              General Settings
            </h3>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600">System-wide configuration options</p>
            <Button variant="outline" className="w-full">
              Configure System
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
