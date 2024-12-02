import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');
  const id = searchParams.get('id');

  try {
    if (type === 'player') {
      if (id) {
        const playerStats = await prisma.playerStats.findUnique({
          where: { playerId: parseInt(id) },
        });
        return playerStats ? NextResponse.json(playerStats) : NextResponse.json({ error: 'Player stats not found' }, { status: 404 });
      }

      const allPlayerStats = await prisma.playerStats.findMany();
      return NextResponse.json(allPlayerStats);
    }

    if (type === 'coach') {
      if (id) {
        const coachStats = await prisma.coachStats.findUnique({
          where: { coachId: parseInt(id) },
        });
        return coachStats ? NextResponse.json(coachStats) : NextResponse.json({ error: 'Coach stats not found' }, { status: 404 });
      }

      const allCoachStats = await prisma.coachStats.findMany();
      return NextResponse.json(allCoachStats);
    }

    return NextResponse.json({ error: 'Invalid stats type' }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching stats' }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const { type, id, ...stats } = await request.json();
    
    if (type === 'player') {
      const playerStats = await prisma.playerStats.upsert({
        where: { playerId: id },
        update: stats,
        create: { ...stats, playerId: id },
      });
      return NextResponse.json(playerStats);
    }
    
    if (type === 'coach') {
      const coachStats = await prisma.coachStats.upsert({
        where: { coachId: id },
        update: stats,
        create: { ...stats, coachId: id },
      });
      return NextResponse.json(coachStats);
    }
    
    return NextResponse.json({ error: 'Invalid stats type' }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: 'Error updating stats' }, { status: 500 });
  }
}