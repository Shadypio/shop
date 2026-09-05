import { Link as RouterLink, useParams } from 'react-router-dom';
import { Alert, Box, CircularProgress, Stack, Typography } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { useCategory, useProducts } from '../queries';
import { ProductGrid } from '../../../components/domain/ProductGrid';
import { getCategoryIcon } from '../category-icons';

export function CategoryPage() {
  const { slug = '' } = useParams();
  const theme = useTheme();
  const { data: category, isLoading: isCategoryLoading } = useCategory(slug);
  const {
    data: products,
    isLoading: isProductsLoading,
    isError,
  } = useProducts({ categorySlug: slug });

  const isLoading = isCategoryLoading || isProductsLoading;

  return (
    <Box>
      <Box
        sx={{
          borderRadius: 4,
          px: { xs: 2.5, sm: 4 },
          py: { xs: 2.5, sm: 3.5 },
          mb: 3,
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${alpha(theme.palette.secondary.main, 0.85)} 100%)`,
          color: '#fff',
        }}
      >
        <Box
          sx={{
            width: 52,
            height: 52,
            flexShrink: 0,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: 'rgba(255,255,255,0.2)',
            fontSize: 24,
          }}
        >
          {getCategoryIcon(category?.name ?? '')}
        </Box>
        <Box sx={{ minWidth: 0 }}>
          <Typography
            component={RouterLink}
            to="/"
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 0.5,
              color: 'rgba(255,255,255,0.85)',
              textDecoration: 'none',
              fontSize: '0.8rem',
              fontWeight: 700,
              mb: 0.25,
            }}
          >
            <ArrowBackRoundedIcon sx={{ fontSize: 16 }} /> Tutte le categorie
          </Typography>
          <Typography variant="h5" fontWeight={700} noWrap>
            {category?.name ?? (isLoading ? 'Caricamento…' : 'Categoria')}
          </Typography>
        </Box>
      </Box>

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
