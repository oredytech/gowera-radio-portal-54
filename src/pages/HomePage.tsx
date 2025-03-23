
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Radio as RadioIcon } from 'lucide-react'
import { useToast } from '../hooks/useToast'
import { fetchPopularRadios, Radio } from '../services/radioService'

const HomePage = () => {
  const [popularRadios, setPopularRadios] = useState<Radio[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()
  
  useEffect(() => {
    fetchPopularStations()
  }, [])
  
  const fetchPopularStations = async () => {
    try {
      setLoading(true)
      const data = await fetchPopularRadios(3)
      setPopularRadios(data)
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
  
  const playRadio = (streamUrl: string, radioName: string) => {
    // Dans une version réelle, cela pourrait lancer un lecteur audio
    window.open(streamUrl, '_blank');
    console.log(`Jouer la radio: ${radioName} (${streamUrl})`);
    toast({
      title: 'Lecture de la radio',
      description: `Vous écoutez maintenant ${radioName}`,
    })
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
            // Afficher les radios depuis l'API
            popularRadios.map((radio) => (
              <div key={radio.id} className="bg-card shadow-md rounded-lg p-6 flex flex-col items-center">
                <div className="w-24 h-24 bg-primary/10 rounded-full mb-4 flex items-center justify-center">
                  {radio.favicon && radio.favicon !== "" ? (
                    <img 
                      src={radio.favicon} 
                      alt={radio.name}
                      className="w-20 h-20 rounded-full object-cover"
                      onError={(e) => {
                        // If image fails to load, show radio icon instead
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  ) : (
                    <RadioIcon className="w-12 h-12 text-primary" />
                  )}
                </div>
                <h3 className="font-semibold">{radio.name}</h3>
                <p className="text-muted-foreground">{radio.genre.split(',')[0]}</p>
                <button 
                  onClick={() => playRadio(radio.stream_url, radio.name)} 
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
