import type { PropsWithChildren } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '../lib/query-client';
import { ShopThemeProvider } from '../theme/ShopThemeProvider';

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <ShopThemeProvider>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </ShopThemeProvider>
  );
}
