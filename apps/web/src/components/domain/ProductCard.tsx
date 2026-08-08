import { Box, Card, CardActionArea, CardContent, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { formatPrice } from '../../lib/format';
import type { ProductListItem } from '../../features/storefront/types';

export function ProductCard({ product }: { product: ProductListItem }) {
  return (
    <Card variant="outlined" sx={{ height: '100%' }}>
      <CardActionArea
        component={RouterLink}
        to={`/prodotto/${product.slug}`}
        sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}
      >
        <Box
          sx={{
            aspectRatio: '1 / 1',
            bgcolor: 'grey.100',
            backgroundImage: product.image ? `url(${product.image})` : undefined,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
          role="img"
          aria-label={product.name}
        />
        <CardContent sx={{ flexGrow: 1, width: '100%' }}>
          <Typography variant="body2" fontWeight={600} noWrap>
            {product.name}
          </Typography>
          <Typography variant="body2" color="text.secondary" fontWeight={600}>
            {formatPrice(product.price)}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
