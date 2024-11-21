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

router.post('/', protect, authorizeRoles('CollageAdmin'), createDepartment);

router.get('/collage/:collageId', protect, getDepartmentsByCollage);

router.get('/:departmentId/students', protect, getStudentsByDepartment);

router.put('/:departmentId', protect, authorizeRoles('CollageAdmin', 'DepartmentHead'), updateDepartment);

router.delete('/:departmentId', protect, authorizeRoles('CollageAdmin'), deleteDepartment);

module.exports = router;
