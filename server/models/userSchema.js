const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    id: { type: String, required: true },
    username: { type: String, required: true },
    picture: { type: String, required: true }
  },
  {
    timestamps: true
  }
);

const User = model("User", userSchema);

module.exports = { User };
