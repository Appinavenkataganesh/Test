const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  status: { type: String, enum: ['TODO', 'In Progress', 'Done'], default: 'TODO' },
  createdDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Task', TaskSchema);
