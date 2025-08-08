import { RegisterForm } from '@/components/forms/RegisterForm'
import { AuthLayout } from '@/components/layout/AuthLayout'

export default function RegisterPage() {
  return (
    <AuthLayout
      title="Create account"
      subtitle="Join thousands of satisfied customers"
      linkText="Already have an account? Sign in"
      linkHref="/login"
    >
      <RegisterForm />
    </AuthLayout>
  )
}
