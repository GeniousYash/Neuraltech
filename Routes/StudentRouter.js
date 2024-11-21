const express = require('express');
const { getStudentsByDepartment, createStudent } = require('../controllers/StudentController');
const {protect, authorizeRoles} = require('../Middleware/authMiddleware');

const router = express.Router();

router.get('/:departmentId',protect, authorizeRoles('DepartmentHead'), getStudentsByDepartment);

router.post('/',protect, authorizeRoles('DepartmentHead'), createStudent);

module.exports = router;
