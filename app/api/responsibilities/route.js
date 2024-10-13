// app/api/responsibilities/route.js
import { NextResponse } from 'next/server';
import dbConnect from '../../../utils/db';
import Responsibility from '../../../models/Responsibility';

export async function GET() {
  await dbConnect();

  try {
    const responsibilities = await Responsibility.find({});
    return NextResponse.json(responsibilities);
  } catch (error) {
    console.error('Error fetching responsibilities:', error);
    return NextResponse.error();
  }
}

export async function POST(request) {
  await dbConnect();

  try {
    const data = await request.json();
    const responsibility = await Responsibility.create(data);
    return NextResponse.json(responsibility, { status: 201 });
  } catch (error) {
    console.error('Error creating responsibility:', error);
    return NextResponse.error();
  }
}
