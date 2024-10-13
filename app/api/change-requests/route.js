// app/api/change-requests/route.js
import { NextResponse } from 'next/server';
import dbConnect from '../../../utils/db';
import ChangeRequest from '../../../models/ChangeRequest';

export async function GET() {
  await dbConnect();

  try {
    const changeRequests = await ChangeRequest.find({});
    return NextResponse.json(changeRequests);
  } catch (error) {
    return NextResponse.error();
  }
}

export async function POST(request) {
  await dbConnect();

  try {
    const data = await request.json();
    const changeRequest = await ChangeRequest.create(data);
    return NextResponse.json(changeRequest, { status: 201 });
  } catch (error) {
    return NextResponse.error();
  }
}
