const authService= require('../services/authService');
const { sendSuccess, sendError } = require('../utils/responseHandler');

const login = async(req,res)=>{
    try{
        const{email,password}= req.body;
        const user= await authService.loginUser(email,password);
        sendSuccess(res,200,"login success",user);
    }catch(err){
        sendError(res,401,err.message);
    }
};

module.exports={login};