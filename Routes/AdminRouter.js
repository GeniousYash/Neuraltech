const express = require('express');
const {
    registerAdmin,
    loginAdmin,
    getAdminProfile,
} = require('../controllers/AdminController');
const { protect } = require('../Middleware/authMiddleware');

const router = express.Router();

router.post('/register', registerAdmin);

router.post('/login', loginAdmin);

router.get('/profile', protect, getAdminProfile);

module.exports = router;
