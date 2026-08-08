import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Box, Button, Stack, Typography } from '@mui/material';
import { useCartStore } from '../../../store/cart-store';
import { OrderSummary } from '../../../components/domain/OrderSummary';

export function CartPage() {
  const items = useCartStore((state) => state.items);
  const setQuantity = useCartStore((state) => state.setQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const navigate = useNavigate();

  return (
    <Box>
      <Typography variant="h5" fontWeight={700} sx={{ mb: 3 }}>
        Carrello
      </Typography>

      {items.length === 0 ? (
        <Stack spacing={2} alignItems="flex-start">
          <Typography variant="body2" color="text.secondary">
            Il carrello è vuoto.
          </Typography>
          <Button component={RouterLink} to="/" variant="text">
            Torna al catalogo
          </Button>
        </Stack>
      ) : (
        <Stack spacing={3}>
          <OrderSummary items={items} editable onQuantityChange={setQuantity} onRemove={removeItem} />
          <Button variant="contained" size="large" fullWidth onClick={() => navigate('/checkout')}>
            Procedi al checkout
          </Button>
        </Stack>
      )}
    </Box>
  );
}
