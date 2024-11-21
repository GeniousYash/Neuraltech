const express = require('express');
const {
    registerAdmin,
    loginAdmin,
    getAdminProfile,
} = require('../controllers/AdminController');
const { protect } = require('../Middleware/authMiddleware');

const router = express.Router();

// Register Admin (Public)
router.post('/register', registerAdmin);

// Login Admin (Public)
router.post('/login', loginAdmin);

// Get Admin Profile (Protected)
router.get('/profile', protect, getAdminProfile);

module.exports = router;