
require("dotenv").config();  //need to use this command to load environment variable
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
const url = process.env.MongoDB_URL;
  
mongoose.connect(url, {
  bufferCommands: false, // Disable buffering
  useNewUrlParser: true,
  useUnifiedTopology: true
  // Other options...
});
const db = mongoose.connection;
db.on("connected", () => {
  console.log("MongoDB Connection Successful !!");
});

db.on("error", (error) => {
  console.error("MongoDB connection error: ", error);
});

db.on("disconnected", () => {
  console.log("Disconnected from MongoDB");
});

module.exports = db;
