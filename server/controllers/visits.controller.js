const express = require("express");
const Visit = require("../models/visits.model");
require("dotenv").config({ path: "../.env" });

require("dotenv").config();

// Controller to handle POST requests to create a new Paravat entry
exports.visitadd = async (req, res) => {
  //   Check if all required fields are provided
  const requiredFields = ["paravatId", "beneficiaryId", "status", "date"];
  const missingFields = requiredFields.filter((field) => !(field in req.body));

  if (missingFields.length > 0) {
    return res.status(400).json({
      message: `Missing required fields: ${missingFields.join(", ")}`,
    });
  }

  const visit = new Visit({
    paravetId: req.body.paravetId,
    benebeneficiaryId: req.body.benebeneficiaryId,
    status: req.body.status,
    date: req.body.date,
  });

  try {
    const newVisit = await visit.save();
    res.status(201).json(newVisit);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.visitget = async (req, res) => {
  try {
    const visit = await Visit.find({});
    return res.json({ success: true, msg: visit });
  } catch (error) {
    return res.json({
      success: false,
      msg: error,
    });
  }
};
