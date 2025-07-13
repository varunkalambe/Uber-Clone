const userModel = require('../models/user.model');
const userService = require('../services/user.service');
const { validationResult } = require('express-validator');
const blacklistTokenModel = require('../models/blacklistToken.model');

module.exports.registerUser = async (req, res, next) => {
    try {
        console.log("🔥 /users/register called");
        console.log("👉 Request body:", req.body);

        const errors = validationResult(req);
        if(!errors.isEmpty()){
            console.log("Validation errors:", errors.array());
            return res.status(400).json({error: errors.array()});
        }

        const {fullname, email, password} = req.body;

        const isUserAlreadyExists = await userModel.findOne({email});
        if(isUserAlreadyExists){
            return res.status(400).json({message: "User already exists with this email"});
        }

        const hashedPassword = await userModel.hashPassword(password);

        const user = await userService.createUser({
            firstname: fullname.firstname,
            lastname: fullname.lastname,
            email,
            password: hashedPassword
        });
        console.log('✅ registerUser → saved user:', user);

        const token = user.generateAuthToken();
        console.log('✅ Token generated for registration:', token.substring(0, 20) + '...');

        res.status(201).json({token, user});
    } catch (error) {
        console.error('❌ Register error:', error);
        res.status(500).json({error: 'Registration failed'});
    }
}

module.exports.loginUser = async (req, res, next) => {
    try {
        console.log("👉 /users/login called with:", req.body);

        const errors = validationResult(req);
        if(!errors.isEmpty()){
            console.log("❌ Validation errors:", errors.array());
            return res.status(400).json({error: errors.array()})
        }

        const {email, password} = req.body;

        const user = await userModel.findOne({email}).select('+password');
        console.log('👉 User found:', user ? user._id : 'Not found');

        if(!user){
            console.log('❌ User not found for email:', email);
            return res.status(400).json({error: 'Invalid email or password'});
        }

        const isPasswordValid = await user.comparePassword(password, user.password);
        console.log('👉 Password valid:', isPasswordValid);

        if(!isPasswordValid){
            console.log('❌ Invalid password for user:', user._id);
            return res.status(400).json({error: 'Invalid email or password'});
        }
        
        const token = user.generateAuthToken();
        console.log('✅ Login successful, token generated for user:', user._id);
        console.log('👉 Token:', token.substring(0, 20) + '...');

        res.cookie('token', token);

        // Remove password from response
        const userResponse = user.toObject();
        delete userResponse.password;

        res.status(200).json({token, user: userResponse});
    } catch (error) {
        console.error('❌ Login error:', error);
        res.status(500).json({error: 'Login failed'});
    }
};

module.exports.getUserProfile = async (req, res, next) => {
    try {
        console.log('👉 getUserProfile called');
        console.log('👉 req.user:', req.user ? req.user._id : 'null');
        
        // Check if user exists and has required fields
        if (!req.user) {
            console.error('❌ No user found in request');
            return res.status(401).json({error: 'User not authenticated'});
        }
        
        if (!req.user._id && !req.user.id) {
            console.error('❌ User missing ID field:', req.user);
            return res.status(500).json({error: 'User data incomplete'});
        }
        
        console.log('✅ Returning user profile:', req.user._id);
        res.status(200).json(req.user);
    } catch (error) {
        console.error('❌ getUserProfile error:', error);
        res.status(500).json({error: 'Internal server error'});
    }
}

module.exports.logoutUser = async (req, res, next) => {
    try {
        console.log('👉 Logout called');
        res.clearCookie('token');
        const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

        if (token) {
            await blacklistTokenModel.create({ token });
            console.log('✅ Token blacklisted');
        }

        res.status(200).json({message: 'Logged out successfully'});
    } catch (error) {
        console.error('❌ Logout error:', error);
        res.status(500).json({error: 'Logout failed'});
    }
}