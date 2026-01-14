"use client"

import {useAccounts} from "@/providers/accounts-provider";
import {useRequests} from "@/hooks/use-requests";
import {useEffect, useState} from "react";
import {AccountDto} from "twisted/dist/models-dto/account";
import {SummonerLeagueDto} from "twisted/dist/models-dto/league";
import {AccountCard} from "@/components/blocks/account-card";

export default function Home() {
    const {addAccount, accounts} = useAccounts();
    const {getLeagueAccountData, getRiotAccount} = useRequests();

    const [riotAcc, setRiotAcc] = useState<AccountDto>()
    const [leagueAcc, setLeagueAcc] = useState<SummonerLeagueDto[]>()

    useEffect(() => {
        async function fetchData() {
            const riotData = await getRiotAccount("day", "mii");
            const leagueEntries = await getLeagueAccountData(riotData.puuid)

            addAccount({
                leagueData: leagueEntries,
                userName: "",
                riotData: riotData,
                password: "",
                gameName: riotData.gameName,
                tagLine: riotData.tagLine
            })
        }

        fetchData();
    }, []);

    return (
        <div className="flex min-h-screen items-center justify-center">
            {[...accounts.values()].map(acc => <AccountCard key={acc.userName} account={acc}/>)}
        </div>
    );
}
