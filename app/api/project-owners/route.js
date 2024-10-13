// app/api/project-owners/route.js
import { NextResponse } from 'next/server';
import dbConnect from '../../../utils/db';
import ProjectOwner from '../../../models/ProjectOwner';

export async function GET() {
  await dbConnect();

  try {
    const projectOwners = await ProjectOwner.find({});
    return NextResponse.json(projectOwners);
  } catch (error) {
    console.error('Error fetching project owners:', error);
    return NextResponse.error();
  }
}

export async function POST(request) {
  await dbConnect();

  try {
    const data = await request.json();
    const projectOwner = await ProjectOwner.create(data);
    return NextResponse.json(projectOwner, { status: 201 });
  } catch (error) {
    console.error('Error creating project owner:', error);
    return NextResponse.error();
  }
}
