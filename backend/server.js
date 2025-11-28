const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();

const app = express();

// Middleware
app.use(cors({ origin: 'http://localhost:5173' })); // adjust if needed
app.use(express.json());

// DB
connectDB();

// Routes
const leadRoutes = require('./routes/leadRoutes');
app.use('/api/leads', leadRoutes);

// Root
app.get('/', (_req, res) => {
  res.send('School CRM backend is running');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
