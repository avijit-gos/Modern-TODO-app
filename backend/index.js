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

app.listen(port, () => {
  console.log(`App listening on port: ${port}`);
});
