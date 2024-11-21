const express = require('express');
const { getStaffByDepartment, createStaff } = require('../controllers/StaffController');
const {protect, authorizeRoles } = require('../Middleware/authMiddleware');

const router = express.Router();

router.get('/:departmentId', protect, authorizeRoles('DepartmentHead'), getStaffByDepartment);

router.post('/', protect,  authorizeRoles('DepartmentHead'), createStaff);

module.exports = router;
