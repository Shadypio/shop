import { Divider, IconButton, Stack, Typography } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { formatPrice } from '../../lib/format';
import { QuantityStepper } from './QuantityStepper';

export interface OrderSummaryItem {
  productId: string;
  name: string;
  unitPrice: number;
  quantity: number;
}

interface OrderSummaryProps {
  items: OrderSummaryItem[];
  // In modalità "editable" l'utente può cambiare quantità/rimuovere articoli
  // (usato in Carrello/CartDrawer); in modalità di sola lettura (Checkout,
  // conferma ordine) mostra solo il riepilogo statico.
  editable?: boolean;
  onQuantityChange?: (productId: string, quantity: number) => void;
  onRemove?: (productId: string) => void;
}

export function OrderSummary({ items, editable = false, onQuantityChange, onRemove }: OrderSummaryProps) {
  const total = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);

  return (
    <Stack spacing={1.5}>
      {items.map((item) => (
        <Stack key={item.productId} direction="row" alignItems="center" spacing={1.5}>
          <Stack sx={{ flexGrow: 1, minWidth: 0 }}>
            <Typography variant="body2" fontWeight={600} noWrap>
              {item.name}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {formatPrice(item.unitPrice)} cad.
            </Typography>
          </Stack>

          {editable && onQuantityChange ? (
            <QuantityStepper
              value={item.quantity}
              onChange={(quantity) => onQuantityChange(item.productId, quantity)}
              size="small"
            />
          ) : (
            <Typography variant="body2" color="text.secondary">
              x{item.quantity}
            </Typography>
          )}

          {editable && onRemove ? (
            <IconButton
              size="small"
              color="error"
              onClick={() => onRemove(item.productId)}
              aria-label={`Rimuovi ${item.name}`}
            >
              <DeleteOutlineIcon fontSize="small" />
            </IconButton>
          ) : null}
        </Stack>
      ))}

      <Divider />

      <Stack direction="row" justifyContent="space-between">
        <Typography variant="subtitle1" fontWeight={700}>
          Totale
        </Typography>
        <Typography variant="subtitle1" fontWeight={700}>
          {formatPrice(total)}
        </Typography>
      </Stack>
    </Stack>
  );
}
