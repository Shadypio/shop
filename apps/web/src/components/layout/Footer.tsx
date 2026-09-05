import { Box, Container, Stack, Typography } from '@mui/material';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined';
import { useTheme } from '@mui/material/styles';

const highlights = [
  { icon: <LocalShippingOutlinedIcon fontSize="small" />, label: 'Consegna a domicilio' },
  { icon: <StorefrontOutlinedIcon fontSize="small" />, label: 'Ritiro in negozio' },
  { icon: <PaymentsOutlinedIcon fontSize="small" />, label: 'Paghi alla consegna' },
];

// Footer semplice ma "caldo": rassicura il cliente sui punti chiave del
// servizio (nessun pagamento online, nessuna sorpresa) senza appesantire
// la pagina con contenuti legali o link superflui per un piccolo negozio.
export function Footer() {
  const theme = useTheme();

  return (
    <Box component="footer" sx={{ borderTop: 1, borderColor: 'divider', mt: 6 }}>
      <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 }, py: 4 }}>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={{ xs: 2, sm: 4 }}
          justifyContent="center"
          alignItems={{ xs: 'flex-start', sm: 'center' }}
          sx={{ mb: 3 }}
        >
          {highlights.map((item) => (
            <Stack key={item.label} direction="row" spacing={1} alignItems="center">
              <Box sx={{ color: 'secondary.main', display: 'flex' }}>{item.icon}</Box>
              <Typography variant="body2" color="text.secondary" fontWeight={600}>
                {item.label}
              </Typography>
            </Stack>
          ))}
        </Stack>
        <Stack alignItems="center" spacing={0.5}>
          <Typography variant="subtitle2" fontWeight={700} color="text.primary">
            {theme.shop.name}
          </Typography>
          {theme.shop.tagline ? (
            <Typography variant="caption" color="text.secondary">
              {theme.shop.tagline}
            </Typography>
          ) : null}
        </Stack>
      </Container>
    </Box>
  );
}
