/** @format */

const { server } = require("../index");
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  console.log(`## Socket connected ##`);

  socket.on("join_chat", (data) => {
    console.log("Join chat");
    socket.join(data);
    console.log(`User joined room.`);
  });
});
