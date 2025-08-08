import { AdminDashboard } from '@/components/dashboard/AdminDashboard'
import { DashboardLayout } from '@/components/layout/DashboardLayout'

export default function AdminPage() {
  return (
    <DashboardLayout>
      <AdminDashboard />
    </DashboardLayout>
  )
}
