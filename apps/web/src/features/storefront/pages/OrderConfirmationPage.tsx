import { useEffect, useRef } from 'react';
import { Link as RouterLink, Navigate, useLocation } from 'react-router-dom';
import { Box, Button, Paper, Stack, Typography } from '@mui/material';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import { formatPrice } from '../../../lib/format';
import { useCartStore } from '../../../store/cart-store';
import type { OrderConfirmation } from '../types';

interface LocationState {
  order?: OrderConfirmation;
}

export function OrderConfirmationPage() {
  const location = useLocation();
  const { order } = (location.state as LocationState) ?? {};
  const clearCart = useCartStore((state) => state.clear);
  const hasCleared = useRef(false);

  // Il carrello viene svuotato qui, non in CheckoutPage: quando questo
  // componente monta, CheckoutPage è già smontata (lo scambio di rotta da
  // parte di React Router è già avvenuto), quindi non esiste più una
  // finestra in cui CheckoutPage possa rivedersi con un carrello vuoto e
  // reindirizzare erroneamente a /carrello prima di arrivare qui.
  useEffect(() => {
    if (order && !hasCleared.current) {
      hasCleared.current = true;
      clearCart();
    }
  }, [order, clearCart]);

  if (!order) {
    return <Navigate to="/" replace />;
  }

  return (
    <Paper variant="outlined" sx={{ p: { xs: 3, sm: 5 }, borderRadius: 4, textAlign: 'center' }}>
      <Stack spacing={2.5} alignItems="center">
        <Box
          sx={{
            width: 72,
            height: 72,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: 'success.main',
            color: '#fff',
          }}
        >
          <CheckRoundedIcon sx={{ fontSize: 40 }} />
        </Box>
        <Box>
          <Typography variant="h5" fontWeight={600} sx={{ mb: 1 }}>
            Richiesta inviata!
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 400 }}>
            Il negozio verificherà la disponibilità e ti contatterà a breve per confermare i
            dettagli. Il pagamento avviene alla consegna o al ritiro.
          </Typography>
        </Box>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ width: '100%', bgcolor: 'grey.50', borderRadius: 3, p: 2.5 }}
        >
          <Box sx={{ textAlign: 'left' }}>
            <Typography variant="caption" color="text.secondary">
              Numero ordine
            </Typography>
            <Typography variant="body2" fontWeight={700} sx={{ fontFamily: 'monospace' }}>
              {order.id.slice(-8).toUpperCase()}
            </Typography>
          </Box>
          <Box sx={{ textAlign: 'right' }}>
            <Typography variant="caption" color="text.secondary">
              Totale
            </Typography>
            <Typography variant="h6" fontWeight={700} color="primary.main">
              {formatPrice(order.total)}
            </Typography>
          </Box>
        </Stack>
        <Button component={RouterLink} to="/" variant="contained" size="large" fullWidth>
          Torna al catalogo
        </Button>
      </Stack>
    </Paper>
  );
}
