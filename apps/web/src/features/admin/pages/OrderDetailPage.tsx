import { Link as RouterLink, useParams } from 'react-router-dom';
import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  Divider,
  MenuItem,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useAdminOrder, useUpdateOrderStatus } from '../queries';
import {
  DELIVERY_METHOD_LABELS,
  ORDER_STATUS_COLORS,
  ORDER_STATUS_LABELS,
  isOrderStatusTerminal,
} from '../constants';
import { formatDateTime, formatPrice } from '../../../lib/format';
import { ApiError } from '../../../lib/api-client';
import type { OrderStatus } from '../types';

const allStatuses: OrderStatus[] = ['PENDING', 'CONFIRMED', 'MODIFIED', 'REJECTED', 'COMPLETED'];

export function OrderDetailPage() {
  const { id = '' } = useParams();
  const { data: order, isLoading, isError } = useAdminOrder(id);
  const updateStatus = useUpdateOrderStatus();

  if (isLoading) {
    return (
      <Stack alignItems="center" sx={{ py: 4 }}>
        <CircularProgress size={28} />
      </Stack>
    );
  }

  if (isError || !order) {
    return <Alert severity="error">Ordine non trovato.</Alert>;
  }

  const terminal = isOrderStatusTerminal(order.status);
  const errorMessage =
    updateStatus.error instanceof ApiError ? updateStatus.error.message : null;

  function handleStatusChange(nextStatus: OrderStatus) {
    if (nextStatus === order!.status) return;
    updateStatus.mutate({ id: order!.id, status: nextStatus });
  }

  return (
    <Box>
      <Button
        component={RouterLink}
        to="/admin/ordini"
        startIcon={<ArrowBackIosNewIcon fontSize="small" />}
        sx={{ mb: 2 }}
      >
        Tutti gli ordini
      </Button>

      <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 3 }}>
        <Box>
          <Typography variant="h5" fontWeight={700}>
            {order.customerName} {order.customerSurname}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Ordine ricevuto il {formatDateTime(order.createdAt)}
          </Typography>
        </Box>
        <Chip
          label={ORDER_STATUS_LABELS[order.status]}
          color={ORDER_STATUS_COLORS[order.status]}
        />
      </Stack>

      <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
        <Paper variant="outlined" sx={{ p: 3, flex: 2 }}>
          <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 2 }}>
            Articoli
          </Typography>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Prodotto</TableCell>
                <TableCell align="right">Prezzo</TableCell>
                <TableCell align="right">Quantità</TableCell>
                <TableCell align="right">Subtotale</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {order.items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.productName}</TableCell>
                  <TableCell align="right">{formatPrice(item.unitPrice)}</TableCell>
                  <TableCell align="right">{item.quantity}</TableCell>
                  <TableCell align="right">
                    {formatPrice(item.unitPrice * item.quantity)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Divider sx={{ my: 2 }} />
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="subtitle1" fontWeight={700}>
              Totale
            </Typography>
            <Typography variant="subtitle1" fontWeight={700}>
              {formatPrice(order.total)}
            </Typography>
          </Stack>
        </Paper>

        <Stack spacing={3} sx={{ flex: 1 }}>
          <Paper variant="outlined" sx={{ p: 3 }}>
            <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 2 }}>
              Cliente
            </Typography>
            <Stack spacing={1}>
              <Typography variant="body2">Telefono: {order.phone}</Typography>
              <Typography variant="body2">
                Consegna: {DELIVERY_METHOD_LABELS[order.deliveryMethod]}
              </Typography>
              {order.address ? (
                <Typography variant="body2">Indirizzo: {order.address}</Typography>
              ) : null}
              {order.notes ? (
                <Typography variant="body2">Note: {order.notes}</Typography>
              ) : null}
            </Stack>
          </Paper>

          <Paper variant="outlined" sx={{ p: 3 }}>
            <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 2 }}>
              Stato ordine
            </Typography>
            {terminal ? (
              <Alert severity="info">
                Questo ordine è "{ORDER_STATUS_LABELS[order.status]}" e non può essere modificato
                ulteriormente.
              </Alert>
            ) : (
              <TextField
                select
                label="Cambia stato"
                value={order.status}
                onChange={(e) => handleStatusChange(e.target.value as OrderStatus)}
                fullWidth
                disabled={updateStatus.isPending}
              >
                {allStatuses.map((status) => (
                  <MenuItem key={status} value={status}>
                    {ORDER_STATUS_LABELS[status]}
                  </MenuItem>
                ))}
              </TextField>
            )}
            {errorMessage ? (
              <Alert severity="error" sx={{ mt: 2 }}>
                {errorMessage}
              </Alert>
            ) : null}
          </Paper>
        </Stack>
      </Stack>
    </Box>
  );
}
