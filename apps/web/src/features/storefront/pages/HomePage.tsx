import { Alert, Box, CircularProgress, Stack, Typography } from '@mui/material';
import { useCategories } from '../queries';
import { CategoryList } from '../../../components/domain/CategoryList';

export function HomePage() {
  const { data: categories, isLoading, isError } = useCategories();

  return (
    <Box>
      <Typography variant="h5" fontWeight={700} sx={{ mb: 3 }}>
        Categorie
      </Typography>

      {isLoading ? (
        <Stack alignItems="center" sx={{ py: 4 }}>
          <CircularProgress size={28} />
        </Stack>
      ) : isError ? (
        <Alert severity="error">Impossibile caricare le categorie. Riprova più tardi.</Alert>
      ) : !categories || categories.length === 0 ? (
        <Typography variant="body2" color="text.secondary">
          Nessuna categoria disponibile al momento.
        </Typography>
      ) : (
        <CategoryList categories={categories} />
      )}
    </Box>
  );
}
