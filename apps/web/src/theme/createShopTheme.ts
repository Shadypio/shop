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
  headingFontFamily?: string;
  borderRadius?: number;
}

// Manrope: sans-serif geometrico ma dalle forme morbide e arrotondate — dà
// calore senza rinunciare alla leggibilità di un font di sistema moderno.
const defaultFontFamily = [
  '"Manrope"',
  'system-ui',
  '-apple-system',
  '"Segoe UI"',
  'Roboto',
  'Arial',
  'sans-serif',
].join(',');

// Fraunces: serif contemporaneo dal tratto caldo, usato solo per i titoli.
// Evoca l'artigianalità di una bottega di quartiere senza risultare "vecchio".
const defaultHeadingFontFamily = ['"Fraunces"', 'Georgia', 'serif'].join(',');

// Ombre "soft": più diffuse e meno dure del default MUI, coerenti con
// un'estetica calda e accogliente piuttosto che tecnica/corporate.
function buildSoftShadows(tintRgb: string): Theme['shadows'] {
  const soft = (y: number, blur: number, alpha: number) =>
    `0 ${y}px ${blur}px 0 rgba(${tintRgb}, ${alpha})`;
  const base = [
    'none',
    soft(2, 8, 0.06),
    soft(3, 10, 0.07),
    soft(4, 14, 0.08),
    soft(6, 18, 0.08),
    soft(8, 22, 0.09),
    soft(10, 26, 0.09),
    soft(12, 30, 0.1),
  ];
  // MUI richiede esattamente 25 livelli: dopo l'ottavo, ripetiamo l'ultimo
  // valore (nessuna UI di questo progetto usa elevazioni così alte).
  const shadows = [...base, ...Array(25 - base.length).fill(base[base.length - 1])];
  return shadows as Theme['shadows'];
}

export function createShopTheme(config: ShopThemeConfig): Theme {
  const primary = config.palette.primary;
  const secondary = config.palette.secondary ?? config.palette.primary;
  const radius = config.borderRadius ?? 16;

  return createTheme({
    shop: config.branding,
    palette: {
      mode: 'light',
      primary: { main: primary },
      secondary: { main: secondary },
      // Crema caldo invece del solito grigio/bianco freddo dei marketplace:
      // dà subito un'impressione di bottega locale piuttosto che di piattaforma.
      background: { default: '#FBF6F0', paper: '#FFFFFF' },
      text: {
        // Marrone-antracite invece di nero puro: più morbido e leggibile,
        // coerente con la palette calda.
        primary: '#2E241C',
        secondary: '#6B5D50',
      },
      divider: '#EBE0D4',
      warning: { main: '#B8860B' },
      success: { main: '#3F7D5C' },
    },
    shape: {
      borderRadius: radius,
    },
    shadows: buildSoftShadows('58, 39, 24'),
    typography: {
      fontFamily: config.fontFamily ?? defaultFontFamily,
      h1: { fontFamily: config.headingFontFamily ?? defaultHeadingFontFamily },
      h2: { fontFamily: config.headingFontFamily ?? defaultHeadingFontFamily },
      h3: { fontFamily: config.headingFontFamily ?? defaultHeadingFontFamily },
      h4: {
        fontFamily: config.headingFontFamily ?? defaultHeadingFontFamily,
        fontWeight: 600,
      },
      h5: {
        fontFamily: config.headingFontFamily ?? defaultHeadingFontFamily,
        fontWeight: 600,
      },
      h6: {
        fontFamily: config.headingFontFamily ?? defaultHeadingFontFamily,
        fontWeight: 600,
      },
      subtitle1: { fontWeight: 600 },
      button: { fontWeight: 700 },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            fontWeight: 700,
            borderRadius: 999, // pulsanti "pill": più invitanti, meno istituzionali
            paddingTop: 10,
            paddingBottom: 10,
          },
          sizeLarge: { paddingTop: 13, paddingBottom: 13, fontSize: '1rem' },
          containedPrimary: {
            boxShadow: `0 8px 20px -6px ${primary}66`,
            '&:hover': { boxShadow: `0 10px 24px -6px ${primary}80` },
          },
        },
      },
      MuiAppBar: {
        defaultProps: { elevation: 0 },
      },
      MuiCard: {
        defaultProps: { elevation: 2 },
        styleOverrides: {
          // Card "nuda" (senza variant): tile da prodotto e-commerce, ombra
          // morbida e nessun bordo — è quella usata da ProductCard e
          // CategoryRail, il fulcro visivo del catalogo. variant="outlined"
          // resta disponibile per i casi in cui serve un contorno esplicito
          // (es. le card di scelta consegna nel checkout, dove il bordo
          // comunica selezione, non è decorativo).
          root: ({ ownerState }) => ({
            borderRadius: radius,
            ...(ownerState.variant === 'outlined'
              ? { border: '1px solid #EBE0D4', boxShadow: 'none' }
              : { border: 'none' }),
          }),
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: { backgroundImage: 'none' },
          outlined: { borderColor: '#EBE0D4' },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: { fontWeight: 700, borderRadius: 999 },
        },
      },
      MuiTextField: {
        defaultProps: { variant: 'outlined' },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: { borderRadius: radius * 0.7 },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: { backgroundImage: 'none' },
        },
      },
    },
  });
}
