const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');
const auth = require('../middleware/authMiddleware');
const User = require('../models/User');

// POST /api/auth/register
router.post('/register', register);
// POST /api/auth/login
router.post('/login', login);

// GET /api/auth/me
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      lastActive: new Date().toISOString()
    });
  } catch (e) {
    res.status(500).json({ message: 'Failed to fetch profile' });
  }
});

module.exports = router;
