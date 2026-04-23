const adminService = require('../services/adminService');
const userService = require('../services/userService');
const { sendSuccess, sendError } = require('../utils/responseHandler');

const getAllLeaves = async (req, res) => {
    try {
        const { user_id } = req.query;
        const leaves = await adminService.getAllLeaves(user_id || null);
        sendSuccess(res, 200, "Leaves fetched successfully", leaves);
    } catch (err) {
        sendError(res, 500, err.message);
    }
};

const getLeaveSummary = async (req, res) => {
    try {
        const summary = await adminService.getLeaveSummary();
        sendSuccess(res, 200, "Leave summary fetched", summary);
    } catch (err) {
        sendError(res, 500, err.message);
    }
};

const updateLeaveStatus = async (req, res) => {
    try {
        const result = await adminService.updateLeaveStatus(req.params.id, req.body.status);
        if (!result) return sendError(res, 404, "Leave not found");
        sendSuccess(res, 200, `Leave ${req.body.status} successfully`);
    } catch (err) {
        sendError(res, 400, err.message);
    }
};

const getAllUsers = async (req, res) => {
    try {
        const search = req.query.search || '';
        const users = await userService.getAllUsers(search);
        sendSuccess(res, 200, "Users fetched successfully", users);
    } catch (err) {
        sendError(res, 500, err.message);
    }
};

const deleteUser = async (req, res) => {
    try {
        await userService.deleteUser(req.params.id);
        sendSuccess(res, 200, "User deleted successfully");
    } catch (err) {
        sendError(res, 500, err.message);
    }
};
module.exports = { getAllLeaves, getLeaveSummary, updateLeaveStatus, getAllUsers, deleteUser };