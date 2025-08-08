import { UserDashboard } from '@/components/dashboard/UserDashboard'
import { DashboardLayout } from '@/components/layout/DashboardLayout'

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <UserDashboard />
    </DashboardLayout>
  )
}
