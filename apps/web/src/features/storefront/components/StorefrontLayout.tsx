import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Container } from '@mui/material';
import { AppHeader } from '../../../components/layout/AppHeader';
import { Footer } from '../../../components/layout/Footer';
import { CookieConsentBanner } from '../../../components/layout/CookieConsentBanner';
import { CartDrawer } from '../../../components/domain/CartDrawer';
import { CartBar } from '../../../components/layout/CartBar';
import { useCartStore } from '../../../store/cart-store';

export function StorefrontLayout() {
  const [cartOpen, setCartOpen] = useState(false);
  const hasItems = useCartStore((state) => state.items.length > 0);

  return (
    <Box
      sx={{
        minHeight: '100svh',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'background.default',
      }}
    >
      <AppHeader onCartClick={() => setCartOpen(true)} />
      <Container
        maxWidth="lg"
        component="main"
        sx={{
          flexGrow: 1,
          px: { xs: 2, sm: 3 },
          py: { xs: 3, sm: 5 },
          pb: hasItems ? { xs: 11, sm: 5 } : { xs: 3, sm: 5 },
        }}
      >
        <Outlet />
      </Container>
      <Footer />
      <CartBar onOpenCart={() => setCartOpen(true)} />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
      <CookieConsentBanner />
    </Box>
  );
}
