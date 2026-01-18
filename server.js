require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('DB Error:', err));

// Test routes
app.get('/', (req, res) => {
  res.send('Server is running');
});

app.get('/hello', (req, res) => {
  res.json({ message: 'Hello from server!' });
});

app.get('/time', (req, res) => {
  res.json({ currentTime: new Date().toISOString() });
});

app.get('/status', (req, res) => {
  res.json({ 
    status: 'OK',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

// API routes
const bookingsRouter = require('./routes/bookings');
const servicesRouter = require('./routes/services');

app.use('/bookings', bookingsRouter);
app.use('/services', servicesRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});