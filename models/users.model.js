const db = require("../config/db");

function addUser(id, username) {
  const sql = "INSERT INTO users (id, username) VALUES ($1, $2)";
  return db.query(sql, [id, username], function (error) {
    if (error) {
      console.error(error.message);
      reject(error);
    }
    return;
  });
}

function getUsers() {
  const sql = "SELECT * FROM users";
  return db.query(sql, function (error, rows) {
    if (error) {
      console.error(error.message);
      reject(error);
    }
    return rows;
  });
}

function getOneUser(id, username) {
  const sql = "SELECT * FROM users WHERE id = $ AND username = $1";
  return db.query(sql, [id, username], function (error, rows) {
    if (error) {
      console.error(error.message);
      reject(error);
    }
    return rows;
  });
}

module.exports = {
  addUser,
  getUsers,
  getOneUser,
};
