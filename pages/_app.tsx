import type { AppProps } from "next/app";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { FlowbiteUI } from "../components/flowbite-ui";
import { useSupabaseAuth } from "../hooks/useSupabaseAuth";
import "../styles/globals.css";
import { Context, IContext } from "../utils/context";

export default function App({ Component, pageProps }: AppProps) {
    const { user } = useSupabaseAuth();

    console.log({ user });

    const [isCartOpened, setIsCartOpened] = useState<boolean>(false);
    const [notifications, setNotifications] = useState<string[]>([]);

    const queryClient = new QueryClient();

    const addNotification = (message: string) => {
        setNotifications((prevState) => [...prevState, message]);
    };

    const closeNotification = (index: number) => {
        setNotifications((prevState) => [
            ...prevState.filter((_, i) => i !== index),
        ]);
    };

    const context: IContext = {
        user,
        isCartOpened,
        setIsCartOpened,
        addNotification,
    };

    return (
        <Context.Provider value={context}>
            <QueryClientProvider client={queryClient}>
                {notifications.length > 0 && (
                    <FlowbiteUI.NotificationsContainer
                        messages={notifications}
                        onClose={closeNotification}
                    />
                )}

                <Component {...pageProps} />
            </QueryClientProvider>
        </Context.Provider>
    );
}
