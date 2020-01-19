const { Schema, model } = require("mongoose");

const messageSchema = new Schema({
  username: { type: String, required: true },
  messages: { type: Array }
});
