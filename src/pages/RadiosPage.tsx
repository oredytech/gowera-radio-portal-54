
import { useState } from 'react'
import { Search } from 'lucide-react'

const DUMMY_RADIOS = [
  { id: 1, name: 'Radio One', genre: 'Pop', country: 'France' },
  { id: 2, name: 'Jazz FM', genre: 'Jazz', country: 'USA' },
  { id: 3, name: 'Rock Station', genre: 'Rock', country: 'UK' },
  { id: 4, name: 'Classical Vibes', genre: 'Classique', country: 'Allemagne' },
  { id: 5, name: 'Reggae Beats', genre: 'Reggae', country: 'Jamaïque' },
  { id: 6, name: 'Electronic Mix', genre: 'Électronique', country: 'Pays-Bas' },
]

const RadiosPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  
  const filteredRadios = DUMMY_RADIOS.filter(radio =>
    radio.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    radio.genre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    radio.country.toLowerCase().includes(searchTerm.toLowerCase())
  )
  
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
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRadios.map((radio) => (
          <div key={radio.id} className="bg-card shadow-md rounded-lg p-6">
            <div className="w-16 h-16 bg-gray-200 rounded-full mb-4 mx-auto"></div>
            <h3 className="font-semibold text-center">{radio.name}</h3>
            <div className="flex justify-between mt-2 text-sm text-muted-foreground">
              <span>{radio.genre}</span>
              <span>{radio.country}</span>
            </div>
            <button className="w-full mt-4 bg-primary text-primary-foreground px-4 py-2 rounded hover:bg-primary/90">
              Écouter
            </button>
          </div>
        ))}
      </div>
      
      {filteredRadios.length === 0 && (
        <div className="text-center py-8">
          <p>Aucune radio ne correspond à votre recherche.</p>
        </div>
      )}
    </div>
  )
}

export default RadiosPage
