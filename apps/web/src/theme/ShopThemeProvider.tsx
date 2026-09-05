import { useMemo, type PropsWithChildren } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { createShopTheme, type ShopThemeConfig } from './createShopTheme';
import { aeffehomeTheme } from './shops/aeffehome';

interface ShopThemeProviderProps extends PropsWithChildren {
  config?: ShopThemeConfig;
}

// Unico punto di ingresso del design system: qualsiasi componente applicativo
// (storefront o admin) eredita colori, tipografia e branding da qui tramite
// il ThemeProvider di MUI, senza mai definire stili "hardcoded".
export function ShopThemeProvider({ config = aeffehomeTheme, children }: ShopThemeProviderProps) {
  const theme = useMemo(() => createShopTheme(config), [config]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
