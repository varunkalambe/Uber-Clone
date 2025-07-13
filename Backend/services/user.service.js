const userModel = require('../models/user.model');

module.exports.createUser = async ({
    firstname, lastname, email, password
}) => {
    if(!firstname || !email || !password){
        throw new Error('All fields are required');
    }
    const user = await userModel.create({
        fullname:{
            firstname,
            lastname
        },
        email,
        password
    })

    console.log('🗄️  user.service.createUser → created:', user); // ✅ Debug log
    return user;
}