import { useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Alert, Box, Button, Paper, Stack, TextField, Typography } from '@mui/material';
import { useAdminLogin, useAdminMe } from '../queries';
import { ApiError } from '../../../lib/api-client';

interface LocationState {
  from?: { pathname: string };
}

export function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const login = useAdminLogin();
  const { data: currentAdmin } = useAdminMe();
  const navigate = useNavigate();
  const location = useLocation();

  // Se già autenticato (es. sessione ancora valida), non mostrare di nuovo il
  // form: torna direttamente alla pagina richiesta o alla dashboard.
  if (currentAdmin) {
    const redirectTo = (location.state as LocationState)?.from?.pathname ?? '/admin/dashboard';
    return <Navigate to={redirectTo} replace />;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    login.mutate(
      { email, password },
      {
        onSuccess: () => {
          const redirectTo = (location.state as LocationState)?.from?.pathname ?? '/admin/dashboard';
          navigate(redirectTo, { replace: true });
        },
      },
    );
  }

  const errorMessage =
    login.error instanceof ApiError ? login.error.message : 'Errore imprevisto, riprova.';

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
        <Typography variant="h6" fontWeight={700} sx={{ mb: 3 }}>
          Accesso amministratore
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoFocus
              fullWidth
            />
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              fullWidth
            />
            {login.isError ? <Alert severity="error">{errorMessage}</Alert> : null}
            <Button type="submit" variant="contained" size="large" disabled={login.isPending}>
              {login.isPending ? 'Accesso in corso…' : 'Accedi'}
            </Button>
          </Stack>
        </Box>
      </Paper>
    </Box>
  );
}
