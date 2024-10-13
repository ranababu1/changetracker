import mongoose from 'mongoose';

const ProjectOwnerSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

export default mongoose.models.ProjectOwner || mongoose.model('ProjectOwner', ProjectOwnerSchema);
