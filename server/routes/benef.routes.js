


const express = require("express");
const { createBanef, FindBaneficial } = require("../controllers/benef.controller");
const router = express.Router();

router.post("/add", createBanef);
router.get("/all", FindBaneficial);

module.exports = router;