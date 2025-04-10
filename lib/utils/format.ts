/**
 * Formats a number as currency in Vietnamese format
 * @param amount - The amount to format
 * @returns Formatted currency string
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND"
  }).format(amount);
}

/**
 * Formats a number as currency in Vietnamese format
 * @param amount - The amount to format
 * @returns Formatted currency string
 */
export function formatDate(amount: number): string {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND"
  }).format(amount);
}
