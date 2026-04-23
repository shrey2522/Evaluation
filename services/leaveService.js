const leaveModel= require('../models/leaveModel');
const getAllLeaves= async()=> await leaveModel.getAllLeaves();

const getUserLeaves= async(user_id)=>await leaveModel.getLeavesByUser(user_id);

const applyLeave = async (user_id, start_date, end_date, reason) => {
    if (new Date(start_date) <= new Date()) {
        throw new Error("Leave must be for a future date");
    }
    if (new Date(end_date) < new Date(start_date)) {
        throw new Error("End date cannot be before start date");
    }
    const id = await leaveModel.createLeave(user_id, start_date, end_date, reason);
    return { id };
};

const approveRejectLeave = async (id, status) => {
    if (!['approved', 'rejected'].includes(status)) throw new Error("Invalid status");
    return await leaveModel.updateLeaveStatus(id, status);
};

const cancelLeave= async(id)=>{
    const leave = await leaveModel.getLeaveById(id);
    if(!leave)throw new Error("leave not found");
    if (leave.user_id != userId) throw new Error("Unauthorized");
    if(new Date(leave.start_date)<=new Date()) throw new Error("cannot cancle past leaves");
    await leaveModel.deleteLeave(id);
};

module.exports={
    getAllLeaves,
    getUserLeaves,
    applyLeave,
    approveRejectLeave,
    cancelLeave
};