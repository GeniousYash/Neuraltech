const Student = require('../Models/Student');

const getStudentsByDepartment = async (req, res) => {
    try {
        const students = await Student.find({ department: req.params.departmentId }).populate('department', 'name');
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

const createStudent = async (req, res) => {
    try {
        const { name, email, departmentId, enrollmentYear } = req.body;
        if (req.user.role !== 'DepartmentHead') {
            return res.status(403).json({ message: 'Unauthorized action' });
        }

        const newStudent = new Student({ name, email, departmentId, enrollmentYear });
        await newStudent.save();
        res.status(201).json(newStudent);
    } catch (error) {
        console.error(error); 
        res.status(400).json({ message: 'Error adding student', error: error.message });
    }
};

module.exports = { createStudent,getStudentsByDepartment};
