import { useState } from 'react';
import { Link as RouterLink, useParams } from 'react-router-dom';
import { Alert, Box, Button, Chip, Snackbar, Stack, Typography } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
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
    addItem({ productId: product.id, name: product.name, unitPrice: product.price }, quantity);
    setSnackbarOpen(true);
  }

  return (
    <Box>
      <Button
        component={RouterLink}
        to={`/categoria/${product.category.slug}`}
        startIcon={<ArrowBackIosNewIcon fontSize="small" />}
        sx={{ mb: 2 }}
      >
        {product.category.name}
      </Button>

      <Box
        sx={{
          borderRadius: 2,
          overflow: 'hidden',
          border: 1,
          borderColor: 'divider',
          bgcolor: 'background.paper',
        }}
      >
        <Box
          sx={{
            aspectRatio: '1 / 1',
            bgcolor: 'grey.100',
            backgroundImage: product.images[0] ? `url(${product.images[0]})` : undefined,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
          role="img"
          aria-label={product.name}
        />
        <Stack spacing={1.5} sx={{ p: 3 }}>
          <Typography variant="h6" fontWeight={700}>
            {product.name}
          </Typography>
          <Typography variant="h5" fontWeight={700}>
            {formatPrice(product.price)}
          </Typography>
          {!product.available ? (
            <Chip
              label="Momentaneamente non disponibile"
              color="warning"
              size="small"
              sx={{ width: 'fit-content' }}
            />
          ) : null}
          {product.description ? (
            <Typography variant="body2" color="text.secondary">
              {product.description}
            </Typography>
          ) : null}

          {product.available ? (
            <Stack direction="row" spacing={2} alignItems="center" sx={{ mt: 1 }}>
              <QuantityStepper value={quantity} onChange={setQuantity} />
              <Button variant="contained" size="large" fullWidth onClick={handleAddToCart}>
                Aggiungi al carrello
              </Button>
            </Stack>
          ) : null}
        </Stack>
      </Box>

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
