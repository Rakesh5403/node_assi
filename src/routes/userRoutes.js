
const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const { validateData } = require('../middlewares/validationMiddleware.js');
const authenticate = require('../middlewares/authenticate.js');
const { userValidation, userLoginValidation, userUpdateValidation } = require('../constants/validationConstant.js');

router.post('/register',validateData(userValidation), userController.registerUser);  
router.post('/login',validateData(userLoginValidation), userController. loginUser);
router.put('/updateUserDetails',authenticate, validateData(userUpdateValidation), userController.updateUserDetails);
module.exports = router;

