const express = require('express');
const {
    createDepartment,
    getDepartmentsByCollage,
    getStudentsByDepartment,
    updateDepartment,
    deleteDepartment,
} = require('../controllers/DepartmentController');
const { protect, authorizeRoles } = require('../Middleware/authMiddleware');

const router = express.Router();

// Create a new department (Accessible by Collage Admin)
router.post('/', protect, authorizeRoles('CollageAdmin'), createDepartment);

// Get all departments for a specific collage
router.get('/collage/:collageId', protect, getDepartmentsByCollage);

// Get all students in a specific department
router.get('/:departmentId/students', protect, getStudentsByDepartment);

// Update a department (Accessible by Collage Admin or Department Head)
router.put('/:departmentId', protect, authorizeRoles('CollageAdmin', 'DepartmentHead'), updateDepartment);

// Delete a department (Accessible by Collage Admin)
router.delete('/:departmentId', protect, authorizeRoles('CollageAdmin'), deleteDepartment);

module.exports = router;