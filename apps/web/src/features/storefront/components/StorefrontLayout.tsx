import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Container } from '@mui/material';
import { AppHeader } from '../../../components/layout/AppHeader';
import { CartDrawer } from '../../../components/domain/CartDrawer';

export function StorefrontLayout() {
  const [cartOpen, setCartOpen] = useState(false);

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
      <Container maxWidth="sm" component="main" sx={{ flexGrow: 1, py: 4 }}>
        <Outlet />
      </Container>
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </Box>
  );
}
