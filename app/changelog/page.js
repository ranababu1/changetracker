// app/changelog/page.js
import React from 'react';
import dbConnect from 'utils/db';
import ChangeRequest from 'models/ChangeRequest';

export const revalidate = 3600; // Revalidate this page every 1hr

export default async function ChangelogPage() {
  await dbConnect();

  try {
    const changeRequests = await ChangeRequest.find({})
      .populate('project')
      .populate('bugType')
      .populate('projectOwner')
      .populate('responsibility')
      .lean();

    // Convert ObjectIds and Dates to strings
    const changeRequestsData = changeRequests.map((request) => ({
      ...request,
      _id: request._id.toString(),
      project: request.project
        ? {
            ...request.project,
            _id: request.project._id.toString(),
            createdAt: request.project.createdAt.toISOString(),
            updatedAt: request.project.updatedAt.toISOString(),
          }
        : null,
      bugType: request.bugType
        ? {
            ...request.bugType,
            _id: request.bugType._id.toString(),
          }
        : null,
      projectOwner: request.projectOwner
        ? {
            ...request.projectOwner,
            _id: request.projectOwner._id.toString(),
          }
        : null,
      responsibility: request.responsibility
        ? {
            ...request.responsibility,
            _id: request.responsibility._id.toString(),
          }
        : null,
      dateRequested: request.dateRequested ? request.dateRequested.toISOString() : null,
      dueDate: request.dueDate ? request.dueDate.toISOString() : null,
      actualDeliveryDate: request.actualDeliveryDate
        ? request.actualDeliveryDate.toISOString()
        : null,
      createdAt: request.createdAt.toISOString(),
      updatedAt: request.updatedAt.toISOString(),
    }));

    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold">Changelog</h1>
        <div className="overflow-x-auto mt-4">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Project</th>
                <th>Changes Requested</th>
                <th>Date Requested</th>
                <th>Due Date</th>
                <th>Actual Delivery Date</th>
                <th>Bug Type</th>
                <th>Project Owner</th>
                <th>Responsibility</th>
                <th>Comment</th>
                <th>Ticket ID</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {changeRequestsData.map((request) => (
                <tr key={request._id}>
                  <td>{request.project?.name || 'N/A'}</td>
                  <td>{request.changesRequested || 'N/A'}</td>
                  <td>
                    {request.dateRequested
                      ? new Date(request.dateRequested).toLocaleDateString()
                      : 'N/A'}
                  </td>
                  <td>
                    {request.dueDate ? new Date(request.dueDate).toLocaleDateString() : 'N/A'}
                  </td>
                  <td>
                    {request.actualDeliveryDate
                      ? new Date(request.actualDeliveryDate).toLocaleDateString()
                      : 'N/A'}
                  </td>
                  <td>{request.bugType?.name || 'N/A'}</td>
                  <td>{request.projectOwner?.name || 'N/A'}</td>
                  <td>{request.responsibility?.name || 'N/A'}</td>
                  {/* Comment with truncation and tooltip */}
                  <td>
                    <div
                      className="tooltip tooltip-top"
                      data-tip={request.comment || 'N/A'}
                      style={{
                        maxWidth: '200px',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {request.comment?.length > 50
                        ? `${request.comment.substring(0, 47)}...`
                        : request.comment || 'N/A'}
                    </div>
                  </td>
                  <td>{request.ticketId || 'N/A'}</td>
                  <td>
                    {/* Delete Button */}
                    <form action={`/api/change-requests/${request._id}`} method="POST">
                      <input type="hidden" name="_method" value="DELETE" />
                      <button type="submit" className="btn btn-sm btn-error">
                        Delete
                      </button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error fetching change requests:', error);
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-xl font-bold text-red-500">Error loading changelog</h1>
        <p>{error.message}</p>
      </div>
    );
  }
}
