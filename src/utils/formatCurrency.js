const CURRENCY = {
  locale: "en-NG",
  currency: "NGN",
}

/**
 * Formats a number into a localized currency string
 * @param {number} amount
 * @returns {string}
 */

export function formatCurrency(amount) {
  return new Intl.NumberFormat(CURRENCY.locale, {
    style: "currency",
    currency: CURRENCY.currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount)
}