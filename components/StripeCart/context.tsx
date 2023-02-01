import { TCurrencyCodes, useLocalStorage } from "@honzachalupa/utils";
import { createContext, ReactNode, useEffect, useState } from "react";
import { ICartItem } from ".";
import { IStripeProduct } from "../StripeProductsListing";
import { ICartProduct } from "../tailwind-ui/Ecommerce/ShoppingCarts/SlideOver";

export interface ICartContext {
    items: ICartItem[];
    itemsCount: number;
    products: IStripeProduct[];
    price: {
        value: number;
        currency: TCurrencyCodes;
    };
    update: (action: "add" | "remove", productId: ICartProduct["id"]) => void;
}

export const initialCartContext: ICartContext = {
    items: [],
    itemsCount: 0,
    products: [],
    price: {
        value: 0,
        currency: "CZK",
    },
    update: () => {},
};

export const CartContext = createContext<ICartContext>(initialCartContext);

interface IProps {
    products: IStripeProduct[];
    children: ReactNode;
}

export const CartContextProvider: React.FC<IProps> = ({
    products,
    children,
}) => {
    const [items, setItems] = useLocalStorage<ICartContext["items"]>(
        "cartItems",
        initialCartContext.items
    );
    const [itemsCount, setItemsCount] = useState<ICartContext["itemsCount"]>(
        initialCartContext.itemsCount
    );
    const [price, setPrice] = useState<ICartContext["price"]>(
        initialCartContext.price
    );

    const getPrice = () => {
        const pricesSum = items.reduce((acc, { productId, quantity }) => {
            const { price } = products.find(({ id }) => id === productId)!;

            return (acc += price.value * quantity);
        }, 0);

        setPrice({
            value: pricesSum,
            currency: products[0].price.currency as TCurrencyCodes,
        });
    };

    const getItemsCount = () => {
        const count = items.reduce(
            (acc, current) => (acc += current.quantity),
            0
        );

        setItemsCount(count);
    };

    const update = (
        action: "add" | "remove",
        productId: ICartProduct["id"]
    ) => {
        setItems((prevState) => {
            const prevStateClone = [...prevState];
            const prevItem = prevState
                .map((item, index) => ({
                    index,
                    ...item,
                }))
                .find((item) => item.productId === productId) || {
                index: -1,
                quantity: 0,
            };

            if (action === "add" && prevItem.quantity === 0) {
                return [
                    ...prevState,
                    {
                        productId,
                        quantity: 1,
                    },
                ];
            } else if (action === "remove" && prevItem.quantity === 1) {
                if (prevItem.index > -1) {
                    prevStateClone.splice(prevItem.index, 1);
                }

                return prevStateClone;
            } else {
                const increment = action === "add" ? 1 : -1;

                prevStateClone[prevItem.index] = {
                    ...prevStateClone[prevItem.index],
                    quantity:
                        prevStateClone[prevItem.index].quantity + increment,
                };

                return prevStateClone;
            }
        });
    };

    useEffect(() => {
        getPrice();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [items, products]);

    useEffect(() => {
        getItemsCount();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [items]);

    const context: ICartContext = {
        items,
        itemsCount,
        products,
        price,
        update,
    };

    return (
        <CartContext.Provider value={context}>{children}</CartContext.Provider>
    );
};
