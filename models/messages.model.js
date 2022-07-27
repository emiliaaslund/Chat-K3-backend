const db = require("../config/db");

function addMessage({ message, id_room, id_user, username, date }) {
  const sql = `INSERT INTO messages (message, id_room, id_user, username, date) VALUES (?, ?, ?, ?, ?)`;
  return new Promise((resolve, reject) => {
    db.run(sql, [message, id_room, id_user, username, date], (error) => {
      if (error) {
        console.error(error.message);
        reject(error);
      }
      resolve();
    });
  });
}

function getRoomMessages(id_room) {
  const sql = "SELECT * FROM messages WHERE id_room = ?";
  return new Promise((resolve, reject) => {
    db.all(sql, [id_room], (error) => {
      if (error) {
        console.error(error.message);
        reject(error);
      }
      resolve(id_room);
    });
  });
}

function deleteMessages(id_room) {
  const sql = "DELETE from messages WHERE id_room = ?";
  return new Promise((resolve, reject) => {
    db.run(sql, [id_room], (error, rows) => {
      if (error) {
        console.error(error.message);
        reject(error);
      }
      resolve(rows);
    });
  });
}

module.exports = {
  addMessage,
  getRoomMessages,
  deleteMessages,
};
