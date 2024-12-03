// import { NextResponse } from 'next/server';
// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// export async function GET() {
//   try {
//     const coaches = await prisma.coach.findMany({
//       include: {
//         team: true,
//         stats: true,
//       },
//     });
//     return NextResponse.json(coaches);
//   } catch (error) {
//     console.error('Error fetching coaches:', error); // Log the error
//     return NextResponse.json({ error: 'Error fetching coaches' }, { status: 500 });
//   }
// }

// export async function POST(request) {
//   try {
//     const body = await request.json();
//     const coach = await prisma.coach.create({
//       data: body,
//     });
//     return NextResponse.json(coach, { status: 201 });
//   } catch (error) {
//     console.error('Error creating coach:', error); // Log the error
//     return NextResponse.json({ error: 'Error creating coach' }, { status: 500 });
//   }
// }

// export async function PUT(request) {
//   try {
//     const { id, ...data } = await request.json();
//     const coach = await prisma.coach.update({
//       where: { id },
//       data,
//     });
//     return NextResponse.json(coach);
//   } catch (error) {
//     return NextResponse.json({ error: 'Error updating coach' }, { status: 500 });
//   }
// }

// export async function DELETE(request) {
//   try {
//     const { id } = await request.json();
//     await prisma.coach.delete({
//       where: { id },
//     });
//     return NextResponse.json({ message: 'Coach deleted' });
//   } catch (error) {
//     return NextResponse.json({ error: 'Error deleting coach' }, { status: 500 });
//   }
// }