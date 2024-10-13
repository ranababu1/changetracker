// app/api/change-requests/[id]/route.js
import { NextResponse } from 'next/server';
import dbConnect from '../../../../utils/db';
import ChangeRequest from '../../../../models/ChangeRequest';

export async function PUT(request, { params }) {
  await dbConnect();

  try {
    const data = await request.json();
    const changeRequest = await ChangeRequest.findByIdAndUpdate(params.id, data, { new: true });
    return NextResponse.json(changeRequest);
  } catch (error) {
    console.error('Error updating change request:', error);
    return NextResponse.error();
  }
}

export async function DELETE(request, { params }) {
  await dbConnect();

  try {
    await ChangeRequest.findByIdAndDelete(params.id);
    return NextResponse.json({ message: 'Change request deleted successfully' });
  } catch (error) {
    console.error('Error deleting change request:', error);
    return NextResponse.error();
  }
}
