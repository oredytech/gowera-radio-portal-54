
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { useToast } from '../hooks/useToast'

interface PendingRadio {
  id: number
  name: string
  genre: string
  country: string
  submitted_by: string
  submitted_at: string
  stream_url: string
}

const NewRadiosPage = () => {
  const [pendingRadios, setPendingRadios] = useState<PendingRadio[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()
  
  useEffect(() => {
    fetchPendingRadios()
  }, [])
  
  const fetchPendingRadios = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('pending_radios')
        .select('*')
        .order('submitted_at', { ascending: false })
      
      if (error) {
        throw error
      }
      
      setPendingRadios(data || [])
    } catch (error) {
      console.error('Erreur lors de la récupération des radios en attente:', error)
      toast({
        title: 'Erreur',
        description: 'Impossible de charger les radios en attente',
        variant: 'destructive'
      })
    } finally {
      setLoading(false)
    }
  }
  
  const handleApproveRadio = async (id: number) => {
    try {
      // 1. Récupérer les détails de la radio
      const { data: radioToApprove, error: fetchError } = await supabase
        .from('pending_radios')
        .select('*')
        .eq('id', id)
        .single()
      
      if (fetchError || !radioToApprove) {
        throw fetchError || new Error('Radio non trouvée')
      }
      
      // 2. Ajouter à la table des radios approuvées
      const { error: insertError } = await supabase
        .from('radios')
        .insert([{
          name: radioToApprove.name,
          genre: radioToApprove.genre,
          country: radioToApprove.country,
          stream_url: radioToApprove.stream_url,
          approved_at: new Date().toISOString()
        }])
      
      if (insertError) {
        throw insertError
      }
      
      // 3. Supprimer de la table des radios en attente
      const { error: deleteError } = await supabase
        .from('pending_radios')
        .delete()
        .eq('id', id)
      
      if (deleteError) {
        throw deleteError
      }
      
      // 4. Mettre à jour l'interface
      setPendingRadios(pendingRadios.filter(radio => radio.id !== id))
      
      toast({
        title: 'Succès',
        description: 'Radio approuvée avec succès!',
      })
    } catch (error) {
      console.error('Erreur lors de l\'approbation de la radio:', error)
      toast({
        title: 'Erreur',
        description: 'Impossible d\'approuver la radio',
        variant: 'destructive'
      })
    }
  }
  
  const handleRejectRadio = async (id: number) => {
    try {
      // Supprimer de la table des radios en attente
      const { error } = await supabase
        .from('pending_radios')
        .delete()
        .eq('id', id)
      
      if (error) {
        throw error
      }
      
      // Mettre à jour l'interface
      setPendingRadios(pendingRadios.filter(radio => radio.id !== id))
      
      toast({
        title: 'Information',
        description: 'Radio rejetée.',
      })
    } catch (error) {
      console.error('Erreur lors du rejet de la radio:', error)
      toast({
        title: 'Erreur',
        description: 'Impossible de rejeter la radio',
        variant: 'destructive'
      })
    }
  }
  
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Nouvelles radios en attente d'approbation</h1>
      
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : pendingRadios.length === 0 ? (
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
                    <p><span className="font-medium">URL du flux:</span> <a href={radio.stream_url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">{radio.stream_url}</a></p>
                    <p><span className="font-medium">Soumis par:</span> {radio.submitted_by}</p>
                    <p><span className="font-medium">Date de soumission:</span> {new Date(radio.submitted_at).toLocaleDateString()}</p>
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
