const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: true,
    trim: true
  },
  serviceName: {
    type: String,
    required: true,
    enum: ['Haircut', 'Massage', 'Consultation', 'Manicure', 'Training']
  },
  bookingDate: {
    type: Date,
    required: true
  },
  duration: {
    type: Number,
    required: true,
    min: 15
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled'],
    default: 'pending'
  },
  customerEmail: {
    type: String,
    required: true
  },
  notes: {
    type: String
  }
}, { 
  timestamps: true 
});

module.exports = mongoose.model('Booking', bookingSchema);