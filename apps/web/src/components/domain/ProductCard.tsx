import { useState } from 'react';
import { Box, Card, CardActionArea, IconButton, Snackbar, Alert, Typography } from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { Link as RouterLink } from 'react-router-dom';
import { formatPrice } from '../../lib/format';
import { useCartStore } from '../../store/cart-store';
import type { ProductListItem } from '../../features/storefront/types';

export function ProductCard({ product }: { product: ProductListItem }) {
  const addItem = useCartStore((state) => state.addItem);
  const [confirmOpen, setConfirmOpen] = useState(false);

  function handleQuickAdd(event: React.MouseEvent) {
    // Ferma la propagazione: il quick-add non deve far scattare la
    // navigazione alla scheda prodotto sottostante (CardActionArea).
    event.preventDefault();
    event.stopPropagation();
    addItem(
      { productId: product.id, name: product.name, unitPrice: product.price, image: product.image },
      1,
    );
    setConfirmOpen(true);
  }

  return (
    <Card sx={{ height: '100%', position: 'relative', overflow: 'hidden' }}>
      <CardActionArea
        component={RouterLink}
        to={`/prodotto/${product.slug}`}
        sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}
      >
        <Box sx={{ position: 'relative' }}>
          <Box
            sx={{
              aspectRatio: '1 / 1',
              bgcolor: 'grey.100',
              backgroundImage: product.image ? `url(${product.image})` : undefined,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              borderRadius: `${16}px ${16}px 0 0`,
              filter: product.available ? 'none' : 'grayscale(0.5)',
              opacity: product.available ? 1 : 0.55,
            }}
            role="img"
            aria-label={product.name}
          />
          {!product.available ? (
            <Box
              sx={{
                position: 'absolute',
                top: 10,
                left: 10,
                bgcolor: 'rgba(46, 36, 28, 0.85)',
                color: '#fff',
                fontSize: '0.7rem',
                fontWeight: 700,
                px: 1.25,
                py: 0.5,
                borderRadius: 999,
              }}
            >
              Non disponibile
            </Box>
          ) : (
            <IconButton
              onClick={handleQuickAdd}
              aria-label={`Aggiungi ${product.name} al carrello`}
              size="small"
              sx={{
                position: 'absolute',
                right: 10,
                bottom: 10,
                width: 36,
                height: 36,
                bgcolor: 'primary.main',
                color: 'primary.contrastText',
                boxShadow: '0 6px 14px -4px rgba(46, 36, 28, 0.5)',
                '&:hover': { bgcolor: 'primary.dark' },
              }}
            >
              <AddRoundedIcon fontSize="small" />
            </IconButton>
          )}
        </Box>
        <Box sx={{ flexGrow: 1, width: '100%', p: 1.5 }}>
          <Typography
            variant="body2"
            fontWeight={700}
            sx={{
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              minHeight: '2.6em',
              mb: 0.5,
            }}
          >
            {product.name}
          </Typography>
          <Typography variant="subtitle1" fontWeight={800} color="primary.main">
            {formatPrice(product.price)}
          </Typography>
        </Box>
      </CardActionArea>

      <Snackbar
        open={confirmOpen}
        autoHideDuration={1600}
        onClose={() => setConfirmOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" variant="filled" onClose={() => setConfirmOpen(false)}>
          Aggiunto al carrello
        </Alert>
      </Snackbar>
    </Card>
  );
}
