const express = require("express");
const app = express();
const port = 4000;
const http = require("http");
const { Server } = require("socket.io");
const server = http.createServer(app);
const moment = require("moment");

//Models
const usersModel = require("./models/users.model");
const roomsModel = require("./models/rooms.model");
const messagesModel = require("./models/messages.model");

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

//skapa en middleware
//hejsan

// const rooms = {
//   default: {
//     name: "Default room",
//     state: [],
//   },
// };

// const username = {
//   default: {
//     name: "Default user",
//     state: [],
//   },
// };

// socket connection / anslutning.
io.on("connection", async (socket) => {
  //   console.log(`Användare med id: ${socket.id} har anslutit`);

  //hämta alla rum i consolen
  const createdRooms = await roomsModel.getRooms();
  socket.emit("rooms", createdRooms);

  //skapa nytt rum
  socket.on("create_room", async (room) => {
    const checkRoom = createdRooms.filter((e) => {
      return e.name === room;
    });
    if (checkRoom.length) {
      return console.log("Room already exist, choose another name");
    } else {
      const newRoom = await roomsModel.addRoom(room);
      socket.emit("room_created", room);
    }
  });

  // gå med i rum
  socket.on("join_room", async (room) => {
    socket.join(room);
    socket.emit("joined_room", room);
    const messages = await messagesModel.getRoomMessages(room);
    socket.emit("admin_msg", [messages, room]);
  });

  // lämna rum
  socket.on("leave_room", (room) => {
    socket.leave(room);
  });

  // skapa nya user
  socket.on("create_user", async (username) => {
    const users = await usersModel.getUsers();
    const checkUser = await users.filter((user) => {
      return user.username === username;
    });

    if (checkUser.length !== 0) {
      console.log("User already exist");
      return;
    }

    usersModel.addUser(socket.id, username);
    io.emit("get_users", users);

    socket.emit("user_created", {
      user_id: socket.id,
      username: username,
    });
  });

  socket.on("message", async (data) => {
    // if (!data.message.lenght) {
    //   return console.log("empty message");
    // }

    const newMessage = {
      message: data.message,
      id_room: data.room,
      id_user: socket.id,
      username: data.username,
      date: moment().format("HH:mm"),
    };
    messagesModel.addMessage(newMessage);
    // const roomMessages = await messagesModel.getRoomMessages(data);

    socket.to(data.room).emit("sent_message", newMessage);
    console.log(newMessage, "denna skickar med all data");
  });

  socket.on("delete_room", async (room) => {
    await messagesModel.deleteMessages(room);
    await roomsModel.deleteRoom(room);
    const createdRooms = await roomsModel.getRooms();
    io.emit("deleted_room", createdRooms);
  });

  // socket.io | disconnect / avbryter.
  socket.on("disconnect", (reason) => {
    console.log(
      console.log(`Socket ${socket.id} disconnected. Reason: ${reason}`)
    );
  });
});

io.listen(4000);
console.log("Servern körs på port 4000, tryck CTRL + C för att avsluta.");
