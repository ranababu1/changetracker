// app/timeline/page.js
import dbConnect from 'utils/db';
import ChangeRequest from 'models/ChangeRequest';
import Project from 'models/Project';

export default async function TimelinePage() {
  await dbConnect();

  // Fetch change requests and sort by dateRequested
  const changeRequests = await ChangeRequest.find({})
    .populate('project')
    .populate('bugType')
    .populate('projectOwner')
    .populate('responsibility')
    .sort({ dateRequested: -1 })
    .lean();

  // Group change requests by project
  const projectsMap = {};

  changeRequests.forEach((request) => {
    const projectId = request.project?._id;
    if (!projectsMap[projectId]) {
      projectsMap[projectId] = {
        project: request.project,
        changeRequests: [],
      };
    }
    projectsMap[projectId].changeRequests.push(request);
  });

  const projects = Object.values(projectsMap);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Timeline</h1>

      {projects.map((projectGroup) => (
        <div key={projectGroup.project._id} className="mb-8">
          <h2 className="text-xl font-semibold mb-2">{projectGroup.project.name}</h2>
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
                  {new Date(projectGroup.project.createdAt).toLocaleDateString()}
                </time>
                <div>{projectGroup.project.name}</div>
                <div>Project Init</div>
              </div>
              <hr />
            </li>

            {/* Change Requests */}
            {projectGroup.changeRequests.map((request, index) => (
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
                    {new Date(request.dateRequested).toLocaleDateString()}
                  </time>
                  <div className="text-lg">Changes requested: {request.changesRequested}</div>
                  <div>Description (Comment): {request.comment}</div>
                  {/* Remaining fields */}
                  <div>Due Date: {new Date(request.dueDate).toLocaleDateString()}</div>
                  <div>
                    Actual Delivery Date:{' '}
                    {request.actualDeliveryDate
                      ? new Date(request.actualDeliveryDate).toLocaleDateString()
                      : 'N/A'}
                  </div>
                  <div>Bug Type: {request.bugType?.name}</div>
                  <div>Project Owner: {request.projectOwner?.name}</div>
                  <div>Responsibility: {request.responsibility?.name}</div>
                  <div>Ticket ID: {request.ticketId}</div>
                </div>
                <hr />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
