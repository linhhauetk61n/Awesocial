const express = require("express");
const socketio = require("socket.io");
const http = require("http");
require("dotenv").config();

const app = express();
const server = http.createServer(app);
const io = socketio(server, {
    cors: {
        origin: process.env.CLIENT_URL,
    },
});

app.get("/", (req, res) => res.send("App running"));

let users = [];
const addUser = (userId, socketId) => {
    !users.some((user) => user.userId === userId) &&
        users.push({ userId, socketId });
};
const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
};
const getUsers = (userId) => {
    return users.find((user) => user.userId === userId);
};
io.on("connection", (socket) => {
    //When connect
    // io.emit("Welcome", "Hello from the socket server");
    //Take userId and socketId from user in client
    socket.on("addUser", (userId) => {
        addUser(userId, socket.id);
        console.log(userId, " has connected!");
        console.log(users.length, " users is online:", users);
        io.emit("getUsers", users);
    });

    //When send and getMessage
    socket.on("sendMessage", ({ senderId, receiverId, text }) => {
        const user = getUsers(receiverId);
        io.to(user?.socketId).emit("getMessage", {
            senderId,
            text,
        });
        console.log(text, senderId, receiverId, user);
    });

    //When disconnect
    socket.on("disconnect", () => {
        console.log("A user has disconnected!");
        removeUser(socket.id);
        io.emit("getUsers", users);
        console.log(users.length, " users is online:", users);
    });
});

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => console.log("Socket-server listen on port: ", PORT));
