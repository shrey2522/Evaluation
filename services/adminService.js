const adminModel= require('../models/adminModel');

const getAllLeaves = async (user_id=null)=>{
    return await adminModel.getAllLeaves(user_id);
};
const getLeaveSummary= async()=>{
    return await adminModel.getLeaveSummary();
};

const updateLeaveStatus= async(id,status)=>{
     if(!['approved','rejected','Approved', 'Rejected'].includes(status)){
        throw new Error("the status must be approved or rejected");
     }
     const success = await adminModel.updateLeaveStatus(id,status);
     if(!success) throw new Error("leave not found");
     return success;
};

module.exports={
    getAllLeaves,
    getLeaveSummary,
    updateLeaveStatus
};