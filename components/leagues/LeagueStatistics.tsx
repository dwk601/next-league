import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { League } from "@prisma/client";

type TeamType = 'COLLEGE' | 'PROFESSIONAL';

type LeagueWithTeams = League & {
  teams: {
    id: number;
    name: string;
    teamType: TeamType;
    players: { id: number; }[];
    coach: { id: number; } | null;
  }[];
};

interface LeagueStatisticsProps {
  leagues: LeagueWithTeams[];
}

export function LeagueStatistics({ leagues }: LeagueStatisticsProps) {
  return (
    <>
      <h2 className="text-2xl font-semibold mb-4">League Statistics</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {leagues.map((league) => {
          const totalPlayers = league.teams.reduce((sum, team) => sum + team.players.length, 0);
          const totalCoaches = league.teams.reduce((sum, team) => sum + (team.coach ? 1 : 0), 0);
          
          return (
            <Card key={`stats-${league.id}`}>
              <CardHeader>
                <CardTitle>{league.name} Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <dl className="space-y-2">
                  <div className="flex justify-between">
                    <dt>Total Teams:</dt>
                    <dd>{league.teams.length}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt>Total Players:</dt>
                    <dd>{totalPlayers}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt>Total Coaches:</dt>
                    <dd>{totalCoaches}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt>Players per Team:</dt>
                    <dd>{(totalPlayers / league.teams.length || 0).toFixed(1)}</dd>
                  </div>
                </dl>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </>
  );
}
