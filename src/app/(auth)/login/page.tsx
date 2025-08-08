import { LoginForm } from '@/components/forms/LoginForm'
import { AuthLayout } from '@/components/layout/AuthLayout'

export default function LoginPage() {
  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to your account to continue"
      linkText="Don't have an account? Sign up"
      linkHref="/register"
    >
      <LoginForm />
    </AuthLayout>
  )
}
