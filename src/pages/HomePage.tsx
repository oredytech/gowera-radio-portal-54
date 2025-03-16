
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { useToast } from '../hooks/useToast'

interface Radio {
  id: number
  name: string
  genre: string
  country: string
  stream_url: string
}

const HomePage = () => {
  const [popularRadios, setPopularRadios] = useState<Radio[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()
  
  useEffect(() => {
    fetchPopularRadios()
  }, [])
  
  const fetchPopularRadios = async () => {
    try {
      setLoading(true)
      // Récupérer les 3 premières radios (à terme, vous pourriez ajouter une colonne "popular" ou compter les écoutes)
      const { data, error } = await supabase
        .from('radios')
        .select('*')
        .limit(3)
      
      if (error) {
        throw error
      }
      
      setPopularRadios(data || [])
    } catch (error) {
      console.error('Erreur lors de la récupération des radios populaires:', error)
      toast({
        title: 'Erreur',
        description: 'Impossible de charger les radios populaires',
        variant: 'destructive'
      })
    } finally {
      setLoading(false)
    }
  }
  
  const playRadio = (streamUrl: string) => {
    // Dans une version réelle, cela pourrait lancer un lecteur audio
    window.open(streamUrl, '_blank');
    console.log(`Jouer la radio: ${streamUrl}`);
  };

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
          {loading ? (
            // Afficher un chargement pendant la récupération des données
            [...Array(3)].map((_, index) => (
              <div key={`skeleton-${index}`} className="bg-card shadow-md rounded-lg p-6 flex flex-col items-center animate-pulse">
                <div className="w-24 h-24 bg-gray-200 rounded-full mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-16"></div>
              </div>
            ))
          ) : popularRadios.length > 0 ? (
            // Afficher les radios depuis la base de données
            popularRadios.map((radio) => (
              <div key={radio.id} className="bg-card shadow-md rounded-lg p-6 flex flex-col items-center">
                <div className="w-24 h-24 bg-primary/10 rounded-full mb-4 flex items-center justify-center text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9"></path>
                    <path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5"></path>
                    <circle cx="12" cy="12" r="2"></circle>
                    <path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5"></path>
                    <path d="M19.1 4.9C23 8.8 23 15.1 19.1 19"></path>
                  </svg>
                </div>
                <h3 className="font-semibold">{radio.name}</h3>
                <p className="text-muted-foreground">{radio.genre}</p>
                <button 
                  onClick={() => playRadio(radio.stream_url)} 
                  className="mt-4 bg-primary text-primary-foreground px-4 py-2 rounded hover:bg-primary/90 text-sm"
                >
                  Écouter
                </button>
              </div>
            ))
          ) : (
            // Message si aucune radio n'est disponible
            <div className="col-span-3 text-center py-8">
              <p>Aucune radio disponible pour le moment.</p>
              <Link 
                to="/suggerer-radio" 
                className="text-primary hover:underline mt-2 inline-block"
              >
                Suggérer une radio
              </Link>
            </div>
          )}
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
