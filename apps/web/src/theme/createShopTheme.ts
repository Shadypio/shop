import { createTheme, type Theme } from '@mui/material/styles';
import type { ShopBranding } from './types';

// Configurazione minima necessaria per tematizzare un intero negozio:
// colori, font e branding. Ogni negozio futuro (ferramenta, macelleria, ecc.)
// avrà la propria ShopThemeConfig, senza dover modificare i componenti di dominio
// (ProductCard, CartDrawer, ecc.), che leggono solo dal theme MUI risultante.
export interface ShopThemeConfig {
  branding: ShopBranding;
  palette: {
    primary: string;
    secondary?: string;
  };
  fontFamily?: string;
  borderRadius?: number;
}

const defaultFontFamily = [
  'system-ui',
  '-apple-system',
  '"Segoe UI"',
  'Roboto',
  'Arial',
  'sans-serif',
].join(',');

export function createShopTheme(config: ShopThemeConfig): Theme {
  return createTheme({
    shop: config.branding,
    palette: {
      mode: 'light',
      primary: { main: config.palette.primary },
      secondary: { main: config.palette.secondary ?? config.palette.primary },
      background: { default: '#f8fafc', paper: '#ffffff' },
    },
    shape: {
      borderRadius: config.borderRadius ?? 12,
    },
    typography: {
      fontFamily: config.fontFamily ?? defaultFontFamily,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: { textTransform: 'none', fontWeight: 600 },
        },
      },
      MuiAppBar: {
        defaultProps: { elevation: 0 },
      },
    },
  });
}
