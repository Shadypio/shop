import rateLimit from 'express-rate-limit';

// Limita i tentativi di login: protegge la password dell'unico admin da
// attacchi brute-force. IP-based, sufficiente per l'MVP a singolo tenant.
export const loginRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minuti
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: { code: 'TOO_MANY_REQUESTS', message: 'Troppi tentativi di accesso, riprova più tardi' } },
});

// Limita le richieste d'ordine pubbliche: l'endpoint non richiede
// autenticazione, quindi va protetto da spam/abuso (es. script che invia
// centinaia di ordini falsi).
export const createOrderRateLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 ora
  limit: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: { code: 'TOO_MANY_REQUESTS', message: 'Troppe richieste d\'ordine, riprova più tardi' } },
});
