const db = require("../config/db");

async function addMessage({ message, id_room, id_user, username, date }) {
  const sql = `INSERT INTO messages (message, id_room, id_user, username, date) VALUES ($1, $2, $3, $4, $5)`;
  const result = await db.query(sql, [
    message,
    id_room,
    id_user,
    username,
    date,
  ]);
  return result.rows;
}

async function getRoomMessages(id_room) {
  const sql = "SELECT * FROM messages WHERE id_room = $1";
  const result = await db.query(sql, [id_room]);
  return result.rows;
}

async function deleteMessages(id_room) {
  const sql = "DELETE from messages WHERE id_room = $1";
  const result = await db.query(sql, [id_room]);
  return result.rows;
}

module.exports = {
  addMessage,
  getRoomMessages,
  deleteMessages,
};
