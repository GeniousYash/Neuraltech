const express = require('express');
const { createUniversity, getUniversities } = require('../controllers/UniversityController');
const { protect, authorizeRoles } = require('../Middleware/authMiddleware');
const router = express.Router();

router.post('/', protect, authorizeRoles('UniversityAdmin'), createUniversity);
router.get('/', protect, getUniversities);

module.exports = router;