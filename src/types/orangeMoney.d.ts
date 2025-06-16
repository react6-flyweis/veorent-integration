interface IOrangeMoneyTokenRequest {
  grant_type: "client_credentials";
}

interface IOrangeMoneyTokenResponse {
  access_token: string;
  scope: string;
  token_type: "Bearer";
  expires_in: number;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface IOrangeMoneyInitRequest {
  // No specific body parameters mentioned in the API
}

interface IOrangeMoneyInitResponse {
  message: string;
  data: {
    payToken: string;
  };
}

interface IOrangeMoneyPaymentRequest {
  notifUrl: string;
  channelUserMsisdn: string;
  amount: string;
  subscriberMsisdn: string;
  pin?: string; // Made optional since we're only requesting payment
  orderId: string;
  description: string;
  payToken: string;
}

interface IOrangeMoneyPaymentResponse {
  message: string;
  data: {
    id: number;
    subscriberMsisdn: string;
    amount: number;
    payToken: string;
    txnmode: string;
    channelUserMsisdn: string;
    status: "PENDING" | "SUCCESS" | "FAILED";
    txnid: string;
    inittxnmessage: string;
    inittxnstatus: string;
    confirmtxnmessage: string | null;
    confirmtxnstatus: string | null;
    orderId: string;
    notifUrl: string;
    description: string;
    createtime: string;
  };
}

interface IOrangeMoneyPaymentStatusResponse {
  message: string;
  data: {
    id: number;
    subscriberMsisdn: string;
    amount: number;
    payToken: string;
    txnmode: string;
    channelUserMsisdn: string;
    status: "PENDING" | "SUCCESS" | "FAILED";
    txnid: string;
    inittxnmessage: string;
    inittxnstatus: string;
    confirmtxnmessage: string | null;
    confirmtxnstatus: string | null;
    orderId: string;
    notifUrl: string;
    description: string;
    createtime: string;
  };
}

interface IOrangeMoneyPaymentTransaction {
  id: number;
  subscriberMsisdn: string;
  amount: number;
  payToken: string;
  txnid: string;
  status: "PENDING" | "SUCCESS" | "FAILED";
  orderId: string;
  description: string;
  createtime: string;
}
