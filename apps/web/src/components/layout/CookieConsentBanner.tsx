import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Button, Link, Paper, Stack, Typography, Slide } from '@mui/material';

const STORAGE_KEY = 'cookie-consent-acknowledged';

// Banner informativo, non un vero gate di consenso: il sito usa solo il
// cookie di sessione tecnico dell'admin (nessun tracking/profilazione), per
// cui non c'è nulla su cui l'utente debba scegliere — serve solo informarlo,
// come previsto dalla normativa per i cookie strettamente necessari.
export function CookieConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const acknowledged = window.localStorage.getItem(STORAGE_KEY);
    if (!acknowledged) {
      setVisible(true);
    }
  }, []);

  const handleAcknowledge = () => {
    window.localStorage.setItem(STORAGE_KEY, 'true');
    setVisible(false);
  };

  return (
    <Slide direction="up" in={visible} mountOnEnter unmountOnExit>
      <Paper
        elevation={6}
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: (theme) => theme.zIndex.snackbar,
          borderRadius: 0,
          borderTop: 1,
          borderColor: 'divider',
          px: { xs: 2, sm: 4 },
          py: 2,
        }}
      >
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          alignItems={{ xs: 'stretch', sm: 'center' }}
          justifyContent="center"
          sx={{ maxWidth: 960, mx: 'auto' }}
        >
          <Typography variant="body2" color="text.secondary" sx={{ flex: 1 }}>
            Questo sito utilizza solo cookie tecnici necessari al funzionamento del servizio.
            Nessun cookie di profilazione o di terze parti.{' '}
            <Link component={RouterLink} to="/cookie-policy">
              Scopri di più
            </Link>
          </Typography>
          <Box>
            <Button variant="contained" onClick={handleAcknowledge} fullWidth>
              Ho capito
            </Button>
          </Box>
        </Stack>
      </Paper>
    </Slide>
  );
}
