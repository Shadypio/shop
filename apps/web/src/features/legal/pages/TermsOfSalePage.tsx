import { LegalPage } from '../components/LegalPage';
import { HomeButton } from '../../../components/ui/HomeButton';

// TODO: sostituire con il testo generato da LegalBlink (o equivalente).
export function TermsOfSalePage() {
  return (
    <LegalPage title="Termini di vendita">
      <iframe
        src="https://app.legalblink.it/api/documents/6a9c43d0429591002915bd54/termini-per-prodotti-it"
        style={{ height: '50vh' }}
      ></iframe>
      <HomeButton />
    </LegalPage>
  );
}
