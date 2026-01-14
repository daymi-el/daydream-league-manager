import {Constants, LolApi, RiotApi} from "twisted";
import {AccountAPIRegionGroups, Regions} from "twisted/dist/constants";
import {AccountDto} from "twisted/dist/models-dto/account";
import {useMemo} from "react";


export const useRequests = () => {
    const API_KEY = process.env.NEXT_PUBLIC_API_KEY!;

    const riotApi = useMemo(() => new RiotApi({key: API_KEY}), [API_KEY])
    const lolApi = useMemo(() => new LolApi({key: API_KEY}), [API_KEY])

    async function getRiotAccount(gameName: string, tagLine: string, region: AccountAPIRegionGroups = Constants.RegionGroups.EUROPE): Promise<AccountDto> {
        return (await riotApi.Account.getByRiotId(gameName, tagLine, region)).response
    }

    async function getLeagueAccountData(puuid: string, region: Regions = Constants.Regions.EU_WEST) {
        return (await lolApi.League.byPUUID(puuid, region)).response
    }

    return {
        getRiotAccount,
        getLeagueAccountData
    }
}