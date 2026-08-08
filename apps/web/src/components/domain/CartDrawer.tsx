import { Box, Button, Stack, Typography } from '@mui/material';
import { Drawer } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../../store/cart-store';
import { OrderSummary } from './OrderSummary';

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

// Carrello accessibile da qualsiasi pagina tramite l'icona nell'header.
// Riusa lo stesso OrderSummary della pagina /carrello (DRY): la sola
// differenza è la superficie (drawer overlay vs pagina intera).
export function CartDrawer({ open, onClose }: CartDrawerProps) {
  const items = useCartStore((state) => state.items);
  const setQuantity = useCartStore((state) => state.setQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const navigate = useNavigate();

  function handleCheckout() {
    onClose();
    navigate('/checkout');
  }

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      slotProps={{ paper: { sx: { width: { xs: '100%', sm: 380 }, p: 3 } } }}
    >
      <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
        Carrello
      </Typography>

      {items.length === 0 ? (
        <Typography variant="body2" color="text.secondary">
          Il carrello è vuoto.
        </Typography>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <OrderSummary items={items} editable onQuantityChange={setQuantity} onRemove={removeItem} />
          <Stack spacing={1.5}>
            <Button variant="contained" size="large" fullWidth onClick={handleCheckout}>
              Procedi al checkout
            </Button>
            <Button variant="text" size="small" onClick={onClose}>
              Continua lo shopping
            </Button>
          </Stack>
        </Box>
      )}
    </Drawer>
  );
}
