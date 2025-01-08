// routes/achievementRoutes.js
const express = require('express');
const Achievement = require('../database/achievement');
const router = express.Router();

// Route untuk mendapatkan semua Achievement
router.get('/', async (req, res) => {
  try {
    const achievements = await Achievement.find().sort({ createdAt: -1 }); // Mengurutkan berdasarkan tanggal terbaru
    res.json(achievements);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route untuk menambahkan Achievement baru
router.post('/add', async (req, res) => {
  const { title, description } = req.body;
  
  const achievement = new Achievement({
    title,
    description
  });

  try {
    const savedAchievement = await achievement.save();
    res.status(201).json(savedAchievement);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
