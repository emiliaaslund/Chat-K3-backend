const db = require("../config/db");

async function addRoom(room) {
  const sql = "INSERT INTO rooms (name) VALUES ($1)";
  const result = await db.query(sql, [room]);
  return result.rows;
}

async function getRooms() {
  const sql = `SELECT * FROM rooms`;
  const result = await db.query(sql);
  console.log(result.rows);
  return result.rows;
}

function getOneRoom(room) {
  const sql = "SELECT * FROM rooms WHERE name = $1";
  const result = db.query(sql, [room]);
  return result.rows;
}

function deleteRoom(room) {
  const sql = `DELETE FROM rooms WHERE name = $1`;
  const result = db.query(sql, [room]);
  return result.rows;
}

module.exports = {
  getRooms,
  getOneRoom,
  addRoom,
  deleteRoom,
};
