const userModel = require('../models/userModel');

async function login(req, res) {
    const { username, password } = req.body;

    if (!username || !password) {
        res.status(400).json({ message: 'Please provide both username and password' });
        return;
    }

    try {
        const user = await userModel.getUserByUsernameAndPassword(username, password);
        console.log("user",user);
        if (user.length === 0) {
            res.status(401).json({ message: 'Invalid username or password' });
            return;
        }

        // Authentication successfull
        res.json({
            userId: user[0].USER_ID,
            roleId: user[0].ROLE_ID,
            roleName: user[0].ROLENAME,
            message: 'Authentication successful',
            status: 'success',
            statusCode: 200
        });
    } catch (err) {
        console.error('Error authenticating user:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
}


// Create a function to handle GET requests for user information
async function getUser(req, res) {
    try {
        const userId = req.params.userid;
        const user = await userModel.getUserById(userId);

        res.json(user);
    } catch (err) {
        console.error('Error getting user information:', err);
        res.status(500).send('Error getting user information');
    }
}


async function getAllUsers(req, res) {
    try {
        const userInfo = await userModel.getUsersInfo();
        res.json(userInfo);
    } catch (err) {
        console.error('Error getting user information:', err);
        res.status(500).send('Error getting user information');
    }
}

async function getEmployeesDataBasedOnLogin(req, res) {
    try {
        const loginUserID = req.params.loginUserID;
        const employees = await userModel.getEmployeesDataBasedOnLogin(loginUserID);

        res.json(employees);
    } catch (err) {
        console.error('Error getting employyes information:', err);
        res.status(500).send('Error getting employees information');
    }
}

async function getRolesBasedOnRoleId(req, res) {
    try {
        const roleId = req.params.roleid;
        const roles = await userModel.getRoles(roleId);

        res.json(roles);
    } catch (err) {
        console.error('Error getting roles information:', err);
        res.status(500).send('Error getting roles information');
    }
}
module.exports = { login, getUser, getAllUsers, getEmployeesDataBasedOnLogin ,getRolesBasedOnRoleId};
