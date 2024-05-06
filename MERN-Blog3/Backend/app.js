const express = require("express");
const cors = require("cors");
const mongoDB = require("./Database/db");
const blogs = require("./routes/blogs");

const PORT = process.env.PORT || 3000;

require("dotenv").config();
mongoDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/v1", blogs);



app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
