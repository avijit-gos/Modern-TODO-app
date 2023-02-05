/** @format */

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

mongoose.connect(process.env.DB_URL);
mongoose.connection.on("error", () => console.log("DB is not connected"));
mongoose.connection.on("connected", () => console.log("DB is connected"));
