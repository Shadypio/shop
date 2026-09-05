import type { ShopThemeConfig } from '../createShopTheme';

// Configurazione del negozio attualmente attivo (single-tenant nell'MVP).
// Quando la piattaforma diventerà multi-tenant, questa configurazione verrà
// risolta dinamicamente (es. da API in base allo shopId) invece che importata
// staticamente: il resto dell'app non cambia.
export const aeffehomeTheme: ShopThemeConfig = {
  branding: {
    name: 'AEFFE Home&Cosmetic',
    tagline: 'Il tuo negozio di fiducia, sotto casa',
  },
  palette: {
    primary: '#0ea3c1',
    secondary: '#3f7d78',
  },
};
