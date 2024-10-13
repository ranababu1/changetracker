// app/manage/page.js
import dbConnect from 'utils/db';
import Project from 'models/Project';
import BugType from 'models/BugType';
import ProjectOwner from 'models/ProjectOwner';
import Responsibility from 'models/Responsibility';
import ManageComponent from 'app/components/ManageComponent';

export default async function ManagePage() {
  await dbConnect();

  const projects = await Project.find({}).lean();
  const bugTypes = await BugType.find({}).lean();
  const projectOwners = await ProjectOwner.find({}).lean();
  const responsibilities = await Responsibility.find({}).lean();

  return (
    <div className="container mx-auto p-4">
      <ManageComponent
        projects={projects}
        bugTypes={bugTypes}
        projectOwners={projectOwners}
        responsibilities={responsibilities}
      />
    </div>
  );
}
