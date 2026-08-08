import type { ShopThemeConfig } from '../createShopTheme';

// Configurazione del negozio attualmente attivo (single-tenant nell'MVP).
// Quando la piattaforma diventerà multi-tenant, questa configurazione verrà
// risolta dinamicamente (es. da API in base allo shopId) invece che importata
// staticamente: il resto dell'app non cambia.
export const detersiviRossiTheme: ShopThemeConfig = {
  branding: { name: 'Detersivi Rossi' },
  palette: {
    primary: '#0f172a',
    secondary: '#2563eb',
  },
};
