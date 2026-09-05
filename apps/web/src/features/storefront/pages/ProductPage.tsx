import { useState } from 'react';
import { Link as RouterLink, useParams } from 'react-router-dom';
import { Alert, Box, Button, Snackbar, Stack, Typography } from '@mui/material';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { useProduct } from '../queries';
import { formatPrice } from '../../../lib/format';
import { useCartStore } from '../../../store/cart-store';
import { QuantityStepper } from '../../../components/domain/QuantityStepper';

export function ProductPage() {
  const { slug = '' } = useParams();
  const { data: product, isLoading, isError } = useProduct(slug);
  const addItem = useCartStore((state) => state.addItem);
  const [quantity, setQuantity] = useState(1);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  if (isLoading) {
    return (
      <Typography variant="body2" color="text.secondary">
        Caricamento prodotto…
      </Typography>
    );
  }

  if (isError || !product) {
    return <Alert severity="error">Prodotto non trovato.</Alert>;
  }

  function handleAddToCart() {
    if (!product) return;
    addItem(
      {
        productId: product.id,
        name: product.name,
        unitPrice: product.price,
        image: product.images[0] ?? null,
      },
      quantity,
    );
    setSnackbarOpen(true);
  }

  return (
    <Box>
      <Typography
        component={RouterLink}
        to={`/categoria/${product.category.slug}`}
        sx={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 0.5,
          mb: 2,
          color: 'text.secondary',
          textDecoration: 'none',
          fontWeight: 700,
          fontSize: '0.875rem',
          '&:hover': { color: 'primary.main' },
        }}
      >
        <ArrowBackRoundedIcon sx={{ fontSize: 18 }} /> {product.category.name}
      </Typography>

      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 5 }}>
        <Box
          sx={{
            width: { xs: '100%', sm: 380 },
            flexShrink: 0,
            aspectRatio: '1 / 1',
            borderRadius: 4,
            overflow: 'hidden',
            bgcolor: 'grey.100',
            boxShadow: 3,
            backgroundImage: product.images[0] ? `url(${product.images[0]})` : undefined,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
          role="img"
          aria-label={product.name}
        />

        <Stack spacing={2.5} sx={{ flexGrow: 1, minWidth: 0 }}>
          <Box>
            <Typography variant="h5" fontWeight={600} sx={{ mb: 0.75 }}>
              {product.name}
            </Typography>
            <Typography variant="h4" fontWeight={800} color="primary.main">
              {formatPrice(product.price)}
            </Typography>
          </Box>

          <Stack direction="row" spacing={1} alignItems="center">
            <Box
              sx={{
                width: 9,
                height: 9,
                borderRadius: '50%',
                bgcolor: product.available ? 'success.main' : 'warning.main',
              }}
            />
            <Typography variant="body2" fontWeight={700} color="text.secondary">
              {product.available ? 'Disponibile' : 'Momentaneamente non disponibile'}
            </Typography>
          </Stack>

          {product.description ? (
            <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
              {product.description}
            </Typography>
          ) : null}

          {product.available ? (
            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
              sx={{ pt: 1, flexWrap: 'wrap', rowGap: 2 }}
            >
              <QuantityStepper value={quantity} onChange={setQuantity} />
              <Button
                variant="contained"
                size="large"
                onClick={handleAddToCart}
                sx={{ flexGrow: 1, minWidth: 200 }}
              >
                Aggiungi al carrello
              </Button>
            </Stack>
          ) : null}
        </Stack>
      </Stack>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" variant="filled" onClose={() => setSnackbarOpen(false)}>
          Prodotto aggiunto al carrello
        </Alert>
      </Snackbar>
    </Box>
  );
}
