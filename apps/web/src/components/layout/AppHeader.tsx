import { AppBar, Badge, Container, IconButton, Toolbar, Typography } from '@mui/material';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { useTheme } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';
import { useCartStore } from '../../store/cart-store';

interface AppHeaderProps {
  onCartClick: () => void;
}

export function AppHeader({ onCartClick }: AppHeaderProps) {
  const theme = useTheme();
  const itemCount = useCartStore((state) =>
    state.items.reduce((sum, item) => sum + item.quantity, 0),
  );

  return (
    <AppBar
      position="sticky"
      color="inherit"
      sx={{ borderBottom: 1, borderColor: 'divider', bgcolor: 'background.paper' }}
    >
      <Container maxWidth="sm" disableGutters sx={{ px: 2 }}>
        <Toolbar disableGutters>
          <Typography
            component={RouterLink}
            to="/"
            variant="h6"
            fontWeight={700}
            color="text.primary"
            sx={{ flexGrow: 1, textDecoration: 'none' }}
          >
            {theme.shop.name}
          </Typography>
          <IconButton onClick={onCartClick} aria-label="Apri carrello" color="inherit">
            <Badge badgeContent={itemCount} color="primary">
              <ShoppingCartOutlinedIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
