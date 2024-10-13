// app/timeline/page.js
'use client';

import React, { useState, useEffect } from 'react';

export default function TimelinePage() {
  const [projects, setProjects] = useState([]);
  const [changeRequests, setChangeRequests] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState('');

  useEffect(() => {
    // Fetch all projects
    async function fetchProjects() {
      try {
        const res = await fetch('/api/projects');
        const data = await res.json();
        setProjects(data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    }

    fetchProjects();
  }, []);

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

  // Filter change requests by selected project
  const filteredChangeRequests = changeRequests.filter(
    (request) => request.project?._id === selectedProjectId
  );

  // Get the selected project object
  const selectedProject = projects.find((proj) => proj._id === selectedProjectId);

  return (
    <div className="container mx-auto p-4">
      {/* Project Selection Dropdown */}
      <div className="mb-6">
        <label className="label">
          <span className="label-text text-xl font-bold">Select Project</span>
        </label>
        <select
          value={selectedProjectId}
          onChange={(e) => setSelectedProjectId(e.target.value)}
          className="select select-bordered w-full max-w-xs"
        >
          <option value="">Select a project</option>
          {projects.map((project) => (
            <option key={project._id} value={project._id}>
              {project.name}
            </option>
          ))}
        </select>
      </div>

      {selectedProjectId ? (
        <div>
          <h2 className="text-xl font-semibold mb-2">{selectedProject?.name} Timeline</h2>
          <ul className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical">
            {/* Project Init */}
            <li>
              <div className="timeline-middle">
                {/* Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="timeline-start mb-10 md:text-end">
                <time className="font-mono italic">
                  {new Date(selectedProject?.createdAt).toLocaleDateString()}
                </time>
                <div>{selectedProject?.name}</div>
                <div>Project Init</div>
              </div>
              <hr />
            </li>

            {/* Change Requests */}
            {filteredChangeRequests.map((request, index) => (
              <li key={request._id}>
                <hr />
                <div className="timeline-middle">
                  {/* Icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className={`timeline-${index % 2 === 0 ? 'end' : 'start'} mb-10`}>
                  <time className="font-mono italic">
                    {request.dateRequested
                      ? new Date(request.dateRequested).toLocaleDateString()
                      : 'N/A'}
                  </time>
                  <div className="text-lg">Changes requested: {request.changesRequested}</div>
                  <div>Description (Comment): {request.comment || 'N/A'}</div>
                  {/* Display Actual Delivery Date */}
                  <div>
                    Actual Delivery Date:{' '}
                    {request.actualDeliveryDate
                      ? new Date(request.actualDeliveryDate).toLocaleDateString()
                      : 'N/A'}
                  </div>
                  {/* Remaining fields */}
                  <div>Due Date: {new Date(request.dueDate).toLocaleDateString()}</div>
                  <div>Bug Type: {request.bugType?.name || 'N/A'}</div>
                  <div>Project Owner: {request.projectOwner?.name || 'N/A'}</div>
                  <div>Responsibility: {request.responsibility?.name || 'N/A'}</div>
                  <div>Ticket ID: {request.ticketId || 'N/A'}</div>
                </div>
                <hr />
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-center text-gray-500">Please select a project to view its timeline.</p>
      )}
    </div>
  );
}
