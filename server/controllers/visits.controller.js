const express = require("express");
const Visit = require("../models/visits.model");
const Baneficial = require("../models/benef.model");

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
    paravatId: req.body.paravatId,
    beneficiaryId: req.body.beneficiaryId,
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

exports.updateVisitStatus = async (req, res) => {
  const paravatId = req.body.paravatId; // Assuming visitId is passed as a route parameter
  const beneficiaryId = req.body.beneficiaryId;
  const date = req.body.date;
  try {
    // Find the visit by visitId
    const visit = await Visit.findOneAndUpdate({
      paravatId: paravatId,
      beneficiaryId: beneficiaryId,
      date: date,
    });

    if (!visit) {
      return res.status(404).json({
        success: false,
        message: `Visit with ID ${visitId} not found`,
      });
    }

    // Update the status field based on req.body
    visit.status = req.body.status;
    visit.comments = req.body.comments;
    console.log("visit");
    // Save the updated visit
    const updatedVisit = await visit.save();

    res.json({ success: true, data: updatedVisit });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};


///   new one


exports.getVisitsByParavatId = async (req, res) => {
  const paravatId = req.params.paravatId;

  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);

  try {
    const visits = await Visit.aggregate([
      { $match: { paravatId: String(paravatId), date: { $gte: startOfDay, $lt: endOfDay } } },
      { $sort: { date: -1 } }
    ]);

    const visitsWithBeneficiaries = await Promise.all(visits.map(async (visit) => {
      if (visit.beneficiaryId.length === 24) {
        const beneficiary = await Baneficial.findById(visit.beneficiaryId);
        if (beneficiary) {
          return {
            ...visit,
            beneficiary: beneficiary.toObject()
          };
        }
      }
      return visit;
    }));

    res.json({ success: true, data: visitsWithBeneficiaries });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


