const { Adress } = require("../models/adressModel");
const { User } = require("../models/userModel");

exports.addAdress = async (req, res, next) => {
  const id = req.userData.userId;
  const { adress, floor } = req.body;

  const newAdress = new Adress({
    adress: adress,
    floor: floor,
  });

  try {
    await newAdress.save();
  } catch (error) {
    res.status(500).json({ message: "Could not save adress." });
    const err = new Error("Could not save adress.", 500);
    return next(err);
  }

  let user;
  try {
    user = await User.findById(id);
  } catch (error) {
    return next(error);
  }

  user.adresses.push(newAdress._id);

  await user.save();

  res.status(200).json({ adress: newAdress });
};

exports.getUserAdresses = async (req, res, next) => {
  const id = req.userData.userId;
  let user;

  try {
    user = await User.findById(id).populate("adresses");
  } catch (error) {
    return next(error);
  }

  res.json({ data: user.adresses });
};
