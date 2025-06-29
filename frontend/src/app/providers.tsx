'use client'

import { Provider } from "react-redux";
import { store } from "@/shared/redux/config/store"; 

export function Providers ({children}: {children: React.ReactNode}) {
    return <Provider store={store}>{children}</Provider>
}