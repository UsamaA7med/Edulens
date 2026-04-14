import { LoginForm } from '@/components/auth/LoginForm'
import WelcomeAnimation from '@/components/lottie/WelcomeAnimation'

const LoginPage = () => {
  return (
    <div className="flex items-center justify-center bg-background gap-20 px-5">
      <WelcomeAnimation />
      <LoginForm />
    </div>
  )
}

export default LoginPage
