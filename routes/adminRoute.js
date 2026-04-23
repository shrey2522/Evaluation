const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { isAdmin } = require('../middleware/authMiddleware');

router.get('/leaves', isAdmin, adminController.getAllLeaves);
router.get('/leaves/summary', isAdmin, adminController.getLeaveSummary);
router.patch('/leaves/:id/status', isAdmin, adminController.updateLeaveStatus);
router.get('/users', isAdmin, adminController.getAllUsers);
router.delete('/users/:id', isAdmin, adminController.deleteUser);

module.exports = router;
