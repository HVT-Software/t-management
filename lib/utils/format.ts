/**
 * Formats a number as currency in Vietnamese format
 * @param amount - The amount to format
 * @returns Formatted currency string
 */
export function toCurrency(amount: number): string {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND"
  }).format(amount);
}

/**
 * Formats a Date object to Vietnamese locale string
 * @param date - The date to format
 * @returns Formatted date string
 */
export function formatDate(date: Date | string | number | undefined, opts: Intl.DateTimeFormatOptions = {}): string {
  if (!date) return "";

  try {
    return new Intl.DateTimeFormat("vi-VN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      ...opts
    }).format(new Date(date));
  } catch {
    return "";
  }
}

/**
 * Formats a Date object to Vietnamese locale string
 * @param date - The date to format
 * @returns Formatted date string
 */
export function toDatetime(date: Date): string {
  return new Intl.DateTimeFormat("vi-VN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  }).format(date);
}
