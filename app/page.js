// app/page.js
'use client';

import React, { useState, useEffect } from 'react';

export default function Home() {
  // State for form data
  const [formData, setFormData] = useState({
    project: '',
    changesRequested: '',
    dueDate: '',
    dateRequested: '',
    actualDeliveryDate: '',
    bugType: '',
    projectOwner: '',
    responsibility: '',
    comment: '',
    ticketId: '',
  });

  // State for dropdown data
  const [projects, setProjects] = useState([]);
  const [bugTypes, setBugTypes] = useState([]);
  const [projectOwners, setProjectOwners] = useState([]);
  const [responsibilities, setResponsibilities] = useState([]);

  // State for toast message
  const [showToast, setShowToast] = useState(false);

  // Fetch dropdown data
  useEffect(() => {
    async function fetchData() {
      try {
        const [projectsRes, bugTypesRes, projectOwnersRes, responsibilitiesRes] = await Promise.all([
          fetch('/api/projects'),
          fetch('/api/bug-types'),
          fetch('/api/project-owners'),
          fetch('/api/responsibilities'),
        ]);

        const [projectsData, bugTypesData, projectOwnersData, responsibilitiesData] = await Promise.all([
          projectsRes.json(),
          bugTypesRes.json(),
          projectOwnersRes.json(),
          responsibilitiesRes.json(),
        ]);

        setProjects(projectsData);
        setBugTypes(bugTypesData);
        setProjectOwners(projectOwnersData);
        setResponsibilities(responsibilitiesData);
      } catch (error) {
        console.error('Error fetching dropdown data:', error);
      }
    }

    fetchData();
  }, []);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/change-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        // Reset form
        setFormData({
          project: '',
          changesRequested: '',
          dueDate: '',
          dateRequested: '',
          actualDeliveryDate: '',
          bugType: '',
          projectOwner: '',
          responsibility: '',
          comment: '',
          ticketId: '',
        });
        // Show toast message
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
        }, 3000); // Hide after 3 seconds
      } else {
        const errorData = await res.json();
        console.error('Error submitting change request:', errorData);
        alert('Failed to submit change request.');
      }
    } catch (error) {
      console.error('Error submitting change request:', error);
      alert('Failed to submit change request.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      {/* Toast Message */}
      {showToast && (
        <div className="toast toast-top toast-end">
          <div className="alert alert-success">
            <span>Changelog successfully saved.</span>
          </div>
        </div>
      )}
      <h1 className="text-2xl font-bold mb-4">Submit Change Request</h1>
      <form onSubmit={handleSubmit}>
        {/* Form Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Project */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Project</span>
            </label>
            <select
              name="project"
              value={formData.project}
              onChange={handleChange}
              className="select select-bordered w-full"
              required
            >
              <option value="">Select a project</option>
              {projects.map((project) => (
                <option key={project._id} value={project._id}>
                  {project.name}
                </option>
              ))}
            </select>
          </div>

          {/* Date Requested */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Date Requested</span>
            </label>
            <input
              type="date"
              name="dateRequested"
              value={formData.dateRequested}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* Changes Requested (Full Width) */}
          <div className="form-control md:col-span-2">
            <label className="label">
              <span className="label-text">Changes Requested</span>
            </label>
            <input
              type="text"
              name="changesRequested"
              value={formData.changesRequested}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* Ticket ID */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Ticket ID</span>
            </label>
            <input
              type="text"
              name="ticketId"
              value={formData.ticketId}
              onChange={handleChange}
              className="input input-bordered w-full"
            />
          </div>

          {/* Due Date */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Due Date</span>
            </label>
            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* Bug Type */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Type of Bug</span>
            </label>
            <select
              name="bugType"
              value={formData.bugType}
              onChange={handleChange}
              className="select select-bordered w-full"
              required
            >
              <option value="">Select a bug type</option>
              {bugTypes.map((bugType) => (
                <option key={bugType._id} value={bugType._id}>
                  {bugType.name}
                </option>
              ))}
            </select>
          </div>

          {/* Responsibility */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Responsibility</span>
            </label>
            <select
              name="responsibility"
              value={formData.responsibility}
              onChange={handleChange}
              className="select select-bordered w-full"
              required
            >
              <option value="">Select responsibility</option>
              {responsibilities.map((resp) => (
                <option key={resp._id} value={resp._id}>
                  {resp.name}
                </option>
              ))}
            </select>
          </div>

          {/* Comment (Full Width) */}
          <div className="form-control md:col-span-2">
            <label className="label">
              <span className="label-text">Comment</span>
            </label>
            <textarea
              name="comment"
              value={formData.comment}
              onChange={handleChange}
              className="textarea textarea-bordered w-full"
            ></textarea>
          </div>

          {/* Project Owner */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Project Owner</span>
            </label>
            <select
              name="projectOwner"
              value={formData.projectOwner}
              onChange={handleChange}
              className="select select-bordered w-full"
              required
            >
              <option value="">Select a project owner</option>
              {projectOwners.map((owner) => (
                <option key={owner._id} value={owner._id}>
                  {owner.name}
                </option>
              ))}
            </select>
          </div>

          {/* Actual Delivery Date */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Actual Delivery Date</span>
            </label>
            <input
              type="date"
              name="actualDeliveryDate"
              value={formData.actualDeliveryDate}
              onChange={handleChange}
              className="input input-bordered w-full"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-6">
          <button type="submit" className="btn btn-primary w-full md:w-auto">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
