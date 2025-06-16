import { axiosTenant } from "@/features/tenant/api/axios";

export const mtnMomoClient = axiosTenant.create({
  baseURL: "/Momo",
});

// MTN MoMo API functions
export const mtnMomoAPI = {
  // Get access token
  async getAccessToken(): Promise<{
    access_token: string;
    token_type: string;
    expires_in: number;
  }> {
    const response = await mtnMomoClient.post("/AccessToken");
    return response.data;
  },

  // Request to pay
  async requestToPay(
    paymentData: IMTNMoMoPaymentRequest,
  ): Promise<IMTNMoMoPaymentResponse> {
    // const { access_token } = await this.getAccessToken();
    await this.getAccessToken();
    // const referenceId = crypto.randomUUID();

    return mtnMomoClient.post("/requesttopay", paymentData, {
      //   headers: {
      //     'Authorization': `Bearer ${access_token}`,
      //     'X-Reference-Id': referenceId,
      //     'X-Callback-Url': MTN_MOMO_CALLBACK_URL,
      //   },
    });
  },

  // Get payment status
  async getPaymentStatus(
    referenceId: string,
  ): Promise<IMTNMoMoPaymentStatusResponse> {
    // const { access_token } = await this.getAccessToken();
    const response = await mtnMomoClient.get(`/requesttopay/${referenceId}`);
    return response.data;
  },
};
