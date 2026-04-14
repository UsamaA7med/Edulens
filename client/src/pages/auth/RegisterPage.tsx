import { RegisterForm } from '@/components/auth/RegisterForm'
import QuizeModeAnimation from '@/components/lottie/QuizeModeAnimation'

const RegisterPage = () => {
  return (
    <div className="flex items-center justify-center bg-background gap-20 px-5">
      <QuizeModeAnimation />
      <RegisterForm />
    </div>
  )
}

export default RegisterPage
