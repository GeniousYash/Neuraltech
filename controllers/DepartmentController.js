const Department = require('../Models/Department');

const createDepartment = async (req, res) => {
    try {
        const { name, collageId } = req.body;
        if (req.user.role !== 'CollageAdmin') {
            return res.status(403).json({ message: 'Unauthorized action' });
        }

        const newDepartment = new Department({ name, collageId });
        await newDepartment.save();
        res.status(201).json(newDepartment);
    } catch (error) {
        res.status(400).json({ message: 'Error creating department', error });
    }
};

const getDepartmentsByCollage = async (req, res) => {
    try {
        const departments = await Department.find({ collage: req.params.collageId }).populate('collage', 'name');
        res.status(200).json(departments);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

const getStudentsByDepartment = async (req, res) => {
    try {
        const { departmentId } = req.params;
        const students = await Student.find({ departmentId });
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateDepartment = async (req, res) => {
    try {
        const { departmentId } = req.params;
        const { name, headId } = req.body;
        const updatedDepartment = await Department.findByIdAndUpdate(
            departmentId,
            { name, headId },
            { new: true, runValidators: true }
        );
        if (!updatedDepartment) {
            return res.status(404).json({ message: 'Department not found' });
        }
        res.status(200).json(updatedDepartment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteDepartment = async (req, res) => {
    try {
        const { departmentId } = req.params;

        const department = await Department.findByIdAndDelete(departmentId);

        if (!department) {
            return res.status(404).json({ message: 'Department not found' });
        }

        res.status(200).json({ message: 'Department deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createDepartment,
    getDepartmentsByCollage,
    getStudentsByDepartment,
    updateDepartment,
    deleteDepartment,
};
