// mongodb+srv://admin:<password>@mernblogsapps.3zjgkbh.mongodb.net/?retryWrites=true&w=majority&appName=MERNBlogsAppS

// mongodb+srv://admin:<password>@mernblogsapps.3zjgkbh.mongodb.net/

const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
const url =
  'mongodb+srv://admin:admin@mernblogsapps.3zjgkbh.mongodb.net/?retryWrites=true&w=majority&appName=MERNBlogsAppS'
mongoose.connect(url);
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
