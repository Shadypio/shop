import { Box, Stack, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import type { Category } from '../../features/storefront/types';
import { getCategoryIcon } from '../../features/storefront/category-icons';

// Palette di tinte calde/analoghe per distinguere le categorie a colpo
// d'occhio, assegnate ciclicamente: puramente presentazionale, non richiede
// al negoziante di configurare nulla per ogni categoria.
const TILE_COLORS = ['#C1440E', '#3F7D5C', '#B8860B', '#8A5A44', '#4A7A8C'];

export function CategoryRail({ categories }: { categories: Category[] }) {
  return (
    <Stack
      direction="row"
      spacing={{ xs: 2.5, sm: 3 }}
      sx={{
        overflowX: { xs: 'auto', sm: 'visible' },
        flexWrap: { xs: 'nowrap', sm: 'wrap' },
        pb: { xs: 1, sm: 0 },
        px: { xs: 0.5, sm: 0 },
        mx: { xs: -0.5, sm: 0 },
        scrollSnapType: { xs: 'x proximity', sm: 'none' },
        '&::-webkit-scrollbar': { display: 'none' },
      }}
    >
      {categories.map((category, index) => (
        <Box
          key={category.id}
          component={RouterLink}
          to={`/categoria/${category.slug}`}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 1,
            flexShrink: 0,
            width: { xs: 84, sm: 96 },
            scrollSnapAlign: 'start',
            textDecoration: 'none',
          }}
        >
          <Box
            sx={{
              width: { xs: 64, sm: 76 },
              height: { xs: 64, sm: 76 },
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: TILE_COLORS[index % TILE_COLORS.length],
              color: '#fff',
              fontSize: { xs: 26, sm: 30 },
              boxShadow: '0 10px 20px -8px rgba(46, 36, 28, 0.35)',
              transition: 'transform 0.15s ease',
              '&:hover': { transform: 'scale(1.05)' },
            }}
          >
            {getCategoryIcon(category.name)}
          </Box>
          <Typography
            variant="body2"
            fontWeight={700}
            align="center"
            color="text.primary"
            sx={{ lineHeight: 1.2, fontSize: '0.8rem' }}
          >
            {category.name}
          </Typography>
        </Box>
      ))}
    </Stack>
  );
}
