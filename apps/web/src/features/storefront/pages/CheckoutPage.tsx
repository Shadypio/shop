import { useState } from 'react';
import { Link as RouterLink, Navigate, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { Box, Button, Stack, Typography } from '@mui/material';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { useCartStore } from '../../../store/cart-store';
import { storefrontApi } from '../api';
import { ApiError } from '../../../lib/api-client';
import { CheckoutForm, type CheckoutFormValues } from '../../../components/domain/CheckoutForm';
import { OrderSummary } from '../../../components/domain/OrderSummary';

const initialValues: CheckoutFormValues = {
  customerName: '',
  customerSurname: '',
  phone: '',
  address: '',
  notes: '',
  deliveryMethod: 'DELIVERY',
};

export function CheckoutPage() {
  const items = useCartStore((state) => state.items);
  const navigate = useNavigate();

  const [values, setValues] = useState<CheckoutFormValues>(initialValues);

  function handleChange<K extends keyof CheckoutFormValues>(
    field: K,
    value: CheckoutFormValues[K],
  ) {
    setValues((prev) => ({ ...prev, [field]: value }));
  }

  const mutation = useMutation({
    mutationFn: () =>
      storefrontApi.createOrder({
        customerName: values.customerName,
        customerSurname: values.customerSurname,
        phone: values.phone,
        address: values.deliveryMethod === 'DELIVERY' ? values.address : undefined,
        notes: values.notes || undefined,
        deliveryMethod: values.deliveryMethod,
        items: items.map((item) => ({ productId: item.productId, quantity: item.quantity })),
      }),
    onSuccess: (order) => {
      navigate('/ordine-confermato', { state: { order } });
    },
  });

  if (items.length === 0) {
    return <Navigate to="/carrello" replace />;
  }

  const errorMessage = mutation.isError
    ? mutation.error instanceof ApiError
      ? mutation.error.message
      : 'Errore imprevisto, riprova.'
    : null;

  return (
    <Box>
      <Button
        component={RouterLink}
        to="/carrello"
        startIcon={<ArrowBackRoundedIcon fontSize="small" />}
        sx={{ mb: 1.5, ml: -1 }}
      >
        Torna al carrello
      </Button>
      <Typography variant="h5" fontWeight={700} sx={{ mb: 3 }}>
        Completa il tuo ordine
      </Typography>

      <Stack spacing={4}>
        <OrderSummary items={items} />
        <CheckoutForm
          values={values}
          onChange={handleChange}
          onSubmit={(e) => {
            e.preventDefault();
            mutation.mutate();
          }}
          submitting={mutation.isPending}
          errorMessage={errorMessage}
        />
      </Stack>
    </Box>
  );
}
