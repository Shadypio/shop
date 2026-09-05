import { Alert, Box, CircularProgress, Stack, Typography } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined';
import { useCategories, useProducts } from '../queries';
import { CategoryRail } from '../../../components/domain/CategoryRail';
import { ProductGrid } from '../../../components/domain/ProductGrid';
import { SearchBar } from '../../../components/domain/SearchBar';

const trustHighlights = [
  { icon: <LocalShippingOutlinedIcon fontSize="small" />, label: 'Consegna a domicilio' },
  { icon: <StorefrontOutlinedIcon fontSize="small" />, label: 'Ritiro in negozio' },
  { icon: <PaymentsOutlinedIcon fontSize="small" />, label: 'Paghi alla consegna' },
];

export function HomePage() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  const { data: categories, isLoading: isCategoriesLoading, isError: isCategoriesError } =
    useCategories();
  const {
    data: products,
    isLoading: isProductsLoading,
    isError: isProductsError,
  } = useProducts();

  function handleSearchSubmit() {
    navigate(query ? `/cerca?q=${encodeURIComponent(query)}` : '/cerca');
  }

  return (
    <Box>
      {/* Hero: la prima cosa che il cliente vede deve dire subito "sei nel
          negozio giusto" — non una lista puntata di funzionalità. */}
      <Box
        sx={{
          borderRadius: 5,
          px: { xs: 3, sm: 6 },
          py: { xs: 4, sm: 6 },
          mb: { xs: 3, sm: 4 },
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${alpha(
            theme.palette.primary.dark ?? theme.palette.primary.main,
            0.9,
          )} 100%)`,
          color: '#fff',
        }}
      >
        <Typography
          variant="h4"
          fontWeight={600}
          sx={{ mb: 1, fontSize: { xs: '1.8rem', sm: '2.5rem' }, maxWidth: 520 }}
        >
          {theme.shop.name}
        </Typography>
        <Typography sx={{ mb: 3, opacity: 0.92, maxWidth: 460 }}>
          {theme.shop.tagline ?? 'Ordina online, ritira o fatti consegnare a casa.'}
        </Typography>
        <SearchBar
          value={query}
          onChange={setQuery}
          onSubmit={handleSearchSubmit}
          placeholder="Cosa stai cercando oggi?"
          sx={{ maxWidth: 420, '& .MuiOutlinedInput-root': { bgcolor: '#fff' } }}
        />
      </Box>

      {/* Fascia di fiducia: rassicura subito su come funziona l'ordine,
          senza bisogno di leggere pagine di FAQ. */}
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={{ xs: 1.25, sm: 4 }}
        justifyContent="center"
        alignItems={{ xs: 'flex-start', sm: 'center' }}
        sx={{ mb: { xs: 4, sm: 5 } }}
      >
        {trustHighlights.map((item) => (
          <Stack key={item.label} direction="row" spacing={1} alignItems="center">
            <Box sx={{ color: 'secondary.main', display: 'flex' }}>{item.icon}</Box>
            <Typography variant="body2" color="text.secondary" fontWeight={600}>
              {item.label}
            </Typography>
          </Stack>
        ))}
      </Stack>

      <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
        Categorie
      </Typography>

      {isCategoriesLoading ? (
        <Stack alignItems="center" sx={{ py: 3 }}>
          <CircularProgress size={24} />
        </Stack>
      ) : isCategoriesError ? (
        <Alert severity="error" sx={{ mb: 4 }}>
          Impossibile caricare le categorie. Riprova più tardi.
        </Alert>
      ) : !categories || categories.length === 0 ? (
        <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
          Nessuna categoria disponibile al momento.
        </Typography>
      ) : (
        <Box sx={{ mb: { xs: 4, sm: 5 } }}>
          <CategoryRail categories={categories} />
        </Box>
      )}

      <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
        Tutti i prodotti
      </Typography>

      {isProductsLoading ? (
        <Stack alignItems="center" sx={{ py: 4 }}>
          <CircularProgress size={28} />
        </Stack>
      ) : isProductsError ? (
        <Alert severity="error">Impossibile caricare i prodotti. Riprova più tardi.</Alert>
      ) : (
        <ProductGrid products={products ?? []} emptyMessage="Nessun prodotto disponibile al momento." />
      )}
    </Box>
  );
}
