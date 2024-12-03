import { prisma } from '@/app/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const leagueId = searchParams.get('leagueId');

  try {
    if (id) {
      const team = await prisma.team.findUnique({
        where: { id: parseInt(id) },
        include: {
          league: true,
          players: {
            include: {
              stats: true,
            }
          },
          coaches: {
            include: {
              stats: true,
            }
          },
          homeMatches: {
            include: {
              homeTeam: true,
              awayTeam: true,
            }
          },
          awayMatches: {
            include: {
              homeTeam: true,
              awayTeam: true,
            }
          },
        },
      });
      
      if (!team) {
        return NextResponse.json({ error: 'Team not found' }, { status: 404 });
      }

      // Calculate team statistics
      const stats = {
        totalPlayers: team.players.length,
        totalCoaches: team.coaches.length,
        totalMatches: team.homeMatches.length + team.awayMatches.length,
        // Add more stats as needed
      };

      return NextResponse.json({ ...team, stats });
    }

    // Query params for filtering teams
    const where = leagueId ? { leagueId: parseInt(leagueId) } : {};

    const teams = await prisma.team.findMany({
      where,
      include: {
        league: true,
        players: {
          select: {
            id: true,
            name: true,
            position: true,
          }
        },
        coaches: {
          select: {
            id: true,
            name: true,
            role: true,
          }
        },
      },
    });

    return NextResponse.json(teams);
  } catch (error) {
    console.error('Teams API Error:', error);
    return NextResponse.json({ error: 'Error fetching teams' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const team = await prisma.team.create({
      data: {
        name: body.name,
        leagueId: body.leagueId,
        teamType: body.teamType,
      },
      include: {
        league: true,
        players: true,
        coach: true,
      },
    });
    return NextResponse.json(team, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Error creating team' }, { status: 500 });
  }
}