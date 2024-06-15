const express = require("express");
const router = express.Router();
const {
  createParavat,
  findParavat,
} = require("../controllers/paravat.controller.js");
router.post("/add", createParavat);
router.get("/find", findParavat);
module.exports = router;
