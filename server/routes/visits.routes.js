const express = require("express");
const {
  visitadd,
  visitget,
  updateVisitStatus,
  getVisitsByParavatId,
  updateVisit,
} = require("../controllers/visits.controller");
const router = express.Router();

router.post("/add", visitadd);
router.get("/find", visitget);
router.put("/update", updateVisit);
router.get("/find/:paravatId", getVisitsByParavatId);
module.exports = router;
