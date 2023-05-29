const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

router.get('/roles/:roleid', userController.getRolesBasedOnRoleId);
router.get('/getAllUsers', userController.getAllUsers);
router.post('/login', userController.login);
router.get('/:userid', userController.getUser);
router.get('/organization/:loginUserID', userController.getEmployeesDataBasedOnLogin);



module.exports = router;
