import { Typography } from '@mui/material';
import { LegalPage } from '../components/LegalPage';
import { HomeButton } from '../../../components/ui/HomeButton';

// TODO: sostituire con il testo definitivo (es. generato da LegalBlink).
export function ShippingPolicyPage() {
  return (
    <LegalPage title="Spedizioni e consegne">
      <Typography component="p">
        [DA COMPILARE] Il negozio offre due modalità: consegna a domicilio o ritiro in negozio,
        selezionabili direttamente in fase di checkout.
      </Typography>
      <Typography component="p">
        [DA COMPILARE] Indicare l'area di consegna coperta (es. zona locale/comune), le eventuali
        tempistiche indicative e se è previsto un costo di consegna.
      </Typography>
      <Typography component="p">
        [DA COMPILARE] Indicare gli orari di apertura del negozio per il ritiro e come/quando il
        cliente verrà contattato per confermare i dettagli dell'ordine.
      </Typography>
      <HomeButton />
    </LegalPage>
  );
}
