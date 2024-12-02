import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

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