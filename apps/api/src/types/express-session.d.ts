import 'express-session';

// Estende i dati di sessione con l'id dell'admin autenticato. Un solo campo
// oggi (single-admin), ma già named per permettere in futuro più ruoli/dati.
declare module 'express-session' {
  interface SessionData {
    adminUserId?: string;
  }
}
