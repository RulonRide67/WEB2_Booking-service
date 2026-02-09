const Booking = require('../models/Booking');
const Service = require('../models/Service');

const canAccessBooking = (booking, user) => {
  if (!booking || !user) return false;
  if (user.role === 'admin') return true;
  return String(booking.user) === String(user.userId);
};

exports.createBooking = async (req, res) => {
  try {
    const service = await Service.findById(req.body.service);
    if (!service) {
      return res.status(400).json({ error: 'Service not found' });
    }

    const bookingData = { ...req.body };
    delete bookingData.user;

    const booking = new Booking({
      ...bookingData,
      user: req.user.userId
    });

    await booking.save();
    await booking.populate('service');

    res.status(201).json(booking);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllBookings = async (req, res) => {
  try {
    const filter = req.user.role === 'admin' ? {} : { user: req.user.userId };
    const bookings = await Booking.find(filter).populate('service');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate('service');
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    if (!canAccessBooking(booking, req.user)) {
      return res.status(403).json({ error: 'Access denied' });
    }

    res.json(booking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    if (!canAccessBooking(booking, req.user)) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const service = await Service.findById(req.body.service);
    if (!service) {
      return res.status(400).json({ error: 'Service not found' });
    }

    const bookingData = { ...req.body };
    delete bookingData.user;

    const updated = await Booking.findByIdAndUpdate(
      req.params.id,
      bookingData,
      { new: true, runValidators: true }
    ).populate('service');

    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    if (!canAccessBooking(booking, req.user)) {
      return res.status(403).json({ error: 'Access denied' });
    }

    await booking.deleteOne();
    res.json({ message: 'Booking deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
