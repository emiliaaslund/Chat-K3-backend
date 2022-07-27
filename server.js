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

const rooms = {
  default: {
    name: "Default room",
    state: [],
  },
};

const username = {
  default: {
    name: "Default user",
    state: [],
  },
};

// socket connection / anslutning.
io.on("connection", async (socket) => {
  console.log(`Användare med id: ${socket.id} har anslutit`);

  //hämta alla rum i consolen
  const createdRooms = await roomsModel.getRooms();
  socket.emit("rooms", createdRooms);

  //skapa nytt rum
  socket.on("create_room", async (room) => {
    const checkRoom = createdRooms.filter((e) => {
      return e.name === room;
    });
    if (checkRoom.length) {
      return console.log("Rummet finns redan");
    } else {
      const newRoom = await roomsModel.addRoom(room);
      socket.emit("room_created", room);
      console.log(`Nytt rum är skapat vid namn: ${room}`);
    }
  });

  // gå med i rum
  socket.on("join_room", async ({ room, username }) => {
    socket.join(room);
    socket.emit("joined_room", room);

    //Room = Undefined

    // const rooms = await roomsModel.getRooms();
    // if (rooms.filter((e) => e.name === room).length > 0) {
    //   socket.join(room);
    // }
    // console.log(`Användare ${socket.id} har gått med i rum: ${room}`);
    // io.to(room).emit("joined_room", socket.id, room);
  });

  // lämna rum
  socket.on("leave_room", (data) => {
    console.log(`User: ${socket.id} har lämnat rum: ${data}`);
    socket.leave(data);
    // console.log(data);
  });

  // skapa nya user
  socket.on("create_user", async (data) => {
    const users = await usersModel.getUsers();
    const checkUser = users.filter((user) => {
      return user.username === newUsername;
    });

    if (checkUser.length !== 0) {
      console.log("User already exist");
      return;
    }
    usersModel.addUser(socket.id, newUsername);
    io.emit("get_users", users);

    socket.emit("user_created", {
      user_id: socket.id,
      username: newUsername,
    });
  });

  socket.on("send_message", async (data) => {
    // if (!data.message.lenght) {
    //   return console.log("empty message");
    // }
    console.log(data);

    const newMessage = {
      message: data.message, //blir tomma object
      id_room: data.room,
      id_user: data.user_id,
      username: data.username,
      date: moment().format("HH:mm"),
    };
    console.log(data, "hej från data, send message");
    messagesModel.addMessage(newMessage);

    const roomMessages = await messagesModel.getRoomMessages(data);
    io.to(data.room).emit("sent_message", roomMessages);
    console.log(data.room);
    console.log(roomMessages, "denna skickar med all data");
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
