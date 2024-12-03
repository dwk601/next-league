import { prisma } from '@/app/lib/prisma';
import { notFound } from 'next/navigation';
import { Match } from '@prisma/client';
import CreatePlayerModal from '@/components/CreatePlayerModal';
import DeletePlayer from '@/components/DeletePlayer';
import CreateCoachModal from '@/components/CreateCoachModal';

interface ExtendedMatch extends Match {
  homeTeam: { name: string };
  awayTeam: { name: string };
  venue: { name: string };
}

interface TeamWithRelations {
  id: number;
  name: string;
  teamType: 'COLLEGE' | 'PROFESSIONAL';
  league: { 
    id: number;
    name: string 
  };
  coach: {
    id: number;
    firstName: string;
    lastName: string;
    stats?: {
      id: number;
      wins: number;
      losses: number;
      draws: number;
    } | null;
  } | null;
  players: Array<{
    id: number;
    firstName: string;
    lastName: string;
    position: string | null;
    stats?: {
      id: number;
      goals: number;
      assists: number;
    } | null;
  }>;
  homeMatches: ExtendedMatch[];
  awayMatches: ExtendedMatch[];
}

async function getTeam(id: number): Promise<TeamWithRelations> {
  const team = await prisma.team.findUnique({
    where: { id },
    include: {
      league: true,
      players: {
        include: {
          stats: true,
        }
      },
      coach: {
        include: {
          stats: true,
        }
      },
      homeMatches: {
        include: {
          homeTeam: true,
          awayTeam: true, // Added awayTeam include
          venue: true,
        },
        where: {
          date: {
            gte: new Date(),
          },
        },
        take: 5,
      },
      awayMatches: {
        include: {
          homeTeam: true, // Added homeTeam include
          awayTeam: true,
          venue: true,
        },
        where: {
          date: {
            gte: new Date(),
          },
        },
        take: 5,
      },
    },
  });

  if (!team) notFound();
  return team as unknown as TeamWithRelations;
}

interface TeamPageProps {
  params: {
    id: string;
  };
}

export default async function TeamPage({ params }: TeamPageProps) {
  const id = Number(params.id);
  if (isNaN(id)) notFound();
  
  const team = await getTeam(id);
  const upcomingMatches = [...team.homeMatches, ...team.awayMatches];
  upcomingMatches.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const nextMatches = upcomingMatches.slice(0, 5);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{team.name}</h1>
        <p className="text-gray-600">{team.league.name} • {team.teamType}</p>
      </div>

      {/* Coach Section */}
      <section className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Coach</h2>
          {!team.coach && <CreateCoachModal teamId={team.id} teamName={team.name} />}
        </div>
        {team.coach ? (
          <div className="p-4 border rounded-lg">
            <h3 className="text-xl mb-2">
              {team.coach.firstName} {team.coach.lastName}
            </h3>
            {team.coach.stats && (
              <p className="text-gray-600">
                Record: {team.coach.stats.wins}W - {team.coach.stats.losses}L - {team.coach.stats.draws}D
              </p>
            )}
          </div>
        ) : (
          <p className="text-gray-600">No coach assigned</p>
        )}
      </section>

      {/* Players Section */}
      <section className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Players</h2>
          <CreatePlayerModal teams={[{ id: team.id, name: team.name }]} buttonType="create" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {team.players.map((player) => (
            <div key={player.id} className="p-4 border rounded-lg relative group">
              <DeletePlayer playerId={player.id} />
              <h3 className="text-lg font-semibold">
                {player.firstName} {player.lastName}
              </h3>
              <p className="text-gray-600">{player.position || 'Position N/A'}</p>
              {player.stats && (
                <p className="text-sm text-gray-500">
                  Goals: {player.stats.goals} | Assists: {player.stats.assists}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Upcoming Matches Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Upcoming Matches</h2>
        <div className="space-y-4">
          {nextMatches.map((match) => (
            <div key={match.id} className="p-4 border rounded-lg">
              <p className="text-gray-600">
                {new Date(match.date).toLocaleDateString()}
              </p>
              <p className="font-semibold">
                {match.homeTeam.name} vs {match.awayTeam.name}
              </p>
              <p className="text-sm text-gray-500">
                {match.venue.name}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
