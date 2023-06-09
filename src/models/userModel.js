const { pool, sql } = require('../config/db');

async function getUserByUsernameAndPassword1(username, password) {
  try {
    const result = await pool.request()
      .input('username', sql.VarChar(50), username)
      .input('password', sql.VarChar(50), password)
      .query('SELECT * FROM application_users WHERE username = @username AND password = @password');

    return result.recordset;
  } catch (err) {
    console.error('Error getting user by username and password:', err);
    throw err;
  }
}

async function getUserByUsernameAndPassword(username, password) {
  try {
    const spName = 'RETRIVEDATA';
    const result = await pool.request()
      .input('MAILID', sql.VarChar(50), username)
      .input('PASSWORD', sql.VarChar(50), password)
      .execute(spName);
    return result.recordset;
  } catch (err) {
    console.error('Error getting user by username and password:', err);
    throw err;
  }
}


async function getUsersInfo() {
  try {
    const spName = 'GETUSERSINFO';
    // Execute the stored procedure and return the user information
    const result = await pool.request()
      .execute(spName);
    return result.recordset;
  } catch (err) {
    console.error('Error getting user information:', err);
    throw err;
  }
}
// Create a function to get user information by ID
async function getUserById(userId) {
  try {
    const spName = 'user_testinginfo';

    // Execute the stored procedure and return the user information
    const result = await pool.request()
      .input('id', sql.Int, userId)
      .execute(spName);
    return result.recordset[0];
  } catch (err) {
    console.error('Error getting user information:', err);
    throw err;
  }
}

async function getEmployeesDataBasedOnLogin(loginUserID) {
  try {
    const spName = 'ORGANIZATION_DATA';
    // Execute the stored procedure and return the user information
    const result = await pool.request()
      .input('USERID', sql.Int, loginUserID)
      .execute(spName);
    return result.recordset;
  } catch (err) {
    console.error('Error getting employees information:', err);
    throw err;
  }
}

async function getRoles(roleId) {
  try {
    const spName = 'ROLEBASEDATA';

    // Execute the stored procedure and return the user information
    const result = await pool.request()
      .input('ROLE_ID', sql.Int, roleId)
      .execute(spName);
    return result.recordset;
  } catch (err) {
    console.error('Error getting roles information:', err);
    throw err;
  }
}




module.exports = {
  getUserByUsernameAndPassword, getUserByUsernameAndPassword1, getUserById,
  getUsersInfo, getEmployeesDataBasedOnLogin, getRoles
};
