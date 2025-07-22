import { loadStripe } from "@stripe/stripe-js";

import type { Stripe, StripeElements } from "@stripe/stripe-js";

// Initialize Stripe
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export interface CreateCheckoutSessionParams {
  amount: number;
  currency?: string;
  description?: string;
  successUrl?: string;
  cancelUrl?: string;
}

export interface StripePaymentSession {
  id: string;
  url: string;
}

// Client-side function to create a checkout session via your backend
// WARNING: For development/testing only - implement backend API for production
export async function createCheckoutSessionViaBackend(
  params: CreateCheckoutSessionParams,
): Promise<StripePaymentSession> {
  // Auto-generate success and cancel URLs if not provided
  const baseUrl = window.location.origin;
  const currentPath = window.location.pathname;

  // Determine appropriate success URL based on current route
  let successUrl = params.successUrl;
  if (!successUrl) {
    if (currentPath.includes("/landlord/")) {
      successUrl = `${baseUrl}/landlord/payment/success?session_id={CHECKOUT_SESSION_ID}`;
    } else if (currentPath.includes("/tenant/")) {
      successUrl = `${baseUrl}/tenant/payment/success?session_id={CHECKOUT_SESSION_ID}`;
    } else {
      successUrl = `${baseUrl}/payment/success?session_id={CHECKOUT_SESSION_ID}`;
    }
  }

  const sessionParams = {
    ...params,
    successUrl,
    cancelUrl: params.cancelUrl || `${baseUrl}${currentPath}?payment=cancelled`,
  };

  // FOR DEVELOPMENT ONLY: Direct Stripe API call from client
  // TODO: Replace with backend API call for production
  if (!import.meta.env.VITE_STRIPE_SECRET_KEY) {
    throw new Error(
      "Stripe secret key is not configured. Please add VITE_STRIPE_SECRET_KEY to your .env file for development, or implement backend API.",
    );
  }

  const response = await fetch("https://api.stripe.com/v1/checkout/sessions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_STRIPE_SECRET_KEY}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      "payment_method_types[]": "card",
      "line_items[0][price_data][currency]": sessionParams.currency || "usd",
      "line_items[0][price_data][product_data][name]":
        sessionParams.description || "Payment",
      "line_items[0][price_data][unit_amount]": Math.round(
        sessionParams.amount * 100,
      ).toString(),
      "line_items[0][quantity]": "1",
      mode: "payment",
      success_url: sessionParams.successUrl,
      cancel_url: sessionParams.cancelUrl,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error("Stripe API error:", errorData);
    throw new Error(
      errorData.error?.message || "Failed to create checkout session",
    );
  }

  const session = await response.json();
  return {
    id: session.id,
    url: session.url,
  };
}

// Client-side payment verification (for development only)
// WARNING: This uses secret key on client-side - not recommended for production
export async function verifyPaymentSession(sessionId: string): Promise<{
  status: string;
  payment_status: string;
  amount_total: number;
  currency: string;
  customer_email?: string;
}> {
  if (!import.meta.env.VITE_STRIPE_SECRET_KEY) {
    throw new Error(
      "Stripe secret key is not configured. Please add VITE_STRIPE_SECRET_KEY to your .env file for development.",
    );
  }

  const response = await fetch(
    `https://api.stripe.com/v1/checkout/sessions/${sessionId}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_STRIPE_SECRET_KEY}`,
      },
    },
  );

  if (!response.ok) {
    const errorData = await response.json();
    console.error("Stripe verification error:", errorData);
    throw new Error(
      errorData.error?.message || "Failed to verify payment session",
    );
  }

  const session = await response.json();
  return {
    status: session.status,
    payment_status: session.payment_status,
    amount_total: session.amount_total,
    currency: session.currency,
    customer_email: session.customer_email,
  };
}

// Function to redirect to Stripe Checkout using the session ID
export async function redirectToStripeCheckout(
  sessionId: string,
): Promise<void> {
  const stripe = await stripePromise;

  if (!stripe) {
    throw new Error("Stripe failed to initialize");
  }

  const { error } = await stripe.redirectToCheckout({
    sessionId,
  });

  if (error) {
    console.error("Stripe redirect error:", error);
    throw new Error(error.message || "Failed to redirect to Stripe checkout");
  }
}

// Alternative: Create and handle payments using Stripe Elements (recommended for custom UI)
export async function createPaymentElement(
  containerId: string,
  clientSecret: string,
) {
  const stripe = await stripePromise;

  if (!stripe) {
    throw new Error("Stripe failed to initialize");
  }

  const elements = stripe.elements({ clientSecret });
  const paymentElement = elements.create("payment");
  paymentElement.mount(`#${containerId}`);

  return { stripe, elements, paymentElement };
}

// Function to confirm payment using Stripe Elements
export async function confirmPayment(
  stripe: Stripe,
  elements: StripeElements,
  returnUrl?: string,
) {
  const { error } = await stripe.confirmPayment({
    elements,
    redirect: "if_required",
    confirmParams: {
      return_url: returnUrl || `${window.location.origin}/payment/success`,
    },
  });

  if (error) {
    console.error("Payment confirmation error:", error);
    throw new Error(error.message || "Payment confirmation failed");
  }
}

export { stripePromise };
