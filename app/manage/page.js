// app/manage/page.js
'use client';

import React, { useState, useEffect } from 'react';

export default function ManagePage() {
  const [projects, setProjects] = useState([]);
  const [bugTypes, setBugTypes] = useState([]);
  const [projectOwners, setProjectOwners] = useState([]);
  const [responsibilities, setResponsibilities] = useState([]);

  // State variables for new item inputs
  const [newProjectName, setNewProjectName] = useState('');
  const [newBugTypeName, setNewBugTypeName] = useState('');
  const [newProjectOwnerName, setNewProjectOwnerName] = useState('');
  const [newResponsibilityName, setNewResponsibilityName] = useState('');

  // Fetch data for all categories
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
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  // Handle adding new project
  const handleAddProject = async (e) => {
    e.preventDefault();
    if (!newProjectName.trim()) return;

    try {
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newProjectName }),
      });

      if (res.ok) {
        const newProject = await res.json();
        setProjects([...projects, newProject]);
        setNewProjectName('');
      } else {
        console.error('Failed to add project');
        alert('Failed to add project.');
      }
    } catch (error) {
      console.error('Error adding project:', error);
      alert('Error adding project.');
    }
  };

  // Handle deleting project
  const handleDeleteProject = async (id) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    try {
      const res = await fetch(`/api/projects/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setProjects(projects.filter((project) => project._id !== id));
      } else {
        console.error('Failed to delete project');
        alert('Failed to delete project.');
      }
    } catch (error) {
      console.error('Error deleting project:', error);
      alert('Error deleting project.');
    }
  };

  // Handle adding new bug type
  const handleAddBugType = async (e) => {
    e.preventDefault();
    if (!newBugTypeName.trim()) return;

    try {
      const res = await fetch('/api/bug-types', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newBugTypeName }),
      });

      if (res.ok) {
        const newBugType = await res.json();
        setBugTypes([...bugTypes, newBugType]);
        setNewBugTypeName('');
      } else {
        console.error('Failed to add bug type');
        alert('Failed to add bug type.');
      }
    } catch (error) {
      console.error('Error adding bug type:', error);
      alert('Error adding bug type.');
    }
  };

  // Handle deleting bug type
  const handleDeleteBugType = async (id) => {
    if (!confirm('Are you sure you want to delete this bug type?')) return;

    try {
      const res = await fetch(`/api/bug-types/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setBugTypes(bugTypes.filter((bugType) => bugType._id !== id));
      } else {
        console.error('Failed to delete bug type');
        alert('Failed to delete bug type.');
      }
    } catch (error) {
      console.error('Error deleting bug type:', error);
      alert('Error deleting bug type.');
    }
  };

  // Handle adding new project owner
  const handleAddProjectOwner = async (e) => {
    e.preventDefault();
    if (!newProjectOwnerName.trim()) return;

    try {
      const res = await fetch('/api/project-owners', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newProjectOwnerName }),
      });

      if (res.ok) {
        const newProjectOwner = await res.json();
        setProjectOwners([...projectOwners, newProjectOwner]);
        setNewProjectOwnerName('');
      } else {
        console.error('Failed to add project owner');
        alert('Failed to add project owner.');
      }
    } catch (error) {
      console.error('Error adding project owner:', error);
      alert('Error adding project owner.');
    }
  };

  // Handle deleting project owner
  const handleDeleteProjectOwner = async (id) => {
    if (!confirm('Are you sure you want to delete this project owner?')) return;

    try {
      const res = await fetch(`/api/project-owners/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setProjectOwners(projectOwners.filter((owner) => owner._id !== id));
      } else {
        console.error('Failed to delete project owner');
        alert('Failed to delete project owner.');
      }
    } catch (error) {
      console.error('Error deleting project owner:', error);
      alert('Error deleting project owner.');
    }
  };

  // Handle adding new responsibility
  const handleAddResponsibility = async (e) => {
    e.preventDefault();
    if (!newResponsibilityName.trim()) return;

    try {
      const res = await fetch('/api/responsibilities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newResponsibilityName }),
      });

      if (res.ok) {
        const newResponsibility = await res.json();
        setResponsibilities([...responsibilities, newResponsibility]);
        setNewResponsibilityName('');
      } else {
        console.error('Failed to add responsibility');
        alert('Failed to add responsibility.');
      }
    } catch (error) {
      console.error('Error adding responsibility:', error);
      alert('Error adding responsibility.');
    }
  };

  // Handle deleting responsibility
  const handleDeleteResponsibility = async (id) => {
    if (!confirm('Are you sure you want to delete this responsibility?')) return;

    try {
      const res = await fetch(`/api/responsibilities/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setResponsibilities(responsibilities.filter((resp) => resp._id !== id));
      } else {
        console.error('Failed to delete responsibility');
        alert('Failed to delete responsibility.');
      }
    } catch (error) {
      console.error('Error deleting responsibility:', error);
      alert('Error deleting responsibility.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Data</h1>

      {/* Projects Table */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Projects</h2>
        {/* Add Project Form */}
        <form onSubmit={handleAddProject} className="flex items-center mb-4">
          <input
            type="text"
            value={newProjectName}
            onChange={(e) => setNewProjectName(e.target.value)}
            placeholder="Add new project"
            className="input input-bordered w-full max-w-xs mr-2"
            required
          />
          <button type="submit" className="btn btn-primary">
            Add
          </button>
        </form>
        {/* Projects Table */}
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project._id}>
                  <td>{project.name}</td>
                  <td>
                    {/* Delete Button */}
                    <button
                      onClick={() => handleDeleteProject(project._id)}
                      className="btn btn-sm btn-error"
                    >
                      Delete
                    </button>
                    {/* Edit functionality can be added similarly */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bug Types Table */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Bug Types</h2>
        {/* Add Bug Type Form */}
        <form onSubmit={handleAddBugType} className="flex items-center mb-4">
          <input
            type="text"
            value={newBugTypeName}
            onChange={(e) => setNewBugTypeName(e.target.value)}
            placeholder="Add new bug type"
            className="input input-bordered w-full max-w-xs mr-2"
            required
          />
          <button type="submit" className="btn btn-primary">
            Add
          </button>
        </form>
        {/* Bug Types Table */}
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bugTypes.map((bugType) => (
                <tr key={bugType._id}>
                  <td>{bugType.name}</td>
                  <td>
                    {/* Delete Button */}
                    <button
                      onClick={() => handleDeleteBugType(bugType._id)}
                      className="btn btn-sm btn-error"
                    >
                      Delete
                    </button>
                    {/* Edit functionality can be added similarly */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Project Owners Table */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Project Owners</h2>
        {/* Add Project Owner Form */}
        <form onSubmit={handleAddProjectOwner} className="flex items-center mb-4">
          <input
            type="text"
            value={newProjectOwnerName}
            onChange={(e) => setNewProjectOwnerName(e.target.value)}
            placeholder="Add new project owner"
            className="input input-bordered w-full max-w-xs mr-2"
            required
          />
          <button type="submit" className="btn btn-primary">
            Add
          </button>
        </form>
        {/* Project Owners Table */}
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {projectOwners.map((owner) => (
                <tr key={owner._id}>
                  <td>{owner.name}</td>
                  <td>
                    {/* Delete Button */}
                    <button
                      onClick={() => handleDeleteProjectOwner(owner._id)}
                      className="btn btn-sm btn-error"
                    >
                      Delete
                    </button>
                    {/* Edit functionality can be added similarly */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Responsibilities Table */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Responsibilities</h2>
        {/* Add Responsibility Form */}
        <form onSubmit={handleAddResponsibility} className="flex items-center mb-4">
          <input
            type="text"
            value={newResponsibilityName}
            onChange={(e) => setNewResponsibilityName(e.target.value)}
            placeholder="Add new responsibility"
            className="input input-bordered w-full max-w-xs mr-2"
            required
          />
          <button type="submit" className="btn btn-primary">
            Add
          </button>
        </form>
        {/* Responsibilities Table */}
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {responsibilities.map((resp) => (
                <tr key={resp._id}>
                  <td>{resp.name}</td>
                  <td>
                    {/* Delete Button */}
                    <button
                      onClick={() => handleDeleteResponsibility(resp._id)}
                      className="btn btn-sm btn-error"
                    >
                      Delete
                    </button>
                    {/* Edit functionality can be added similarly */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
