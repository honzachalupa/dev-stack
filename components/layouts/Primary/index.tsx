import Head from "next/head";
import { useRouter } from "next/router";
import { ReactNode, useContext } from "react";
import { config } from "../../../config";
import { Context } from "../../../utils/context";
import { CartContext } from "../../StripeCart/context";
import { TailwindUI } from "../../tailwind-ui";
import { TidioChat } from "../../TidioChat";

interface IProps {
    headline?: string;
    children: ReactNode;
}

export const LayoutPrimary: React.FC<IProps> = ({ headline, children }) => {
    const { user, setIsCartOpened } = useContext(Context);
    const { itemsCount } = useContext(CartContext);

    const router = useRouter();

    const title = [headline, config.appName].filter(Boolean).join(" | ");

    const fillItemProps = (pathName: string) => ({
        href: pathName,
        isCurrent: pathName === router.pathname,
    });

    return (
        <>
            <Head>
                <title>{title}</title>

                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
            </Head>

            <TailwindUI.ApplicationUI.ApplicationShells.StackedLayouts.DarkNavWithWhitePageHeader
                headline={headline}
                user={user}
                navigationItems={[
                    { name: "Introduction", ...fillItemProps("/") },
                    {
                        name: "Supabase DB Demo",
                        ...fillItemProps("/supabase/db-demo"),
                    },
                    {
                        name: "Supabase Auth Demo",
                        ...fillItemProps("/supabase/auth-demo"),
                    },
                    { name: "Stripe Demo", ...fillItemProps("/stripe-demo") },
                ]}
                userNavigationItems={[
                    { name: "Profile", href: "#" },
                    { name: "Sign out", href: "#" },
                ]}
                cartItemsCount={itemsCount}
                onCartClick={() => setIsCartOpened(true)}
            >
                {children}
            </TailwindUI.ApplicationUI.ApplicationShells.StackedLayouts.DarkNavWithWhitePageHeader>

            <TidioChat />
        </>
    );
};
