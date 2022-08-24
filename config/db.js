const { Client } = require("pg");

const db = new Client({
  ssl: {
    rejectUnauthorized: false,
  },
  connectionString:
    // process.env.DATABASE_URL,
    "postgres://qlulqjdihsvtuo:89f465ca448221ff472a7a867140204ed9e510858deef65424e5f95e87807518@ec2-52-49-120-150.eu-west-1.compute.amazonaws.com:5432/dfmb0o13bt0vg6",
});

// ansluter till databasen
db.connect();

// Fåååår ett fel: node:internal/process/promises:279??

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
    id_user TEXT,
    username TEXT,
    date INTEGER,
    CONSTRAINT fk_id_room FOREIGN KEY(id_room) REFERENCES rooms(id) ON DELETE CASCADE,
    CONSTRAINT fk_id_user FOREIGN KEY(id_user) REFERENCES users(id) ON DELETE CASCADE
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
