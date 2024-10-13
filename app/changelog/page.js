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

  // Implement handleEdit similar to ManageComponent if needed

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Changelog</h1>
      <table className="table w-full mt-4">
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
              <td>{request.project?.name}</td>
              <td>{request.changesRequested}</td>
              <td>{new Date(request.dateRequested).toLocaleDateString()}</td>
              <td>{new Date(request.dueDate).toLocaleDateString()}</td>
              <td>
                {request.actualDeliveryDate
                  ? new Date(request.actualDeliveryDate).toLocaleDateString()
                  : 'N/A'}
              </td>
              <td>{request.bugType?.name}</td>
              <td>{request.projectOwner?.name}</td>
              <td>{request.responsibility?.name}</td>
              <td>{request.comment}</td>
              <td>{request.ticketId}</td>
              <td>
                {/* Add Edit button if implementing edit functionality */}
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
  );
}
