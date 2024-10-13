// app/api/projects/route.js
import { NextResponse } from 'next/server';
import dbConnect from '../../../utils/db';
import Project from '../../../models/Project';

export async function GET() {
  await dbConnect();

  try {
    const projects = await Project.find({});
    return NextResponse.json(projects);
  } catch (error) {
    return NextResponse.error();
  }
}

export async function POST(request) {
  await dbConnect();

  try {
    const data = await request.json();
    const project = await Project.create(data);
    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    return NextResponse.error();
  }
}
