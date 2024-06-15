const express = require("express");
const Paravat = require("../models/paravat.model");
require("dotenv").config({ path: "../.env" });

require("dotenv").config();

// Controller to handle POST requests to create a new Paravat entry
exports.createParavat = async (req, res) => {
  //   Check if all required fields are provided
  const requiredFields = ["userId", "name", "address", "PhoneNumber", "email"];
  const missingFields = requiredFields.filter((field) => !(field in req.body));

  if (missingFields.length > 0) {
    return res.status(400).json({
      message: `Missing required fields: ${missingFields.join(", ")}`,
    });
  }

  const paravat = new Paravat({
    userId: req.body.userId,
    name: req.body.name,
    address: req.body.address,
    PhoneNumber: req.body.PhoneNumber,
    email: req.body.email,
  });

  try {
    const newParavat = await paravat.save();
    res.status(201).json(newParavat);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.findParavat = async (req, res) => {
  try {
    const paravat = await Paravat.find({});
    return res.json({ success: true, mdg: paravat });
  } catch (error) {
    return res.json({
      success: false,
      msg: error,
    });
  }
};
