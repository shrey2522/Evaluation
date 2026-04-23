const express = require('express');
const router = express.Router();

const userController= require('../controllers/userController');
const { isLoggedIn } = require('../middleware/authMiddleware');


router.get('/',isLoggedIn,userController.getUsers);
router.get('/:id',isLoggedIn,userController.getUserById);
router.post('/',userController.addUser);
router.put('/:id',isLoggedIn,userController.updateUser);
router.delete('/:id',isLoggedIn,userController.deleteUser);

module.exports=router;