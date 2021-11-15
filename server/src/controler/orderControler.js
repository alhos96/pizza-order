const { Order } = require("../models/orderModel");
const { User } = require("../models/userModel");

exports.order = async (req, res, next) => {
  const id = req.userData.userId;

  const newOrder = new Order({
    total: req.body.order.total,
    orderInstructions: {
      adress: req.body.order.orderInstructions.adress,
      paymentUponDelivery: req.body.order.orderInstructions.paymentUponDelivery,
      note: req.body.order.orderInstructions.note,
    },
    pizzas: req.body.order.pizza,
  });

  try {
    await newOrder.save();
  } catch (error) {
    res.status(500).json({ message: "Could not connect to database." });
    const err = new Error("Could not connect to database.", 500);
    return next(err);
  }

  let user;

  try {
    user = await User.findById(id);
  } catch (error) {
    return next(error);
  }

  user.orders.push(newOrder._id);
  await user.save();

  res.status(200).json({ order: newOrder });
};

exports.getOrders = async (req, res, next) => {
  const id = req.userData.userId;
  let user;

  try {
    user = await User.findById(id).populate("orders");
  } catch (error) {
    return next(error);
  }
  res.json({ data: user.orders });
};
