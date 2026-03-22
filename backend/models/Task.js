const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
  title: { type: String, required: true },
  description: { type: String },
  category: { type: String, required: true, enum: ['Tax', 'Filing', 'Legal', 'Audit', 'Other'] },
  dueDate: { type: Date, required: true },
  status: { type: String, required: true, enum: ['Pending', 'Completed'], default: 'Pending' },
  priority: { type: String, required: true, enum: ['Low', 'Medium', 'High'], default: 'Medium' }
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);
