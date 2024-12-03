"use client"

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { 
  ChartConfig, 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent 
} from "@/components/ui/chart"
import { League } from "@prisma/client"

type TeamType = 'COLLEGE' | 'PROFESSIONAL'

type LeagueWithTeams = League & {
  teams: {
    id: number
    name: string
    teamType: TeamType
    players: { id: number }[]
    coach: { id: number } | null
  }[]
}

interface LeagueStatisticsProps {
  leagues: LeagueWithTeams[]
}

const chartConfig = {
  teams: {
    label: "Teams",
    color: "#2563eb",
  },
  players: {
    label: "Players",
    color: "#60a5fa",
  },
  coaches: {
    label: "Coaches",
    color: "#93c5fd",
  },
} satisfies ChartConfig

export function LeagueStatistics({ leagues }: LeagueStatisticsProps) {
  const chartData = leagues.map((league) => {
    const totalPlayers = league.teams.reduce((sum, team) => sum + team.players.length, 0)
    const totalCoaches = league.teams.reduce((sum, team) => sum + (team.coach ? 1 : 0), 0)
    
    return {
      name: league.name,
      teams: league.teams.length,
      players: totalPlayers,
      coaches: totalCoaches,
    }
  })

  return (
    <>
      <h2 className="text-2xl font-semibold mb-4">League Statistics</h2>
      <Card>
        <CardHeader>
          <CardTitle>League Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="min-h-[400px] w-full">
            <BarChart data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="name"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Bar dataKey="teams" fill="var(--color-teams)" radius={4} />
              <Bar dataKey="players" fill="var(--color-players)" radius={4} />
              <Bar dataKey="coaches" fill="var(--color-coaches)" radius={4} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </>
  )
}
