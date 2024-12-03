import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

// GET all coaches
export async function GET() {
  try {
    const coaches = await prisma.coach.findMany({
      include: {
        stats: true,
        team: true,
      },
    });
    return NextResponse.json(coaches);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST new coach
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
        teamId: body.teamId,
        stats: body.stats ? {
          create: {
            wins: body.stats.wins || 0,
            losses: body.stats.losses || 0,
            draws: body.stats.draws || 0,
          }
        } : undefined,
      },
      include: {
        stats: true,
        team: true,
      },
    });
    return NextResponse.json(coach);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// PUT update coach
export async function PUT(request) {
  try {
    const body = await request.json();
    const coach = await prisma.coach.update({
      where: { id: body.id },
      data: {
        firstName: body.firstName,
        lastName: body.lastName,
        dateOfBirth: body.dateOfBirth ? new Date(body.dateOfBirth) : null,
        nationality: body.nationality,
        imageUrl: body.imageUrl,
        teamId: body.teamId,
        stats: body.stats ? {
          upsert: {
            create: {
              wins: body.stats.wins || 0,
              losses: body.stats.losses || 0,
              draws: body.stats.draws || 0,
            },
            update: {
              wins: body.stats.wins || 0,
              losses: body.stats.losses || 0,
              draws: body.stats.draws || 0,
            }
          }
        } : undefined,
      },
      include: {
        stats: true,
        team: true,
      },
    });
    return NextResponse.json(coach);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE coach
export async function DELETE(request) {
  try {
    const url = new URL(request.url);
    const id = parseInt(url.searchParams.get('id'));
    
    // Delete associated stats first
    await prisma.coachStats.deleteMany({
      where: { coachId: id },
    });
    
    // Then delete the coach
    const coach = await prisma.coach.delete({
      where: { id },
    });
    
    return NextResponse.json(coach);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
