const Staff = require('../Models/Staff');

const getStaffByDepartment = async (req, res) => {
    try {
        const staff = await Staff.find({ department: req.params.departmentId }).populate('department', 'name');
        res.status(200).json(staff);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

const createStaff = async (req, res) => {
    try {
        const { name, email, department, role } = req.body;
        if (req.user.role !== 'Department Head') {
            return res.status(403).json({ message: 'Unauthorized action' });
        }

        const newStaff = new Staff({ name, email, department, role });
        await newStaff.save();
        res.status(201).json(newStaff);
    } catch (error) {
        res.status(400).json({ message: 'Error adding staff', error });
    }
};

module.exports = { createStaff, getStaffByDepartment}