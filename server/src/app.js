require("dotenv").config();
const express = require("express");
const mogoose = require("mongoose");
const cors = require("cors");

const PORT = process.env.PORT || 5000;

const auth = require("./midleware/auth");

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

mogoose
  .connect(`${process.env.MONGO_URI}/${process.env.PROJECTNUMBERDB}?retryWrites=true&w=majority`)
  .then(() => {
    app.listen(PORT);
    console.log(`Server started on port ${PORT}`);
  })
  .catch((err) => {
    console.log(err);
  });
