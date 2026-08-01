const currencyFormatter = new Intl.NumberFormat('it-IT', {
  style: 'currency',
  currency: 'EUR',
});

export function formatPrice(price: number): string {
  return currencyFormatter.format(price);
}
