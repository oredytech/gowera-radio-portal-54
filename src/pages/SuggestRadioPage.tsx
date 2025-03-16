
import RadioSuggestionForm from '../components/RadioSuggestionForm';

const SuggestRadioPage = () => {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Suggérer une nouvelle radio</h1>
      
      <div className="mb-8">
        <p className="text-muted-foreground">
          Vous connaissez une radio qui n'est pas encore sur notre plateforme ? 
          Suggérez-la en remplissant le formulaire ci-dessous. Notre équipe examinera 
          votre suggestion et l'ajoutera à notre catalogue après vérification.
        </p>
      </div>
      
      <RadioSuggestionForm />
      
      <div className="mt-12 p-6 bg-muted rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Comment ça fonctionne ?</h2>
        <ol className="list-decimal pl-6 space-y-2">
          <li>Remplissez le formulaire avec les informations de la radio</li>
          <li>Assurez-vous que l'URL du flux audio est valide et fonctionne</li>
          <li>Soumettez votre suggestion</li>
          <li>Notre équipe vérifiera la radio et l'ajoutera au catalogue</li>
          <li>Vous recevrez une notification par email une fois la radio approuvée</li>
        </ol>
      </div>
    </div>
  );
};

export default SuggestRadioPage;
