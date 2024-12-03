import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  try {
    if (id) {
      const match = await prisma.match.findUnique({
        where: { id: parseInt(id) },
        include: {
          homeTeam: true,
          awayTeam: true,
          venue: true,
        },
      });
      return match ? NextResponse.json(match) : NextResponse.json({ error: 'Match not found' }, { status: 404 });
    }

    const matches = await prisma.match.findMany({
      where: {
        date: {
          gte: new Date(),
        },
      },
      include: {
        homeTeam: true,
        awayTeam: true,
        venue: true,
      },
      orderBy: {
        date: 'asc',
      },
      take: 10,
    });
    return NextResponse.json(matches);
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching matches' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const match = await prisma.match.create({
      data: {
        homeTeamId: body.homeTeamId,
        awayTeamId: body.awayTeamId,
        date: new Date(body.date),
        venueId: body.venueId,
        homeTeamScore: body.homeTeamScore,
        awayTeamScore: body.awayTeamScore,
      },
      include: {
        homeTeam: true,
        awayTeam: true,
        venue: true,
      },
    });
    return NextResponse.json(match, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Error creating match' }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const { id, ...data } = await request.json();
    if (data.date) {
      data.date = new Date(data.date);
    }
    
    const match = await prisma.match.update({
      where: { id },
      data,
      include: {
        homeTeam: true,
        awayTeam: true,
        venue: true,
      },
    });
    return NextResponse.json(match);
  } catch (error) {
    return NextResponse.json({ error: 'Error updating match' }, { status: 500 });
  }
}