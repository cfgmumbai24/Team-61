const Goat = require("../models/goat.model");
const addgoats = async (req, res, next) => {
  try {
    const {
      tag,
      dob,
      weight,
      breed,
      gender,
      color,
      vaccinations,
      issueDate,
      updatedWeight,
      insurance,
      isAlive,
      diseases,
      sellingPrice,
      numberOfChildren,
      children,
      comments,
      beneficId,
    } = req.body;

    // Create a new Goat object
    const newGoat = new Goat({
      tag,
      dob,
      weight,
      breed,
      gender,
      color,
      vaccinations,
      issueDate,
      updatedWeight,
      insurance,
      isAlive,
      diseases,
      sellingPrice,
      numberOfChildren,
      children,
      comments,
      beneficId,
    });

    // Save the Goat to the database
    await newGoat.save();

    res.status(201).json({ success: true, data: newGoat });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, error: err.message });
  }
};
module.exports = { addgoats };
