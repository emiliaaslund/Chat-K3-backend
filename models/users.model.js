const db = require("../config/db");

function addUser(id, username) {
  const sql = "INSERT INTO users (id, username) VALUES (?, ?)";
  return new Promise((resolve, reject) => {
    db.run(sql, [id, username], (error) => {
      if (error) {
        console.error(error.message);
        reject(error);
      }
      resolve();
    });
  });
}

function getUsers() {
  const sql = "SELECT * FROM users";
  return new Promise((resolve, reject) => {
    db.all(sql, (error, rows) => {
      if (error) {
        console.error(error.message);
        reject(error);
      }
      resolve(rows);
    });
  });
}

function getOneUser(id, username) {
  console.log(id);
  console.log(username);
  const sql = "SELECT * FROM users WHERE id = ? AND username = ?";
  return new Promise((resolve, reject) => {
    db.get(sql, [id, username], (error, rows) => {
      if (error) {
        console.error(error.message);
        reject(error);
      }
      resolve(rows);
    });
  });
}

module.exports = {
  addUser,
  getUsers,
  getOneUser,
};
