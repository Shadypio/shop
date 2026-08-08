import { Link as RouterLink, Navigate, useLocation } from 'react-router-dom';
import { Box, Button, Paper, Stack, Typography } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { formatPrice } from '../../../lib/format';
import type { OrderConfirmation } from '../types';

interface LocationState {
  order?: OrderConfirmation;
}

export function OrderConfirmationPage() {
  const location = useLocation();
  const { order } = (location.state as LocationState) ?? {};

  if (!order) {
    return <Navigate to="/" replace />;
  }

  return (
    <Paper variant="outlined" sx={{ p: 4, borderRadius: 2, textAlign: 'center' }}>
      <Stack spacing={2} alignItems="center">
        <CheckCircleOutlineIcon color="success" sx={{ fontSize: 56 }} />
        <Typography variant="h6" fontWeight={700}>
          Richiesta d'ordine inviata!
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Il negozio verificherà la disponibilità e ti contatterà a breve per confermare i
          dettagli. Il pagamento avviene alla consegna o al ritiro.
        </Typography>
        <Box sx={{ width: '100%', bgcolor: 'grey.50', borderRadius: 2, p: 2 }}>
          <Typography variant="body2">
            Numero ordine:{' '}
            <Box component="span" sx={{ fontFamily: 'monospace' }}>
              {order.id.slice(-8)}
            </Box>
          </Typography>
          <Typography variant="subtitle1" fontWeight={700}>
            Totale: {formatPrice(order.total)}
          </Typography>
        </Box>
        <Button component={RouterLink} to="/" variant="contained" size="large" fullWidth>
          Torna al catalogo
        </Button>
      </Stack>
    </Paper>
  );
}
