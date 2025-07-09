const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    fullname:{
        type:String,
        required:true,
        minlength:[ 3 ,'First name should be greater than 2 letter']
    },
    lastname:{
        type: String,
        minlength:[3, 'Last name should be greater than 2 letter']
    },
    email:{
        type:String,
        required: true,
        unique:true,
        minlength:[5, 'Email must be 5 characters long']
    },
    password:{
        type:String,
        required:true,
        select: false, 
    },
    socketID:{
        type:String,
    },
})

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET)
    return token;
}

userSchema.methods.comparePassword = async function() {
    return await bcrypt.compare(password, this.password);
}

userSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
}

const userModel = mongoose.model('user' , userSchema);

module.export = userModel;