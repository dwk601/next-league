import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  try {
    if (id) {
      const team = await prisma.team.findUnique({
        where: { id: parseInt(id) },
        include: {
          league: true,
          players: true,
          coach: true,
          homeMatches: true,
          awayMatches: true,
          events: true,
          registrations: true,
        },
      });
      return team ? NextResponse.json(team) : NextResponse.json({ error: 'Team not found' }, { status: 404 });
    }

    const teams = await prisma.team.findMany({
      include: {
        league: true,
        players: true,
        coach: true,
      },
    });
    return NextResponse.json(teams);
  } catch (error) {
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