import { NextResponse } from 'next/server';
import dbConnect from 'utils/db';
import Responsibility from 'models/Responsibility';

export async function GET(request, { params }) {
  await dbConnect();

  try {
    const responsibility = await Responsibility.findById(params.id);
    return NextResponse.json(responsibility);
  } catch (error) {
    console.error('Error fetching responsibility:', error);
    return NextResponse.error();
  }
}

export async function PUT(request, { params }) {
  await dbConnect();

  try {
    const data = await request.json();
    const responsibility = await Responsibility.findByIdAndUpdate(params.id, data, { new: true });
    return NextResponse.json(responsibility);
  } catch (error) {
    console.error('Error updating responsibility:', error);
    return NextResponse.error();
  }
}

export async function DELETE(request, { params }) {
  await dbConnect();

  try {
    await Responsibility.findByIdAndDelete(params.id);
    return NextResponse.json({ message: 'Responsibility deleted successfully' });
  } catch (error) {
    console.error('Error deleting responsibility:', error);
    return NextResponse.error();
  }
}
