const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const staffSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
        type: String,
        enum: ['University Admin', 'Collage Admin', 'Department Head'],
        required: true,
    },
    universityId: { type: mongoose.Schema.Types.ObjectId, ref: 'University' },
    collegeId: { type: mongoose.Schema.Types.ObjectId, ref: 'College' },
    departmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
}, { timestamps: true });

// Hash password before saving
staffSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Compare passwords
staffSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('Staff', staffSchema);