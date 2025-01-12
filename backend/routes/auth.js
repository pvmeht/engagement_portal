// routes/auth.js
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Default import
const Post = require('../models/Post'); // Default import
const router = express.Router();

// Registration Route
router.post('/register', async (req, res) => {
    const { name, email, password, confirm_password, role } = req.body;
  
    // Validate passwords
    if (password !== confirm_password) {
      return res.status(400).json({ error: 'Passwords do not match' });
    }
  
    try {
      // Check if the user already exists
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ error: 'Email already in use' });
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create the user
      const user = await User.create({
        name,
        email,
        password: hashedPassword,
        role,
      });
  
      return res.json({
        message: 'Registration successful',
        user,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
    

// Login route
router.post('/login', async (req, res) => {
  const { email, password, role } = req.body;
  
  try {
    const user = await User.findOne({ where: { email, role } });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Compare password
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user.id, role: user.role }, 'your-secret-key', { expiresIn: '1h' });

    return res.json({
      message: 'Login successful',
      token: token, // Send token in response
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// Fetch All Posts
router.get('/posts', async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: {
        model: User, // Assuming you have a User model
        attributes: ['name', 'email'] // Fetch user details as well
      }
    });
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching posts', details: error.message });
  }
});


// Fetch All Users
router.get('/users', async (req, res) => {
    try {
      const users = await User.findAll(); // Fetch all users from the database
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching users', details: error.message });
    }
  });

module.exports = router;
