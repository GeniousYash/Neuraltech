const jwt = require('jsonwebtoken');
const Staff = require('../Models/Staff');

const protect = async (req, res, next) => {
    let token;
    // Check for Bearer token in headers
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1]; // Extract token
            const decoded = jwt.verify(token, process.env.JWT_SECRET); // Decode token
            
            // Find user by ID from decoded token payload
            req.user = await Staff.findById(decoded.id).select('-password');

            // Check if user exists
            if (!req.user) {
                return res.status(401).json({ message: 'User not found' });
            }

            next(); // Proceed if authenticated
        } catch (error) {
            console.error('Token verification error:', error.message);
            return res.status(401).json({ message: 'Not authorized, token failed', error: error.message });
        }
    } else {
        return res.status(401).json({ message: 'Not authorized, no token' });
    }
};


const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Unauthorized action' });
        }
        next();
    };
};

module.exports = { protect, authorizeRoles };
