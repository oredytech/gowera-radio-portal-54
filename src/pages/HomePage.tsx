
import { Link } from 'react-router-dom'

const HomePage = () => {
  return (
    <div className="flex flex-col items-center">
      <section className="text-center max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Bienvenue sur Gowera</h1>
        <p className="text-xl mb-8">
          Votre plateforme d'écoute de radios en ligne gratuite
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
          <Link 
            to="/radios" 
            className="bg-primary text-primary-foreground px-6 py-3 rounded-md hover:bg-primary/90"
          >
            Découvrir les radios
          </Link>
          <Link 
            to="/suggerer-radio" 
            className="bg-secondary text-secondary-foreground px-6 py-3 rounded-md hover:bg-secondary/90"
          >
            Suggérer une radio
          </Link>
        </div>
      </section>
      
      <section className="mt-16 w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Radios populaires</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {/* Ces éléments seront remplacés par des vraies données */}
          {[1, 2, 3].map((item) => (
            <div key={item} className="bg-card shadow-md rounded-lg p-6 flex flex-col items-center">
              <div className="w-24 h-24 bg-gray-200 rounded-full mb-4"></div>
              <h3 className="font-semibold">Radio {item}</h3>
              <p className="text-muted-foreground">Genre musical</p>
            </div>
          ))}
        </div>
      </section>
      
      <section className="mt-16 w-full bg-muted p-8 rounded-lg">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Vous connaissez une radio qui n'est pas sur Gowera ?</h2>
          <p className="mb-6">
            Aidez-nous à enrichir notre catalogue en suggérant de nouvelles radios !
          </p>
          <Link 
            to="/suggerer-radio" 
            className="bg-primary text-primary-foreground px-6 py-3 rounded-md hover:bg-primary/90 inline-block"
          >
            Suggérer une radio
          </Link>
        </div>
      </section>
    </div>
  )
}

export default HomePage
