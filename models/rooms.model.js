const db = require("../config/db");

function addRoom(room) {
  const sql = "INSERT INTO rooms (name) VALUES ($1)";
  return db.query(sql, room, (error) => {
    if (error) {
      console.error(error.message);
      reject(error);
    }
    return room;
  });
}

function getRooms() {
  const sql = `SELECT * FROM rooms`;
  return db.query(sql, (error, rooms) => {
    if (error) {
      console.error(error.message);
      reject(error);
    }
    return rooms;
  });
}

function getOneRoom(room) {
  const sql = "SELECT * FROM rooms WHERE name = $1";
  return db.query(sql, room, (error) => {
    if (error) {
      console.error(error.message);
      reject(error);
    }
    return room;
  });
}

function deleteRoom(room) {
  const sql = `DELETE FROM rooms WHERE name = $1`;
  return db.query(sql, room, (error) => {
    if (error) {
      console.error(error.message);
      reject(error);
    }
    return room;
  });
}

module.exports = {
  getRooms,
  getOneRoom,
  addRoom,
  deleteRoom,
};
