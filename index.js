const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config/dev');

// routes
const rentalRoutes = require('./routes/rentals');
const usersRoutes = require('./routes/users');

// onlyAuthUser
const { onlyAuthUser } = require('./controllers/users');

// models
require('./models/rental');
require('./models/user');

const app = express();
const PORT = process.env.PORT || 3001;

// DBB
mongoose.connect(
  config.DB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
  () => {
    console.log('Connected to Atlas DBB');
  }
);

// MIDDLEWARE
app.use(bodyParser.json());

// Secret Route
app.get('/api/v1/secret', onlyAuthUser, (req, res) => {
  return res.json({ message: 'Super secret message' });
});

// API Routes
app.use('/api/v1/rentals', rentalRoutes);
app.use('/api/v1/users', usersRoutes);

app.listen(PORT, () => {
  console.log('Server listening on port: ' + PORT);
});
