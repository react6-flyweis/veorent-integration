interface IMTNMoMoPaymentRequest {
  amount: string;
  currency: string;
  externalId: string;
  payer: {
    partyIdType: "MSISDN";
    partyId: string; // Phone number
  };
  payerMessage: string;
  payeeNote: string;
}

interface IMTNMoMoPaymentTransaction {
  payer: {
    partyIdType: "MSISDN";
    partyId: string; // Phone number
  };
  _id: string; // Transaction ID
  user: string; // User ID
  amount: number; // Transaction amount
  fee: number; // Transaction fee
  exchangeCharge: number; // Exchange charge if applicable
  Status: "Pending" | "Successful" | "Failed"; // Transaction status
  currency: string; // Currency code (e.g., XAF, UGX)
  payerMessage: string; // Message from the payer
  referenceId: string; // Unique reference ID for the transaction
  externalId: string; // External ID for tracking
  api: string; // API endpoint used for the transaction
  flag: boolean; // Flag for special handling
  risk: number; // Risk score for the transaction
  transactionReviewActivity: unknown[]; // Review activity log
  date: string; // Transaction date
  notes: unknown[]; // Additional notes
  createdAt: string; // Creation timestamp
  updatedAt: string; // Last update timestamp
  __v: number; // Version key
  financialTransactionId?: string; // Optional field for financial transaction ID
}

interface IMTNMoMoPaymentResponse {
  status: number;
  statusText: string;
  transaction: IMTNMoMoPaymentTransaction;
}

interface IMTNMoMoPaymentStatusResponse {
  status: number; // HTTP status code
  statusText: string; // HTTP status text
  transaction: IMTNMoMoPaymentTransaction; // Transaction details
}

// MTN MoMo Balance Types
interface IMTNMoMoBalance {
  availableBalance: string;
  currency: string;
}

// MTN MoMo Payment Form Data
interface IMTNMoMoPaymentForm {
  phoneNumber: string;
  amount: number;
  currency: string;
  description?: string;
}

// MTN MoMo Error Types
interface IMTNMoMoError {
  code: string;
  message: string;
  details?: string;
}

// MTN MoMo Phone Number Validation
interface IMTNMoMoPhoneValidation {
  isValid: boolean;
  formattedNumber: string;
  country: string;
  countryCode: string;
}
