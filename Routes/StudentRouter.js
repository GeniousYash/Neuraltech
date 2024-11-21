const express = require('express');
const { getStudentsByDepartment, createStudent } = require('../controllers/StudentController');
// const {protect, authorizeRoles} = require('../Middleware/authMiddleware');

const router = express.Router();

// Get all students in a department
router.get('/:departmentId', getStudentsByDepartment);

// Add a student to a department
router.post('/', createStudent);
//  protect, authorizeRoles('DepartmentHead'),
module.exports = router;