const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const UserSchema = new Schema({
  username: { type: String, require: true, minlength: 4, unique: true },
  password: { type: String, require: true }
});

const UserModel = model("User", UserSchema);

module.exports = UserModel;
