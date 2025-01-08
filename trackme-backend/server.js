const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken'); // Tambahkan untuk verifikasi JWT

// Import controller
const customerControl = require('./controller/customerControl');
const dailyActivityControl = require('./controller/dailyActivityControl');
const friendRoutes = require('./routes/friendRoutes');
const messageRoutes = require('./routes/messageRoutes');
const achievementRoutes = require('./routes/achievementRoutes');
const app = express();

// Mengimport rute
const historicalActivityRoutes = require('./routes/historicalActivityRoutes');
const recommendationsRoutes = require('./routes/recommendationsRoutes');
const customerRoutes = require('./routes/customerRoutes');


// Middleware
app.use(cors({
  origin: 'http://localhost:4200', // URL frontend Anda
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true // Aktifkan jika menggunakan cookies
}));
app.use(bodyParser.json()); // Parsing JSON body



// Koneksi ke MongoDB
mongoose.connect('mongodb://localhost:27017/TrackMe2', { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error(err));

// Middleware untuk verifikasi token JWT
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']; // Biasanya token dikirim di header Authorization

  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }

  jwt.verify(token, 'your_secret_key', (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }
    req.user = decoded; // Menyimpan decoded token di req.user
    next(); // Lanjut ke route berikutnya
  });
};

// Rute untuk registrasi
app.post('/register/customer', customerControl.registerCustomer);

// Rute untuk login
app.post('/login/customer', customerControl.loginCustomer);

// Rute untuk menyimpan daily activity dengan autentikasi
app.post('/daily-activity', dailyActivityControl.addDailyActivity);

//Rute untuk menggunakan historical activity yg telah diinput di daily activity
app.use('/api/historical-activity', historicalActivityRoutes);

//Rute untuk menggunakan recommendations yg telah diinput di daily activity
app.use('/api/recommendations', recommendationsRoutes);

// Rute untuk friends
app.use('/api/friends', friendRoutes);

// Rute untuk messages
app.use('/api/messages', messageRoutes);

// Gunakan route untuk /api/achievements
app.use('/api/achievements', achievementRoutes);

// Menjalankan server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
