import { DotLottieReact } from '@lottiefiles/dotlottie-react'

export default function WelcomeAnimation() {
  return (
    <DotLottieReact
      className="md:w-[300px] md:h-[300px] lg:w-[400px] lg:h-[400px] hidden md:block"
      src="/Welcome.json"
      loop
      autoplay
    />
  )
}
