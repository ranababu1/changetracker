// app/changelog/page.js
'use client';

import React, { useState, useEffect } from 'react';

export default function ChangelogPage() {
  const [changeRequests, setChangeRequests] = useState([]);

  useEffect(() => {
    // Fetch change requests
    async function fetchChangeRequests() {
      try {
        const res = await fetch('/api/change-requests');
        const data = await res.json();
        setChangeRequests(data);
      } catch (error) {
        console.error('Error fetching change requests:', error);
      }
    }

    fetchChangeRequests();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this change request?')) return;

    try {
      const res = await fetch(`/api/change-requests/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setChangeRequests(changeRequests.filter((request) => request._id !== id));
      } else {
        console.error('Failed to delete change request');
      }
    } catch (error) {
      console.error('Error deleting change request:', error);
    }
  };

  // Function to truncate comment
  const truncate = (str, n) => {
    return str.length > n ? str.substr(0, n - 1) + '...' : str;
  };

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
            {changeRequests.map((request) => (
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
                {/* <td>
                  <div
                    className="tooltip tooltip-top"
                    data-tip={request.comment || 'N/A'}
                    style={{ maxWidth: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                  >
                    {truncate(request.comment || 'N/A', 20)}
                  </div>
                </td> */}
                {/* <td>
  <div
    className="tooltip tooltip-top"
    data-tip={request.comment || 'N/A'}
  >
    <span
      style={{
        maxWidth: '200px',
        display: 'inline-block',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      }}
    >
      {truncate(request.comment || 'N/A', 20)}
    </span>
  </div>
</td> */}

<td>
  <div className="dropdown dropdown-top">
    <label
      tabIndex={0}
      className="text-left cursor-pointer"
      style={{
        maxWidth: '200px',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      }}
    >
      {truncate(request.comment || 'N/A', 50)}
    </label>
    <div
      tabIndex={0}
      className="dropdown-content p-2 shadow bg-base-200 rounded-box w-64"
    >
      <p>{request.comment || 'N/A'}</p>
    </div>
  </div>
</td>


                <td>{request.ticketId || 'N/A'}</td>
                <td>
                  <button
                    onClick={() => handleDelete(request._id)}
                    className="btn btn-sm btn-error"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
