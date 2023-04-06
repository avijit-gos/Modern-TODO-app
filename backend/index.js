/** @format */

require("dotenv").config();
const express = require("express");
const cors = require("cors");
var createError = require("http-errors");
const logger = require("morgan");
const fileUpload = require("express-fileupload");
const db = require("./database");
const authentication = require("./server/middleware/authentication");

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(logger("dev"));
app.use(
  fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
    useTempFiles: true,
  })
);

const port = process.env.PORT || 5001;

// Importing user authentication routes
app.use(
  "/api",
  require("./server/routes/authenticationRoutes/authenticationRoutes")
);
// Importing user routes
app.use(
  "/api/user",
  authentication,
  require("./server/routes/userRoutes/userroutes")
);
// Importing task routes
app.use(
  "/api/task",
  authentication,
  require("./server/routes/taskRoutes/taskRoutes")
);

// importing notes route
app.use(
  "/api/note",
  authentication,
  require("./server/routes/notesRoutes/notesRoutes")
);

// importing notes comment route
app.use(
  "/api/note/comment",
  authentication,
  require("./server/routes/notesRoutes/notesCommentRoutes")
);

// importing chat route
app.use(
  "/api/chat",
  authentication,
  require("./server/routes/chatRoute/chatRoute")
);

// importing message route
app.use(
  "/api/message",
  authentication,
  require("./server/routes/messageRoute/messageRoute")
);

// importing notification route
app.use(
  "/api/notification",
  authentication,
  require("./server/routes/notifuicationRoutes/notificationRoute")
);

// Public routes
app.use("/api/public", require("./server/publicRoutes/publicRoutes"));

// If route not found
app.use(async (req, res, next) => {
  next(createError.NotFound("Page not found"));
});

// Error message
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

const server = app.listen(port, () => {
  console.log(`App listening on port: ${port}`);
});

const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  console.log("*** Socket connected ***");

  socket.on("join_chat", (chatId) => {
    // ## Join chat room
    socket.join(chatId);
    // console.log("Chat room joined: ", chatId);
  });

  // send message
  socket.on("new message", (data) => {
    socket.broadcast.emit("message receive", data);
  });

  // like event
  // remove like event
  // dislike event
  // remove dislike event
  // comment event
  // comment like event
  // comment remove like event
  // comment dislike event
  // comment dislike remove event
});
