const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  country: { type: String, required: true },
  entityType: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Client', clientSchema);
