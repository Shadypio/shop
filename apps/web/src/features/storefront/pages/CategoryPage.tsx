import { Link as RouterLink, useParams } from 'react-router-dom';
import { Alert, Box, Button, CircularProgress, Stack, Typography } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useCategory, useProducts } from '../queries';
import { ProductGrid } from '../../../components/domain/ProductGrid';

export function CategoryPage() {
  const { slug = '' } = useParams();
  const { data: category, isLoading: isCategoryLoading } = useCategory(slug);
  const {
    data: products,
    isLoading: isProductsLoading,
    isError,
  } = useProducts({ categorySlug: slug });

  const isLoading = isCategoryLoading || isProductsLoading;

  return (
    <Box>
      <Button
        component={RouterLink}
        to="/"
        startIcon={<ArrowBackIosNewIcon fontSize="small" />}
        sx={{ mb: 1 }}
      >
        Tutte le categorie
      </Button>
      <Typography variant="h5" fontWeight={700} sx={{ mb: 3 }}>
        {category?.name ?? (isLoading ? 'Caricamento…' : 'Categoria')}
      </Typography>

      {isLoading ? (
        <Stack alignItems="center" sx={{ py: 4 }}>
          <CircularProgress size={28} />
        </Stack>
      ) : isError ? (
        <Alert severity="error">Impossibile caricare i prodotti. Riprova più tardi.</Alert>
      ) : (
        <ProductGrid
          products={products ?? []}
          emptyMessage="Nessun prodotto disponibile in questa categoria."
        />
      )}
    </Box>
  );
}
