
import { Link } from 'react-router-dom'
import { Radio } from 'lucide-react'

const Navbar = () => {
  return (
    <header className="bg-primary text-primary-foreground shadow-md">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-2">
            <Radio size={24} />
            <Link to="/" className="text-2xl font-bold">Gowera</Link>
          </div>
          
          <ul className="flex space-x-6 mt-4 md:mt-0">
            <li>
              <Link to="/" className="hover:underline">Accueil</Link>
            </li>
            <li>
              <Link to="/radios" className="hover:underline">Radios</Link>
            </li>
            <li>
              <Link to="/nouvelles-radios" className="hover:underline">Nouvelles Radios</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Navbar
