"use client"
import {createContext, ReactNode, useContext, useState} from "react";
import {AccountsProviderType} from "@/providers/types";
import {Account} from "@/lib/types";

const AccountsContext = createContext<AccountsProviderType | undefined>(undefined);


interface AccountsProviderProps {
    children: ReactNode;
}

export function AccountsProvider({children}: AccountsProviderProps) {
    const [accounts, setAccounts] = useState<Map<string, Account>>(new Map())

    function addAccount(newAccount: Account) {
        setAccounts((prevState) => {
            const next = new Map(prevState);
            if (next.has(newAccount.userName)) {
                console.warn("Account already exists")
                return prevState;
            }
            next.set(newAccount.userName, newAccount);
            return next;
        })
    }

    function removeAccount(userName: string) {
        setAccounts((prevState) => {
            const next = new Map(prevState);
            next.delete(userName);
            return next;
        })
    }

    function updateAccount(userName: string, updates: Partial<Account>) {
        setAccounts((prevState) => {
            const next = new Map(prevState);
            const account = next.get(userName);

            if (!account) {
                console.warn("Account not found!");
                return prevState;
            }

            next.set(userName, {...account, ...updates})
            return next;
        })
    }

    function getAccount(userName: string): Account | undefined {
        return accounts.get(userName);
    }

    return (
        <AccountsContext.Provider value={{
            accounts,
            addAccount,
            removeAccount,
            updateAccount,
            getAccount
        }}>
            {children}
        </AccountsContext.Provider>
    )
}

export const useAccounts = () => {
    const context = useContext(AccountsContext);
    if (!context) throw new Error("useAccounts must be used inside AuthProvider")
    return context;
}