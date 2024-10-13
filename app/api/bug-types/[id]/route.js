import { NextResponse } from 'next/server';
import dbConnect from 'utils/db';
import BugType from 'models/BugType';

export async function GET(request, { params }) {
  await dbConnect();

  try {
    const bugType = await BugType.findById(params.id);
    return NextResponse.json(bugType);
  } catch (error) {
    console.error('Error fetching bug type:', error);
    return NextResponse.error();
  }
}

export async function PUT(request, { params }) {
  await dbConnect();

  try {
    const data = await request.json();
    const bugType = await BugType.findByIdAndUpdate(params.id, data, { new: true });
    return NextResponse.json(bugType);
  } catch (error) {
    console.error('Error updating bug type:', error);
    return NextResponse.error();
  }
}

export async function DELETE(request, { params }) {
  await dbConnect();

  try {
    await BugType.findByIdAndDelete(params.id);
    return NextResponse.json({ message: 'Bug type deleted successfully' });
  } catch (error) {
    console.error('Error deleting bug type:', error);
    return NextResponse.error();
  }
}
