const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

// Models
const Product = require('./models/Product');
const User = require('./models/User');

// Routes
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');

// Middleware
const errorMiddleware = require('./middleware/errorMiddleware');
const { handleValidationErrors } = require('./middleware/validateRequest');

// Initialize app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Use routes
app.use('/api', productRoutes);
app.use('/api', cartRoutes);

// Error handling middleware
app.use(errorMiddleware);

// Basic Route
app.get('/', (req, res) => {
  res.send('API is running');
});

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
