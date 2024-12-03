import { prisma } from '@/app/lib/prisma';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

async function getLeagues() {
  try {
    const leagues = await prisma.league.findMany({
      include: {
        teams: {
          select: {
            id: true,
            name: true,
            teamType: true,
            players: {
              select: {
                id: true,
              }
            },
            coach: {
              select: {
                id: true,
              }
            }
          }
        }
      }
    });
    return leagues;
  } catch (error) {
    console.error('Error fetching leagues:', error);
    throw new Error('Failed to fetch leagues');
  }
}

export default async function LeaguesPage() {
  const leagues = await getLeagues();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Leagues</h1>
      
      {/* Leagues Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {leagues.map((league) => (
          <Card key={league.id} className="flex flex-col">
            <CardHeader>
              <CardTitle>{league.name}</CardTitle>
              <CardDescription>
                {league.teams.length} Teams
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="grid grid-cols-2 gap-4">
                {league.teams.map((team) => (
                  <Card key={team.id} className="bg-secondary/20">
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-lg mb-2">{team.name}</h3>
                      <div className="flex gap-2">
                        <Badge>{team.teamType.toLowerCase()}</Badge>
                        <Badge variant="outline">
                          {team.players.length} Players
                        </Badge>
                        <Badge variant="outline">
                          {team.coach ? 1 : 0} Coach
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* League Statistics */}
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
    </div>
  );
}