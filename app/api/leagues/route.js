import prisma from '@/app/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const leagues = await prisma.league.findMany();
    return NextResponse.json(leagues);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch leagues' }, { status: 500 });
  }
}