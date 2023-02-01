import { TCurrencyCodes } from "@honzachalupa/utils";
import { useEffect, useState } from "react";
import { LayoutPrimary as Layout } from "../../components/layouts/Primary";
import { ICartItem, StripeCart } from "../../components/StripeCart";
import { CartContextProvider } from "../../components/StripeCart/context";
import {
    IStripeProduct,
    StripeProductsListing,
} from "../../components/StripeProductsListing";
import { stripe } from "../../utils/stripe";
import { ICreatePaymentBody } from "../api/stripe/create-payment";

interface IProps {
    products: IStripeProduct[];
}

export default function StripeDemo({ products }: IProps) {
    const [callbackUrl, setCallbackUrl] = useState<string>("");

    const checkout = async (cartItems: ICartItem[]) => {
        const body: ICreatePaymentBody = {
            cart: cartItems,
            callbackUrl,
        };

        const response = await fetch("/api/stripe/create-payment", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });

        const payment = await response.json();

        window.location.href = payment.paymentGatewayUrl;
    };

    useEffect(() => {
        setCallbackUrl(window.location.origin);
    }, []);

    return (
        <CartContextProvider products={products}>
            <Layout headline="Stipe Demo">
                <StripeProductsListing />

                <StripeCart onCheckout={checkout} />
            </Layout>
        </CartContextProvider>
    );
}

export async function getServerSideProps() {
    const products = await stripe?.products.list().then(({ data }) => data);
    const prices = await stripe?.prices.list().then(({ data }) => data);

    const productsFormatted = products?.map(
        ({ id, name, description, default_price, images }) => {
            const { unit_amount, currency } = prices?.find(
                ({ id }) => id === default_price
            )!;

            return {
                id,
                name,
                description,
                price: {
                    value: unit_amount! / 100,
                    currency: currency.toUpperCase() as TCurrencyCodes,
                },
                imageUrl: images[0],
                href: `/products/${id}`,
            };
        }
    );

    return {
        props: {
            products: productsFormatted,
        },
    };
}
