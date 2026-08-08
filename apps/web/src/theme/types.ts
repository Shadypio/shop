// Estende il Theme di MUI con un campo "shop" dedicato al branding del negozio
// (nome, logo). Questo è il punto in cui, in futuro, un negozio multi-tenant
// potrà iniettare il proprio branding senza toccare alcun componente applicativo:
// tutto ciò che serve è passare una diversa ShopThemeConfig al ShopThemeProvider.
export interface ShopBranding {
  name: string;
  logoUrl?: string;
}

declare module '@mui/material/styles' {
  interface Theme {
    shop: ShopBranding;
  }
  interface ThemeOptions {
    shop?: ShopBranding;
  }
}
