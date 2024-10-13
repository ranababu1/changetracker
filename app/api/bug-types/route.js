// app/api/bug-types/route.js
import { NextResponse } from 'next/server';
import dbConnect from '../../../utils/db';
import BugType from '../../../models/BugType';

export async function GET() {
  await dbConnect();

  try {
    const bugTypes = await BugType.find({});
    return NextResponse.json(bugTypes);
  } catch (error) {
    console.error('Error fetching bug types:', error);
    return NextResponse.error();
  }
}

export async function POST(request) {
  await dbConnect();

  try {
    const data = await request.json();
    const bugType = await BugType.create(data);
    return NextResponse.json(bugType, { status: 201 });
  } catch (error) {
    console.error('Error creating bug type:', error);
    return NextResponse.error();
  }
}
