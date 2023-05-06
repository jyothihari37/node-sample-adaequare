const userModel = require('../models/userModel');

async function login(req, res) {
    const { username, password } = req.body;

    if (!username || !password) {
        res.status(400).json({ message: 'Please provide both username and password' });
        return;
    }

    try {
        const user = await userModel.getUserByUsernameAndPassword(username, password);

        if (user.length === 0) {
            res.status(401).json({ message: 'Invalid username or password' });
            return;
        }

        // Authentication successful
        res.json({
            message: 'Authentication successful',
            status: 'success',
            statusCode:200
        });
    } catch (err) {
        console.error('Error authenticating user:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = { login };
