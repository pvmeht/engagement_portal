const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const sequelize = require('./utils/database');
const User = require('./models/User'); // Ensure User model is imported
const authRoutes = require('./routes/auth');

const postRoutes = require('./routes/posts');

const app = express();
const PORT = process.env.PORT || 5000;


// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/api', authRoutes);  // Change '/auth' to '/api'
app.use('/api', postRoutes); // Adjust if your API route prefix differs

// Test MySQL Connection
sequelize.authenticate()
  .then(() => console.log('MySQL Connected'))
  .catch((err) => console.error('MySQL connection error:', err));

// Sync Sequelize Models with Database
sequelize.sync()
  .then(() => console.log('Database synchronized'))
  .catch((err) => console.error('Error synchronizing database:', err));

// Routes
app.get('/', (req, res) => {
  res.send('Server is running');
  console.log(User); // Check if User model is loaded
  console.log(Post); // Check if Post model is loaded
});



sequelize.sync()  // Sync Sequelize models with DB
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Database connection failed:', error);
  });