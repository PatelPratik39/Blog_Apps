// mongodb+srv://admin:<password>@mernblogsapps.3zjgkbh.mongodb.net/?retryWrites=true&w=majority&appName=MERNBlogsAppS

// mongodb+srv://admin:<password>@mernblogsapps.3zjgkbh.mongodb.net/

const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
const url =
  "mongodb+srv://admin:admin@mernblogsapps.3zjgkbh.mongodb.net/?retryWrites=true&w=majority&appName=MERNBlogsAppS";

let mongo_DB = mongoose.connect(url, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

mongo_DB.on("connected", () => {
  console.log("MongoDB Connection Successful !!");
});

mongo_DB.on("error", () => {
  console.error("MongoDB connection error: ", error);
});

mongo_DB.on("disconnected", () => {
  console.log("Disconnected from MongoDB");
});

module.exports = mongo_DB;
