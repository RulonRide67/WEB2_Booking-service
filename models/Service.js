const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  basePrice: {
    type: Number,
    required: true,
    min: 0
  },
  defaultDuration: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  }
}, { 
  timestamps: true 
});

module.exports = mongoose.model('Service', serviceSchema);