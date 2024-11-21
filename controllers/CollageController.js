const Collage = require('../Models/Collage');

const createCollage = async (req, res) => {
    try {
        const { name, universityId  } = req.body;
        if (req.user.role !== 'CollageAdmin') {
            return res.status(403).json({ message: 'Unauthorized action' });
        }

        const newCollage = new Collage({ name, universityId });
        await newCollage.save();
        res.status(201).json(newCollage);
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: 'Error creating collage', error });
    }
};

const getCollages = async (req, res) => {
    try {
        const collages = await Collage.find({ university: req.user.associatedId }).populate('university', 'name');
        res.status(200).json(collages);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

module.exports = { createCollage, getCollages };