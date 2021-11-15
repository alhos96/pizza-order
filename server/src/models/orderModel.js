const mongoose = require("mongoose");
const Schema = mongoose.Schema;

exports.Order = mongoose.model(
  "Order",
  new Schema(
    {
      total: {
        type: Number,
        required: true,
      },
      orderInstructions: {
        adress: {
          type: String,
          required: true,
        },
        paymentUponDelivery: {
          type: Boolean,
        },
        note: {
          type: String,
        },
      },
      pizzas: [
        {
          dough: String,
          ingredients: [],
          amount: Number,
          prices: Number,
        },
      ],
    },
    {
      timestamps: true,
    }
  )
);
