import { NextResponse } from 'next/server';
import dbConnect from 'utils/db';
import ProjectOwner from 'models/ProjectOwner';

export async function GET(request, { params }) {
  await dbConnect();

  try {
    const projectOwner = await ProjectOwner.findById(params.id);
    return NextResponse.json(projectOwner);
  } catch (error) {
    console.error('Error fetching project owner:', error);
    return NextResponse.error();
  }
}

export async function PUT(request, { params }) {
  await dbConnect();

  try {
    const data = await request.json();
    const projectOwner = await ProjectOwner.findByIdAndUpdate(params.id, data, { new: true });
    return NextResponse.json(projectOwner);
  } catch (error) {
    console.error('Error updating project owner:', error);
    return NextResponse.error();
  }
}

export async function DELETE(request, { params }) {
  await dbConnect();

  try {
    await ProjectOwner.findByIdAndDelete(params.id);
    return NextResponse.json({ message: 'Project owner deleted successfully' });
  } catch (error) {
    console.error('Error deleting project owner:', error);
    return NextResponse.error();
  }
}
