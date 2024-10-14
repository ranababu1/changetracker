// app/timeline/page.js
import dbConnect from 'utils/db';
import ChangeRequest from 'models/ChangeRequest';
import Project from 'models/Project';
import TimelineClientComponent from './TimelineClientComponent';

export const revalidate = 3600; // Revalidate this page every 1hr

export default async function TimelinePage() {
  await dbConnect();

  try {
    // Fetch projects
    const projects = await Project.find({}).lean();

    // Convert ObjectIds and Dates to strings
    const projectsData = projects.map((project) => ({
      ...project,
      _id: project._id.toString(),
      createdAt: project.createdAt.toISOString(),
      updatedAt: project.updatedAt.toISOString(),
    }));

    // Fetch change requests
    const changeRequests = await ChangeRequest.find({})
      .populate('project')
      .populate('bugType')
      .populate('projectOwner')
      .populate('responsibility')
      .sort({ dateRequested: -1 })
      .lean();

    const changeRequestsData = changeRequests.map((request) => ({
      ...request,
      _id: request._id.toString(),
      project: request.project
        ? {
            ...request.project,
            _id: request.project._id.toString(),
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

    // Render the Client Component with fetched data
    return (
      <TimelineClientComponent
        projects={projectsData}
        changeRequests={changeRequestsData}
      />
    );
  } catch (error) {
    console.error('Error fetching timeline data:', error);
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-xl font-bold text-red-500">Error loading timeline</h1>
        <p>{error.message}</p>
      </div>
    );
  }
}
