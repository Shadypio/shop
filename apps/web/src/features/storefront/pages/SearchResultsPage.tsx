import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Alert, Box, CircularProgress, Stack, Typography } from '@mui/material';
import { useProducts } from '../queries';
import { PagedProductGrid } from '../../../components/domain/PagedProductGrid';
import { SearchBar } from '../../../components/domain/SearchBar';

export function SearchResultsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') ?? '';
  const [draft, setDraft] = useState(query);

  const { data: products, isLoading, isError } = useProducts({ search: query || undefined });

  function handleSubmit() {
    setSearchParams(draft ? { q: draft } : {});
  }

  return (
    <Box>
      <Typography variant="h5" fontWeight={600} sx={{ mb: 2 }}>
        Cerca nel catalogo
      </Typography>

      <SearchBar
        value={draft}
        onChange={setDraft}
        onSubmit={handleSubmit}
        sx={{ maxWidth: 480, mb: 3 }}
      />

      {query ? (
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Risultati per <strong>&ldquo;{query}&rdquo;</strong>
        </Typography>
      ) : null}

      {isLoading ? (
        <Stack alignItems="center" sx={{ py: 4 }}>
          <CircularProgress size={28} />
        </Stack>
      ) : isError ? (
        <Alert severity="error">Impossibile completare la ricerca. Riprova più tardi.</Alert>
      ) : !query ? (
        <Typography variant="body2" color="text.secondary">
          Scrivi qualcosa per cercare tra i prodotti del negozio.
        </Typography>
      ) : (
        <PagedProductGrid
          products={products ?? []}
          emptyMessage={`Nessun prodotto trovato per "${query}".`}
          resetKey={query}
        />
      )}
    </Box>
  );
}
