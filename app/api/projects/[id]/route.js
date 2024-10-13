// app/api/projects/[id]/route.js
import { NextResponse } from 'next/server';
import dbConnect from '../../../../utils/db';
import Project from '../../../../models/Project';

export async function PUT(request, { params }) {
  await dbConnect();

  try {
    const data = await request.json();
    const project = await Project.findByIdAndUpdate(params.id, data, { new: true });
    return NextResponse.json(project);
  } catch (error) {
    console.error('Error updating project:', error);
    return NextResponse.error();
  }
}

export async function DELETE(request, { params }) {
  await dbConnect();

  try {
    await Project.findByIdAndDelete(params.id);
    return NextResponse.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Error deleting project:', error);
    return NextResponse.error();
  }
}
