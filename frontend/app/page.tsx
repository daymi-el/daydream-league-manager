"use client"

import {useAccounts} from "@/providers/accounts-provider";
import {useRequests} from "@/hooks/use-requests";
import {AccountCard} from "@/components/blocks/account-card";
import {AddAccountDialog} from "@/components/blocks/add-account-dialog";

export default function Home() {
    const {addAccount, accounts} = useAccounts();
    const {getLeagueAccountData, getRiotAccount} = useRequests();

    return (
        <div className="flex min-h-screen items-center justify-center">
            <div className={"absolute top-0 right-0 p-2"}>
                <AddAccountDialog/>
            </div>
            <div className={"flex flex-col sm:flex-row gap-2"}>
                {[...accounts.values()].map(acc => (
                    <AccountCard key={acc.userName} account={acc}/>
                ))}
            </div>

        </div>
    );
}
