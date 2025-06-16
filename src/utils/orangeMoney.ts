/**
 * Utility functions for Orange Money integration
 */

// Supported Orange Money countries (Web Payment service)
export const ORANGE_MONEY_COUNTRIES = [
  { code: "ML", name: "Mali", flag: "🇲🇱", currency: "XOF" },
  { code: "CM", name: "Cameroon", flag: "🇨🇲", currency: "XAF" },
  { code: "CI", name: "Côte d'Ivoire", flag: "🇨🇮", currency: "XOF" },
  { code: "SN", name: "Senegal", flag: "🇸🇳", currency: "XOF" },
  { code: "MG", name: "Madagascar", flag: "🇲🇬", currency: "MGA" },
  { code: "BW", name: "Botswana", flag: "🇧🇼", currency: "BWP" },
  { code: "GN", name: "Guinea Conakry", flag: "🇬🇳", currency: "GNF" },
  { code: "GW", name: "Guinea-Bissau", flag: "🇬🇼", currency: "XOF" },
  { code: "SL", name: "Sierra Leone", flag: "🇸🇱", currency: "SLE" },
  { code: "CD", name: "RD Congo", flag: "🇨🇩", currency: "CDF" },
  { code: "CF", name: "Central African Republic", flag: "🇨🇫", currency: "XAF" },
];

/**
 * Validate Orange Money phone number
 * @param phoneNumber - The phone number to validate
 * @param countryCode - The country code (e.g., "CM", "CI")
 * @returns boolean indicating if the phone number is valid
 */
export function validateOrangeMoneyPhoneNumber(
  phoneNumber: string,
  countryCode: string,
): boolean {
  if (!phoneNumber || !countryCode) return false;

  // Remove all non-digit characters
  const cleanNumber = phoneNumber.replace(/\D/g, "");

  // Country-specific validation patterns
  const patterns: Record<string, RegExp> = {
    ML: /^(6[0-9]\d{7}|7[0-9]\d{7})$/, // Mali: 6XXXXXXXX or 7XXXXXXXX
    CM: /^(6[5-9]\d{7}|69[0-9]\d{6})$/, // Cameroon: 6XXXXXXXX (Orange prefixes: 65, 66, 67, 68, 69)
    CI: /^(0[1-9]\d{7}|[1-9]\d{7})$/, // Côte d'Ivoire: 8 digits
    SN: /^(7[0-8]\d{7})$/, // Senegal: 7XXXXXXXX
    MG: /^(3[2-4]\d{7})$/, // Madagascar: 3XXXXXXXX
    BW: /^(7[1-9]\d{7})$/, // Botswana: 7XXXXXXXX
    GN: /^(6[2-9]\d{7})$/, // Guinea Conakry: 6XXXXXXXX
    GW: /^(9[0-9]\d{7})$/, // Guinea-Bissau: 9XXXXXXXX
    SL: /^(7[6-9]\d{7}|2[1-5]\d{7})$/, // Sierra Leone: 7XXXXXXXX or 2XXXXXXXX
    CD: /^(8[0-9]\d{7}|9[0-9]\d{7})$/, // RD Congo: 8XXXXXXXX or 9XXXXXXXX
    CF: /^(7[0-9]\d{7})$/, // Central African Republic: 7XXXXXXXX
  };

  const pattern = patterns[countryCode];
  return pattern ? pattern.test(cleanNumber) : false;
}

/**
 * Format phone number for Orange Money API
 * @param phoneNumber - The phone number to format
 * @param countryCode - The country code
 * @returns formatted phone number
 */
export function formatOrangeMoneyPhoneNumber(
  phoneNumber: string,
  countryCode: string,
): string {
  const cleanNumber = phoneNumber.replace(/\D/g, "");

  // Country-specific formatting
  switch (countryCode) {
    case "ML":
      // Mali: add country code 223 if not present
      if (
        cleanNumber.length === 8 &&
        (cleanNumber.startsWith("6") || cleanNumber.startsWith("7"))
      ) {
        return `223${cleanNumber}`;
      }
      if (cleanNumber.length === 11 && cleanNumber.startsWith("223")) {
        return cleanNumber;
      }
      return cleanNumber;

    case "CM":
      // Cameroon: add country code 237 if not present
      if (cleanNumber.length === 9 && cleanNumber.startsWith("6")) {
        return `237${cleanNumber}`;
      }
      if (cleanNumber.length === 12 && cleanNumber.startsWith("237")) {
        return cleanNumber;
      }
      return cleanNumber;

    case "CI":
      // Côte d'Ivoire: add country code 225 if not present
      if (cleanNumber.length === 8) {
        return `225${cleanNumber}`;
      }
      if (cleanNumber.length === 11 && cleanNumber.startsWith("225")) {
        return cleanNumber;
      }
      return cleanNumber;

    case "SN":
      // Senegal: add country code 221 if not present
      if (cleanNumber.length === 9 && cleanNumber.startsWith("7")) {
        return `221${cleanNumber}`;
      }
      if (cleanNumber.length === 12 && cleanNumber.startsWith("221")) {
        return cleanNumber;
      }
      return cleanNumber;

    case "MG":
      // Madagascar: add country code 261 if not present
      if (cleanNumber.length === 9 && cleanNumber.startsWith("3")) {
        return `261${cleanNumber}`;
      }
      if (cleanNumber.length === 12 && cleanNumber.startsWith("261")) {
        return cleanNumber;
      }
      return cleanNumber;

    case "BW":
      // Botswana: add country code 267 if not present
      if (cleanNumber.length === 8 && cleanNumber.startsWith("7")) {
        return `267${cleanNumber}`;
      }
      if (cleanNumber.length === 11 && cleanNumber.startsWith("267")) {
        return cleanNumber;
      }
      return cleanNumber;

    case "GN":
      // Guinea Conakry: add country code 224 if not present
      if (cleanNumber.length === 9 && cleanNumber.startsWith("6")) {
        return `224${cleanNumber}`;
      }
      if (cleanNumber.length === 12 && cleanNumber.startsWith("224")) {
        return cleanNumber;
      }
      return cleanNumber;

    case "GW":
      // Guinea-Bissau: add country code 245 if not present
      if (cleanNumber.length === 9 && cleanNumber.startsWith("9")) {
        return `245${cleanNumber}`;
      }
      if (cleanNumber.length === 12 && cleanNumber.startsWith("245")) {
        return cleanNumber;
      }
      return cleanNumber;

    case "SL":
      // Sierra Leone: add country code 232 if not present
      if (
        cleanNumber.length === 8 &&
        (cleanNumber.startsWith("7") || cleanNumber.startsWith("2"))
      ) {
        return `232${cleanNumber}`;
      }
      if (cleanNumber.length === 11 && cleanNumber.startsWith("232")) {
        return cleanNumber;
      }
      return cleanNumber;

    case "CD":
      // RD Congo: add country code 243 if not present
      if (
        cleanNumber.length === 9 &&
        (cleanNumber.startsWith("8") || cleanNumber.startsWith("9"))
      ) {
        return `243${cleanNumber}`;
      }
      if (cleanNumber.length === 12 && cleanNumber.startsWith("243")) {
        return cleanNumber;
      }
      return cleanNumber;

    case "CF":
      // Central African Republic: add country code 236 if not present
      if (cleanNumber.length === 8 && cleanNumber.startsWith("7")) {
        return `236${cleanNumber}`;
      }
      if (cleanNumber.length === 11 && cleanNumber.startsWith("236")) {
        return cleanNumber;
      }
      return cleanNumber;

    default:
      return cleanNumber;
  }
}

/**
 * Validate Orange Money amount
 * @param amount - The amount to validate
 * @param currency - The currency code
 * @returns boolean indicating if the amount is valid
 */
export function validateOrangeMoneyAmount(
  amount: number | string,
  currency: string,
): boolean {
  const numAmount = typeof amount === "string" ? parseFloat(amount) : amount;

  if (isNaN(numAmount) || numAmount <= 0) return false;

  // Currency-specific minimum amounts
  const minimums: Record<string, number> = {
    XOF: 100, // West African Franc (Mali, CI, Senegal, Guinea-Bissau): minimum 100 XOF
    XAF: 100, // Central African Franc (Cameroon, CAR): minimum 100 XAF
    MGA: 500, // Malagasy Ariary (Madagascar): minimum 500 MGA
    BWP: 10, // Botswana Pula: minimum 10 BWP
    GNF: 1000, // Guinea Franc: minimum 1000 GNF
    SLE: 10, // Sierra Leone Leone: minimum 10 SLE
    CDF: 1000, // Congolese Franc: minimum 1000 CDF
  };

  // Currency-specific maximum amounts
  const maximums: Record<string, number> = {
    XOF: 1000000, // 1,000,000 XOF
    XAF: 1000000, // 1,000,000 XAF
    MGA: 2000000, // 2,000,000 MGA
    BWP: 50000, // 50,000 BWP
    GNF: 10000000, // 10,000,000 GNF
    SLE: 50000, // 50,000 SLE
    CDF: 10000000, // 10,000,000 CDF
  };

  const minAmount = minimums[currency] || 100;
  const maxAmount = maximums[currency] || 1000000;

  return numAmount >= minAmount && numAmount <= maxAmount;
}

/**
 * Format amount for Orange Money display
 * @param amount - The amount to format
 * @param currency - The currency code
 * @returns formatted amount string
 */
export function formatOrangeMoneyAmount(
  amount: number | string,
  currency: string,
): string {
  const numAmount = typeof amount === "string" ? parseFloat(amount) : amount;

  const formatter = new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  return formatter.format(numAmount);
}

/**
 * Get supported currencies for Orange Money
 * @returns array of supported currency codes
 */
export function getOrangeMoneySupportedCurrencies(): string[] {
  return ["XOF", "XAF", "MGA", "BWP", "GNF", "SLE", "CDF"];
}

/**
 * Get Orange Money country by currency
 * @param currency - The currency code
 * @returns country information or null
 */
export function getOrangeMoneyCountryByCurrency(currency: string) {
  return (
    ORANGE_MONEY_COUNTRIES.find((country) => country.currency === currency) ||
    null
  );
}

/**
 * Generate a unique order ID for Orange Money transactions
 * @param prefix - Optional prefix for the order ID
 * @returns unique order ID
 */
export function generateOrangeMoneyOrderId(prefix: string = "OM"): string {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0");
  return `${prefix}${timestamp}${random}`;
}

/**
 * Get payment status message in user-friendly format
 * @param status - The payment status from API
 * @returns user-friendly status message
 */
export function getOrangeMoneyStatusMessage(
  status: "PENDING" | "SUCCESS" | "FAILED",
): string {
  switch (status) {
    case "PENDING":
      return "Payment request sent. Please confirm on your phone.";
    case "SUCCESS":
      return "Payment completed successfully!";
    case "FAILED":
      return "Payment failed. Please try again.";
    default:
      return "Unknown payment status.";
  }
}
