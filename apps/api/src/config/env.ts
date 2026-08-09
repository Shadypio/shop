import 'dotenv/config';
import { z } from 'zod';

// Validazione fail-fast delle variabili d'ambiente: se manca qualcosa
// di critico il server non deve avviarsi silenziosamente in uno stato inconsistente.
const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().default(4000),
  DATABASE_URL: z.string().min(1, 'DATABASE_URL è obbligatoria'),
  SESSION_SECRET: z.string().min(10, 'SESSION_SECRET deve essere una stringa robusta'),
  WEB_ORIGIN: z.string().min(1).default('http://localhost:5173'),
  // URL pubblico con cui il backend è raggiungibile: usato per comporre gli
  // URL assoluti delle immagini caricate localmente (storage su disco).
  API_PUBLIC_URL: z.string().min(1).default('http://localhost:4000'),
  // Slug dello shop attivo. Nell'MVP esiste un solo shop; questo campo prepara
  // il terreno per il multi-tenant futuro senza introdurne la complessità ora.
  SHOP_SLUG: z.string().min(1).default('shop-detersivi'),
});

export const env = envSchema.parse(process.env);
