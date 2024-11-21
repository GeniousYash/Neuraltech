const mongoose = require('mongoose');

const collageSchema = new mongoose.Schema({
    name: { type: String, required: true },
    universityId: { type: mongoose.Schema.Types.ObjectId, ref: 'University', required: true },
    adminId: { type: mongoose.Schema.Types.ObjectId, ref: 'Staff' },
}, { timestamps: true });

module.exports = mongoose.model('Collage', collageSchema);