// models/ChangeRequest.js
import mongoose from 'mongoose';

const ChangeRequestSchema = new mongoose.Schema(
  {
    project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
    changesRequested: { type: String, required: true },
    dueDate: { type: Date, required: true },
    dateRequested: { type: Date, required: true },
    actualDeliveryDate: { type: Date },
    bugType: { type: mongoose.Schema.Types.ObjectId, ref: 'BugType', required: true },
    projectOwner: { type: mongoose.Schema.Types.ObjectId, ref: 'ProjectOwner', required: true },
    responsibility: { type: mongoose.Schema.Types.ObjectId, ref: 'Responsibility', required: true },
    comment: { type: String },
    ticketId: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.ChangeRequest || mongoose.model('ChangeRequest', ChangeRequestSchema);
