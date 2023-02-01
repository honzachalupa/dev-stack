import { useContext } from "react";
import { Context } from "../../utils/context";
import { CartContext } from "../StripeCart/context";
import { TailwindUI } from "../tailwind-ui";
import { IProduct } from "../tailwind-ui/Ecommerce/ProductLists/WithInlinePrice";

export interface IStripeProduct {
    id: string | number;
    name: string;
    description: string;
    price: {
        value: number;
        currency: string;
    };
    imageUrl: string;
    href: string;
}

interface IProps {}

export const StripeProductsListing: React.FC<IProps> = () => {
    const { addNotification } = useContext(Context);
    const { products, update } = useContext(CartContext);

    const handleAddToCart = (product: IProduct) => {
        update("add", product.id);

        addNotification(`Added item ${product.name} to cart.`);
    };

    return (
        <TailwindUI.Ecommerce.ProductLists.WithInlinePrice
            headline="Available Products"
            products={products}
            onAddToCart={handleAddToCart}
        />
    );
};
