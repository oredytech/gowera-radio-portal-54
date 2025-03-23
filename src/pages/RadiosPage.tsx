
import { useState, useEffect } from 'react'
import { Search, Radio as RadioIcon } from 'lucide-react'
import { useToast } from '../hooks/useToast'
import { fetchRadios, searchRadios, Radio } from '../services/radioService'

const RadiosPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [radios, setRadios] = useState<Radio[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()
  
  useEffect(() => {
    if (searchTerm.length === 0) {
      loadAllRadios()
    } else {
      const delaySearch = setTimeout(() => {
        searchForRadios(searchTerm)
      }, 500)
      
      return () => clearTimeout(delaySearch)
    }
  }, [searchTerm])
  
  const loadAllRadios = async () => {
    try {
      setLoading(true)
      const data = await fetchRadios(100)
      setRadios(data)
    } catch (error) {
      console.error('Erreur lors de la récupération des radios:', error)
      toast({
        title: 'Erreur',
        description: 'Impossible de charger les radios',
        variant: 'destructive'
      })
    } finally {
      setLoading(false)
    }
  }
  
  const searchForRadios = async (term: string) => {
    try {
      setLoading(true)
      const data = await searchRadios(term)
      setRadios(data)
    } catch (error) {
      console.error('Erreur lors de la recherche des radios:', error)
      toast({
        title: 'Erreur',
        description: 'Impossible de rechercher des radios',
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
    <div>
      <h1 className="text-3xl font-bold mb-6">Toutes les radios</h1>
      
      <div className="relative mb-8">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Rechercher une radio par nom, genre ou pays..."
          className="pl-10 w-full p-3 border rounded-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {radios.map((radio) => (
            <div key={radio.id} className="bg-card shadow-md rounded-lg p-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full mb-4 mx-auto flex items-center justify-center">
                {radio.favicon && radio.favicon !== "" ? (
                  <img 
                    src={radio.favicon} 
                    alt={radio.name}
                    className="w-12 h-12 rounded-full object-cover"
                    onError={(e) => {
                      // If image fails to load, show radio icon instead
                      (e.target as HTMLImageElement).style.display = 'none';
                      (e.target as HTMLImageElement).parentElement!.classList.add('radio-icon-fallback');
                    }}
                  />
                ) : (
                  <RadioIcon className="w-8 h-8 text-primary" />
                )}
              </div>
              <h3 className="font-semibold text-center">{radio.name}</h3>
              <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                <span>{radio.genre.split(',')[0]}</span>
                <span>{radio.country}</span>
              </div>
              <button 
                onClick={() => playRadio(radio.stream_url, radio.name)} 
                className="w-full mt-4 bg-primary text-primary-foreground px-4 py-2 rounded hover:bg-primary/90"
              >
                Écouter
              </button>
            </div>
          ))}
        </div>
      )}
      
      {!loading && radios.length === 0 && (
        <div className="text-center py-8">
          <p>Aucune radio ne correspond à votre recherche.</p>
        </div>
      )}
    </div>
  )
}

export default RadiosPage
