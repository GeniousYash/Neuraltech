const Staff = require('../Models/Staff');
const jwt = require('jsonwebtoken');

// Register Admin
const registerAdmin = async (req, res) => {
    try {
        const { name, email, password, role, universityId, collegeId, departmentId } = req.body;

        // Check if email already exists
        const existingStaff = await Staff.findOne({ email });
        if (existingStaff) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        // Create admin
        const admin = await Staff.create({
            name,
            email,
            password,
            role,
            universityId,
            collegeId,
            departmentId,
        });

        // Generate token
        const token = jwt.sign({ id: admin._id, role: admin.role }, process.env.JWT_SECRET, {
            expiresIn: '30d',
        });

        res.status(201).json({
            _id: admin._id,
            name: admin.name,
            email: admin.email,
            role: admin.role,
            token,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Login Admin
const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check for admin
        const admin = await Staff.findOne({ email });
        if (admin && (await admin.matchPassword(password))) {
            // Generate token
            const token = jwt.sign({ id: admin._id, role: admin.role }, process.env.JWT_SECRET, {
                expiresIn: '30d',
            });

            res.json({
                _id: admin._id,
                name: admin.name,
                email: admin.email,
                role: admin.role,
                token,
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Get Admin Profile
const getAdminProfile = async (req, res) => {
    try {
        const admin = await Staff.findById(req.user.id);

        if (admin) {
            res.json({
                _id: admin._id,
                name: admin.name,
                email: admin.email,
                role: admin.role,
            });
        } else {
            res.status(404).json({ message: 'Admin not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { registerAdmin, loginAdmin, getAdminProfile };