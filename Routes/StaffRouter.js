const express = require('express');
const { getStaffByDepartment, createStaff } = require('../controllers/StaffController');
const {protect, authorizeRoles } = require('../Middleware/authMiddleware');

const router = express.Router();

// Get all staff in a department
router.get('/:departmentId', protect, authorizeRoles('DepartmentHead'), getStaffByDepartment);

// Add a staff member to a department
router.post('/', protect,  authorizeRoles('DepartmentHead'), createStaff);

module.exports = router;
