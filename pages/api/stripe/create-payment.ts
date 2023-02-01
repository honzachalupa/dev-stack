import type { NextApiRequest, NextApiResponse } from "next";
import { ICartItem } from "../../../components/StripeCart";
import { stripe } from "../../../utils/stripe";

export interface ICreatePaymentBody {
    cart: ICartItem[];
    callbackUrl: string;
    languageCode?: string;
}

interface NextApiRequestWithBody extends NextApiRequest {
    body: ICreatePaymentBody;
}

interface IResponseBody {
    paymentGatewayUrl?: string;
    error?: string;
}

export default async function handler(
    req: NextApiRequestWithBody,
    res: NextApiResponse<IResponseBody>
) {
    const { cart, callbackUrl, languageCode } = req.body;

    if (!stripe) {
        res.status(500).json({
            error: "Strapi token was not provided.",
        });
        return;
    }

    const products = await stripe.products.list().then(({ data }) => data);

    const lineItems = (() =>
        cart.map(({ productId, quantity }) => ({
            price: products
                .find(({ id }) => id === productId)
                ?.default_price?.toString(),
            quantity,
        })))();

    const payment = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        line_items: lineItems,
        success_url: `${callbackUrl}/payment/success`,
        cancel_url: `${callbackUrl}/payment/cancel`,
        locale: (languageCode as any) || "en",
    });

    if (!payment.url) {
        res.status(500).json({
            error: "Strapi token was not provided.",
        });
        return;
    }

    res.status(200).json({
        paymentGatewayUrl: payment.url,
    });
}
