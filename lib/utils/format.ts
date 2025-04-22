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

/**
 * Converts an array of numbers (each a timestamp) to an array of Date objects.
 * Returns undefined if input is invalid.
 * @param timestamps - Array of numbers (timestamps in ms)
 */
export function parseDatesFromNumberList(timestamps: number[]): Date[] | undefined {
  if (!Array.isArray(timestamps) || timestamps.some(n => typeof n !== "number" || Number.isNaN(n))) {
    return undefined;
  }
  return timestamps.filter(ts => ts > 0).map(ts => new Date(ts));
}
