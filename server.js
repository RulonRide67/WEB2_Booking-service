require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const errorLogger = require('./middleware/errorLogger');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '10kb' }));
app.use(express.static('public'));

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('DB Error:', err));

// Health check
app.get('/status', (req, res) => {
  res.json({
    status: 'OK',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

// API routes
const authRouter = require('./routes/auth');
const bookingsRouter = require('./routes/bookings');
const servicesRouter = require('./routes/services');

app.use('/auth', authRouter);
app.use('/bookings', bookingsRouter);
app.use('/services', servicesRouter);

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.use(errorLogger);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});