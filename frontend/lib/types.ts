import {SummonerLeagueDto} from "twisted/dist/models-dto/league";
import {AccountDto} from "twisted/dist/models-dto/account";

export interface Account {
    gameName: string;
    tagLine: string;
    userName: string;
    password: string;
    riotData: AccountDto;
    leagueData: SummonerLeagueDto[];
}