const db = require("../config/db");

function addMessage({ message, id_room, id_user, username, date }) {
  const sql = `INSERT INTO messages (message, id_room, id_user, username, date) VALUES ($1, $2, $3, $4, $5)`;
  return db.query(sql, [message, id_room, id_user, username, date], (error) => {
    if (error) {
      console.error(error.message);
      reject(error);
    }
    return;
  });
}

function getRoomMessages(id_room) {
  const sql = "SELECT * FROM messages WHERE id_room = $1";
  return db.query(sql, [id_room], (error) => {
    if (error) {
      console.error(error.message);
      reject(error);
    }
    return id_room;
  });
}

function deleteMessages(id_room) {
  const sql = "DELETE from messages WHERE id_room = $1";
  return db.query(sql, [id_room], (error, rows) => {
    if (error) {
      console.error(error.message);
      reject(error);
    }
    return rows;
  });
}

module.exports = {
  addMessage,
  getRoomMessages,
  deleteMessages,
};
