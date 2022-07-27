const db = require("../config/db");

function addRoom(room) {
  const sql = "INSERT INTO rooms (name) VALUES (?)";
  return new Promise((resolve, reject) => {
    db.run(sql, room, (error) => {
      if (error) {
        console.error(error.message);
        reject(error);
      }
      resolve(room);
    });
  });
}

function getRooms() {
  const sql = `SELECT * FROM rooms`;
  return new Promise((resolve, reject) => {
    db.all(sql, (error, rooms) => {
      if (error) {
        console.error(error.message);
        reject(error);
      }
      resolve(rooms);
    });
  });
}

function getOneRoom(room) {
  const sql = "SELECT * FROM rooms WHERE name = ?";

  return new Promise((resolve, reject) => {
    db.get(sql, room, (error) => {
      if (error) {
        console.error(error.message);
        reject(error);
      }
      resolve(room);
    });
  });
}

function deleteRoom(room) {
  const sql = `DELETE FROM rooms WHERE name = ?`;
  return new Promise((resolve, reject) => {
    db.run(sql, room, (error) => {
      if (error) {
        console.error(error.message);
        reject(error);
      }
      resolve(room);
    });
  });
}

module.exports = {
  getRooms,
  getOneRoom,
  addRoom,
  deleteRoom,
};
