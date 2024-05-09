const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
  name: { type: String, required: true },
  schedule: { type: String, required: true },
  date: { type: String, required: true }, // Cambiado de Date a String
  end: { type: String, required: true }, // Cambiado de Date a String
  isActive: { type: Boolean, default: true },
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});


const Class = mongoose.model('Class', classSchema);

module.exports = Class;
