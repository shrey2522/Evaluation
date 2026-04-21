const express = require('express');
const router = express.Router();
const leaveController = require('../controllers/leaveController');
router.get('/', leaveController.getAllLeaves);
router.get('/user/:userId', leaveController.getUserLeaves);
router.post('/', leaveController.applyLeave);
router.patch('/:id/status', leaveController.updateLeaveStatus);
router.delete('/:id', leaveController.cancelLeave);
module.exports = router;
