const db = require("../config/db");

function addRoom(room) {
  const sql = "INSERT INTO rooms (name) VALUES ($1)";
  return db.query(sql, room, function (error) {
    if (error) {
      console.error(error.message);
      reject(error);
    }
    return room;
  });
}

// async function addRoom(room) {
//   const sql = "INSERT INTO rooms (name) VALUES ($1)";
//   const result = await db.query(sql, [room]);
//   return result.rows;
// }

function getRooms() {
  const sql = `SELECT * FROM rooms`;
  return db.query(sql, function (error, rooms) {
    if (error) {
      console.error(error.message);
      reject(error);
    }
    return rooms;
  });
}

// async function getRooms() {
//   const sql = `SELECT * FROM rooms`;
//   const result = await db.query(sql);
//   console.log(result.rows);
//   return result.rows;
// }

function getOneRoom(room) {
  const sql = "SELECT * FROM rooms WHERE name = $1";
  return db.query(sql, room, function (error) {
    if (error) {
      console.error(error.message);
      reject(error);
    }
    return room;
  });
}

// function getOneRoom(room) {
//   const sql = "SELECT * FROM rooms WHERE name = $1";
//   const result = db.query(sql, [room]);
//   return result.rows;
// }

function deleteRoom(room) {
  const sql = `DELETE FROM rooms WHERE name = $1`;
  return db.query(sql, room, function (error) {
    if (error) {
      console.error(error.message);
      reject(error);
    }
    return room;
  });
}

// function deleteRoom(room) {
//   const sql = `DELETE FROM rooms WHERE name = $1`;
//   const result = db.query(sql, [room]);
//   return result.rows;
// }

module.exports = {
  getRooms,
  getOneRoom,
  addRoom,
  deleteRoom,
};
