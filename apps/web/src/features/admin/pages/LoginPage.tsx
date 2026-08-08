import { Box, Paper, Typography } from '@mui/material';

export function AdminLoginPage() {
  return (
    <Box
      sx={{
        minHeight: '100svh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
        bgcolor: 'background.default',
      }}
    >
      <Paper variant="outlined" sx={{ p: 4, maxWidth: 360, width: '100%', borderRadius: 2 }}>
        <Typography variant="h6" fontWeight={700}>
          Accesso amministratore
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Form di login in arrivo — M3.
        </Typography>
      </Paper>
    </Box>
  );
}
