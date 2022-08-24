const db = require("../config/db");

async function addUser(id, username) {
  const sql = "INSERT INTO users (id, username) VALUES ($1, $2)";
  const result = await db.query(sql, [id, username]);
  return result.rows;
}

async function getUsers() {
  const sql = "SELECT * FROM users";
  const result = await db.query(sql);
  return result.rows;
}

async function getOneUser(id, username) {
  const sql = "SELECT * FROM users WHERE id = $ AND username = $1";
  const result = await db.query(sql, [id, username]);
  return rows;
}

module.exports = {
  addUser,
  getUsers,
  getOneUser,
};
