const mongoose = require('mongoose');

const isNonEmptyString = (value) =>
  typeof value === 'string' && value.trim().length > 0;

const isValidDate = (value) => !Number.isNaN(Date.parse(value));

const isNumber = (value) => typeof value === 'number' && Number.isFinite(value);

const validateBooking = (req, res, next) => {
  const {
    customerName,
    service,
    bookingDate,
    duration,
    price,
    customerEmail
  } = req.body;

  const errors = [];

  if (!isNonEmptyString(customerName)) {
    errors.push('customerName is required');
  }

  if (!mongoose.Types.ObjectId.isValid(service)) {
    errors.push('service is required');
  }

  if (!bookingDate || !isValidDate(bookingDate)) {
    errors.push('bookingDate must be a valid date');
  }

  if (!isNumber(duration) || duration < 15) {
    errors.push('duration must be a number >= 15');
  }

  if (!isNumber(price) || price < 0) {
    errors.push('price must be a number >= 0');
  }

  if (!isNonEmptyString(customerEmail)) {
    errors.push('customerEmail is required');
  }

  if (errors.length > 0) {
    return res.status(400).json({ error: errors.join(', ') });
  }

  return next();
};

const validateService = (req, res, next) => {
  const { name, description, basePrice, defaultDuration, category } = req.body;
  const errors = [];

  if (!isNonEmptyString(name)) {
    errors.push('name is required');
  }
  if (!isNonEmptyString(description)) {
    errors.push('description is required');
  }
  if (!isNumber(basePrice) || basePrice < 0) {
    errors.push('basePrice must be a number >= 0');
  }
  if (!isNumber(defaultDuration) || defaultDuration < 1) {
    errors.push('defaultDuration must be a number >= 1');
  }
  if (!isNonEmptyString(category)) {
    errors.push('category is required');
  }

  if (errors.length > 0) {
    return res.status(400).json({ error: errors.join(', ') });
  }

  return next();
};

const validateRegister = (req, res, next) => {
  const { email, password, role } = req.body;
  const errors = [];

  if (!isNonEmptyString(email)) {
    errors.push('email is required');
  }
  if (!isNonEmptyString(password) || password.length < 6) {
    errors.push('password must be at least 6 characters');
  }
  if (role) {
    errors.push('role cannot be set during registration');
  }

  if (errors.length > 0) {
    return res.status(400).json({ error: errors.join(', ') });
  }

  return next();
};

const validateLogin = (req, res, next) => {
  const { email, password } = req.body;
  const errors = [];

  if (!isNonEmptyString(email)) {
    errors.push('email is required');
  }
  if (!isNonEmptyString(password)) {
    errors.push('password is required');
  }

  if (errors.length > 0) {
    return res.status(400).json({ error: errors.join(', ') });
  }

  return next();
};

const validateObjectIdParam = (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: 'Invalid id' });
  }

  return next();
};

module.exports = {
  validateBooking,
  validateService,
  validateRegister,
  validateLogin,
  validateObjectIdParam
};
