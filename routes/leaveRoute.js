const express = require('express');
const router = express.Router();
const leaveController = require('../controllers/leaveController');
const { isLoggedIn } = require('../middleware/authMiddleware');


router.get('/', isLoggedIn,leaveController.getAllLeaves);
router.get('/user/:userId', isLoggedIn, leaveController.getUserLeaves);
router.post('/', isLoggedIn, leaveController.applyLeave);
router.patch('/:id/status', isLoggedIn, leaveController.updateLeaveStatus);
router.delete('/:id', isLoggedIn, leaveController.cancelLeave);
module.exports = router;
