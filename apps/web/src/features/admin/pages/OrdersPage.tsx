import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Alert,
  Box,
  Chip,
  CircularProgress,
  MenuItem,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import { useAdminOrders } from '../queries';
import {
  DELIVERY_METHOD_LABELS,
  ORDER_STATUS_COLORS,
  ORDER_STATUS_LABELS,
} from '../constants';
import { formatDateTime, formatPrice } from '../../../lib/format';
import type { OrderStatus } from '../types';

const statusFilterOptions: Array<{ value: OrderStatus | 'ALL'; label: string }> = [
  { value: 'ALL', label: 'Tutti gli stati' },
  { value: 'PENDING', label: ORDER_STATUS_LABELS.PENDING },
  { value: 'CONFIRMED', label: ORDER_STATUS_LABELS.CONFIRMED },
  { value: 'MODIFIED', label: ORDER_STATUS_LABELS.MODIFIED },
  { value: 'REJECTED', label: ORDER_STATUS_LABELS.REJECTED },
  { value: 'COMPLETED', label: ORDER_STATUS_LABELS.COMPLETED },
];

export function OrdersPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<OrderStatus | 'ALL'>('ALL');
  const navigate = useNavigate();

  const { data: orders, isLoading, isError } = useAdminOrders({
    search: search.trim() || undefined,
    status: statusFilter === 'ALL' ? undefined : statusFilter,
  });

  return (
    <Box>
      <Typography variant="h5" fontWeight={700} sx={{ mb: 3 }}>
        Ordini
      </Typography>

      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 3 }}>
        <TextField
          label="Cerca per nome, cognome o telefono"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          size="small"
          fullWidth
        />
        <TextField
          select
          label="Stato"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as OrderStatus | 'ALL')}
          size="small"
          sx={{ minWidth: 200 }}
        >
          {statusFilterOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </Stack>

      {isLoading ? (
        <Stack alignItems="center" sx={{ py: 4 }}>
          <CircularProgress size={28} />
        </Stack>
      ) : isError ? (
        <Alert severity="error">Impossibile caricare gli ordini.</Alert>
      ) : (
        <TableContainer component={Paper} variant="outlined">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Cliente</TableCell>
                <TableCell>Telefono</TableCell>
                <TableCell>Consegna</TableCell>
                <TableCell>Stato</TableCell>
                <TableCell align="right">Totale</TableCell>
                <TableCell>Data</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(orders ?? []).map((order) => (
                <TableRow
                  key={order.id}
                  hover
                  onClick={() => navigate(`/admin/ordini/${order.id}`)}
                  sx={{ cursor: 'pointer' }}
                >
                  <TableCell>
                    {order.customerName} {order.customerSurname}
                  </TableCell>
                  <TableCell>{order.phone}</TableCell>
                  <TableCell>{DELIVERY_METHOD_LABELS[order.deliveryMethod]}</TableCell>
                  <TableCell>
                    <Chip
                      label={ORDER_STATUS_LABELS[order.status]}
                      color={ORDER_STATUS_COLORS[order.status]}
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="right">{formatPrice(order.total)}</TableCell>
                  <TableCell>{formatDateTime(order.createdAt)}</TableCell>
                </TableRow>
              ))}
              {(orders ?? []).length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6}>
                    <Typography variant="body2" color="text.secondary" sx={{ py: 2 }}>
                      Nessun ordine trovato.
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : null}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}
