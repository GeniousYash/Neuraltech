const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    departmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true },
    enrollmentYear: { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Student', studentSchema);