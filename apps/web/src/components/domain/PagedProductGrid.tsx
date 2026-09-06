import { useEffect, useMemo, useState } from 'react';
import { Button, Stack } from '@mui/material';
import { ProductGrid } from './ProductGrid';
import type { ProductListItem } from '../../features/storefront/types';

const PAGE_SIZE = 24;

interface PagedProductGridProps {
  products: ProductListItem[];
  emptyMessage?: string;
  // Chiave che identifica il filtro attivo (es. slug categoria, query di
  // ricerca): quando cambia, la vista torna alla prima pagina. Senza questa
  // chiave, cambiare categoria/ricerca manterrebbe il conteggio già rivelato
  // della vista precedente, perché il componente non viene rimontato da
  // React Router (cambia solo il parametro di rotta).
  resetKey?: string;
}

// Il catalogo di un negozio locale resta dell'ordine di poche centinaia di
// prodotti al massimo: non serve una vera paginazione lato server
export function PagedProductGrid({ products, emptyMessage, resetKey }: PagedProductGridProps) {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [resetKey]);

  const visibleProducts = useMemo(() => products.slice(0, visibleCount), [products, visibleCount]);
  const remaining = products.length - visibleCount;

  return (
    <Stack spacing={3}>
      <ProductGrid products={visibleProducts} emptyMessage={emptyMessage} />
      {remaining > 0 ? (
        <Stack alignItems="center">
          <Button
            variant="outlined"
            size="large"
            onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}
          >
            Mostra altri prodotti ({remaining})
          </Button>
        </Stack>
      ) : null}
    </Stack>
  );
}
