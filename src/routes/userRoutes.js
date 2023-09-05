const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const forgotPasswordController = require('../controllers/forgotPasswordController')

router.get('/getWebsitesLinks/:searchQuery', userController.getWebsitesList);
router.get('/roles/:roleid', userController.getRolesBasedOnRoleId);
router.get('/getAllUsers', userController.getAllUsers);
router.post('/login', userController.login);
router.get('/:userid', userController.getUser);
router.get('/organization/:loginUserID', userController.getEmployeesDataBasedOnLogin);
router.post('/signUp', userController.signup);
router.post('/forgot-password', forgotPasswordController.forgotPassword);
router.get('/company/companyList', userController.getCompnayList);
router.get('/projectBasedOnCompanyId/:projectId', userController.getProjectListBasedOnCompanyId);
//router.get('/getWebsitesLinks/:searchQuery', userController.getWebsitesList);
router.get('/chart/getChartsData', userController.getChartsData);

module.exports = router;
