const mongoose = require("mongoose");
const Schema = mongoose.Schema;

exports.User = mongoose.model(
  "User",
  new Schema({
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      reqired: true,
    },
    password: {
      type: String,
      required: true,
    },
    confirmPassword: {
      type: String,
    },
    adresses: [{ type: mongoose.Types.ObjectId, ref: "Adress" }],
    orders: [{ type: mongoose.Types.ObjectId, ref: "Order" }],
  })
);
