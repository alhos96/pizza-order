const mongoose = require("mongoose");

const Schema = mongoose.Schema;

exports.Adress = mongoose.model(
  "Adress",
  new Schema({
    adress: {
      type: String,
      required: true,
    },
    floor: {
      type: Number,
      required: true,
    },
  })
);
