import {
  Alert,
  Box,
  Button,
  Card,
  CardActionArea,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
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

const deliveryOptions: Array<{
  value: DeliveryMethod;
  label: string;
  description: string;
  icon: React.ReactNode;
}> = [
  {
    value: 'DELIVERY',
    label: 'Consegna a domicilio',
    description: 'Te lo portiamo noi a casa',
    icon: <LocalShippingOutlinedIcon />,
  },
  {
    value: 'PICKUP',
    label: 'Ritiro in negozio',
    description: 'Comodo quando esci',
    icon: <StorefrontOutlinedIcon />,
  },
];

function FormSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Stack spacing={1.5}>
      <Typography variant="subtitle2" fontWeight={700} color="text.secondary">
        {title}
      </Typography>
      {children}
    </Stack>
  );
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
    <Box component="form" onSubmit={onSubmit} noValidate sx={{ display: 'flex', flexDirection: 'column', gap: 3.5 }}>
      <FormSection title="I tuoi dati">
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
      </FormSection>

      <FormSection title="Come vuoi ricevere l'ordine?">
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
          {deliveryOptions.map((option) => {
            const selected = values.deliveryMethod === option.value;
            return (
              <Card
                key={option.value}
                variant="outlined"
                sx={{
                  flex: 1,
                  borderColor: selected ? 'primary.main' : 'divider',
                  borderWidth: selected ? 2 : 1,
                  bgcolor: selected ? (theme) => alpha(theme.palette.primary.main, 0.08) : 'background.paper',
                }}
              >
                <CardActionArea
                  onClick={() => onChange('deliveryMethod', option.value)}
                  sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 1 }}
                >
                  <Box sx={{ color: selected ? 'primary.main' : 'text.secondary' }}>
                    {option.icon}
                  </Box>
                  <Box>
                    <Typography variant="body2" fontWeight={700}>
                      {option.label}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {option.description}
                    </Typography>
                  </Box>
                </CardActionArea>
              </Card>
            );
          })}
        </Stack>

        {values.deliveryMethod === 'DELIVERY' ? (
          <TextField
            label="Indirizzo"
            required
            fullWidth
            value={values.address}
            onChange={(e) => onChange('address', e.target.value)}
          />
        ) : null}
      </FormSection>

      <FormSection title="Note per il negozio (facoltative)">
        <TextField
          placeholder="Es. citofono, orario preferito, richieste particolari…"
          fullWidth
          multiline
          minRows={2}
          value={values.notes}
          onChange={(e) => onChange('notes', e.target.value)}
        />
      </FormSection>

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
