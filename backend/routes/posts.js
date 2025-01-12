const express = require('express');
const Post = require('../models/Post');
const router = express.Router();

// Fetch all posts with author details
router.get('/posts', async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: [{ model: User, attributes: ['name', 'email'] }], // Include author details
    });
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

module.exports = router;
