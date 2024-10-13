import mongoose from 'mongoose';

const BugTypeSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

export default mongoose.models.BugType || mongoose.model('BugType', BugTypeSchema);
