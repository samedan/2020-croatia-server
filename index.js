const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config/dev');

const rentalRoutes = require('./routes/rentals');

// models
const Rental = require('./models/rental');

const app = express();

const PORT = process.env.PORT || 3001;

// DBB
mongoose.connect(
  config.DB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log('Connected to Atlas DBB');
  }
);

// MIDDLEWARE
app.use(bodyParser.json());
// API Routes
app.use('/api/v1/rentals', rentalRoutes);

app.listen(PORT, () => {
  console.log('Server listening on port: ' + PORT);
});
