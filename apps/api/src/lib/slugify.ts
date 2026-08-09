// Slug semplice e prevedibile: minuscolo, spazi/caratteri speciali sostituiti
// da trattini. Usato per generare lo slug pubblico di categorie e prodotti a
// partire dal nome inserito dal negoziante nel pannello admin.
export function slugify(input: string): string {
  return input
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // rimuove accenti
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
