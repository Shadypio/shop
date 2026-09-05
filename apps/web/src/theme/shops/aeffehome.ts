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
    // Terracotta calda: evoca l'artigianalità di una bottega di quartiere.
    primary: '#C1440E',
    // Verde salvia: complementare naturale, richiama pulizia/freschezza
    // senza scadere nel verde "eco" da grande marketplace.
    secondary: '#3F7D5C',
  },
};
