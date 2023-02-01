import Stripe from "stripe";

const token = process.env.STRIPE_SECRET_KEY;

export const stripe = token
    ? new Stripe(token, {
          apiVersion: "2022-11-15",
      })
    : null;
