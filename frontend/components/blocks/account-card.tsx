"use client"
import {Account} from "@/lib/types";
import {Card, CardContent, CardFooter, CardHeader} from "@/components/ui/card";
import {Progress} from "@/components/ui/progress";
import {SummonerLeagueDto} from "twisted/dist/models-dto/league";
import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip";
import {Badge} from "@/components/ui/badge";
import {Avatar, AvatarImage} from "@/components/ui/avatar";
import {useAccounts} from "@/providers/accounts-provider";
import {Button} from "@/components/ui/button";
import {Trash2} from "lucide-react";

interface AccountCardProps {
    account: Account
}

export function AccountCard({account}: AccountCardProps) {
    const {removeAccount} = useAccounts();

    const soloDuoData = account.leagueData.find(data => data.queueType === "RANKED_SOLO_5x5")
    if (!soloDuoData) {
        return (
            <p>NO SOLO DUO DATA FOR: {account.userName}</p>
        )
    }

    return (
        <Card className={"relative w-full max-w-sm min-w-2xs"}>
            <DeleteAccountButton removeAccount={() => removeAccount(account.userName)}/>
            <AccountCardHeader account={account} stats={soloDuoData}/>
            <CardContent>

            </CardContent>
            <AccountCardFooter stats={soloDuoData}/>
        </Card>
    )
}

interface DeleteAccountButtonProps {
    removeAccount: () => void;
}

function DeleteAccountButton({removeAccount}: DeleteAccountButtonProps) {
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Button
                    className="hover:cursor-pointer absolute top-2 right-2 z-10"
                    variant="destructive"
                    size="icon-sm"
                    onClick={() => removeAccount()}
                >
                    <Trash2/>
                </Button>
            </TooltipTrigger>
            <TooltipContent>
                <span>Remove Account</span>
            </TooltipContent>
        </Tooltip>
    )
}

interface AccountCardHeaderProps {
    account: Account,
    stats: SummonerLeagueDto
}

function AccountCardHeader({account, stats}: AccountCardHeaderProps) {
    return (
        <CardHeader className="flex flex-row items-center gap-3">
            <Avatar className="h-16 w-16 rounded-lg">
                <AvatarImage
                    src={`/rank-emblems/Rank=${toTitleCase(stats.tier)}.png`}
                    alt=""
                />
            </Avatar>
            <h3 className="font-semibold text-lg break-words pr-10">
                {account.gameName}#{account.tagLine}
            </h3>
        </CardHeader>
    )
}

interface AccountCardFooterProps {
    stats: SummonerLeagueDto
}

function AccountCardFooter({stats}: AccountCardFooterProps) {
    const totalGames = stats.wins + stats.losses;
    const winrate = totalGames > 0
        ? Math.round((stats.wins / totalGames) * 100)
        : 0;

    return (
        <CardFooter className="flex flex-col items-start gap-2">
            <div className="flex flex-row w-full justify-between">
                <p className="font-semibold">
                    {stats.tier}{" "}
                    {!["MASTER", "GRANDMASTER", "CHALLENGER"].includes(
                        stats.tier
                    ) && stats.rank}
                </p>
                <div className="flex justify-end items-center gap-1">
                    <Badge
                        variant="outline"
                        className={`${winrate >= 50 ? "bg-green-800" : "bg-red-800"}`}
                    >
                        {winrate}% W/L
                    </Badge>
                </div>
            </div>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Progress value={stats.leaguePoints} max={100}/>
                </TooltipTrigger>
                <TooltipContent>
                    <p className="font-bold">{stats.leaguePoints}LP</p>
                </TooltipContent>
            </Tooltip>
        </CardFooter>

    )
}

const toTitleCase = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}