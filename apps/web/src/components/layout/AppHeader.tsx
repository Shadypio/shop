import { useState } from 'react';
import { AppBar, Badge, Box, Container, IconButton, Toolbar } from '@mui/material';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import { useTheme } from '@mui/material/styles';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useCartStore } from '../../store/cart-store';
import { SearchBar } from '../domain/SearchBar';

interface AppHeaderProps {
  onCartClick: () => void;
}

// Header a due righe, stile e-commerce: logo/brand + carrello sempre a vista
// nella prima riga, barra di ricerca sempre visibile (non nascosta dietro
// un'icona) nella seconda. È il pattern di Amazon/Zalando/Just Eat, non
// quello di un pannello di back-office.
export function AppHeader({ onCartClick }: AppHeaderProps) {
  const theme = useTheme();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const itemCount = useCartStore((state) =>
    state.items.reduce((sum, item) => sum + item.quantity, 0),
  );

  function handleSearchSubmit() {
    navigate(query ? `/cerca?q=${encodeURIComponent(query)}` : '/cerca');
  }

  return (
    <AppBar
      position="sticky"
      color="inherit"
      sx={{
        borderBottom: 1,
        borderColor: 'divider',
        bgcolor: 'rgba(251, 246, 240, 0.92)',
        backdropFilter: 'blur(8px)',
      }}
    >
      <Container maxWidth="lg" disableGutters sx={{ px: { xs: 2, sm: 3 } }}>
        <Toolbar disableGutters sx={{ pt: 1.25, pb: 0.5, gap: 1.5 }}>
          <Box
            component={RouterLink}
            to="/"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.25,
              flexGrow: 1,
              minWidth: 0,
              textDecoration: 'none',
            }}
          >
            <Box
              component="img"
              src="/logo.png"
              alt={theme.shop.name}
              sx={{
                width: 40,
                height: 40,
                flexShrink: 0,
                borderRadius: '12px',
                objectFit: 'cover',
              }}
            />
            <Box
              component="span"
              sx={{
                fontFamily: theme.typography.h6.fontFamily,
                fontWeight: 700,
                fontSize: { xs: '1.05rem', sm: '1.2rem' },
                color: 'text.primary',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {theme.shop.name}
            </Box>
          </Box>

          <IconButton
            onClick={onCartClick}
            aria-label="Apri carrello"
            sx={{
              bgcolor: 'primary.main',
              color: 'primary.contrastText',
              '&:hover': { bgcolor: 'primary.dark' },
            }}
          >
            <Badge
              badgeContent={itemCount}
              color="secondary"
              slotProps={{ badge: { style: { fontWeight: 800 } } }}
            >
              <ShoppingBagOutlinedIcon />
            </Badge>
          </IconButton>
        </Toolbar>

        <Box sx={{ pb: 1.5 }}>
          <SearchBar value={query} onChange={setQuery} onSubmit={handleSearchSubmit} size="small" />
        </Box>
      </Container>
    </AppBar>
  );
}
