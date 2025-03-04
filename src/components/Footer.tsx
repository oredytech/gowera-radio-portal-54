
import { Heart } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center">
          <p className="flex items-center">
            Fait avec <Heart className="h-4 w-4 mx-1 text-red-500" /> par Gowera
          </p>
          <p className="mt-2">© {new Date().getFullYear()} Gowera - Tous droits réservés</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
