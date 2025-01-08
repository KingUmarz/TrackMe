const express = require('express');
const Friend = require('../database/Friend');
const router = express.Router();

// Add a new friend
router.post('/add', async (req, res) => {
    try {
      const { name } = req.body;
      if (!name) return res.status(400).json({ message: 'Name is required' });
  
      const newFriend = new Friend({ name });
      await newFriend.save();
  
      res.status(201).json(newFriend);
    } catch (err) {
      res.status(500).json({ message: 'Failed to add friend' });
    }
  });

// Get all friends
router.get('/', async (req, res) => {
    try {
      const friends = await Friend.find();
      res.status(200).json(friends);
    } catch (err) {
      res.status(500).json({ message: 'Failed to fetch friends' });
    }
  });

module.exports = router;
