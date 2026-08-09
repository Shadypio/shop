import { z } from 'zod';

// Validazione query params per la lista prodotti pubblica.
export const listProductsQuerySchema = z.object({
  categoryId: z.string().optional(),
  categorySlug: z.string().optional(),
  search: z.string().trim().min(1).optional(),
});

export type ListProductsQuery = z.infer<typeof listProductsQuerySchema>;

export const createProductSchema = z.object({
  name: z.string().trim().min(1, 'Il nome è obbligatorio').max(150),
  description: z.string().trim().max(2000).optional(),
  price: z.coerce.number().positive('Il prezzo deve essere maggiore di zero'),
  categoryId: z.string().min(1, 'Seleziona una categoria'),
  available: z.coerce.boolean().default(true),
});

export const updateProductSchema = z.object({
  name: z.string().trim().min(1).max(150).optional(),
  description: z.string().trim().max(2000).optional(),
  price: z.coerce.number().positive().optional(),
  categoryId: z.string().min(1).optional(),
  available: z.coerce.boolean().optional(),
});

export type CreateProductInput = z.infer<typeof createProductSchema>;
export type UpdateProductInput = z.infer<typeof updateProductSchema>;
