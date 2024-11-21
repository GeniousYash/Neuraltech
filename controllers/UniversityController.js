const University = require('../Models/University');

const getUniversities = async (req, res) => {
    try {
        const universities = await University.find().populate('admin', 'username');
        res.status(200).json(universities);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

const createUniversity = async (req, res) => {
    try {
        const { name, location, adminId } = req.body;
        if (req.user.role !== 'UniversityAdmin') {
            return res.status(403).json({ message: 'Unauthorized action' });
        }
        const newUniversity = new University({ name, location, adminId });
        await newUniversity.save();
        res.status(201).json(newUniversity);
    } catch (error) {
        res.status(400).json({ message: 'Error creating university', error });
    }
};

module.exports = { createUniversity, getUniversities };
