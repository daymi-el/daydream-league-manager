import {Account} from "@/lib/types";

interface AccountsProviderType {
    accounts: Map<string, Account>;
    addAccount: (account: Account) => void;
    removeAccount: (userName: string) => void;
    updateAccount: (userName: string, updates: Partial<Account>) => void;
    getAccount: (userName: string) => Account | undefined;
}

export type {AccountsProviderType}