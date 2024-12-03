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
      <h1 className="text-3xl font-bold mb-6">Leagues</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {leagues.map((league) => (
          <Card key={league.id}>
            <CardHeader>
              <CardTitle>{league.name}</CardTitle>
              <CardDescription>
                Teams: {league.teams.length}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {league.teams.map((team) => (
                  <Badge key={team.id} variant="secondary">
                    {team.name} ({team.teamType.toLowerCase()})
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
