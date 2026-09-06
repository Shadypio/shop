import { Typography } from '@mui/material';
import { LegalPage } from '../components/LegalPage';
import { HomeButton } from '../../../components/ui/HomeButton';

// TODO: sostituire con il testo definitivo (es. generato da LegalBlink).
export function ReturnsPolicyPage() {
  return (
    <LegalPage title="Diritto di recesso e resi">
      <Typography component="p">
        [DA COMPILARE] Ogni ordine inviato tramite il sito è una richiesta: il negozio verifica
        manualmente la disponibilità dei prodotti prima di confermarla. Il pagamento avviene solo
        alla consegna o al ritiro in negozio, senza alcun addebito online al momento dell'invio.
      </Typography>
      <Typography component="p">
        [DA COMPILARE] Specificare le condizioni di reso applicabili (es. prodotto integro,
        confezione originale, tempistiche) e se/come si applica il diritto di recesso previsto dal
        Codice del Consumo per gli acquisti a distanza.
      </Typography>
      <Typography component="p">
        [DA COMPILARE] Indicare come il cliente può richiedere un reso o segnalare un problema (es.
        contatto telefonico o email del negozio).
      </Typography>
      <HomeButton />
    </LegalPage>
  );
}
