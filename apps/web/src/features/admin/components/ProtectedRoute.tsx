import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';
import { useAdminMe } from '../queries';

// Applicato a tutte le rotte /admin/* (tranne /admin/login): verifica la
// sessione tramite GET /me. Un 401 fa scattare isError, non un errore
// applicativo bloccante: significa semplicemente "vai al login".
export function ProtectedRoute() {
  const { data, isLoading, isError } = useAdminMe();
  const location = useLocation();

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100svh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError || !data) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}
