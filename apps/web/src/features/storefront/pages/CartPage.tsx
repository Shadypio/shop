import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Box, Button, Stack, Typography } from '@mui/material';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
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
        Il tuo carrello
      </Typography>

      {items.length === 0 ? (
        <Stack alignItems="center" spacing={2} sx={{ py: 6, textAlign: 'center' }}>
          <Box
            sx={{
              width: 64,
              height: 64,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: 'grey.100',
              color: 'text.secondary',
            }}
          >
            <ShoppingBagOutlinedIcon fontSize="medium" />
          </Box>
          <Typography variant="body1" color="text.secondary">
            Il carrello è ancora vuoto.
          </Typography>
          <Button component={RouterLink} to="/" variant="contained">
            Sfoglia il catalogo
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
