import { FaGraduationCap } from 'react-icons/fa6'

const Navbar = () => {
  return (
    <div className="container mx-auto p-5 flex items-center justify-between">
      <h1 className="text-primary text-2xl font-semibold flex items-center gap-2">
        <FaGraduationCap size={30} />
        Edulens
      </h1>
      <div className="flex items-center gap-5 text-sm">
        <p>Support</p>
        <p>Academic Ethics</p>
      </div>
    </div>
  )
}

export default Navbar
