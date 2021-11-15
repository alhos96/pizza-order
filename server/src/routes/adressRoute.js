const express = require("express");
const router = express.Router();

const { addAdress, getUserAdresses } = require("../controler/adressControler");

router.post("/add-adress", addAdress);
router.get("/get-adresses", getUserAdresses);

module.exports = router;
