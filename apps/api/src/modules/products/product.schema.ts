import { z } from 'zod';

// Validazione query params per la lista prodotti pubblica.
export const listProductsQuerySchema = z.object({
  categoryId: z.string().optional(),
  categorySlug: z.string().optional(),
  search: z.string().trim().min(1).optional(),
});

export type ListProductsQuery = z.infer<typeof listProductsQuerySchema>;
