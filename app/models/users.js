const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const userSchema = new Schema({
  name: { type: String, required: true }
});

module.exports = model("User", userSchema);
