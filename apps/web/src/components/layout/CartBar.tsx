import { Box, Paper, Stack, Typography } from '@mui/material';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import { useCartStore } from '../../store/cart-store';
import { formatPrice } from '../../lib/format';

interface CartBarProps {
  onOpenCart: () => void;
}

// Barra del carrello sempre a portata di pollice su mobile: un e-commerce
// vero non nasconde mai il carrello dietro una sola icona in header. Visibile
// solo quando ci sono articoli, solo su schermi piccoli (su desktop l'icona
// in header con il badge è già sufficientemente in vista).
export function CartBar({ onOpenCart }: CartBarProps) {
  const items = useCartStore((state) => state.items);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const total = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);

  if (itemCount === 0) {
    return null;
  }

  return (
    <Paper
      elevation={4}
      onClick={onOpenCart}
      role="button"
      aria-label="Apri il carrello"
      sx={{
        display: { xs: 'flex', sm: 'none' },
        position: 'fixed',
        left: 12,
        right: 12,
        bottom: 12,
        zIndex: (theme) => theme.zIndex.appBar,
        borderRadius: 999,
        bgcolor: 'primary.main',
        color: 'primary.contrastText',
        px: 2.5,
        py: 1.5,
        alignItems: 'center',
        justifyContent: 'space-between',
        cursor: 'pointer',
      }}
    >
      <Stack direction="row" spacing={1.25} alignItems="center">
        <ShoppingBagOutlinedIcon fontSize="small" />
        <Typography variant="body2" fontWeight={700}>
          {itemCount} {itemCount === 1 ? 'articolo' : 'articoli'}
        </Typography>
      </Stack>
      <Stack direction="row" spacing={1} alignItems="center">
        <Typography variant="body2" fontWeight={800}>
          {formatPrice(total)}
        </Typography>
        <Box sx={{ display: 'flex' }}>
          <ArrowForwardRoundedIcon fontSize="small" />
        </Box>
      </Stack>
    </Paper>
  );
}
