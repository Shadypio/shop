import {
  Alert,
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import type { DeliveryMethod } from '../../features/storefront/types';

export interface CheckoutFormValues {
  customerName: string;
  customerSurname: string;
  phone: string;
  address: string;
  notes: string;
  deliveryMethod: DeliveryMethod;
}

interface CheckoutFormProps {
  values: CheckoutFormValues;
  onChange: <K extends keyof CheckoutFormValues>(field: K, value: CheckoutFormValues[K]) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  submitting?: boolean;
  errorMessage?: string | null;
}

// Componente di dominio puramente presentazionale: lo stato del form vive
// nella pagina (CheckoutPage), qui solo il markup MUI e il binding dei valori.
export function CheckoutForm({
  values,
  onChange,
  onSubmit,
  submitting = false,
  errorMessage,
}: CheckoutFormProps) {
  return (
    <Box component="form" onSubmit={onSubmit} noValidate sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
        <TextField
          label="Nome"
          required
          fullWidth
          value={values.customerName}
          onChange={(e) => onChange('customerName', e.target.value)}
        />
        <TextField
          label="Cognome"
          required
          fullWidth
          value={values.customerSurname}
          onChange={(e) => onChange('customerSurname', e.target.value)}
        />
      </Stack>

      <TextField
        label="Telefono"
        required
        type="tel"
        fullWidth
        value={values.phone}
        onChange={(e) => onChange('phone', e.target.value)}
      />

      <FormControl>
        <FormLabel sx={{ mb: 0.5 }}>Modalità di consegna</FormLabel>
        <RadioGroup
          row
          value={values.deliveryMethod}
          onChange={(e) => onChange('deliveryMethod', e.target.value as DeliveryMethod)}
        >
          <FormControlLabel value="DELIVERY" control={<Radio />} label="Consegna a domicilio" />
          <FormControlLabel value="PICKUP" control={<Radio />} label="Ritiro in negozio" />
        </RadioGroup>
      </FormControl>

      {values.deliveryMethod === 'DELIVERY' ? (
        <TextField
          label="Indirizzo"
          required
          fullWidth
          value={values.address}
          onChange={(e) => onChange('address', e.target.value)}
        />
      ) : null}

      <TextField
        label="Note (facoltative)"
        fullWidth
        multiline
        minRows={2}
        value={values.notes}
        onChange={(e) => onChange('notes', e.target.value)}
      />

      {errorMessage ? <Alert severity="error">{errorMessage}</Alert> : null}

      <Button type="submit" variant="contained" size="large" fullWidth disabled={submitting}>
        {submitting ? 'Invio in corso…' : "Invia richiesta d'ordine"}
      </Button>

      <Typography variant="caption" color="text.secondary" textAlign="center">
        Il pagamento avviene alla consegna o al ritiro. Non è un ordine confermato: il negozio ti
        contatterà per verificare la disponibilità.
      </Typography>
    </Box>
  );
}
