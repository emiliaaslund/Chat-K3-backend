const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./db.sqlite", (error) => {
  if (error) {
    console.error(error.message);
    throw error;
  }
});

const room = `
CREATE TABLE IF NOT EXISTS rooms 
(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE
  
)`;

const user = `
CREATE TABLE IF NOT EXISTS users
(
   id TEXT PRIMARY KEY,
    username TEXT
)
`;

const message = `
CREATE TABLE IF NOT EXISTS messages
(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    message TEXT NOT NULL,
    id_room INTEGER,
    id_user INTEGER,
    username TEXT,
    date TEXT,
    CONSTRAINT fk_id_room
     FOREIGN KEY(id_room) 
     REFERENCES rooms(id)
     ON DELETE CASCADE,
    CONSTRAINT fk_id_user
     FOREIGN KEY(id_user)
     REFERENCES users(id)
     ON DELETE CASCADE
)
`;

db.run(room, (error) => {
  if (error) {
    console.error(error.message);
    throw error;
  } else {
    console.log("Rooms table already created");
  }
});

db.run(user, (error) => {
  if (error) {
    console.error(error.message);
    throw error;
  } else {
    console.log("Users table already created");
  }
});

db.run(message, (error) => {
  if (error) {
    console.error(error.message);
    throw error;
  } else {
    console.log("Messages table already created");
  }
});

module.exports = db;
