import { Box, Container, Link, Stack, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';

const highlights = [
  { icon: <LocalShippingOutlinedIcon fontSize="small" />, label: 'Consegna a domicilio' },
  { icon: <StorefrontOutlinedIcon fontSize="small" />, label: 'Ritiro in negozio' },
  { icon: <PaymentsOutlinedIcon fontSize="small" />, label: 'Paghi alla consegna' },
];

const contact = {
  phone: 'Tel. 366 74 89 675',
  address: 'Via S. Giuseppe, 32, 80054 Gragnano NA, Italia',
};

const infoLinks = [
  { to: '/privacy', label: 'Privacy Policy' },
  { to: '/cookie-policy', label: 'Cookie Policy' },
  { to: '/termini-vendita', label: 'Termini di vendita' },
  /* { to: '/recesso-resi', label: 'Diritto di recesso / Resi' },
  { to: '/spedizioni-e-consegne', label: 'Spedizioni e consegne' }, */
];

// Footer semplice ma "caldo": rassicura il cliente sui punti chiave del
// servizio (nessun pagamento online, nessuna sorpresa) senza appesantire
// la pagina con contenuti legali o link superflui per un piccolo negozio.
export function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        borderTop: 1,
        borderColor: 'divider',
        mt: 6,
        pb: { xs: 2, sm: 0 },
      }}
    >
      <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 }, py: 4 }}>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={{ xs: 2, sm: 4 }}
          justifyContent="center"
          alignItems={{ xs: 'flex-start', sm: 'center' }}
          sx={{ mb: 4 }}
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

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 4, sm: 6 }} sx={{ mb: 4 }}>
          <Stack spacing={1.25} sx={{ flex: 1 }}>
            <Typography variant="subtitle2" fontWeight={700} color="text.primary">
              Contatti
            </Typography>
            <Stack direction="row" spacing={1} alignItems="center">
              <PhoneOutlinedIcon fontSize="small" sx={{ color: 'text.secondary' }} />
              <Typography variant="body2" color="text.secondary">
                {contact.phone}
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center">
              <PlaceOutlinedIcon fontSize="small" sx={{ color: 'text.secondary' }} />
              <Typography variant="body2" color="text.secondary">
                {contact.address}
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="flex-start">
              <AccessTimeOutlinedIcon
                fontSize="small"
                sx={{
                  color: 'text.secondary',
                  mt: 0.25,
                  flexShrink: 0,
                }}
              />

              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: '1fr auto',
                  columnGap: 2,
                  rowGap: 0.5,
                  width: '100%',
                  minWidth: 0,
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  Lun, Mar, Gio, Ven, Sab
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ textAlign: 'right', whiteSpace: 'nowrap' }}
                >
                  9:00 - 13:30
                  <br />
                  16:30 - 20:00
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  Mercoledì
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ textAlign: 'right', whiteSpace: 'nowrap' }}
                >
                  16:30 - 20:00
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  Domenica
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'right' }}>
                  Chiuso
                </Typography>
              </Box>
            </Stack>
          </Stack>
        </Stack>

        <Stack alignItems="center" spacing={2} sx={{ pt: 3, borderTop: 1, borderColor: 'divider' }}>
          <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>
            © {new Date().getFullYear()} AEFFE Home&Cosmetic
          </Typography>{' '}
          <Stack
            sx={{
              flex: 1,
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: 'center',
              gap: 2,
            }}
          >
            {infoLinks.map((item) => (
              <Link
                key={item.to}
                component={RouterLink}
                to={item.to}
                variant="body2"
                color="text.secondary"
                underline="hover"
              >
                {item.label}
              </Link>
            ))}
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
