const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const captainModel = require('../models/captain.model');
const blacklistTokenModel = require('../models/blacklistToken.model');

module.exports.authUser = async (req, res, next) => {
    try {
        console.log('🔐 Auth middleware called');
        console.log('👉 Headers:', req.headers);
        
        const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
        
        if (!token) {
            console.log('❌ No token provided');
            return res.status(401).json({ error: 'User not authenticated' });
        }
        
        console.log('👉 Token received:', token.substring(0, 20) + '...');
        
        // Check if token is blacklisted
        const isBlacklisted = await blacklistTokenModel.findOne({ token: token });
        if (isBlacklisted) {
            console.log('❌ Token is blacklisted');
            return res.status(401).json({ error: 'User not authenticated' });
        }
        
        // Verify JWT token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('👉 Decoded token:', decoded);
        
        // Find user by ID from token - use _id not id
        const user = await userModel.findById(decoded._id);
        if (!user) {
            console.log('❌ User not found with ID:', decoded._id);
            return res.status(401).json({ error: 'User not authenticated' });
        }
        
        console.log('✅ User authenticated:', user._id);
        req.user = user;
        return next();
        
    } catch (err) {
        console.error('❌ Auth middleware error:', err.message);
        if (err.name === 'JsonWebTokenError') {
            return res.status(401).json({ error: 'User not authenticated' });
        }
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ error: 'Token expired' });
        }
        return res.status(401).json({ error: 'User not authenticated' });
    }
}

module.exports.authCaptain = async (req, res, next) => {
    try {
        console.log('🔐 Captain auth middleware called');
        
        const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
        
        if (!token) {
            console.log('❌ No token provided for captain');
            return res.status(401).json({ error: 'Unauthorized' });
        }
        
        const isBlacklisted = await blacklistTokenModel.findOne({ token: token });
        if (isBlacklisted) {
            console.log('❌ Captain token is blacklisted');
            return res.status(401).json({ error: 'Unauthorized' });
        }
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('👉 Captain decoded token:', decoded);
        
        const captain = await captainModel.findById(decoded._id);
        if (!captain) {
            console.log('❌ Captain not found with ID:', decoded._id);
            return res.status(401).json({ error: 'Unauthorized' });
        }
        
        console.log('✅ Captain authenticated:', captain._id);
        req.captain = captain;
        return next();
        
    } catch (err) {
        console.error('❌ Captain auth middleware error:', err.message);
        return res.status(401).json({ error: 'Unauthorized' });
    }
}