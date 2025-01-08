// models/achievement.js
const mongoose = require('mongoose');

const AchievementSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Achievement = mongoose.model('Achievement', AchievementSchema);

module.exports = Achievement;
