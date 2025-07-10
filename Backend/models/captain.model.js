const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const captainSchema = new mongoose.Schema({
    fullname: {
    firstname: {
        type: String,
        required: true,
        minlength: [3, 'First name should be greater than 2 letters'],
    },
    lastname: {
        type: String,
        minlength: [3, 'Last name should be greater than 2 letters'],
    },
},
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Please fill a valid email address'],
        
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    socketID: {
        type: String
    },

    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive'
    },

    vehicle: {
        color:{
            type: String,
            required: true,
            minlength: [3, 'Color should be greater than 2 letters'],
        },
        plate: {
            type: String,
            required: true,
            minlength: [3, 'Plate should be greater than 2 letters'],
        },
        capacity: {
            type: Number,
            required: true,
            min: [1, 'Capacity must be at least 1'],
        },
        vehicleType: {
            type: String,
            required: true,
            enum: ['car', 'motorcycle', 'auto'],
        },
    },

    location: {
        lat: {
            type: Number,
        },
        lng: {
            type: Number,
        }
    },

})

captainSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    return token;
}

captainSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
}

captainSchema.statics.hashPassword = async function(password) {
    return await bcrypt.hash(password, 10);
}


const captainModel = mongoose.model("captain", captainSchema);

module.exports = captainModel;