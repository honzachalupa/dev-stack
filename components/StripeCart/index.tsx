import { useContext } from "react";
import { Context } from "../../utils/context";
import { IStripeProduct } from "../StripeProductsListing";
import { TailwindUI } from "../tailwind-ui";
import { CartContext } from "./context";

export type ICartItem = {
    productId: IStripeProduct["id"];
    quantity: number;
};

interface IProps {
    onCheckout: (cartItems: ICartItem[]) => void;
}

export const StripeCart: React.FC<IProps> = ({ onCheckout }) => {
    const { isCartOpened, setIsCartOpened } = useContext(Context);
    const { price, items, itemsCount, products, update } =
        useContext(CartContext);

    const handleCheckout = () => {
        onCheckout(items);
    };

    return (
        <TailwindUI.Ecommerce.ShoppingCarts.SlideOver
            itemsCount={itemsCount}
            products={items.map(({ productId, quantity }) => {
                const product = products.find(({ id }) => id === productId)!;

                return {
                    ...product,
                    quantity,
                };
            })}
            price={price}
            isOpened={isCartOpened}
            onCheckout={handleCheckout}
            onItemRemove={(productId) => update("remove", productId)}
            onClose={() => setIsCartOpened(false)}
        />
    );
};
