import { prisma } from '@/app/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const teamId = searchParams.get('teamId');

  try {
    if (id) {
      const coach = await prisma.coach.findUnique({
        where: { id: parseInt(id) },
        include: {
          team: {
            include: {
              league: true
            }
          },
          stats: true
        },
      });

      if (!coach) {
        return NextResponse.json({ error: 'Coach not found' }, { status: 404 });
      }

      return NextResponse.json(coach);
    }

    const where = teamId ? { teamId: parseInt(teamId) } : {};

    const coaches = await prisma.coach.findMany({
      where,
      include: {
        team: {
          include: {
            league: true
          }
        },
        stats: true
      }
    });

    return NextResponse.json(coaches);
  } catch (error) {
    console.error('Coaches API Error:', error);
    return NextResponse.json({ error: 'Error fetching coaches' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const coach = await prisma.coach.create({
      data: {
        firstName: body.firstName,
        lastName: body.lastName,
        dateOfBirth: body.dateOfBirth ? new Date(body.dateOfBirth) : null,
        nationality: body.nationality,
        imageUrl: body.imageUrl,
        teamId: parseInt(body.teamId),
        stats: {
          create: {
            wins: 0,
            losses: 0,
            draws: 0
          }
        }
      },
      include: {
        team: true,
        stats: true
      }
    });
    return NextResponse.json(coach, { status: 201 });
  } catch (error) {
    console.error('Coach Creation Error:', error);
    return NextResponse.json({ error: 'Error creating coach' }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const { id, ...data } = await request.json();
    const coach = await prisma.coach.update({
      where: { id: parseInt(id) },
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth) : undefined,
        nationality: data.nationality,
        imageUrl: data.imageUrl,
        teamId: data.teamId ? parseInt(data.teamId) : undefined
      },
      include: {
        team: true,
        stats: true
      }
    });
    return NextResponse.json(coach);
  } catch (error) {
    return NextResponse.json({ error: 'Error updating coach' }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { id } = await request.json();
    await prisma.coach.delete({
      where: { id: parseInt(id) }
    });
    return NextResponse.json({ message: 'Coach deleted' });
  } catch (error) {
    return NextResponse.json({ error: 'Error deleting coach' }, { status: 500 });
  }
}