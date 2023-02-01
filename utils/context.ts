import { createContext, Dispatch, SetStateAction } from "react";

export interface IContext {
    user: any;
    isCartOpened: boolean;
    setIsCartOpened: Dispatch<SetStateAction<boolean>>;
    addNotification: (message: string) => void;
}

export const initialContext: IContext = {
    user: null,
    isCartOpened: false,
    setIsCartOpened: () => {},
    addNotification: () => {},
};

export const Context = createContext<IContext>(initialContext);
