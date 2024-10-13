// app/api/change-requests/route.js
import { NextResponse } from 'next/server';
import dbConnect from 'utils/db';
import ChangeRequest from 'models/ChangeRequest';

export async function GET(request) {
  await dbConnect();

  try {
    const changeRequests = await ChangeRequest.find({})
      .populate('project')
      .populate('bugType')
      .populate('projectOwner')
      .populate('responsibility');

    return NextResponse.json(changeRequests);
  } catch (error) {
    console.error('Error fetching change requests:', error);
    return NextResponse.json({ error: 'Error fetching change requests' }, { status: 500 });
  }
}

export async function POST(request) {
  await dbConnect();

  try {
    const data = await request.json();

    // Create a new ChangeRequest document with the data
    const changeRequest = new ChangeRequest({
      project: data.project,
      changesRequested: data.changesRequested,
      dueDate: data.dueDate,
      dateRequested: data.dateRequested,
      actualDeliveryDate: data.actualDeliveryDate || null,
      bugType: data.bugType,
      projectOwner: data.projectOwner,
      responsibility: data.responsibility,
      comment: data.comment,
      ticketId: data.ticketId,
    });

    // Save the document to the database
    await changeRequest.save();

    // Populate the referenced fields before returning
    await changeRequest.populate([
      { path: 'project' },
      { path: 'bugType' },
      { path: 'projectOwner' },
      { path: 'responsibility' },
    ]);

    return NextResponse.json(changeRequest, { status: 201 });
  } catch (error) {
    console.error('Error creating change request:', error);
    return NextResponse.json({ error: 'Error creating change request' }, { status: 500 });
  }
}
