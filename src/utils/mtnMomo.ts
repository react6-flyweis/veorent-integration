// MTN MoMo Phone Number Utilities

// Supported MTN countries and their phone number formats
const MTN_COUNTRIES = {
  UG: {
    // Uganda
    code: "+256",
    format: /^(\+256|0)?[37][0-9]{8}$/,
    prefix: "256",
    example: "+256700123456",
  },
  GH: {
    // Ghana
    code: "+233",
    format: /^(\+233|0)?[235][0-9]{8}$/,
    prefix: "233",
    example: "+233241234567",
  },
  CI: {
    // Côte d'Ivoire
    code: "+225",
    format: /^(\+225|0)?[0-9]{8}$/,
    prefix: "225",
    example: "+22501234567",
  },
  CM: {
    // Cameroon
    code: "+237",
    format: /^(\+237|0)?[67][0-9]{8}$/,
    prefix: "237",
    example: "+237671234567",
  },
  ZA: {
    // South Africa
    code: "+27",
    format: /^(\+27|0)?[1-9][0-9]{8}$/,
    prefix: "27",
    example: "+27821234567",
  },
  RW: {
    // Rwanda
    code: "+250",
    format: /^(\+250|0)?[78][0-9]{8}$/,
    prefix: "250",
    example: "+250781234567",
  },
  ZM: {
    // Zambia
    code: "+260",
    format: /^(\+260|0)?[79][0-9]{8}$/,
    prefix: "260",
    example: "+260971234567",
  },
};

/**
 * Validates and formats MTN MoMo phone number
 */
export function validateMTNMoMoPhoneNumber(
  phoneNumber: string,
  countryCode?: string,
): IMTNMoMoPhoneValidation {
  // Remove spaces and special characters
  const cleanNumber = phoneNumber.replace(/[\s\-()]/g, "");

  // If country code is provided, validate against that specific country
  if (countryCode && MTN_COUNTRIES[countryCode as keyof typeof MTN_COUNTRIES]) {
    const country = MTN_COUNTRIES[countryCode as keyof typeof MTN_COUNTRIES];
    const isValid = country.format.test(cleanNumber);

    if (isValid) {
      const formattedNumber = formatPhoneNumber(cleanNumber, country);
      return {
        isValid: true,
        formattedNumber,
        country: countryCode,
        countryCode: country.code,
      };
    }
  }

  // Try to match against all supported countries
  for (const [code, country] of Object.entries(MTN_COUNTRIES)) {
    if (country.format.test(cleanNumber)) {
      const formattedNumber = formatPhoneNumber(cleanNumber, country);
      return {
        isValid: true,
        formattedNumber,
        country: code,
        countryCode: country.code,
      };
    }
  }

  return {
    isValid: false,
    formattedNumber: cleanNumber,
    country: "",
    countryCode: "",
  };
}

/**
 * Formats phone number to international format
 */
function formatPhoneNumber(
  phoneNumber: string,
  country: (typeof MTN_COUNTRIES)[keyof typeof MTN_COUNTRIES],
): string {
  let number = phoneNumber;

  // Remove country code if present
  if (number.startsWith(`+${country.prefix}`)) {
    number = number.substring(country.prefix.length + 1);
  } else if (number.startsWith(country.prefix)) {
    number = number.substring(country.prefix.length);
  } else if (number.startsWith("0")) {
    number = number.substring(1);
  }

  return `${country.prefix}${number}`;
}

/**
 * Gets the display format for phone number
 */
export function getDisplayPhoneNumber(phoneNumber: string): string {
  const validation = validateMTNMoMoPhoneNumber(phoneNumber);
  if (validation.isValid) {
    return `${validation.countryCode}${validation.formattedNumber.replace(validation.countryCode.replace("+", ""), "")}`;
  }
  return phoneNumber;
}

/**
 * Checks if a phone number belongs to MTN network
 */
export function isMTNNumber(
  phoneNumber: string,
  countryCode?: string,
): boolean {
  const validation = validateMTNMoMoPhoneNumber(phoneNumber, countryCode);

  if (!validation.isValid) {
    return false;
  }

  // Additional MTN network prefixes check (this would need to be maintained)
  const mtnPrefixes: Record<string, string[]> = {
    UG: ["77", "78", "39", "75", "74"], // Uganda MTN prefixes
    GH: ["24", "25", "26", "27", "28"], // Ghana MTN prefixes
    CI: ["05", "07", "08", "09"], // Côte d'Ivoire MTN prefixes
    CM: ["67", "68", "69"], // Cameroon MTN prefixes
    ZA: ["83", "63", "73"], // South Africa MTN prefixes
    RW: ["78", "79"], // Rwanda MTN prefixes
    ZM: ["97", "96"], // Zambia MTN prefixes
  };

  const countryPrefixes = mtnPrefixes[validation.country];
  if (!countryPrefixes) {
    return true; // Assume it's MTN if we don't have specific prefix data
  }

  const numberWithoutCountryCode = validation.formattedNumber.replace(
    validation.countryCode.replace("+", ""),
    "",
  );

  return countryPrefixes.some((prefix) =>
    numberWithoutCountryCode.startsWith(prefix),
  );
}

/**
 * Gets supported currencies for MTN MoMo by country
 */
export function getSupportedCurrencies(countryCode: string): string[] {
  const currencyMap: Record<string, string[]> = {
    UG: ["UGX"], // Uganda Shilling
    GH: ["GHS"], // Ghanaian Cedi
    CI: ["XOF"], // West African CFA Franc
    CM: ["XAF"], // Central African CFA Franc
    ZA: ["ZAR"], // South African Rand
    RW: ["RWF"], // Rwandan Franc
    ZM: ["ZMW"], // Zambian Kwacha
  };

  return currencyMap[countryCode] || ["USD"];
}

/**
 * Gets the default currency for a country
 */
export function getDefaultCurrency(countryCode: string): string {
  return getSupportedCurrencies(countryCode)[0] || "USD";
}

/**
 * Formats amount according to currency
 */
export function formatMTNMoMoAmount(amount: number, currency: string): string {
  const formatters: Record<string, Intl.NumberFormat> = {
    UGX: new Intl.NumberFormat("en-UG", { style: "currency", currency: "UGX" }),
    GHS: new Intl.NumberFormat("en-GH", { style: "currency", currency: "GHS" }),
    XOF: new Intl.NumberFormat("fr-CI", { style: "currency", currency: "XOF" }),
    XAF: new Intl.NumberFormat("fr-CM", { style: "currency", currency: "XAF" }),
    ZAR: new Intl.NumberFormat("en-ZA", { style: "currency", currency: "ZAR" }),
    RWF: new Intl.NumberFormat("en-RW", { style: "currency", currency: "RWF" }),
    ZMW: new Intl.NumberFormat("en-ZM", { style: "currency", currency: "ZMW" }),
    USD: new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }),
  };

  const formatter = formatters[currency] || formatters.USD;
  return formatter.format(amount);
}

/**
 * Validates MTN MoMo payment amount
 */
export function validateMTNMoMoAmount(
  amount: number,
  currency: string,
): { isValid: boolean; message?: string } {
  // Minimum and maximum amounts by currency
  const limits: Record<string, { min: number; max: number }> = {
    UGX: { min: 500, max: 5000000 }, // 500 UGX to 5M UGX
    GHS: { min: 1, max: 5000 }, // 1 GHS to 5000 GHS
    XOF: { min: 100, max: 1000000 }, // 100 XOF to 1M XOF
    XAF: { min: 100, max: 1000000 }, // 100 XAF to 1M XAF
    ZAR: { min: 5, max: 50000 }, // 5 ZAR to 50,000 ZAR
    RWF: { min: 100, max: 1000000 }, // 100 RWF to 1M RWF
    ZMW: { min: 1, max: 50000 }, // 1 ZMW to 50,000 ZMW
    USD: { min: 1, max: 10000 }, // 1 USD to 10,000 USD
  };

  const limit = limits[currency] || limits.USD;

  if (amount < limit.min) {
    return {
      isValid: false,
      message: `Minimum amount is ${formatMTNMoMoAmount(limit.min, currency)}`,
    };
  }

  if (amount > limit.max) {
    return {
      isValid: false,
      message: `Maximum amount is ${formatMTNMoMoAmount(limit.max, currency)}`,
    };
  }

  return { isValid: true };
}
