'use client';

import React, { useState } from 'react';

export default function ManageComponent({ projects, bugTypes, projectOwners, responsibilities }) {
  /*** Projects ***/
  const [projectList, setProjectList] = useState(projects);
  const [newProjectName, setNewProjectName] = useState('');
  const [editingProjectId, setEditingProjectId] = useState(null);
  const [editingProjectName, setEditingProjectName] = useState('');

  /*** Bug Types ***/
  const [bugTypeList, setBugTypeList] = useState(bugTypes);
  const [newBugTypeName, setNewBugTypeName] = useState('');
  const [editingBugTypeId, setEditingBugTypeId] = useState(null);
  const [editingBugTypeName, setEditingBugTypeName] = useState('');

  /*** Project Owners ***/
  const [projectOwnerList, setProjectOwnerList] = useState(projectOwners);
  const [newProjectOwnerName, setNewProjectOwnerName] = useState('');
  const [editingProjectOwnerId, setEditingProjectOwnerId] = useState(null);
  const [editingProjectOwnerName, setEditingProjectOwnerName] = useState('');

  /*** Responsibilities ***/
  const [responsibilityList, setResponsibilityList] = useState(responsibilities);
  const [newResponsibilityName, setNewResponsibilityName] = useState('');
  const [editingResponsibilityId, setEditingResponsibilityId] = useState(null);
  const [editingResponsibilityName, setEditingResponsibilityName] = useState('');

  /*** Functions for Projects ***/
  const handleAddProject = async () => {
    if (!newProjectName.trim()) return;

    try {
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newProjectName }),
      });

      if (res.ok) {
        const project = await res.json();
        setProjectList([...projectList, project]);
        setNewProjectName('');
      } else {
        console.error('Failed to add project');
      }
    } catch (error) {
      console.error('Error adding project:', error);
    }
  };

  const handleEditProject = async (projectId) => {
    if (!editingProjectName.trim()) return;

    try {
      const res = await fetch(`/api/projects/${projectId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: editingProjectName }),
      });

      if (res.ok) {
        const updatedProject = await res.json();
        setProjectList(
          projectList.map((project) => (project._id === projectId ? updatedProject : project))
        );
        setEditingProjectId(null);
        setEditingProjectName('');
      } else {
        console.error('Failed to edit project');
      }
    } catch (error) {
      console.error('Error editing project:', error);
    }
  };

  const handleDeleteProject = async (projectId) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    try {
      const res = await fetch(`/api/projects/${projectId}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setProjectList(projectList.filter((project) => project._id !== projectId));
      } else {
        console.error('Failed to delete project');
      }
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  /*** Functions for Bug Types ***/
  const handleAddBugType = async () => {
    if (!newBugTypeName.trim()) return;

    try {
      const res = await fetch('/api/bug-types', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newBugTypeName }),
      });

      if (res.ok) {
        const bugType = await res.json();
        setBugTypeList([...bugTypeList, bugType]);
        setNewBugTypeName('');
      } else {
        console.error('Failed to add bug type');
      }
    } catch (error) {
      console.error('Error adding bug type:', error);
    }
  };

  const handleEditBugType = async (bugTypeId) => {
    if (!editingBugTypeName.trim()) return;

    try {
      const res = await fetch(`/api/bug-types/${bugTypeId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: editingBugTypeName }),
      });

      if (res.ok) {
        const updatedBugType = await res.json();
        setBugTypeList(
          bugTypeList.map((bugType) => (bugType._id === bugTypeId ? updatedBugType : bugType))
        );
        setEditingBugTypeId(null);
        setEditingBugTypeName('');
      } else {
        console.error('Failed to edit bug type');
      }
    } catch (error) {
      console.error('Error editing bug type:', error);
    }
  };

  const handleDeleteBugType = async (bugTypeId) => {
    if (!confirm('Are you sure you want to delete this bug type?')) return;

    try {
      const res = await fetch(`/api/bug-types/${bugTypeId}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setBugTypeList(bugTypeList.filter((bugType) => bugType._id !== bugTypeId));
      } else {
        console.error('Failed to delete bug type');
      }
    } catch (error) {
      console.error('Error deleting bug type:', error);
    }
  };

  /*** Functions for Project Owners ***/
  const handleAddProjectOwner = async () => {
    if (!newProjectOwnerName.trim()) return;

    try {
      const res = await fetch('/api/project-owners', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newProjectOwnerName }),
      });

      if (res.ok) {
        const projectOwner = await res.json();
        setProjectOwnerList([...projectOwnerList, projectOwner]);
        setNewProjectOwnerName('');
      } else {
        console.error('Failed to add project owner');
      }
    } catch (error) {
      console.error('Error adding project owner:', error);
    }
  };

  const handleEditProjectOwner = async (projectOwnerId) => {
    if (!editingProjectOwnerName.trim()) return;

    try {
      const res = await fetch(`/api/project-owners/${projectOwnerId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: editingProjectOwnerName }),
      });

      if (res.ok) {
        const updatedProjectOwner = await res.json();
        setProjectOwnerList(
          projectOwnerList.map((owner) => (owner._id === projectOwnerId ? updatedProjectOwner : owner))
        );
        setEditingProjectOwnerId(null);
        setEditingProjectOwnerName('');
      } else {
        console.error('Failed to edit project owner');
      }
    } catch (error) {
      console.error('Error editing project owner:', error);
    }
  };

  const handleDeleteProjectOwner = async (projectOwnerId) => {
    if (!confirm('Are you sure you want to delete this project owner?')) return;

    try {
      const res = await fetch(`/api/project-owners/${projectOwnerId}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setProjectOwnerList(projectOwnerList.filter((owner) => owner._id !== projectOwnerId));
      } else {
        console.error('Failed to delete project owner');
      }
    } catch (error) {
      console.error('Error deleting project owner:', error);
    }
  };

  /*** Functions for Responsibilities ***/
  const handleAddResponsibility = async () => {
    if (!newResponsibilityName.trim()) return;

    try {
      const res = await fetch('/api/responsibilities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newResponsibilityName }),
      });

      if (res.ok) {
        const responsibility = await res.json();
        setResponsibilityList([...responsibilityList, responsibility]);
        setNewResponsibilityName('');
      } else {
        console.error('Failed to add responsibility');
      }
    } catch (error) {
      console.error('Error adding responsibility:', error);
    }
  };

  const handleEditResponsibility = async (responsibilityId) => {
    if (!editingResponsibilityName.trim()) return;

    try {
      const res = await fetch(`/api/responsibilities/${responsibilityId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: editingResponsibilityName }),
      });

      if (res.ok) {
        const updatedResponsibility = await res.json();
        setResponsibilityList(
          responsibilityList.map((resp) =>
            resp._id === responsibilityId ? updatedResponsibility : resp
          )
        );
        setEditingResponsibilityId(null);
        setEditingResponsibilityName('');
      } else {
        console.error('Failed to edit responsibility');
      }
    } catch (error) {
      console.error('Error editing responsibility:', error);
    }
  };

  const handleDeleteResponsibility = async (responsibilityId) => {
    if (!confirm('Are you sure you want to delete this responsibility?')) return;

    try {
      const res = await fetch(`/api/responsibilities/${responsibilityId}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setResponsibilityList(
          responsibilityList.filter((resp) => resp._id !== responsibilityId)
        );
      } else {
        console.error('Failed to delete responsibility');
      }
    } catch (error) {
      console.error('Error deleting responsibility:', error);
    }
  };

  return (
    <div>
      {/* Manage Projects */}
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4">Manage Projects</h2>
        <ul className="list-disc pl-5">
          {projectList.map((project) => (
            <li key={project._id} className="mb-2">
              {editingProjectId === project._id ? (
                <div className="flex items-center">
                  <input
                    type="text"
                    value={editingProjectName}
                    onChange={(e) => setEditingProjectName(e.target.value)}
                    className="input input-bordered"
                  />
                  <button
                    onClick={() => handleEditProject(project._id)}
                    className="btn btn-success ml-2"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => {
                      setEditingProjectId(null);
                      setEditingProjectName('');
                    }}
                    className="btn btn-secondary ml-2"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div className="flex items-center">
                  <span>{project.name}</span>
                  <button
                    onClick={() => {
                      setEditingProjectId(project._id);
                      setEditingProjectName(project.name);
                    }}
                    className="btn btn-sm btn-warning ml-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteProject(project._id)}
                    className="btn btn-sm btn-error ml-2"
                  >
                    Delete
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
        <div className="flex items-center mt-4">
          <input
            type="text"
            value={newProjectName}
            onChange={(e) => setNewProjectName(e.target.value)}
            placeholder="New Project Name"
            className="input input-bordered"
          />
          <button onClick={handleAddProject} className="btn btn-primary ml-2">
            Add Project
          </button>
        </div>
      </section>
  
      {/* Manage Bug Types */}
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4">Manage Bug Types</h2>
        <ul className="list-disc pl-5">
          {bugTypeList.map((bugType) => (
            <li key={bugType._id} className="mb-2">
              {editingBugTypeId === bugType._id ? (
                <div className="flex items-center">
                  <input
                    type="text"
                    value={editingBugTypeName}
                    onChange={(e) => setEditingBugTypeName(e.target.value)}
                    className="input input-bordered"
                  />
                  <button
                    onClick={() => handleEditBugType(bugType._id)}
                    className="btn btn-success ml-2"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => {
                      setEditingBugTypeId(null);
                      setEditingBugTypeName('');
                    }}
                    className="btn btn-secondary ml-2"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div className="flex items-center">
                  <span>{bugType.name}</span>
                  <button
                    onClick={() => {
                      setEditingBugTypeId(bugType._id);
                      setEditingBugTypeName(bugType.name);
                    }}
                    className="btn btn-sm btn-warning ml-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteBugType(bugType._id)}
                    className="btn btn-sm btn-error ml-2"
                  >
                    Delete
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
        <div className="flex items-center mt-4">
          <input
            type="text"
            value={newBugTypeName}
            onChange={(e) => setNewBugTypeName(e.target.value)}
            placeholder="New Bug Type"
            className="input input-bordered"
          />
          <button onClick={handleAddBugType} className="btn btn-primary ml-2">
            Add Bug Type
          </button>
        </div>
      </section>
  
      {/* Manage Project Owners */}
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4">Manage Project Owners</h2>
        <ul className="list-disc pl-5">
          {projectOwnerList.map((owner) => (
            <li key={owner._id} className="mb-2">
              {editingProjectOwnerId === owner._id ? (
                <div className="flex items-center">
                  <input
                    type="text"
                    value={editingProjectOwnerName}
                    onChange={(e) => setEditingProjectOwnerName(e.target.value)}
                    className="input input-bordered"
                  />
                  <button
                    onClick={() => handleEditProjectOwner(owner._id)}
                    className="btn btn-success ml-2"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => {
                      setEditingProjectOwnerId(null);
                      setEditingProjectOwnerName('');
                    }}
                    className="btn btn-secondary ml-2"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div className="flex items-center">
                  <span>{owner.name}</span>
                  <button
                    onClick={() => {
                      setEditingProjectOwnerId(owner._id);
                      setEditingProjectOwnerName(owner.name);
                    }}
                    className="btn btn-sm btn-warning ml-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteProjectOwner(owner._id)}
                    className="btn btn-sm btn-error ml-2"
                  >
                    Delete
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
        <div className="flex items-center mt-4">
          <input
            type="text"
            value={newProjectOwnerName}
            onChange={(e) => setNewProjectOwnerName(e.target.value)}
            placeholder="New Project Owner"
            className="input input-bordered"
          />
          <button onClick={handleAddProjectOwner} className="btn btn-primary ml-2">
            Add Project Owner
          </button>
        </div>
      </section>
  
      {/* Manage Responsibilities */}
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4">Manage Responsibilities</h2>
        <ul className="list-disc pl-5">
          {responsibilityList.map((resp) => (
            <li key={resp._id} className="mb-2">
              {editingResponsibilityId === resp._id ? (
                <div className="flex items-center">
                  <input
                    type="text"
                    value={editingResponsibilityName}
                    onChange={(e) => setEditingResponsibilityName(e.target.value)}
                    className="input input-bordered"
                  />
                  <button
                    onClick={() => handleEditResponsibility(resp._id)}
                    className="btn btn-success ml-2"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => {
                      setEditingResponsibilityId(null);
                      setEditingResponsibilityName('');
                    }}
                    className="btn btn-secondary ml-2"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div className="flex items-center">
                  <span>{resp.name}</span>
                  <button
                    onClick={() => {
                      setEditingResponsibilityId(resp._id);
                      setEditingResponsibilityName(resp.name);
                    }}
                    className="btn btn-sm btn-warning ml-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteResponsibility(resp._id)}
                    className="btn btn-sm btn-error ml-2"
                  >
                    Delete
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
        <div className="flex items-center mt-4">
          <input
            type="text"
            value={newResponsibilityName}
            onChange={(e) => setNewResponsibilityName(e.target.value)}
            placeholder="New Responsibility"
            className="input input-bordered"
          />
          <button onClick={handleAddResponsibility} className="btn btn-primary ml-2">
            Add Responsibility
          </button>
        </div>
      </section>
    </div>
  );
  
}
