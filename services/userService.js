const userModel= require('../models/userModel');
const bcrypt = require('bcryptjs');

const getAllUsers = async (search) => {
    return await userModel.getAllUsers(search);
};

const getUserById = async(id) => {
    return await userModel.getUserById(id);
};

const createUser= async(userData) =>{
    const{ name, email, password}= userData;

    const salt=await
    bcrypt.genSalt(10);
    const hashedPassword= await bcrypt.hash(password, salt);
    const insertId= await userModel.createUser(name, email, hashedPassword);
    return {id:insertId};
};

const updateUser = async(id,userData)=>{
    const {name,email,password}= userData;
    let hashedPassword = password;
    if(password){
        const salt= await bcrypt.genSalt(10);
        hashedPassword= await bcrypt.hash(password,salt);
    }
    return await userModel.updateUser(id,name,email,hashedPassword);
};

const deleteUser= async (id)=>{
    return await userModel.deleteUser(id);
};
module.exports={
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};