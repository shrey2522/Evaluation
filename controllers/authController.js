const authService= require('../services/authService');
const { sendSuccess, sendError } = require('../utils/responseHandler');

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await authService.loginUser(email, password);
        req.session.user = user; 
        sendSuccess(res, 200, 'Login successful', user);
    } catch (error) {
        sendError(res, 401, error.message);
    }
};

const logout = async (req,res)=>{
    req.session.destroy((err)=>{
        if(err){
            return sendError(res,500,"logout failed");
        }
        sendSuccess(res,200,"logout successfull");
    });
};


module.exports={login , logout};