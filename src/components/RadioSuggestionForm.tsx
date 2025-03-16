
import { useState } from 'react';
import { supabase } from '../lib/supabase';

interface RadioSuggestionFormProps {
  onSuccess?: () => void;
}

const RadioSuggestionForm = ({ onSuccess }: RadioSuggestionFormProps) => {
  const [name, setName] = useState('');
  const [genre, setGenre] = useState('');
  const [country, setCountry] = useState('');
  const [streamUrl, setStreamUrl] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const validateUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    // Validation basique
    if (!name || !genre || !country || !streamUrl || !email) {
      setError('Tous les champs sont obligatoires');
      setIsSubmitting(false);
      return;
    }

    // Validation de l'URL
    if (!validateUrl(streamUrl)) {
      setError("L'URL du flux doit être valide");
      setIsSubmitting(false);
      return;
    }

    try {
      // Enregistrer dans Supabase
      const { error: supabaseError } = await supabase
        .from('pending_radios')
        .insert([
          {
            name,
            genre,
            country,
            stream_url: streamUrl,
            submitted_by: email,
            submitted_at: new Date().toISOString(),
          },
        ]);

      if (supabaseError) {
        console.error('Erreur Supabase:', supabaseError);
        setError(`Erreur lors de l'enregistrement: ${supabaseError.message}`);
        setIsSubmitting(false);
        return;
      }

      // Succès
      setSuccess(true);
      setName('');
      setGenre('');
      setCountry('');
      setStreamUrl('');
      setEmail('');
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      console.error('Erreur:', err);
      setError('Une erreur est survenue lors de la soumission');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-card shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-6">Suggérer une radio</h2>
      
      {success ? (
        <div className="bg-green-100 text-green-800 p-4 rounded-md mb-4">
          Votre suggestion a été enregistrée avec succès. Merci pour votre contribution !
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-100 text-red-800 p-4 rounded-md mb-4">
              {error}
            </div>
          )}
          
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Nom de la radio
            </label>
            <input
              type="text"
              id="name"
              className="w-full p-2 border rounded-md"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          
          <div>
            <label htmlFor="genre" className="block text-sm font-medium mb-1">
              Genre musical
            </label>
            <input
              type="text"
              id="genre"
              className="w-full p-2 border rounded-md"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              required
            />
          </div>
          
          <div>
            <label htmlFor="country" className="block text-sm font-medium mb-1">
              Pays
            </label>
            <input
              type="text"
              id="country"
              className="w-full p-2 border rounded-md"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            />
          </div>
          
          <div>
            <label htmlFor="streamUrl" className="block text-sm font-medium mb-1">
              URL du flux audio
            </label>
            <input
              type="url"
              id="streamUrl"
              className="w-full p-2 border rounded-md"
              value={streamUrl}
              onChange={(e) => setStreamUrl(e.target.value)}
              placeholder="https://exemple.com/stream"
              required
            />
            <p className="text-xs text-muted-foreground mt-1">
              L'URL doit pointer vers un flux audio valide.
            </p>
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Votre email
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-2 border rounded-md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-primary text-primary-foreground px-4 py-2 rounded hover:bg-primary/90 mt-4"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Envoi en cours...' : 'Soumettre la radio'}
          </button>
        </form>
      )}
    </div>
  );
};

export default RadioSuggestionForm;
