'use client';
import { UserProvider } from "../context"

export const Providers = ({children}) => {
    return <UserProvider>{children}</UserProvider>
}