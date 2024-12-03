import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const top = searchParams.get('top');

  try {
    if (id) {
      const player = await prisma.player.findUnique({
        where: { id: parseInt(id) },
        include: {
          team: true,
          stats: true,
        },
      });
      return player ? NextResponse.json(player) : NextResponse.json({ error: 'Player not found' }, { status: 404 });
    }

    if (top) {
      const limit = parseInt(top);
      const players = await prisma.player.findMany({
        include: {
          team: true,
          stats: true,
        },
        where: {
          stats: {
            isNot: null
          }
        },
        orderBy: {
          stats: {
            goals: 'desc'
          }
        },
        take: limit
      });
      return NextResponse.json(players);
    }

    const players = await prisma.player.findMany({
      include: {
        team: true,
        stats: true,
      },
    });
    return NextResponse.json(players);
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching players' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { stats, ...playerData } = body;

    const player = await prisma.player.create({
      data: {
        ...playerData,
        stats: stats ? {
          create: stats
        } : undefined
      },
      include: {
        team: true,
        stats: true,
      },
    });
    return NextResponse.json(player, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Error creating player' }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const { id, stats, ...data } = await request.json();
    
    const player = await prisma.player.update({
      where: { id },
      data: {
        ...data,
        stats: stats ? {
          upsert: {
            create: stats,
            update: stats,
          },
        } : undefined,
      },
      include: {
        team: true,
        stats: true,
      },
    });
    return NextResponse.json(player);
  } catch (error) {
    return NextResponse.json({ error: 'Error updating player' }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Player ID is required' }, { status: 400 });
    }

    await prisma.playerStats.deleteMany({
      where: { playerId: parseInt(id) },
    });

    const player = await prisma.player.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json(player);
  } catch (error) {
    return NextResponse.json({ error: 'Error deleting player' }, { status: 500 });
  }
}