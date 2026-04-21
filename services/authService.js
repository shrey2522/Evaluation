const authModel = require('../models/authModel');
const bcrypt =require('bcryptjs');

const loginUser= async(email,password)=>{
    const user= await authModel.findByEmail(email);
    if(!user){
        throw new Error("invalid email or pass");
    }
    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch){
        throw new Error("invalid email or pass");
    }
    return {
        id:user.id,
        name: user.name,
        email:user.email,
        role:user.role
    };
};

module.exports = {loginUser};