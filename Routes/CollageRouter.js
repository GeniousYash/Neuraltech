const express = require('express');
const { createCollage, getCollages } = require('../controllers/CollageController');
const { protect, authorizeRoles } = require('../Middleware/authMiddleware');
const router = express.Router();

router.post('/',protect, authorizeRoles('CollageAdmin'), createCollage);
router.get('/:universityId', protect, getCollages);

module.exports = router;