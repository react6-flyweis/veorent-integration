import { axiosTenant } from "@/features/tenant/api/axios";

// Create a separate axios instance for Orange Money API
export const orangeMoneyClient = axiosTenant.create({
  baseURL: import.meta.env.VITE_ORANGE_MONEY_BASE_URL,
  timeout: 30000, // 30 seconds timeout
});

// Orange Money API functions
export const orangeMoneyAPI = {
  // Get access token
  async getAccessToken(): Promise<IOrangeMoneyTokenResponse> {
    const response = await orangeMoneyClient.post<IOrangeMoneyTokenResponse>(
      "/token",
      {
        grant_type: "client_credentials",
      },
      {
        auth: {
          username: import.meta.env.VITE_ORANGE_MONEY_CLIENT_ID || "",
          password: import.meta.env.VITE_ORANGE_MONEY_CLIENT_SECRET || "",
        },
      },
    );
    return response.data;
  },

  // Initialize payment
  async initializePayment(token: string): Promise<IOrangeMoneyInitResponse> {
    const response = await orangeMoneyClient.post<IOrangeMoneyInitResponse>(
      "/omcoreapis/1.0.2/mp/init",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      },
    );
    return response.data;
  },

  // Process payment
  async processPayment(
    paymentData: IOrangeMoneyPaymentRequest,
    token: string,
  ): Promise<IOrangeMoneyPaymentResponse> {
    const response = await orangeMoneyClient.post<IOrangeMoneyPaymentResponse>(
      "/omcoreapis/1.0.2/mp/pay",
      paymentData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      },
    );
    return response.data;
  },

  // Get payment status
  async getPaymentStatus(
    payToken: string,
    token: string,
  ): Promise<IOrangeMoneyPaymentStatusResponse> {
    const response =
      await orangeMoneyClient.get<IOrangeMoneyPaymentStatusResponse>(
        `/omcoreapis/1.0.2/mp/paymentstatus/${payToken}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );
    return response.data;
  },

  // Complete payment flow
  async completePayment(paymentRequest: {
    amount: string;
    subscriberMsisdn: string;
    channelUserMsisdn: string;
    pin?: string; // Made optional
    orderId: string;
    description: string;
    notifUrl: string;
  }): Promise<IOrangeMoneyPaymentResponse> {
    try {
      // Step 1: Get access token
      const tokenResponse = await this.getAccessToken();
      const { access_token } = tokenResponse;

      // Step 2: Initialize payment
      const initResponse = await this.initializePayment(access_token);
      const { payToken } = initResponse.data;

      // Step 3: Process payment
      const paymentResponse = await this.processPayment(
        {
          ...paymentRequest,
          payToken,
        },
        access_token,
      );

      return paymentResponse;
    } catch (error) {
      console.error("Orange Money payment failed:", error);
      throw error;
    }
  },

  // Poll payment status until completion
  async pollPaymentStatus(
    payToken: string,
    token: string,
    maxAttempts: number = 20,
    intervalMs: number = 3000,
  ): Promise<IOrangeMoneyPaymentStatusResponse> {
    let attempts = 0;

    const poll = async (): Promise<IOrangeMoneyPaymentStatusResponse> => {
      const statusResponse = await this.getPaymentStatus(payToken, token);

      if (
        statusResponse.data.status === "SUCCESS" ||
        statusResponse.data.status === "FAILED"
      ) {
        return statusResponse;
      }

      attempts++;
      if (attempts >= maxAttempts) {
        throw new Error("Payment status polling timeout");
      }

      await new Promise((resolve) => setTimeout(resolve, intervalMs));
      return poll();
    };

    return poll();
  },
};
