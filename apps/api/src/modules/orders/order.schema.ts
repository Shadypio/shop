import { z } from 'zod';

// Checkout minimale (<30s): pochi campi, validazione leggera ma sufficiente.
export const createOrderSchema = z
  .object({
    customerName: z.string().trim().min(1, 'Il nome è obbligatorio').max(100),
    customerSurname: z.string().trim().min(1, 'Il cognome è obbligatorio').max(100),
    phone: z.string().trim().min(6, 'Numero di telefono non valido').max(20),
    address: z.string().trim().max(300).optional(),
    notes: z.string().trim().max(500).optional(),
    deliveryMethod: z.enum(['DELIVERY', 'PICKUP']),
    items: z
      .array(
        z.object({
          productId: z.string().min(1),
          quantity: z.coerce.number().int().min(1).max(50),
        }),
      )
      .min(1, 'Il carrello è vuoto'),
  })
  .superRefine((data, ctx) => {
    if (data.deliveryMethod === 'DELIVERY' && !data.address) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['address'],
        message: 'Indirizzo obbligatorio per la consegna a domicilio',
      });
    }
  });

export type CreateOrderInput = z.infer<typeof createOrderSchema>;

// --- Admin: elenco ordini con filtri/ricerca ---
export const orderStatusEnum = z.enum([
  'PENDING',
  'CONFIRMED',
  'MODIFIED',
  'REJECTED',
  'COMPLETED',
]);

export const listOrdersQuerySchema = z.object({
  status: orderStatusEnum.optional(),
  // Ricerca libera su nome, cognome o telefono del cliente.
  search: z.string().trim().min(1).optional(),
});

export type ListOrdersQuery = z.infer<typeof listOrdersQuerySchema>;

export const updateOrderStatusSchema = z.object({
  status: orderStatusEnum,
});

export type UpdateOrderStatusInput = z.infer<typeof updateOrderStatusSchema>;
