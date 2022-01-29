require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const config = require("../config");

const PORT = config.port || 5000;

const auth = require("./middleware/auth");

const userRoute = require("./routes/userRoute");
const orderRoute = require("./routes/orderRoute");
const adressRoute = require("./routes/adressRoute");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ extended: true }));
app.use(cors());

app.use("/users", userRoute);
app.use("/order", auth, orderRoute);
app.use("/adress", auth, adressRoute);

app.use(express.static("./src/public"));

mongoose
  .connect(config.mongo)
  .then(() => {
    app.listen(PORT);
    console.log(`Server started on port ${config.port}`);
  })
  .catch((err) => {
    console.log(err);
  });
