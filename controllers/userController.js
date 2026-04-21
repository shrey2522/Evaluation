const userService=require('../services/userService');
const {sendSuccess,sendError }=require('../utils/responseHandler');

const getUsers= async(req,res)=>{
    try{
        const search=req.query.search || '';
        const users = await userService.getAllUsers(search);
        sendSuccess(res,200,"user fetched successfully",users)
    }catch(err){
        console.error("DB Error:", err);
        sendError(res,500,err.message);
    };
};

const getUserById= async(req,res)=>{
    try{
        const user= await userService.getUserById(req.params.id);
        if(!user) return sendError(res,404,"user not found",user);
        sendSuccess(res,200,"user fetched successfully",user);
    }catch(err){
        sendError(res,500,err.message);
    };
};

const addUser = async(req,res)=>{
    try{
        const result = await userService.createUser(req.body);
        sendSuccess(res,201,"user created successfully",result);
    }catch(err){
        sendError(res,400,err.message);
    };
};

const updateUser= async (req,res) => {
    try{
        const success= await userService.updateUser(req.params.id,req.body);
        if(!success) return sendError(res,404,"user not found");
        sendSuccess(res,200,"user updated successfully");
    }catch(err){
        sendError(res,500,err.message);
    }
};

const deleteUser = async(req,res)=>{
    try{
        await userService.deleteUser(req.params.id);
        sendSuccess(res,200,"User deleted successfully"); 
    }catch(err){
        sendError(res,500,err.message);
    }
};

module.exports={
    getUsers,
    getUserById,
    addUser,
    updateUser,
    deleteUser
}
