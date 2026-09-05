// Estende il Theme di MUI con un campo "shop" dedicato al branding del negozio
// (nome, logo, tagline). Questo è il punto in cui, in futuro, un negozio
// multi-tenant potrà iniettare il proprio branding senza toccare alcun
// componente applicativo: tutto ciò che serve è passare una diversa
// ShopThemeConfig al ShopThemeProvider.
export interface ShopBranding {
  name: string;
  logoUrl?: string;
  // Breve frase distintiva mostrata in header/footer (es. "Il tuo negozio di
  // fiducia dal 1998"). Facoltativa: puramente presentazionale.
  tagline?: string;
}

declare module '@mui/material/styles' {
  interface Theme {
    shop: ShopBranding;
  }
  interface ThemeOptions {
    shop?: ShopBranding;
  }
}
