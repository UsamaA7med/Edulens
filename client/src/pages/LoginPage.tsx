import WelcomeAnimation from '@/assets/lottie/WelcomeAnimation'
import { LoginForm } from '@/components/auth/LoginForm'

const LoginPage = () => {
  return (
    <div className="flex items-center justify-center bg-background gap-20 px-5">
      <WelcomeAnimation />
      <LoginForm />
    </div>
  )
}

export default LoginPage
