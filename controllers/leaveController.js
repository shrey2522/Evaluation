const leaveService= require('../services/leaveService');
const {sendSuccess,sendError}=require('../utils/responseHandler');

const getAllLeaves= async(req,res)=>{
    try{
        const leaves= await leaveService.getAllLeaves();
        sendSuccess(res,200,"leaves fetched successfully",leaves);
    }catch(err){
        sendError(res,500,err.message);
    }
};

const getUserLeaves= async(req,res)=>{
    try{
        const requestUserId=parseInt(req.params.userId);
        const LoggedInUserId=req.session.user.id;
        const loggedInRole=req.session.user.role;
        if(requestUserId !== LoggedInUserId && loggedInRole !== 'admin'){
            return sendError(res,403,"Unauthorized");
        }
        const leaves= await leaveService.getUserLeaves(requestUserId);
        sendSuccess(res,200,"leaves fetched successfully",leaves);
    }catch(err){
        sendError(res,500,err.message);
    }
};

const applyLeave= async(req,res)=>{
    try{
        const {start_date,end_date,reason}=req.body;
        const user_id = req.session.user.id;
        const result= await leaveService.applyLeave(user_id,start_date,end_date,reason);
        sendSuccess(res,201,"leaves fetched successfully",result);
    }catch(err){
        sendError(res,500,err.message);
    }
};

const updateLeaveStatus = async (req, res) => {
    try {
        await leaveService.approveRejectLeave(req.params.id, req.body.status);
        sendSuccess(res, 200, "Leave status updated");
    } catch (err) { sendError(res, 400, err.message); }
};

const cancelLeave = async (req, res) => {
    try {
        await leaveService.cancelLeave(req.params.id,req.session.user.id);
        sendSuccess(res, 200, "Leave cancelled");
    } catch (err) { sendError(res, 400, err.message); }
};

module.exports = { getAllLeaves, getUserLeaves, applyLeave, updateLeaveStatus, cancelLeave };