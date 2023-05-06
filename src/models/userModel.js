const {pool ,sql} = require('../config/db');

async function getUserByUsernameAndPassword(username, password) {
  try {
    const result = await pool.request()
      .input('username', sql.VarChar(50), username)
      .input('password', sql.VarChar(50), password)
      .query('SELECT * FROM users WHERE username = @username AND password = @password');

    return result.recordset;
  } catch (err) {
    console.error('Error getting user by username and password:', err);
    throw err;
  }
}

module.exports = { getUserByUsernameAndPassword };
