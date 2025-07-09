const express = require('express');
const router = express.Router();
const {body} = require("express-validator");
const userController = require('../controllers/user.controller');

router.post('/register', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({min: 3}).withMessage('First name should be greater than 2 letter'),
    body('password').isLength({min: 6}).withMessage('Password must be at least 6 character long'),
],
    userController.registerUser
)

module.exports = router;