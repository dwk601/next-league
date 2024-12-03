import Link from 'next/link';
import { prisma } from '@/app/lib/prisma';
import CreateTeamModal from '@/components/CreateTeamModal';

async function getLeaguesWithTeams() {
  return await prisma.league.findMany({
    include: {
      teams: {
        include: {
          players: true,
          coach: true,
        }
      }
    }
  });
}

export default async function TeamsPage() {
  const leagues = await getLeaguesWithTeams();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Teams</h1>
        <CreateTeamModal leagues={leagues.map(l => ({ id: l.id, name: l.name }))} />
      </div>
      {leagues.map((league) => (
        <div key={league.id} className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{league.name}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {league.teams.map((team) => (
              <Link 
                href={`/teams/${team.id}`} 
                key={team.id}
                className="block p-6 border rounded-lg hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl font-semibold mb-2">{team.name}</h3>
                <p className="text-gray-600">
                  Players: {team.players.length} | 
                  Coach: {team.coach ? `${team.coach.firstName} ${team.coach.lastName}` : 'None'}
                </p>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
