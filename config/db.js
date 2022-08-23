const { Client } = require("pg");

const db = new Client({
  ssl: {
    rejectUnauthorized: false,
  },
  connectionString: process.env.DATABASE_URL,
});

// ansluter till databasen
db.connect();

const room = `
CREATE TABLE IF NOT EXISTS rooms 
(
    id SERIAL PRIMARY KEY,
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
    id SERIAL PRIMARY KEY,
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

db.query(room, (error) => {
  if (error) {
    console.error(error.message);
    throw error;
  } else {
    console.log("Rooms table already created");
  }
});

db.query(user, (error) => {
  if (error) {
    console.error(error.message);
    throw error;
  } else {
    console.log("Users table already created");
  }
});

db.query(message, (error) => {
  if (error) {
    console.error(error.message);
    throw error;
  } else {
    console.log("Messages table already created");
  }
});

module.exports = db;
