import mongoose from 'mongoose';

const ResponsibilitySchema = new mongoose.Schema({
  name: { type: String, required: true },
});

export default mongoose.models.Responsibility || mongoose.model('Responsibility', ResponsibilitySchema);
