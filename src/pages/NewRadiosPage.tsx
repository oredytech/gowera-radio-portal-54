
import { useState } from 'react'

const DUMMY_PENDING_RADIOS = [
  { 
    id: 1, 
    name: 'Afro Hits', 
    genre: 'Afrobeat', 
    country: 'Sénégal',
    submittedBy: 'radio@afrobeats.com',
    submittedAt: '2023-08-15'
  },
  { 
    id: 2, 
    name: 'Latino Mix', 
    genre: 'Latino', 
    country: 'Mexique',
    submittedBy: 'contact@latinomix.fm',
    submittedAt: '2023-08-12'
  },
  { 
    id: 3, 
    name: 'R&B Soul', 
    genre: 'R&B', 
    country: 'USA',
    submittedBy: 'info@rbsoul.com',
    submittedAt: '2023-08-10'
  },
]

const NewRadiosPage = () => {
  // Dans une application réelle, cet état serait synchronisé avec la base de données Supabase
  const [pendingRadios, setPendingRadios] = useState(DUMMY_PENDING_RADIOS)
  
  const handleApproveRadio = (id: number) => {
    // Dans une application réelle, cette fonction:
    // 1. Enverrait une requête à Supabase pour approuver la radio
    // 2. Déplacerait la radio de la table "pending_radios" à "radios"
    console.log(`Radio ${id} approuvée`)
    
    // Simulation: Supprimer de la liste des radios en attente
    setPendingRadios(pendingRadios.filter(radio => radio.id !== id))
    
    // Afficher une notification
    alert('Radio approuvée avec succès!')
  }
  
  const handleRejectRadio = (id: number) => {
    // Dans une application réelle, cette fonction:
    // 1. Enverrait une requête à Supabase pour rejeter la radio
    // 2. Supprimerait la radio de la table "pending_radios"
    console.log(`Radio ${id} rejetée`)
    
    // Simulation: Supprimer de la liste des radios en attente
    setPendingRadios(pendingRadios.filter(radio => radio.id !== id))
    
    // Afficher une notification
    alert('Radio rejetée.')
  }
  
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Nouvelles radios en attente d'approbation</h1>
      
      {pendingRadios.length === 0 ? (
        <div className="text-center py-12 bg-muted rounded-lg">
          <p className="text-xl">Aucune nouvelle radio en attente d'approbation.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {pendingRadios.map((radio) => (
            <div key={radio.id} className="bg-card shadow-md rounded-lg p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h3 className="font-semibold text-xl">{radio.name}</h3>
                  <div className="mt-2 space-y-1 text-muted-foreground">
                    <p><span className="font-medium">Genre:</span> {radio.genre}</p>
                    <p><span className="font-medium">Pays:</span> {radio.country}</p>
                    <p><span className="font-medium">Soumis par:</span> {radio.submittedBy}</p>
                    <p><span className="font-medium">Date de soumission:</span> {radio.submittedAt}</p>
                  </div>
                </div>
                
                <div className="flex space-x-3 mt-4 md:mt-0">
                  <button 
                    onClick={() => handleApproveRadio(radio.id)}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                  >
                    Approuver
                  </button>
                  <button 
                    onClick={() => handleRejectRadio(radio.id)}
                    className="bg-destructive text-destructive-foreground px-4 py-2 rounded hover:bg-destructive/90"
                  >
                    Rejeter
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      <div className="mt-12 p-6 bg-muted rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Comment ça fonctionne ?</h2>
        <ol className="list-decimal pl-6 space-y-2">
          <li>Vous recevez un email lorsqu'une nouvelle radio est soumise</li>
          <li>L'email contient un lien vers cette page</li>
          <li>Vous pouvez approuver ou rejeter les nouvelles radios</li>
          <li>Les radios approuvées apparaîtront automatiquement dans la liste des radios</li>
        </ol>
      </div>
    </div>
  )
}

export default NewRadiosPage
