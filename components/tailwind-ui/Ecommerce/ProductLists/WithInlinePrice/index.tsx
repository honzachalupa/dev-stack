import { formatCurrency } from "@honzachalupa/utils";
import Image from "next/image";

export interface IProduct {
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

interface IProps {
    headline: string;
    products: IProduct[];
    onAddToCart: (product: IProduct) => void;
}

export const WithInlinePrice: React.FC<IProps> = ({
    headline,
    products,
    onAddToCart,
}) => (
    <div className="bg-white">
        <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                {headline}
            </h2>

            <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                {products.map((product) => (
                    <div
                        key={product.id}
                        className="justify-top group relative flex flex-col"
                    >
                        <div className="aspect-w-1 aspect-h-1 lg:aspect-none h-80 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-80">
                            <Image
                                src={product.imageUrl}
                                alt=""
                                className="!relative h-full w-full overflow-hidden rounded-md border-2 border-gray-200 bg-white object-contain object-center p-5 lg:h-full lg:w-full"
                                fill
                            />
                        </div>

                        <div className="mt-4 mb-3 flex justify-between">
                            <div>
                                <h3 className="text-sm text-gray-700">
                                    <a href={product.href}>
                                        <span
                                            aria-hidden="true"
                                            className="inset-0"
                                        />
                                        {product.name}
                                    </a>
                                </h3>

                                <p className="mt-1 text-sm text-gray-500">
                                    {product.description}
                                </p>
                            </div>

                            <p className="whitespace-nowrap text-sm font-medium text-gray-900">
                                {formatCurrency(
                                    product.price.value,
                                    product.price.currency as any
                                )}
                            </p>
                        </div>

                        <button
                            className="mt-auto rounded-md border p-3"
                            onClick={() => onAddToCart(product)}
                        >
                            Add to cart
                        </button>
                    </div>
                ))}
            </div>
        </div>
    </div>
);
