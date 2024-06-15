const express = require("express");
const { visitadd, visitget } = require("../controllers/visits.controller");
const router = express.Router();

router.post("/add", visitadd);
router.get("/find", visitget);
// router.patch("/update", visitupdate);
module.exports = router;
