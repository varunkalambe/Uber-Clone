const captainController = require('../controllers/captain.controller');
const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/register',[
    body('email').isEmail().withMessage("Invalid Email"),
    body('fullname.firstname').isLength({ min:3 }).withMessage('Password must be at least 3 characters'),
    body('password').isLength({ min:6 }).withMessage('Password must be at least 6 characters'),
    body('vehicle.color').isLength({ min: 3}).withMessage('Color must be at least of 3 characters'),
    body('vehicle.plate').isLength({ min: 3}).withMessage('Color must be at least of 3 characters'),
    body('vehicle.capacity').isLength({ min: 1}).withMessage('Color must be at least of 1 characters'),
    body('vehicle.vehicleType').isIn(['car', 'motorcycle', 'auto']).withMessage('Vehicle type must be car, motorcycle or auto'),
],
captainController.registerCaptain
)

router.post('/login', [
    body('email').isEmail().withMessage("Invalid Email"),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
], captainController.loginCaptain);

router.get('/profile', authMiddleware.authCaptain, captainController.getCaptainProfile);

router.get('/logout', authMiddleware.authCaptain, captainController.logoutCaptain);


module.exports = router;