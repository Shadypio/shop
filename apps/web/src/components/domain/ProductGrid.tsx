import { Grid, Typography } from '@mui/material';
import { ProductCard } from './ProductCard';
import type { ProductListItem } from '../../features/storefront/types';

interface ProductGridProps {
  products: ProductListItem[];
  emptyMessage?: string;
}

export function ProductGrid({
  products,
  emptyMessage = 'Nessun prodotto disponibile.',
}: ProductGridProps) {
  if (products.length === 0) {
    return (
      <Typography variant="body2" color="text.secondary">
        {emptyMessage}
      </Typography>
    );
  }

  return (
    <Grid container spacing={2}>
      {products.map((product) => (
        <Grid key={product.id} size={{ xs: 6, sm: 4 }}>
          <ProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
}
